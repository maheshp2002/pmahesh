import React from 'react';

// Hand-drawn delicate yellow lightbulb doodle (matching Screenshot 2 reference)
export function LightbulbDoodle({ className = "w-20 h-24" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 70 85"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Fine, delicate hand-drawn radiating rays with varied lengths & angles */}
      <path d="M35 7 V0" stroke="#FDE047" strokeWidth="1.5" />
      <path d="M19 14 L12 8" stroke="#FDE047" strokeWidth="1.4" />
      <path d="M51 14 L58 8" stroke="#FDE047" strokeWidth="1.4" />
      <path d="M7 30 H0" stroke="#FDE047" strokeWidth="1.4" />
      <path d="M63 30 H70" stroke="#FDE047" strokeWidth="1.4" />
      <path d="M11 48 L3 53" stroke="#FDE047" strokeWidth="1.3" />
      <path d="M59 48 L67 53" stroke="#FDE047" strokeWidth="1.3" />

      {/* Thin, slightly irregular hand-drawn yellow bulb outline */}
      <path
        d="M26 55 C17 49 12 39 12 28 C12 15 22 11 35 11 C48 11 58 15 58 28 C58 39 53 49 44 55"
        stroke="#FDE047"
        strokeWidth="1.8"
      />

      {/* Simple hand-drawn filament: two thin support leads and an M-shaped filament */}
      <path d="M30 55 V38" stroke="#FEF08A" strokeWidth="1.2" opacity="0.9" />
      <path d="M40 55 V38" stroke="#FEF08A" strokeWidth="1.2" opacity="0.9" />
      <path d="M30 38 Q33 28 35 37 Q37 28 40 38" stroke="#FFFFFF" strokeWidth="1.4" />

      {/* Simple hand-drawn bulb screw base threads & contact tip */}
      <path d="M26 58 Q35 61 44 58" stroke="#FEF08A" strokeWidth="1.5" />
      <path d="M27 64 Q35 67 43 64" stroke="#FEF08A" strokeWidth="1.5" />
      <path d="M29 70 Q35 73 41 70" stroke="#FEF08A" strokeWidth="1.5" />
      <path d="M31 74 Q35 77 39 74" stroke="#FDE047" strokeWidth="1.8" />
    </svg>
  );
}

// Hand-drawn expressive question mark doodle on top-right of the photo (matching Figma reference)
export function QuestionMarkDoodle({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hand-drawn chalk question mark curve */}
      <path d="M22 34 C22 17 33 10 47 10 C62 10 71 18 71 30 C71 43 58 50 50 59 C46 64 46 70 46 74" />
      {/* Hand-drawn question mark dot */}
      <circle cx="46" cy="88" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Hand-drawn diagonal striped decoration (matching Screenshot 2 reference)
export function HatchDoodle({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="0" y1="100" x2="100" y2="0" />
      <line x1="0" y1="82" x2="82" y2="0" />
      <line x1="0" y1="64" x2="64" y2="0" />
      <line x1="0" y1="46" x2="46" y2="0" />
      <line x1="0" y1="28" x2="28" y2="0" />
      <line x1="18" y1="100" x2="100" y2="18" />
      <line x1="36" y1="100" x2="100" y2="36" />
      <line x1="54" y1="100" x2="100" y2="54" />
      <line x1="72" y1="100" x2="100" y2="72" />
    </svg>
  );
}

// Double quotation mark icon for Testimonials/Experience section
export function QuoteIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" stroke="#525252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 12H8a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6V12zm0 14c0 6-4 8-6 9" />
      <path d="M34 12h-6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6V12zm0 14c0 6-4 8-6 9" />
    </svg>
  );
}
