import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/services/settings.service';

export const useSettings = () =>
  useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsService.getAll(),
  });

export const useSettingsByGroup = (group: string) =>
  useQuery({
    queryKey: ['settings', group],
    queryFn: () => settingsService.getByGroup(group),
    enabled: !!group,
  });

export const useUpdateSetting = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ key, dto }: { key: string; dto: any }) => settingsService.update(key, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
  });
};

