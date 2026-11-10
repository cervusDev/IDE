"use client";

import { SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  name,
  label,
  options,
  placeholder = "Selecione...",
  ...props
}: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-zinc-700"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <select
          id={name}
          {...register(name)}
          {...props}
          className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D72685] focus:border-[#D72685] transition-all shadow-sm cursor-pointer appearance-none ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-zinc-300"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Ícone de seta para indicar o select */}
        <div className="absolute right-3.5 pointer-events-none text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {error && (
        <span className="text-xs text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}