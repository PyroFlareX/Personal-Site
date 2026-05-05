#!/usr/bin/env bash
# rollback.sh — revert to a previous release
# Place at: /srv/zackdell.com/rollback.sh
# Usage:
#   bash /srv/zackdell.com/rollback.sh        # revert to the release before current
#   bash /srv/zackdell.com/rollback.sh 3      # revert to specific release number
set -euo pipefail

SITE_ROOT="/srv/zackdell.com"
RELEASES_DIR="$SITE_ROOT/releases"
CURRENT_LINK="$SITE_ROOT/current"
LOG_FILE="$SITE_ROOT/logs/build.log"

log() { echo "[$(date -Iseconds)] $*" | tee -a "$LOG_FILE"; }

CURRENT_RELEASE=$(basename "$(readlink -f "$CURRENT_LINK")" 2>/dev/null || echo "none")
log "Current release: $CURRENT_RELEASE"

if [ -n "${1:-}" ]; then
    TARGET="$1"
else
    # Default: the release numerically before the current one
    TARGET=$(ls -1v "$RELEASES_DIR" | grep -E '^[0-9]+$' | grep -v "^${CURRENT_RELEASE}$" | tail -1)
fi

if [ -z "$TARGET" ]; then
    log "ERROR: No previous release found to roll back to."
    exit 1
fi

TARGET_DIR="$RELEASES_DIR/$TARGET"
if [ ! -d "$TARGET_DIR" ]; then
    log "ERROR: Release $TARGET does not exist at $TARGET_DIR"
    exit 1
fi

log "Rolling back from release $CURRENT_RELEASE to release $TARGET..."
ln -sfn "$TARGET_DIR" "${CURRENT_LINK}.next"
mv -T "${CURRENT_LINK}.next" "$CURRENT_LINK"

log "Rollback to release $TARGET complete."
