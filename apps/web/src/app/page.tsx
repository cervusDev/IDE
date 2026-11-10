"use client";

import { Input } from "@/components/inputs/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/contexts/auth";
import errorHandling from "@/helpers/errorHandling";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
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
      router.push("/painel_controle");
    } catch (err) {
      errorHandling(err);
    }
  }

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

        {/* Textos centralizados */}
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Entrar na sua conta
          </h1>
          <p className="text-sm text-zinc-600">
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
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-[#D72685] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer shadow-sm"
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
          <div className="w-full border-t border-zinc-200"></div>
          <span className="absolute bg-white px-3 text-xs text-zinc-500">
            ou
          </span>
        </div>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Não tem uma conta? &nbsp;
          <Link
            href="/criar_conta"
            className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-700 transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </main>
    </div>
  );
}