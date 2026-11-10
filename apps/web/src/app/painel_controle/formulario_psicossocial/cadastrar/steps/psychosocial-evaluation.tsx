'use client'

import { Textarea } from "@/components/inputs/text-area";

export const StepPsychosocialEvaluation = () => {
  return (
    <div className="space-y-8 text-zinc-900">
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          Passo 4: Avaliação Psicossocial
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 mt-1">
          Histórico de desenvolvimento, saúde e dinâmica familiar. Preencha conforme as informações coletadas na entrevista.
        </p>
      </div>

      {/* BLOCO 1: Saúde e Tratamentos */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>1. Saúde e Tratamentos</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-12">
              <Textarea
                label="Histórico de acompanhamento em saúde mental"
                name="mentalHealthHistory"
                rows={3}
                placeholder="A criança ou adolescente tem histórico de tratamento em saúde mental?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Doenças da infância"
                name="childhoodDiseases"
                rows={3}
                placeholder="Doenças relevantes na infância..."
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Medicações em uso"
                name="medications"
                rows={3}
                placeholder="Faz uso de alguma medicação contínua?"
              />
            </div>
          </div>
        </div>
      </details>

      {/* BLOCO 2: Gestação, Alimentação e Sono */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>2. Gestação, Alimentação e Sono</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-12">
              <Textarea
                label="Concepção, Gestação e Parto"
                name="pregnancyAndBirth"
                rows={3}
                placeholder="Como foi a gestação, o parto e as condições de nascimento?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Aleitamento e Alimentação na Infância"
                name="earlyDiet"
                rows={3}
                placeholder="Tinha acesso a frutas, verduras e legumes?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Alimentação Atual"
                name="currentDiet"
                rows={3}
                placeholder="Histórico de alergia, seletividade, quantidade de refeições diárias..."
              />
            </div>
            <div className="md:col-span-12">
              <Textarea
                label="Rotina de Sono"
                name="sleepRoutine"
                rows={3}
                placeholder="Como era quando bebê? E atualmente? Hábitos, distúrbios, insônia, pesadelos, enurese noturna..."
              />
            </div>
          </div>
        </div>
      </details>

      {/* BLOCO 3: Desenvolvimento e Hábitos */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>3. Desenvolvimento e Habilidades</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-6">
              <Textarea
                label="Desenvolvimento Psicomotor"
                name="psychomotorDevelopment"
                rows={3}
                placeholder="Coordenação motora fina, Idade que sentou/andou, quedas frequentes..."
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Linguagem e Fala"
                name="speechAndLanguage"
                rows={3}
                placeholder="Demorou a falar? Trocas fonéticas ou outros distúrbios?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Controle Esfincteriano"
                name="sphincterControl"
                rows={3}
                placeholder="Desfralde, enurese, encoprese, constipação intestinal..."
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Manipulação e Tiques"
                name="ticsAndHabits"
                rows={3}
                placeholder="Roer unhas, chupar dedo, chupeta, mamadeira, puxar cabelo..."
              />
            </div>
          </div>
        </div>
      </details>

      {/* BLOCO 4: Escola, Cotidiano e Sociedade */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>4. Escolaridade, Rotina e Contexto Social</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-12">
              <Textarea
                label="Histórico Escolar"
                name="schoolingHistory"
                rows={3}
                placeholder="Adaptação, aprendizagem, reforço, reprovações, relacionamento na escola..."
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Rotina Diária"
                name="dailyRoutine"
                rows={3}
                placeholder="Como é a rotina diária do atendido?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Participação em Projetos"
                name="participatesInProject"
                rows={3}
                placeholder="Participa de algum projeto? Qual?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Acesso a Tecnologia e Telas"
                name="technologyAccess"
                rows={3}
                placeholder="Quanto tempo de tela por dia?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Uso de Substâncias"
                name="substanceUse"
                rows={3}
                placeholder="Contato com álcool/drogas? Algum familiar faz uso?"
              />
            </div>
            <div className="md:col-span-12">
              <Textarea
                label="Sexualidade"
                name="sexuality"
                rows={3}
                placeholder="Curiosidade, masturbação, precocidade, abuso, como o assunto é tratado pela família..."
              />
            </div>
          </div>
        </div>
      </details>

      {/* BLOCO 5: Dinâmica Familiar e Impressões */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>5. Dinâmica Familiar e Impressões da Entrevista</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-12">
              <Textarea
                label="Dinâmica Familiar"
                name="familyDynamics"
                rows={4}
                placeholder="Figura de autoridade, relacionamento, rede de apoio do responsável, conflitos familiares..."
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Descrição do Assistido"
                name="assistantDescription"
                rows={4}
                placeholder="Como o responsável descreve o assistido?"
              />
            </div>
            <div className="md:col-span-6">
              <Textarea
                label="Percepção do Responsável"
                name="guardianPerception"
                rows={4}
                placeholder="Mudança percebida após o ingresso no serviço..."
              />
            </div>
            <div className="md:col-span-12">
              <Textarea
                label="Observações Durante a Entrevista"
                name="interviewObservations"
                rows={4}
                placeholder="Anotações gerais, postura da família e considerações finais..."
              />
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};