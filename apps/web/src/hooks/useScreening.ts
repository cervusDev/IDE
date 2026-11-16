import errorHandling from "@/helpers/errorHandling";
import { ICreateScreeningService } from "@/services/screenings/create/InputData";
import { screeningService } from "@/services/screenings/ScreeningService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const screeningKeys = {
  all: ['screenings'] as const,
  lists: () => [...screeningKeys.all, 'list'] as const,
  detail: (id: string) => [...screeningKeys.all, 'detail', id] as const,
};

export function useCreateScreening() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateScreeningService) => screeningService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: screeningKeys.lists() });
    },
    onError: (error) => {
      errorHandling(error)
    },
  });
}