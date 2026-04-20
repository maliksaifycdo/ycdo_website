import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsService } from '@/services/events.service';

export const useEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: () => eventsService.getAll(),
  });

export const useUpcomingEvents = () =>
  useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => eventsService.getUpcoming(),
  });

export const useCreateEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};

export const useUpdateEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: any }) => eventsService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};

export const useDeleteEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};

