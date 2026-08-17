#!/usr/bin/env bash
set -euo pipefail
out="client/public/assets/packages"
mkdir -p "$out"
make_icon() {
  id="$1"; game="$2"; amount="$3"; currency="$4"; bonus="$5"; c1="$6"; c2="$7"
  cat > "$out/bundle-${id}.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-labelledby="title-${id} desc-${id}">
  <title id="title-${id}">${game} ${amount} ${currency}</title>
  <desc id="desc-${id}">${amount} ${currency} plus ${bonus} bonus</desc>
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
    <linearGradient id="coin-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff5c4"/><stop offset=".45" stop-color="#f5cf62"/><stop offset="1" stop-color="#aa6a19"/></linearGradient>
    <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#000" flood-opacity=".35"/></filter>
  </defs>
  <rect width="640" height="420" rx="36" fill="url(#bg-${id})"/>
  <circle cx="560" cy="74" r="110" fill="#fff" opacity=".08"/><circle cx="84" cy="360" r="150" fill="#000" opacity=".12"/>
  <path d="M0 330 C130 260 240 400 370 318 S560 264 640 300 V420 H0Z" fill="#000" opacity=".16"/>
  <g filter="url(#shadow-${id})" transform="translate(55 62)">
    <ellipse cx="115" cy="232" rx="96" ry="28" fill="#8b5a17"/>
    <path d="M19 205h192v28c0 18-43 32-96 32s-96-14-96-32z" fill="#c98a27"/>
    <ellipse cx="115" cy="205" rx="96" ry="28" fill="url(#coin-${id})" stroke="#fff2ae" stroke-width="5"/>
    <ellipse cx="115" cy="205" rx="65" ry="17" fill="none" stroke="#b47b22" stroke-width="6" opacity=".7"/>
    <path d="M42 145h146v58c0 17-33 30-73 30s-73-13-73-30z" fill="#d99a2f"/>
    <ellipse cx="115" cy="145" rx="73" ry="22" fill="url(#coin-${id})" stroke="#fff2ae" stroke-width="5"/>
    <ellipse cx="115" cy="145" rx="46" ry="11" fill="none" stroke="#b47b22" stroke-width="5" opacity=".7"/>
    <path d="M67 93h96v52c0 14-22 25-48 25s-48-11-48-25z" fill="#e4b349"/>
    <ellipse cx="115" cy="93" rx="48" ry="17" fill="url(#coin-${id})" stroke="#fff2ae" stroke-width="5"/>
    <text x="115" y="101" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#75440d">${currency}</text>
  </g>
  <g fill="#fff" font-family="Arial,sans-serif">
    <text x="286" y="126" font-size="24" font-weight="700" opacity=".76">${game}</text>
    <text x="286" y="204" font-size="58" font-weight="900" letter-spacing="-2">${amount}</text>
    <text x="286" y="244" font-size="26" font-weight="800" opacity=".9">${currency}</text>
    <rect x="286" y="276" width="245" height="50" rx="25" fill="#fff" opacity=".17"/>
    <text x="408" y="309" text-anchor="middle" font-size="22" font-weight="800">+${bonus} BONUS</text>
  </g>
</svg>
SVG
}
make_icon 1 "CrossFire" 5000 ZP 2500 "#071d3a" "#0ea5e9"
make_icon 2 "CrossFire" 10000 ZP 5000 "#071d3a" "#2563eb"
make_icon 3 "CrossFire" 20000 ZP 10000 "#0b1530" "#4f46e5"
make_icon 4 "CrossFire" 50000 ZP 25000 "#1e123a" "#9333ea"
make_icon 5 "CrossFire" 100000 ZP 50000 "#300b2f" "#db2777"
make_icon 6 "PUBG Mobile" 5000 UC 2500 "#39240a" "#f59e0b"
make_icon 7 "PUBG Mobile" 10000 UC 5000 "#4b2507" "#ea580c"
make_icon 8 "PUBG Mobile" 50000 UC 25000 "#3b1604" "#f97316"
make_icon 9 "Free Fire" 5000 Diamonds 2500 "#3b0a16" "#fb7185"
make_icon 10 "Free Fire" 10000 Diamonds 5000 "#46100d" "#ef4444"
make_icon 11 "Free Fire" 50000 Diamonds 25000 "#451a03" "#f59e0b"
make_icon 12 "COD Mobile" 80 CP 5 "#18200b" "#84cc16"
make_icon 13 "COD Mobile" 160 CP 10 "#1a220c" "#a3e635"
make_icon 14 "COD Mobile" 420 CP 25 "#20230c" "#eab308"
make_icon 15 "COD Mobile" 880 CP 60 "#251507" "#f59e0b"
make_icon 16 "COD Mobile" 2400 CP 150 "#2b0b0b" "#ef4444"
make_icon 17 "Mobile Legends" 86 Diamonds 8 "#071b3a" "#38bdf8"
make_icon 18 "Mobile Legends" 172 Diamonds 18 "#0b1f44" "#60a5fa"
make_icon 19 "Mobile Legends" 257 Diamonds 30 "#18165a" "#818cf8"
make_icon 20 "Mobile Legends" 514 Diamonds 70 "#2e1065" "#c084fc"
make_icon 21 "Mobile Legends" 1050 Diamonds 150 "#3b0764" "#e879f9"
make_icon 22 "Valorant" 475 VP 10 "#3f0b25" "#fb7185"
make_icon 23 "Valorant" 1000 VP 25 "#4c0519" "#f43f5e"
make_icon 24 "Valorant" 2050 VP 75 "#4a044e" "#e879f9"
make_icon 25 "Valorant" 3650 VP 150 "#312e81" "#818cf8"
make_icon 26 "Valorant" 5350 VP 250 "#172554" "#38bdf8"
make_icon 27 "Roblox" 400 Robux 20 "#111827" "#6b7280"
make_icon 28 "Roblox" 800 Robux 50 "#172033" "#94a3b8"
make_icon 29 "Roblox" 1700 Robux 100 "#0f172a" "#38bdf8"
make_icon 30 "Roblox" 4500 Robux 250 "#082f49" "#06b6d4"
make_icon 31 "FC Mobile" 105 Points 10 "#052e16" "#22c55e"
make_icon 32 "FC Mobile" 575 Points 40 "#064e3b" "#34d399"
make_icon 33 "FC Mobile" 1200 Points 100 "#042f2e" "#2dd4bf"
make_icon 34 "FC Mobile" 2500 Points 200 "#052e16" "#84cc16"
