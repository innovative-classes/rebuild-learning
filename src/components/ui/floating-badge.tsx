/* eslint-disable @next/next/no-img-element */

export function FloatingBadge() {
  return (
    <a
      href="https://innovativeclasses.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-gradient-to-r from-green-800 to-green-900 border border-green-700/50 shadow-lg rounded-full pl-1.5 pr-4 py-1.5 hover:shadow-xl hover:scale-105 transition-all duration-200"
      aria-label="Visit Subbu Innovative Classes"
    >
      <img
        src="/subbu-innovative-classes.jpeg"
        alt="Subbu Innovative Classes"
        className="w-9 h-9 rounded-full object-cover"
      />
      <span className="text-sm font-semibold text-green-100 whitespace-nowrap">
        Subbu Innovative Classes
      </span>
    </a>
  );
}
