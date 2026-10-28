import Image from "next/image";
import Link from "next/link";

export default function NewPassword() {
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
            Criar nova senha
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Digite sua nova senha abaixo para concluir a recuperação de acesso.
          </p>
        </div>

        {/* Formulário */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black dark:text-zinc-200"
            >
              Nova senha
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
              Confirmar nova senha
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
            Redefinir senha
          </button>
        </form>

        {/* Link para voltar ao Login */}
        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Lembrou a senha?{" "}
          <Link
            href  ="/login"
            className="font-medium text-black underline underline-offset-4 dark:text-white"
          >
            Fazer login
          </Link>
        </p>
      </main>
    </div>
  );
}