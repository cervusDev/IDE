"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans p-4">
      <main className="flex w-full max-w-md flex-col items-stretch justify-center px-8 py-12 bg-white rounded-2xl border border-zinc-200 shadow-sm">
        {/* Logo centralizada */}
        <div className="mb-8 flex justify-center items-center">
          <Image
            className="h-20 w-auto object-contain"
            src="/logo.png"
            alt="IDE logo"
            width={100}
            height={40}
            priority
          />
        </div>

        {/* Cabeçalho centralizado */}
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Criar sua conta
          </h1>
          <p className="text-sm text-zinc-600">
            Preencha seus dados para começar a usar a plataforma.
          </p>
        </div>

        {/* Formulário de Cadastro */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-700"
            >
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              required
              className="h-11 rounded-xl border border-zinc-300 bg-white px-3.5 text-sm text-zinc-900 placeholder:text-zinc-500 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#D72685] focus:border-[#D72685] transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="h-11 rounded-xl border border-zinc-300 bg-white px-3.5 text-sm text-zinc-900 placeholder:text-zinc-500 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#D72685] focus:border-[#D72685] transition-all shadow-sm"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700"
            >
              Senha
            </label>
            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo de 8 caracteres"
                required
                minLength={8}
                className="h-11 w-full rounded-xl border border-zinc-300 bg-white pl-3.5 pr-11 text-sm text-zinc-900 placeholder:text-zinc-500 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#D72685] focus:border-[#D72685] transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-zinc-500 hover:text-zinc-700 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-zinc-700"
            >
              Confirmar senha
            </label>
            <div className="relative flex items-center">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Digite a senha novamente"
                required
                minLength={8}
                className="h-11 w-full rounded-xl border border-zinc-300 bg-white pl-3.5 pr-11 text-sm text-zinc-900 placeholder:text-zinc-500 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#D72685] focus:border-[#D72685] transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 text-zinc-500 hover:text-zinc-700 focus:outline-none cursor-pointer"
                aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Exibir confirmação de senha"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Botão Principal */}
          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-[#D72685] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer shadow-sm"
          >
            Criar conta
          </button>
        </form>

        {/* Divisor */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-zinc-200"></div>
          <span className="absolute bg-white px-3 text-xs text-zinc-500">
            ou
          </span>
        </div>

        {/* Link para voltar ao Login */}
        <p className="mt-4 text-center text-sm text-zinc-600">
          Já tem uma conta?{" "}
          <Link
            href="/"
            className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-700 transition-colors"
          >
            Fazer login
          </Link>
        </p>
      </main>
    </div>
  );
}