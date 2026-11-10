import { PsychosocialForm } from "../../cadastrar/page"; // Ajuste o caminho relativo conforme sua estrutura
import { FormSchemaType } from "../../cadastrar/schema";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getFormData(id: string): Promise<Partial<FormSchemaType>> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Mock ou chamada à API real para buscar os dados do registro
  const mockDatabaseRecord: Partial<FormSchemaType> = {
    healthUnity: "UBS Central",
    registration: "MAT-2026-001",
    nis: "123.45678.90-1",
    studentName: "João Pedro Silva",
    studentBirthDate: "2016-05-15",
    studentColor: "Parda",
    studentAge: "10",
    studentRa: "98765432-X",
    studentGender: 'M',
    studentEducationalAttainment: "Ensino Fundamental I",
    studentSchoolName: "Escola Municipal Exemplo",
    studentSchoolPeriod: "Matutino",
    streetAddress: "Rua das Flores, 123",
    neighborhood: "Centro",
    motherName: "Maria da Silva",
    motherAge: "34",
    motherEducationalAttainment: "Ensino Médio Completo",
    motherOccupation: "Do Lar",
    motherContact: "(14) 99888-7766",
    fatherName: "Carlos Alberto da Silva",
    fatherAge: "38",
    fatherEducationalAttainment: "Ensino Fundamental Completo",
    fatherOccupation: "Pedreiro",
    fatherContact: "(14) 99777-6655",
    grossHouseholdIncome: 1412.00,
    parentMaritalStatus: "Casados",
    legalGuardianName: "Maria da Silva",
    religion: "Católica",
    housingStatus: "PRÓPRIA",
    familyGrant: true,
    continuousCashBenefit: false,
    gasAid: true,
    birthAid: false,
    emergencyAid: false,
    stateIncomeAid: false,
    socialEnergyTariff: true,
    socialWaterTariff: false,
    peDeMeia: false,
    milkProgram: true,
    menstrualDignityProgram: false,
    youthId: false,
    socialRent: false,
    socialHousing: false,
    greenGrant: false,
    participatesInPaif: true,
    participatesInPaefi: false,
    childLaborEradication: false,
    feeExemption: true,
    elderlyCard: false,
    freeTransit: false,
    inclusionAid: false,
    others: false,
    othersDescription: "",
    members: [
      {
        fullName: "Ana Clara da Silva",
        age: "6",
        relationship: "Irmã(o)",
        educationalAttainment: "Educação Infantil",
        contact: "Não possui",
      },
    ],
    mentalHealthHistory: "Nenhum histórico psiquiátrico na família.",
    childhoodDiseases: "Bronquite asmática tratada na primeira infância.",
    medications: "Uso esporádico de bomba de Salbutamol.",
    pregnancyAndBirth: "Gestação a termo, sem intercorrências.",
    earlyDiet: "Aleitamento materno exclusivo até os 6 meses.",
    currentDiet: "Alimentação regular variada.",
    sleepRoutine: "Dorme cerca de 8h por noite, sono tranquilo.",
    psychomotorDevelopment: "Desenvolvimento motor dentro dos marcos esperados.",
    speechAndLanguage: "Fala articulada e sem alterações aparentes.",
    sphincterControl: "Controle esfincteriano adquirido aos 2 anos.",
    ticsAndHabits: "Not present.",
    sexuality: "Sem observações relevantes para a faixa etária.",
    schoolingHistory: "Bom desempenho escolar, boa adaptação com os colegas.",
    dailyRoutine: "Estuda pela manhã e frequenta oficinas sociais à tarde.",
    participatesInProject: "Sim, projeto esportivo comunitário.",
    technologyAccess: "Acesso a celular com supervisão dos pais.",
    substanceUse: "Negado no núcleo familiar.",
    familyDynamics: "Vínculos familiares fortalecidos e dialogados.",
    assistantDescription: "Criança comunicativa e integrada com as demandas propostas.",
    guardianPerception: "Mãe relata satisfação com o desenvolvimento escolar.",
    interviewObservations: "Entrevista realizada com a presença da genitora em clima colaborativo.",
  };

  return mockDatabaseRecord;
}

export default async function VisualizarFormularioPage({ params }: PageProps) {
  const { id } = await params;
  const initialData = await getFormData(id);

  return <PsychosocialForm initialData={initialData} formId={id} readOnly={true} />;
}