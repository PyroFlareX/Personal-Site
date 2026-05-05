#!/usr/bin/env bash
# deploy.sh — build and atomically deploy the site
# Place at: /srv/zackdell.com/deploy.sh
# Run as: deploy user via SSH or N8N
# Usage: bash /srv/zackdell.com/deploy.sh
set -euo pipefail

SITE_ROOT="/srv/zackdell.com"
REPO_DIR="$SITE_ROOT/repo"
RELEASES_DIR="$SITE_ROOT/releases"
CURRENT_LINK="$SITE_ROOT/current"
LOG_FILE="$SITE_ROOT/logs/build.log"
KEEP_RELEASES=3

log() { echo "[$(date -Iseconds)] $*" | tee -a "$LOG_FILE"; }

mkdir -p "$RELEASES_DIR" "$SITE_ROOT/logs"

# --- Determine next release number ---
LAST=$(ls -1v "$RELEASES_DIR" 2>/dev/null | grep -E '^[0-9]+$' | tail -1)
NEXT=$(( ${LAST:-0} + 1 ))
RELEASE_DIR="$RELEASES_DIR/$NEXT"

log "=== Deploy #$NEXT starting ==="

# --- Pull latest code ---
log "Pulling latest from git..."
cd "$REPO_DIR"
git fetch origin master
git reset --hard origin/master

# --- Install dependencies (skips if package-lock unchanged) ---
log "Installing dependencies..."
npm ci --prefer-offline

# --- Build into the new release directory ---
log "Building Astro site into $RELEASE_DIR..."
mkdir -p "$RELEASE_DIR"
ASTRO_OUTDIR="$RELEASE_DIR" npx astro build 2>&1 | tee -a "$LOG_FILE"

# --- Verify build produced output ---
if [ ! -f "$RELEASE_DIR/index.html" ]; then
    log "ERROR: Build produced no index.html — aborting, keeping current release live"
    rm -rf "$RELEASE_DIR"
    exit 1
fi

BUILD_SIZE=$(du -sh "$RELEASE_DIR" | cut -f1)
log "Build successful. Size: $BUILD_SIZE"

# --- Atomic symlink swap ---
# ln -sfn + mv -T is atomic on Linux — Caddy keeps serving old release during swap
log "Swapping current symlink to release #$NEXT..."
ln -sfn "$RELEASE_DIR" "${CURRENT_LINK}.next"
mv -T "${CURRENT_LINK}.next" "$CURRENT_LINK"

log "Release #$NEXT is now live."

# --- Prune old releases ---
COUNT=$(ls -1v "$RELEASES_DIR" | grep -E '^[0-9]+$' | wc -l)
if [ "$COUNT" -gt "$KEEP_RELEASES" ]; then
    EXCESS=$(( COUNT - KEEP_RELEASES ))
    log "Pruning $EXCESS old release(s)..."
    ls -1v "$RELEASES_DIR" | grep -E '^[0-9]+$' | head -"$EXCESS" | while read -r OLD; do
        log "  Removing release $OLD"
        rm -rf "$RELEASES_DIR/$OLD"
    done
fi

log "=== Deploy #$NEXT complete ==="
