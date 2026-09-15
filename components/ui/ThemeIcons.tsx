type IconProps = { size?: number }

/* ── Shared faceted gem (used for most stone themes) ── */
export function GemIcon({ size = 28, color1, color2, highlight }: IconProps & {
  color1: string; color2: string; highlight?: string
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <polygon points="14,3 24,10 4,10" fill={color1} />
      <polygon points="4,10 14,26 24,10" fill={color2} />
      <line x1="4"  y1="10" x2="14" y2="17" stroke={highlight ?? 'rgba(255,255,255,0.35)'} strokeWidth="0.8"/>
      <line x1="24" y1="10" x2="14" y2="17" stroke={highlight ?? 'rgba(255,255,255,0.35)'} strokeWidth="0.8"/>
      <line x1="9"  y1="10" x2="14" y2="3"  stroke={highlight ?? 'rgba(255,255,255,0.25)'} strokeWidth="0.6"/>
      <line x1="19" y1="10" x2="14" y2="3"  stroke={highlight ?? 'rgba(255,255,255,0.25)'} strokeWidth="0.6"/>
      <polygon points="14,3 24,10 14,26 4,10" fill="none" stroke={highlight ?? 'rgba(255,255,255,0.4)'} strokeWidth="0.5"/>
    </svg>
  )
}

/* ── Gold — Raw unprocessed gold nugget ── */
export function GoldNuggetIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Main nugget body — irregular lump */}
      <path d="M6 17 Q4 13 7 9 Q10 5 15 5 Q20 5 22 9 Q25 13 23 18 Q21 23 16 24 Q10 25 7 21 Z"
        fill="url(#nuggetGrad)" />
      {/* Surface facets — rough uneven planes */}
      <path d="M7 9 Q11 11 13 9 Q16 7 20 9" fill="#D4A018" opacity="0.6"/>
      <path d="M13 9 Q14 14 16 13 Q19 12 22 9" fill="#C89010" opacity="0.5"/>
      <path d="M7 9 Q9 15 8 18 Q9 21 12 22" fill="#B87808" opacity="0.45"/>
      <path d="M16 13 Q20 15 23 18 Q21 22 16 24" fill="#A06808" opacity="0.4"/>
      {/* Bright highlight veins — raw gold glint */}
      <path d="M10 8 Q13 10 11 13" stroke="#FFE860" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.85"/>
      <path d="M16 6 Q18 9 17 12" stroke="#FFE040" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M8 15 Q10 17 9 20" stroke="#FFD020" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>
      {/* Specular hot spot */}
      <ellipse cx="11" cy="9" rx="2.5" ry="1.4" fill="white" opacity="0.35" transform="rotate(-25 11 9)"/>
      <circle cx="13" cy="8" r="0.8" fill="white" opacity="0.5"/>
      {/* Small pits / cavities typical of raw gold */}
      <circle cx="18" cy="16" r="1.2" fill="#8B6008" opacity="0.5"/>
      <circle cx="10" cy="19" r="0.9" fill="#8B6008" opacity="0.4"/>
      {/* Outline */}
      <path d="M6 17 Q4 13 7 9 Q10 5 15 5 Q20 5 22 9 Q25 13 23 18 Q21 23 16 24 Q10 25 7 21 Z"
        fill="none" stroke="#A07010" strokeWidth="0.7" opacity="0.8"/>
      <defs>
        <radialGradient id="nuggetGrad" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#FFE060"/>
          <stop offset="40%"  stopColor="#D4A018"/>
          <stop offset="75%"  stopColor="#B87808"/>
          <stop offset="100%" stopColor="#7A5004"/>
        </radialGradient>
      </defs>
    </svg>
  )
}

/* ── Parchment — Ancient scroll ── */
export function ScrollIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="5" y="5" width="18" height="18" rx="1.5" fill="#F5ECD9" stroke="#B8860B" strokeWidth="1"/>
      <rect x="3" y="3.5" width="22" height="4" rx="2" fill="#D4A85A" />
      <rect x="3" y="3.5" width="22" height="4" rx="2" fill="none" stroke="#B8860B" strokeWidth="0.7"/>
      <rect x="3" y="20.5" width="22" height="4" rx="2" fill="#D4A85A"/>
      <rect x="3" y="20.5" width="22" height="4" rx="2" fill="none" stroke="#B8860B" strokeWidth="0.7"/>
      <line x1="8"  y1="11" x2="20" y2="11" stroke="#B8860B" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="8"  y1="14" x2="20" y2="14" stroke="#B8860B" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="8"  y1="17" x2="15" y2="17" stroke="#B8860B" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Creation — Light rays ── */
export function CreationIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="5" fill="#E8C46A" opacity="0.95"/>
      <circle cx="12" cy="12" r="1.8" fill="white" opacity="0.35"/>
      <line x1="14" y1="2"  x2="14" y2="6"  stroke="#E8C46A" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="14" y1="22" x2="14" y2="26" stroke="#E8C46A" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="2"  y1="14" x2="6"  y2="14" stroke="#E8C46A" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="22" y1="14" x2="26" y2="14" stroke="#E8C46A" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="5.5"  y1="5.5"  x2="8.3"  y2="8.3"  stroke="#E8C46A" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="19.7" y1="19.7" x2="22.5" y2="22.5" stroke="#E8C46A" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="22.5" y1="5.5"  x2="19.7" y2="8.3"  stroke="#E8C46A" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="5.5"  y1="22.5" x2="8.3"  y2="19.7" stroke="#E8C46A" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Yashepheh / Jasper — rough stone with veins ── */
export function JasperIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <polygon points="7,4 20,3 25,9 24,20 18,25 8,24 3,18 4,8" fill="#7A2020"/>
      <path d="M7 10 Q12 8 15 14 Q18 20 22 18" stroke="#9B3030" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M10 20 Q13 16 17 18" stroke="#C04040" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M14 7 Q16 9 14 11" stroke="#E8C46A" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>
      <circle cx="19" cy="14" r="0.8" fill="#E8C46A" opacity="0.5"/>
      <polygon points="7,4 20,3 25,9 24,20 18,25 8,24 3,18 4,8" fill="none" stroke="#C05050" strokeWidth="0.6"/>
    </svg>
  )
}

/* ── Pearl ── */
export function PearlIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="9" fill="#EAE6DE" stroke="#C8C2BA" strokeWidth="0.8"/>
      <ellipse cx="11" cy="10" rx="3.5" ry="2.5" fill="white" opacity="0.6" transform="rotate(-20 11 10)"/>
      <circle cx="17" cy="17" r="1.2" fill="white" opacity="0.25"/>
    </svg>
  )
}

/* ── Yahalom — Diamond brilliant cut ── */
export function DiamondIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Table (top flat face) */}
      <polygon points="14,4 22,9 20,9 14,5 8,9 6,9" fill="#E8E8F8"/>
      {/* Upper girdle facets */}
      <polygon points="6,9 14,5 14,13" fill="#D0D0F0"/>
      <polygon points="22,9 14,5 14,13" fill="#B8B8E0"/>
      <polygon points="6,9 20,9 14,13" fill="#E0E0F8"/>
      {/* Lower pavilion */}
      <polygon points="6,9 14,13 14,25" fill="#C0C0E8"/>
      <polygon points="22,9 14,13 14,25" fill="#A0A0D0"/>
      <polygon points="6,9 22,9 14,25" fill="none" stroke="rgba(160,160,220,0.6)" strokeWidth="0.5"/>
      {/* Sparkle lines */}
      <line x1="14" y1="2" x2="14" y2="5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
      <line x1="23" y1="6" x2="21" y2="8" stroke="white" strokeWidth="1.0" strokeLinecap="round" opacity="0.7"/>
      <line x1="5"  y1="6" x2="7"  y2="8" stroke="white" strokeWidth="1.0" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

/* ── Shebo — Agate with characteristic bands ── */
export function AgateIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Stone outline — slightly irregular oval */}
      <ellipse cx="14" cy="14" rx="11" ry="10" fill="#5A6A7A"/>
      {/* Concentric bands — the signature agate look */}
      <ellipse cx="14" cy="14" rx="9"  ry="8"  fill="none" stroke="#6A7A8A" strokeWidth="1.5"/>
      <ellipse cx="14" cy="14" rx="7"  ry="6"  fill="none" stroke="#7A8A9A" strokeWidth="1.2"/>
      <ellipse cx="14" cy="14" rx="5"  ry="4"  fill="none" stroke="#8A9AAA" strokeWidth="1.0"/>
      <ellipse cx="14" cy="14" rx="3"  ry="2.5" fill="none" stroke="#9AAABA" strokeWidth="0.8"/>
      <ellipse cx="14" cy="14" rx="1.5" ry="1.2" fill="#AABBC8"/>
      {/* Highlight */}
      <ellipse cx="10" cy="10" rx="2.5" ry="1.5" fill="white" opacity="0.2" transform="rotate(-20 10 10)"/>
    </svg>
  )
}

/* ── Nophek — Carbuncle / deep Garnet ── */
export function CarbuncleIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Six-sided cabochon shape */}
      <polygon points="14,3 22,8 22,20 14,25 6,20 6,8" fill="#7A1A40"/>
      {/* Inner depth */}
      <polygon points="14,6 20,10 20,18 14,22 8,18 8,10" fill="#9A2A50" opacity="0.8"/>
      {/* Centre glow */}
      <circle cx="14" cy="14" r="3" fill="#C04060" opacity="0.7"/>
      {/* Star reflection lines */}
      <line x1="14" y1="10" x2="14" y2="18" stroke="rgba(255,200,200,0.4)" strokeWidth="0.7"/>
      <line x1="10" y1="12" x2="18" y2="16" stroke="rgba(255,200,200,0.4)" strokeWidth="0.7"/>
      <line x1="10" y1="16" x2="18" y2="12" stroke="rgba(255,200,200,0.4)" strokeWidth="0.7"/>
      {/* Highlight */}
      <ellipse cx="11" cy="9" rx="2" ry="1.2" fill="white" opacity="0.25" transform="rotate(-10 11 9)"/>
    </svg>
  )
}

/* ── Shoham — Onyx (dark, banded) ── */
export function OnyxIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Dark stone body */}
      <ellipse cx="14" cy="14" rx="11" ry="10" fill="#1A1825"/>
      {/* White/grey bands — characteristic of onyx */}
      <path d="M4 11 Q14 9 24 11" stroke="#E0D8F0" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M4 14 Q14 12 24 14" stroke="#E0D8F0" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M5 17 Q14 15 23 17" stroke="#E0D8F0" strokeWidth="0.6" fill="none" opacity="0.2"/>
      {/* Highlight */}
      <ellipse cx="10" cy="9" rx="3" ry="1.5" fill="white" opacity="0.15" transform="rotate(-15 10 9)"/>
      {/* Subtle gold edge */}
      <ellipse cx="14" cy="14" rx="11" ry="10" fill="none" stroke="#E8C46A" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  )
}

/* ── Tarshish — Beryl / Aquamarine ── */
export function BerylIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Hexagonal prism — classic beryl crystal habit */}
      <polygon points="14,3 22,7.5 22,20.5 14,25 6,20.5 6,7.5" fill="#0A7090"/>
      <polygon points="14,3 22,7.5 14,12 6,7.5" fill="#0A8AAA"/>
      <polygon points="14,12 22,7.5 22,20.5 14,25 6,20.5 6,7.5" fill="#085878" opacity="0.9"/>
      {/* Inner light column */}
      <rect x="12" y="10" width="4" height="10" rx="1" fill="#40C0D8" opacity="0.25"/>
      {/* Highlight */}
      <polygon points="14,3 22,7.5 14,12 6,7.5" fill="none" stroke="rgba(160,230,240,0.5)" strokeWidth="0.7"/>
      <line x1="14" y1="3" x2="14" y2="25" stroke="rgba(160,230,240,0.2)" strokeWidth="0.6"/>
    </svg>
  )
}

/* ── Leshem — Jacinth / honey-amber ── */
export function JacinthIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Oval cabochon */}
      <ellipse cx="14" cy="14" rx="11" ry="9" fill="#C07030"/>
      {/* Warm inner glow */}
      <ellipse cx="14" cy="14" rx="7" ry="5.5" fill="#E09040" opacity="0.7"/>
      <ellipse cx="14" cy="14" rx="3.5" ry="2.5" fill="#F0B050" opacity="0.6"/>
      {/* Highlight */}
      <ellipse cx="10" cy="10" rx="3" ry="1.8" fill="white" opacity="0.3" transform="rotate(-20 10 10)"/>
      <circle cx="18" cy="17" r="1" fill="white" opacity="0.1"/>
    </svg>
  )
}

/* ── Main icon dispatcher ── */

export function ThemeIcon({ themeId, size = 28 }: { themeId: string; size?: number }) {
  switch (themeId) {
    case 'gold':      return <GoldNuggetIcon size={size} />
    case 'parchment': return <ScrollIcon size={size} />
    case 'creation':  return <CreationIcon size={size} />
    case 'odem':      return <GemIcon size={size} color1="#8B2020" color2="#C04040" highlight="#E06060" />
    case 'pitdah':    return <GemIcon size={size} color1="#7A5C08" color2="#B08820" highlight="#D4A830" />
    case 'bareqeth':  return <GemIcon size={size} color1="#0D4A2A" color2="#1A7A44" highlight="#28A060" />
    case 'nophek':    return <CarbuncleIcon size={size} />
    case 'sappir':    return <GemIcon size={size} color1="#0C2A6E" color2="#1A4AAE" highlight="#2A6ADE" />
    case 'yahalom':   return <DiamondIcon size={size} />
    case 'leshem':    return <JacinthIcon size={size} />
    case 'shebo':     return <AgateIcon size={size} />
    case 'achlamah':  return <GemIcon size={size} color1="#3D1A6E" color2="#6A2AAE" highlight="#9040DE" />
    case 'tarshish':  return <BerylIcon size={size} />
    case 'shoham':    return <OnyxIcon size={size} />
    case 'yashepheh': return <JasperIcon size={size} />
    default:          return <GemIcon size={size} color1="#444" color2="#666" highlight="#888" />
  }
}
