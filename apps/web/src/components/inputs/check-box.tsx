"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function Checkbox({ name, label, ...props }: CheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center space-x-3.5 bg-zinc-50 p-4 rounded-xl border border-zinc-200 cursor-pointer hover:bg-zinc-100 transition shadow-sm">
        <input
          type="checkbox"
          {...register(name)}
          {...props}
          className="rounded bg-white border-zinc-300 text-[#D72685] focus:ring-[#D72685] focus:ring-offset-0 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer accent-[#D72685]"
        />
        <span className="text-base sm:text-lg font-medium text-zinc-800 select-none">
          {label}
        </span>
      </label>

      {error && (
        <span className="text-xs text-red-600 font-medium ml-1">
          {error}
        </span>
      )}
    </div>
  );
}