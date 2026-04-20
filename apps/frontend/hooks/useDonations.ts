import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationsService } from '@/services/donations.service';

export const useDonations = (page = 1, limit = 20) =>
  useQuery({
    queryKey: ['donations', page, limit],
    queryFn: () => donationsService.getAll(page, limit),
  });

export const useDonationStats = () =>
  useQuery({
    queryKey: ['donation-stats'],
    queryFn: () => donationsService.getStats(),
  });

export const useCreateDonation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: donationsService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['donations'] }),
  });
};

export const useUpdateDonationStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      donationsService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['donations'] });
      qc.invalidateQueries({ queryKey: ['donation-stats'] });
    },
  });
};

