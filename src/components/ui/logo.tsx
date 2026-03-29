export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-lg overflow-hidden flex items-center justify-center`}>
      <svg viewBox="0 0 40 40" fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Red base */}
        <rect width="40" height="40" fill="#dc2626" />
        {/* Geometric triangle accents */}
        <path d="M40 0H22L40 18V0Z" fill="#111" fillOpacity="0.12" />
        <path d="M0 40V30L10 40H0Z" fill="#111" fillOpacity="0.08" />
        {/* Subtle horizontal line accent */}
        <rect x="4" y="19" width="32" height="2" rx="1" fill="white" fillOpacity="0.12" />
      </svg>
      <span className="relative text-white font-extrabold text-sm tracking-tight">RL</span>
    </div>
  );
}

export function Logo({
  size = "md",
  showText = true,
  showSubtext = true,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showSubtext?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: { icon: "w-7 h-7", initials: "text-xs", text: "text-sm", subtext: "text-[9px]" },
    md: { icon: "w-8 h-8", initials: "text-sm", text: "text-sm", subtext: "text-[10px]" },
    lg: { icon: "w-10 h-10", initials: "text-base", text: "text-base", subtext: "text-xs" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${s.icon} relative rounded-lg overflow-hidden flex items-center justify-center`}>
        <svg viewBox="0 0 40 40" fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <rect width="40" height="40" fill="#dc2626" />
          <path d="M40 0H22L40 18V0Z" fill="#111" fillOpacity="0.12" />
          <path d="M0 40V30L10 40H0Z" fill="#111" fillOpacity="0.08" />
          <rect x="4" y="19" width="32" height="2" rx="1" fill="white" fillOpacity="0.12" />
        </svg>
        <span className={`relative text-white font-extrabold ${s.initials} tracking-tight`}>RL</span>
      </div>
      {showText && (
        <div>
          <p className={`font-semibold text-neutral-900 ${s.text} leading-none`}>Rebuild Learning</p>
          {showSubtext && (
            <p className={`text-neutral-400 ${s.subtext} mt-0.5`}>by N.B.V. Subba Rao</p>
          )}
        </div>
      )}
    </div>
  );
}
