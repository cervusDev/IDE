import { EHttpCodes } from '@/src/enums/http';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'sonner';

interface IHttpClientError {
  error: {
    message: string;
  };
}

function _httpClientError(err: AxiosError<IHttpClientError>): void {
  const statusHttpCode = err.response?.status;
  const message = err.response?.data?.error?.message;

  if (!statusHttpCode) {
    toast.error('Erro de conexão. Verifique sua internet.');
    return;
  }

  switch (statusHttpCode) {
    case EHttpCodes.BadRequest:
      toast.error(message ?? 'Falha para realizar ação. Dados inválidos.');
      break;

    case EHttpCodes.Unauthorized:
      toast.error(
        message ?? 'Você não possui autorização para realizar essa ação.',
      );
      break;

    case EHttpCodes.Forbidden:
      toast.error(
        message ?? 'Acesso negado. Você não tem permissão para este recurso.',
      );
      break;

    case EHttpCodes.Conflict:
      toast.error(message ?? 'Houve um conflito ao processar a requisição.');
      break;

    case EHttpCodes.UnprocessableEntity:
      toast.error(
        message ?? 'Não foi possível processar as instruções da requisição.',
      );
      break;

    case EHttpCodes.InternalServerError:
      toast.error(
        'Servidor indisponível no momento. Tente novamente mais tarde.',
      );
      break;

    default:
      toast.error(message ?? 'Ocorreu um erro inesperado. Tente novamente.');
      break;
  }
}

function _appError(message: string): void {
  toast.error(message);
}

function errorHandling(err: unknown): void {
  if (isAxiosError(err)) {
    _httpClientError(err);
    return;
  }
  if (err instanceof Error) {
    _appError(err.message);
  }
}

export default errorHandling;
