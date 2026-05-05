#!/usr/bin/env bash
# container-setup.sh — one-time LXC container provisioning
# Run as root on a fresh Debian 12 or Ubuntu 24.04 LTS container
# Usage: bash container-setup.sh <github_repo_url> <deploy_ssh_pubkey>
#
# Example:
#   bash container-setup.sh https://github.com/PyroFlareX/Personal-Site "ssh-ed25519 AAAA... n8n@host"
set -euo pipefail

REPO_URL="${1:?Usage: $0 <github_repo_url> <deploy_ssh_pubkey>}"
DEPLOY_PUBKEY="${2:?Usage: $0 <github_repo_url> <deploy_ssh_pubkey>}"
SITE_ROOT="/srv/zackdell.com"

echo "=== Installing system packages ==="
apt-get update -qq
apt-get install -y --no-install-recommends \
    curl git ca-certificates gnupg debian-keyring debian-archive-keyring apt-transport-https

echo "=== Installing Caddy ==="
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update -qq
apt-get install -y caddy

echo "=== Installing Node.js LTS via nvm (for deploy user) ==="
# Install nvm system-wide into /opt/nvm so the deploy user can use it
export NVM_DIR="/opt/nvm"
mkdir -p "$NVM_DIR"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | NVM_DIR="$NVM_DIR" bash
# Source nvm
. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm alias default node
NODE_PATH=$(nvm which default)
NODE_BIN_DIR=$(dirname "$NODE_PATH")
echo "Node installed at: $NODE_BIN_DIR"

echo "=== Creating deploy user ==="
if ! id -u deploy &>/dev/null; then
    useradd -r -s /usr/sbin/nologin -d "$SITE_ROOT" deploy
fi

echo "=== Creating directory layout ==="
mkdir -p \
    "$SITE_ROOT/releases" \
    "$SITE_ROOT/logs" \
    "$SITE_ROOT/repo"

echo "=== Cloning repository ==="
git clone "$REPO_URL" "$SITE_ROOT/repo"
cd "$SITE_ROOT/repo"
# Install Node deps in repo dir as root (deploy script will run npm ci)
PATH="$NODE_BIN_DIR:$PATH" npm ci

echo "=== Initial build ==="
mkdir -p "$SITE_ROOT/releases/1"
PATH="$NODE_BIN_DIR:$PATH" ASTRO_OUTDIR="$SITE_ROOT/releases/1" npx astro build
ln -sfn "$SITE_ROOT/releases/1" "$SITE_ROOT/current"
echo "Initial release live at $SITE_ROOT/current"

echo "=== Setting permissions ==="
chown -R deploy:deploy "$SITE_ROOT"
# Allow deploy user to read nvm node binaries
chmod -R o+rX "$NVM_DIR"

echo "=== Setting up SSH key for deploy user ==="
DEPLOY_HOME="/home/deploy"
mkdir -p "$DEPLOY_HOME/.ssh"
echo "$DEPLOY_PUBKEY" >> "$DEPLOY_HOME/.ssh/authorized_keys"
chmod 700 "$DEPLOY_HOME/.ssh"
chmod 600 "$DEPLOY_HOME/.ssh/authorized_keys"
chown -R deploy:deploy "$DEPLOY_HOME/.ssh"

echo "=== Writing deploy user's PATH (for SSH non-interactive sessions) ==="
# SSH non-interactive sessions don't source .bashrc — set PATH in environment file
cat > /etc/environment.d/node-path.conf << EOF
PATH="$NODE_BIN_DIR:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
EOF

echo "=== Installing Caddyfile ==="
# Copy Caddyfile from repo
cp "$SITE_ROOT/repo/deploy/Caddyfile" /etc/caddy/Caddyfile
systemctl enable caddy
systemctl restart caddy

echo "=== Installing deploy scripts ==="
cp "$SITE_ROOT/repo/deploy/deploy.sh" "$SITE_ROOT/deploy.sh"
cp "$SITE_ROOT/repo/deploy/rollback.sh" "$SITE_ROOT/rollback.sh"
chmod +x "$SITE_ROOT/deploy.sh" "$SITE_ROOT/rollback.sh"
chown deploy:deploy "$SITE_ROOT/deploy.sh" "$SITE_ROOT/rollback.sh"

echo "=== Sudoers for deploy user (Caddy reload only) ==="
cat > /etc/sudoers.d/deploy-caddy << 'EOF'
deploy ALL=(root) NOPASSWD: /usr/bin/systemctl reload caddy
EOF
chmod 440 /etc/sudoers.d/deploy-caddy

echo ""
echo "=== Container setup complete ==="
echo "Site is live. Test with: curl -I https://zackdell.com"
echo ""
echo "To deploy manually:"
echo "  ssh deploy@<container-ip> bash /srv/zackdell.com/deploy.sh"
echo ""
echo "To roll back:"
echo "  ssh deploy@<container-ip> bash /srv/zackdell.com/rollback.sh"
