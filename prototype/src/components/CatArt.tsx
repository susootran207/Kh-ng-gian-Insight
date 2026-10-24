// One character drawing shared by the interactive hero and decorative companion.
export function CatArt({ expression, dragging }: { expression: string; dragging: boolean }) {
  return <svg viewBox="0 0 160 155" className={`cat-art ${expression} ${dragging ? 'being-carried' : ''}`} aria-hidden="true">
    <ellipse cx="79" cy="143" rx="51" ry="5" fill="#5f6550" opacity=".14"/>
    <path className="cat-tail" d="M111 128c35 13 42-21 26-32" fill="none" stroke="#c8ac85" strokeWidth="14" strokeLinecap="round"/>
    <path d="M41 134c-5-17 0-59 28-65 28-7 48 23 45 65Z" fill="#c8ac85"/>
    <path d="M62 135c-5-17 1-42 14-44 17-2 23 28 19 44" fill="#eee0c4"/>
    <g className="cat-head">
    <path d="m37 55 2-35 26 18m32 1 25-19-2 38" fill="#c8ac85"/>
    <path d="m43 44 1-15 14 12m45 0 13-12-1 18" fill="#d4b5aa"/>
    <path d="M34 60c-2-23 19-30 43-30 27 0 47 13 47 34 0 23-19 34-45 33-28 0-44-14-45-37" fill="#dcc3a0"/>
    <path d="m68 32 4 13m9-14v13m9-12-3 12" stroke="#b19470" strokeWidth="4" strokeLinecap="round"/>
    <g className="cat-eyes" fill="none" stroke="#484a3b" strokeWidth="2.6" strokeLinecap="round">
      {expression==='happy' || expression==='sleepy' ? <><path d="M52 62q6-7 12 0m29 0q6-7 12 0"/></> : <><ellipse cx="59" cy="61" rx="3" ry={dragging?6:4.5} fill="#484a3b"/>{expression==='wink'?<path d="M94 62q6 5 12-1"/>:<ellipse cx="99" cy="61" rx="3" ry={dragging?6:4.5} fill="#484a3b"/>}</>}
    </g>
    <path d="m74 71 5 5 5-5Z" fill="#af7e77"/><path d="M79 76v4m0 0q-5 5-9 0m9 0q5 5 9 0" fill="none" stroke="#665b4b" strokeWidth="1.5" strokeLinecap="round"/>
    <g stroke="#a88e72" strokeWidth="1" strokeLinecap="round"><path d="m45 75-18-3m20 8-20 3m85-8 18-3m-20 8 20 3"/></g>
    </g>
    <path className="cat-paw" d="M48 114q-4 9 0 18" fill="none" stroke="#c8ac85" strokeWidth="9" strokeLinecap="round"/>
    <path d="M44 137h22m25 0h21" stroke="#ae906e" strokeWidth="3" strokeLinecap="round"/>
  </svg>
}
