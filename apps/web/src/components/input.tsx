"use client";

import { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function Input({ name, label, type = "text", ...props }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const error = errors[name]?.message as string | undefined;
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-black dark:text-zinc-200"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={name}
          type={inputType}
          {...register(name)}
          {...props}
          className={`h-11 w-full rounded-lg border bg-transparent px-3.5 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:text-white dark:placeholder:text-zinc-600 ${
            isPassword ? "pr-11" : ""
          } ${
            error
              ? "border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border-black/[.1] focus:ring-black dark:border-white/[.15] dark:focus:ring-white"
          }`}
        />

        {/* Botão de Exibir/Ocultar Senha integrado nativamente */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1.05" y1="1.05" x2="22.95" y2="22.95"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}