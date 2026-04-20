import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleryService } from '@/services/gallery.service';

export const useGallery = (category?: any) =>
  useQuery({
    queryKey: ['gallery', category],
    queryFn: () => galleryService.getAll(category),
  });

export const useCreateGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: galleryService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
};

export const useUpdateGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: any }) => galleryService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
};

export const useDeleteGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: galleryService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
};

