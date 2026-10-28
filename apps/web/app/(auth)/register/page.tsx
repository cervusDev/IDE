import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-stretch justify-center px-8 py-16 bg-white dark:bg-black sm:rounded-2xl sm:border sm:border-black/[.08] sm:dark:border-white/[.145]">
        {/* Logo */}
        <div className="mb-8 flex justify-center sm:justify-start">
          <Image
            className="dark:invert h-5 w-[100px]"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </div>

        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col gap-2 text-center sm:text-start">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Criar sua conta
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Preencha seus dados para começar a usar a plataforma.
          </p>
        </div>

        {/* Formulário de Cadastro */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-black dark:text-zinc-200"
            >
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              required
              className="h-11 rounded-lg border border-black/[.1] bg-transparent px-3.5 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-white/[.15] dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black dark:text-zinc-200"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="h-11 rounded-lg border border-black/[.1] bg-transparent px-3.5 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-white/[.15] dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black dark:text-zinc-200"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo de 8 caracteres"
              required
              minLength={8}
              className="h-11 rounded-lg border border-black/[.1] bg-transparent px-3.5 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-white/[.15] dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-black dark:text-zinc-200"
            >
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Digite a senha novamente"
              required
              minLength={8}
              className="h-11 rounded-lg border border-black/[.1] bg-transparent px-3.5 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-white/[.15] dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-white"
            />
          </div>

          {/* Botão Principal */}
          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-black font-medium text-white transition-colors hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc]"
          >
            Criar conta
          </button>
        </form>

        {/* Divisor */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-black/[.08] dark:border-white/[.145]"></div>
          <span className="absolute bg-white px-3 text-xs text-zinc-500 dark:bg-black dark:text-zinc-400">
            ou
          </span>
        </div>

        {/* Link para voltar ao Login com redirecionamento */}
        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Já tem uma conta?{" "}
          <Link
            href="/"
            className="font-medium text-black underline underline-offset-4 dark:text-white"
          >
            Fazer login
          </Link>
        </p>
      </main>
    </div>
  );
}