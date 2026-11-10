'use client'
import { useFormContext } from "react-hook-form";
import { FormSchemaType } from "../schema";
import { Input } from "@/components/inputs/input";
import { Checkbox } from "@/components/inputs/check-box";

export const StepSocialPrograms = () => {
  const { watch, register } = useFormContext<FormSchemaType>();

  const isOthersSelected = watch("others");

  return (
    <div className="space-y-8 text-zinc-900">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          Passo 2: Programas Sociais e Benefícios
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 mt-1">
          Selecione os benefícios e programas sociais que o núcleo familiar recebe atualmente.
        </p>
      </div>

      {/* Cadastro Único */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>Cadastro Único</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5">
              <Input
                label="NIS (Cadastro Único)"
                placeholder="Nº do NIS"
                {...register("nis")}
              />
            </div>
          </div>
        </div>
      </details>

      {/* 1. Transferência de Renda e Auxílios Diretos */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>1. Transferência de Renda e Auxílios Diretos</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Checkbox name="familyGrant" label="Bolsa Família" />
            <Checkbox name="continuousCashBenefit" label="BPC (Prestação Continuada)" />
            <Checkbox name="gasAid" label="Auxílio Gás / Vale-Gás" />
            <Checkbox name="birthAid" label="Auxílio-Natalidade" />
            <Checkbox name="emergencyAid" label="Auxílio Emergencial" />
            <Checkbox name="stateIncomeAid" label="Renda Cidadã / Estadual" />
          </div>
        </div>
      </details>

      {/* 2. Tarifas Sociais e Serviços Básicos */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>2. Tarifas Sociais e Serviços Básicos</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Checkbox name="socialEnergyTariff" label="Tarifa Social de Energia Elétrica" />
            <Checkbox name="socialWaterTariff" label="Tarifa Social de Água e Esgoto" />
          </div>
        </div>
      </details>

      {/* 3. Educação, Infância e Juventude */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>3. Educação, Infância e Juventude</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Checkbox name="peDeMeia" label="Pé-de-Meia" />
            <Checkbox name="milkProgram" label="Viva Leite / Leite Materno" />
            <Checkbox name="menstrualDignityProgram" label="Dignidade Menstrual" />
            <Checkbox name="youthId" label="ID Jovem" />
          </div>
        </div>
      </details>

      {/* 4. Habitação e Infraestrutura */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>4. Habitação e Infraestrutura</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Checkbox name="socialRent" label="Aluguel Social" />
            <Checkbox name="socialHousing" label="Minha Casa, Minha Vida" />
            <Checkbox name="greenGrant" label="Bolsa Verde" />
          </div>
        </div>
      </details>

      {/* 5. Acompanhamento Socioassistencial (CRAS / CREAS) */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>5. Acompanhamento Socioassistencial (CRAS / CREAS)</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Checkbox name="participatesInPaif" label="Serviço PAIF (CRAS)" />
            <Checkbox name="participatesInPaefi" label="Serviço PAEFI (CREAS)" />
            <Checkbox name="childLaborEradication" label="PETI (Trab. Infantil)" />
          </div>
        </div>
      </details>

      {/* 6. Isenções, Documentos e Outros */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>6. Isenções, Documentos e Outros</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Checkbox name="feeExemption" label="Isenção de Taxas" />
            <Checkbox name="elderlyCard" label="Carteira da Pessoa Idosa" />
            <Checkbox name="freeTransit" label="Passe Livre" />
            <Checkbox name="inclusionAid" label="Auxílio-Inclusão" />
          </div>

          {/* Outros Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 pt-5 border-t border-zinc-200">
            <div className="md:col-span-4 flex items-center">
              <Checkbox name="others" label="Outros Benefícios" />
            </div>
            <div className="md:col-span-8">
              <Input
                label="Descrição"
                placeholder="Especifique outros programas ou auxílios recebidos..."
                disabled={!isOthersSelected}
                className="disabled:opacity-40"
                {...register("othersDescription")}
              />
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};