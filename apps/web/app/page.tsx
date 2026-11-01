"use client";

import { Input } from "@/src/components/input";
import { Spinner } from "@/src/components/spinner";
import { useAuthStore } from "@/src/contexts/auth";
import errorHandling from "@/src/helpers/errorHandling";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .email({ message: "Digite um e-mail válido." })
    .min(1, { message: "O e-mail é obrigatório." }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { isLoading, login } = useAuthStore();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginFormData) {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      router.push("/dashboard");
    } catch (err) {
      errorHandling(err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-stretch justify-center px-8 py-16 bg-white dark:bg-black sm:rounded-2xl sm:border sm:border-black/[.08] sm:dark:border-white/[.145]">
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

        <div className="mb-8 flex flex-col gap-2 text-center sm:text-start">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Entrar na sua conta
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Digite seu e-mail e senha para acessar o painel.
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleLogin)} className="flex flex-col gap-4">
            <Input
              name="email"
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
            />
            <div className="flex flex-col gap-1.5">
              <Input
                name="password"
                label="Senha"
                type="password"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-black font-medium text-white transition-colors hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <Spinner />
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </FormProvider>

        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-black/[.08] dark:border-white/[.145]"></div>
          <span className="absolute bg-white px-3 text-xs text-zinc-500 dark:bg-black dark:text-zinc-400">
            ou
          </span>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Não tem uma conta? &nbsp;
          <Link
            href="/register"
            className="font-medium text-black underline underline-offset-4 dark:text-white"
          >
            Criar conta
          </Link>
        </p>
      </main>
    </div>
  );
}