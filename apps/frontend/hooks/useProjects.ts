import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '@/services/projects.service';

export const useProjects = (category?: any) =>
  useQuery({
    queryKey: ['projects', category],
    queryFn: () => projectsService.getAll(category),
  });

export const useProject = (id: string) =>
  useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getOne(id),
    enabled: !!id,
  });

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectsService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: any }) => projectsService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectsService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

