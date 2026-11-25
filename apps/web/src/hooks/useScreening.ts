import errorHandling from "@/helpers/errorHandling";
import { ICountSCreeningOutputData } from "@/services/screenings/count/OutputData";
import { ICreateScreeningServiceInputData } from "@/services/screenings/create/InputData";
import { IDeleteScreeningInputData } from "@/services/screenings/delete/InputData";
import { IFindScreeningByIdInputData } from "@/services/screenings/findById/InputData";
import { IFindScreeningByIdOutputData } from "@/services/screenings/findById/OutputData";
import { IListScreeningInputData } from "@/services/screenings/list/InputData";
import { IListScreeningOutputData } from "@/services/screenings/list/OutputData";
import { IListScreningVersionsInputData } from "@/services/screenings/listVersions/InputData";
import { IListScreeningVersionsOutputData } from "@/services/screenings/listVersions/OutputData";
import { screeningService } from "@/services/screenings/ScreeningService";
import { IUpdateScreeningInputData } from "@/services/screenings/update/InputData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const screeningKeys = {
  all: ['screenings'] as const,
  lists: () => [...screeningKeys.all, 'list'] as const,
  list: (filters: IListScreeningInputData) => [...screeningKeys.lists(), filters] as const,
  detail: (id: string) => [...screeningKeys.all, 'detail', id] as const,
  versions: (registration: string) => [...screeningKeys.all, 'versions', registration] as const,
  count: () => [...screeningKeys.all, 'count'] as const,
};

export function useCreateScreening() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateScreeningServiceInputData) => screeningService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: screeningKeys.lists() });
    },
    onError: (error) => {
      errorHandling(error)
    },
  });
}

export function useListScreenings(inputData: IListScreeningInputData) {
  return useQuery<IListScreeningOutputData, Error>({
    queryKey: screeningKeys.list(inputData),
    queryFn: async () => {
      try {
        return await screeningService.list(inputData);
      } catch (error) {
        errorHandling(error);
        throw error; // Importante relançar para o React Query capturar o erro no estado se necessário
      }
    },
    placeholderData: (previousData) => previousData, // Mantém os dados anteriores enquanto busca a próxima página (evita "flicker")
    staleTime: 1000 * 60 * 5, // Ex: Considera os dados frescos por 5 minutos
  });
}

export function useUpdateScreening() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateScreeningInputData) => screeningService.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: screeningKeys.lists() });
      queryClient.invalidateQueries({ queryKey: screeningKeys.detail(variables.registration) });  
    },
    onError: (error) => {
      errorHandling(error);
    },
  });
}

export function useFindScreening(id: string, options?: { enabled?: boolean }) {
  return useQuery<IFindScreeningByIdOutputData, Error>({
    queryKey: screeningKeys.detail(id),
    queryFn: async () => {
      try {
        const inputData: IFindScreeningByIdInputData = { id };
        return await screeningService.findById(inputData);
      } catch (error) {
        errorHandling(error);
        throw error;
      }
    },
    enabled: Boolean(id) && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5, 
  });
}

export function useDeleteScreening() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IDeleteScreeningInputData) => screeningService.delete(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: screeningKeys.lists() });
    },
    onError: (error) => {
      errorHandling(error);
    },
  });
}

export function useVersionsScreening(
  inputData: IListScreningVersionsInputData,
  options?: { enabled?: boolean }
) {
  const queryClient = useQueryClient();
  return useQuery<IListScreeningVersionsOutputData, Error>({
    queryKey: screeningKeys.versions(inputData.registration),
    queryFn: async () => {
      try {
        const result = await screeningService.listVersions(inputData);
        const latestVersion = result.list.find((v) => v.isLatest) ?? result.list[0];
        
        if (latestVersion?.id) {
          queryClient.invalidateQueries({
            queryKey: screeningKeys.detail(latestVersion.id),
          });
        }
        return result;
      } catch (error) {
        errorHandling(error);
        throw error;
      }
    },
    enabled: Boolean(inputData.registration) && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateAllStudentsAges() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => screeningService.updateAllStudentsAges(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: screeningKeys.all });
    },
    onError: (error) => {
      errorHandling(error);
    },
  });
}

export function useCountScreenings() {
  return useQuery<ICountSCreeningOutputData, Error>({
    queryKey: screeningKeys.count(),
    queryFn: async () => {
      try {
        return await screeningService.count();
      } catch (error) {
        errorHandling(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}