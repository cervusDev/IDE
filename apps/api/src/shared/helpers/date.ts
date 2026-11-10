import { 
  format, 
  parse, 
  differenceInYears, 
  isValid, 
  parseISO 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const DateHelper = {
  /**
   * Retorna um objeto Date nativo representando o momento atual.
   * Ideal para campos `createdAt` ou `updatedAt`.
   */
  now(): Date {
    return new Date();
  },
  /**
   * Formata um objeto Date ou String ISO para o padrão brasileiro (dd/MM/yyyy)
   */
  toBR(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
  },

  /**
   * Converte uma string no formato 'dd/MM/yyyy' para um objeto Date
   */
  fromBR(dateString: string): Date {
    return parse(dateString, 'dd/MM/yyyy', new Date());
  },

  /**
   * Calcula a idade atual com base na data de nascimento (Date ou string)
   */
  calculateAge(birthDate: Date | string): number {
    let dateObj: Date;

    if (typeof birthDate === 'string') {
      // Se vier no formato 'dd/MM/yyyy', converte primeiro, senão tenta parseISO
      if (birthDate.includes('/')) {
        dateObj = this.fromBR(birthDate);
      } else {
        dateObj = parseISO(birthDate);
      }
    } else {
      dateObj = birthDate;
    }

    if (!isValid(dateObj)) return 0;
    
    return differenceInYears(new Date(), dateObj);
  },

  /**
   * Retorna a data atual formatada como 'dd/MM/yyyy'
   */
  currentDateBR(): string {
    return format(new Date(), 'dd/MM/yyyy', { locale: ptBR });
  },

  /**
   * Valida se uma string de data está no formato correto e é uma data real
   */
  isValidBRDate(dateString: string): boolean {
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
    return isValid(parsedDate) && format(parsedDate, 'dd/MM/yyyy') === dateString;
  },

  /**
   * Formata para o padrão ISO (yyyy-MM-dd) caso precise enviar para o banco/API
   */
  toISOString(date: Date | string): string {
    const dateObj = typeof date === 'string' && date.includes('/') 
      ? this.fromBR(date) 
      : new Date(date);
      
    if (!isValid(dateObj)) return '';
    return format(dateObj, 'yyyy-MM-dd');
  }
};