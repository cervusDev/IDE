"use client";

import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export function Textarea({ name, label, rows = 4, ...props }: TextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-base sm:text-lg font-semibold text-zinc-700 block"
      >
        {label}
      </label>

      <textarea
        id={name}
        rows={rows}
        {...register(name)}
        {...props}
        className={`w-full rounded-xl border bg-white p-4 text-base sm:text-lg text-zinc-900 placeholder:text-zinc-500 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#D72685] focus:border-[#D72685] transition-all shadow-sm ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-zinc-300"
        }`}
      />

      {error && (
        <span className="text-xs text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}