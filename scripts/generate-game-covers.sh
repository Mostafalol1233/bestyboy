#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p client/public/assets/games
base='https://image.pollinations.ai/prompt/'
params='?width=768&height=1024&nologo=true&model=flux'
fetch_cover() {
  local name="$1"
  local prompt="$2"
  local encoded
  encoded="${prompt// /%20}"
  curl -L --fail --retry 2 --max-time 180 "${base}${encoded}${params}" -o "client/public/assets/games/${name}.jpg"
}
fetch_cover crossfire-generated 'original premium vertical tactical shooter game cover, elite masked soldier squad in smoke, steel blue and crimson lighting, cinematic esports storefront art, no logo, no text, no watermark'
fetch_cover pubg-generated 'original premium vertical battle royale game cover, three diverse survivors with tactical gear in a ruined city, warm sunset and blue shadows, cinematic esports storefront art, no logo, no text, no watermark'
fetch_cover codm-generated 'original premium vertical modern military mobile shooter game cover, futuristic operator with rifle in neon city rain, black gold and cyan palette, cinematic esports storefront art, no logo, no text, no watermark'
fetch_cover mobilelegends-generated 'original premium vertical fantasy mobile arena game cover, elegant armored mage warrior with glowing crystal magic, violet and turquoise palette, cinematic esports storefront art, no logo, no text, no watermark'
fetch_cover valorant-generated 'original premium vertical stylized tactical hero shooter game cover, two original agents in neon city with geometric energy, magenta cyan and black palette, clean esports storefront art, no logo, no text, no watermark'
fetch_cover roblox-generated 'original premium vertical colorful sandbox adventure game cover, blocky characters exploring a bright floating world, playful blue orange and green palette, polished storefront art, no logo, no text, no watermark'
fetch_cover fcmobile-generated 'original premium vertical football mobile game cover, dynamic soccer player striking a ball in a packed stadium, emerald green and electric blue lighting, premium sports storefront art, no logo, no text, no watermark'
file client/public/assets/games/*.jpg
printf '\nGenerated game covers:\n'
identify client/public/assets/games/*.jpg 2>/dev/null || true
sha256sum client/public/assets/games/*.jpg

