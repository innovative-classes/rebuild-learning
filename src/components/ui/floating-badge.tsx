import Image from "next/image";

export function FloatingBadge() {
  return (
    <a
      href="https://innovativeclasses.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white border border-neutral-200 shadow-lg rounded-full pl-1.5 pr-4 py-1.5 hover:shadow-xl hover:scale-105 transition-all duration-200"
      aria-label="Visit Subbu Innovative Classes"
    >
      <Image
        src="/subbu-innovative-classes.jpeg"
        alt="Subbu Innovative Classes"
        width={36}
        height={36}
        className="w-9 h-9 rounded-full object-cover"
      />
      <span className="text-sm font-semibold text-neutral-800 whitespace-nowrap">
        Subbu Innovative Classes
      </span>
    </a>
  );
}
