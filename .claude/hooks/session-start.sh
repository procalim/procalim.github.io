#!/bin/bash
# Installs the website deps and the reel-editing tools (fonts, Playwright, ffmpeg) for web sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Website dependencies
npm install --no-audit --no-fund

# Reel editing tools: fonts + Playwright (uses the preinstalled Chromium, no browser download)
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
(cd content-studio && npm install --no-audit --no-fund)

# ffmpeg binary via imageio-ffmpeg
python3 -m pip install --quiet imageio-ffmpeg 2>/dev/null || python3 -m pip install --quiet --user imageio-ffmpeg

FFMPEG="$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())')"
echo "export FFMPEG=\"$FFMPEG\"" >> "$CLAUDE_ENV_FILE"
