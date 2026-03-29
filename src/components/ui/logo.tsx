import Image from "next/image";

export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-lg overflow-hidden flex items-center justify-center`}>
      <Image
        src="/subbu-innovative-classes.jpeg"
        alt="Rebuild Learning"
        width={40}
        height={40}
        className="w-full h-full object-cover"
      />
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
        <Image
          src="/subbu-innovative-classes.jpeg"
          alt="Rebuild Learning"
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
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
