import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hospitalsService } from '@/services/hospitals.service';

export const useHospitals = (city?: string) =>
  useQuery({
    queryKey: ['hospitals', city],
    queryFn: () => hospitalsService.getAll(city),
  });

export const useHospital = (id: string) =>
  useQuery({
    queryKey: ['hospital', id],
    queryFn: () => hospitalsService.getOne(id),
    enabled: !!id,
  });

export const useCreateHospital = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: hospitalsService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['hospitals'] }),
  });
};

export const useUpdateHospital = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: any }) => hospitalsService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['hospitals'] }),
  });
};

export const useDeleteHospital = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: hospitalsService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['hospitals'] }),
  });
};

