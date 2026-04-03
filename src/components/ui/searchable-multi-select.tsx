"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, ChevronDown } from "lucide-react";

interface SearchableMultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
  labelMap?: Record<string, string>;
  maxDisplay?: number;
}

export default function SearchableMultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Search and select...",
  label,
  labelMap,
  maxDisplay = 3,
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => {
      const display = labelMap?.[o] || o;
      return display.toLowerCase().includes(q);
    });
  }, [options, query, labelMap]);

  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  function getDisplayLabel(value: string) {
    return labelMap?.[value] || value;
  }

  return (
    <div ref={ref} className="relative">
      {label && <label className="block text-xs font-semibold text-green-800 mb-1">{label}</label>}
      <div
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 0); }}
        className={`min-h-[42px] px-3 py-1.5 bg-white border rounded-lg text-sm cursor-pointer flex items-center gap-1 flex-wrap transition ${
          open ? "border-green-800 ring-2 ring-green-800" : "border-green-200 hover:border-green-300"
        }`}
      >
        {selected.length === 0 && !open && (
          <span className="text-green-500/60 text-sm py-0.5">{placeholder}</span>
        )}
        {selected.slice(0, maxDisplay).map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[11px] font-medium px-2 py-0.5 rounded-md"
          >
            <span className="max-w-[120px] truncate">{getDisplayLabel(s)}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggle(s); }}
              className="hover:text-red-600 transition"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {selected.length > maxDisplay && (
          <span className="text-[11px] text-green-600 font-medium">+{selected.length - maxDisplay} more</span>
        )}
        {open && (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-[80px] outline-none text-sm text-green-900 placeholder:text-green-500/60 bg-transparent"
            placeholder={selected.length > 0 ? "Search more..." : placeholder}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <ChevronDown className={`w-4 h-4 text-green-500/60 ml-auto flex-shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-green-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 text-left border-b border-green-100 font-medium"
            >
              Clear all ({selected.length})
            </button>
          )}
          {filtered.length === 0 && (
            <div className="px-3 py-4 text-xs text-green-500/60 text-center">No matches found</div>
          )}
          {filtered.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className={`w-full px-3 py-2 text-xs text-left flex items-center gap-2 transition ${
                  isSelected ? "bg-green-50 text-green-900 font-medium" : "text-green-800 hover:bg-green-50/50"
                }`}
              >
                <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition ${
                  isSelected ? "bg-green-800 border-green-800 text-white" : "border-green-300"
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="truncate">{getDisplayLabel(option)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
