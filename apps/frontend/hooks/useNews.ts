import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsService } from '@/services/news.service';

export const useNews = (page = 1, limit = 6) =>
  useQuery({
    queryKey: ['news', page, limit],
    queryFn: () => newsService.getAll(page, limit),
  });

export const useNewsArticle = (slug: string) =>
  useQuery({
    queryKey: ['news-article', slug],
    queryFn: () => newsService.getOne(slug),
    enabled: !!slug,
  });

export const useCreateNews = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: newsService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news'] }),
  });
};

export const useUpdateNews = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: any }) => newsService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news'] }),
  });
};

export const useDeleteNews = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: newsService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news'] }),
  });
};

