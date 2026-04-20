import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsService } from '@/services/contacts.service';

export const useContacts = () =>
  useQuery({
    queryKey: ['contacts'],
    queryFn: () => contactsService.getAll(),
  });

export const useUnreadCount = () =>
  useQuery({
    queryKey: ['contacts', 'unread-count'],
    queryFn: () => contactsService.getUnreadCount(),
  });

export const useCreateContact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: contactsService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contacts'] }),
  });
};

export const useMarkContactAsRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: contactsService.markAsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['contacts'] });
      qc.invalidateQueries({ queryKey: ['contacts', 'unread-count'] });
    },
  });
};

