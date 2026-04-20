import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { volunteersService } from '@/services/volunteers.service';

export const useVolunteers = () =>
  useQuery({
    queryKey: ['volunteers'],
    queryFn: () => volunteersService.getAll(),
  });

export const useCreateVolunteer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: volunteersService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['volunteers'] }),
  });
};

export const useUpdateVolunteerStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) =>
      volunteersService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['volunteers'] }),
  });
};

