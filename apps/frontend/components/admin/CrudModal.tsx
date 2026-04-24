'use client';

import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  isLoading?: boolean;
  onSubmit?: () => void;
  submitLabel?: string;
  formId?: string;
};

export default function CrudModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  isLoading,
  onSubmit,
  submitLabel = 'Save',
  formId,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <div className="py-2">{children}</div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          {onSubmit || formId ? (
            <Button
              type={formId ? 'submit' : 'button'}
              form={formId}
              onClick={formId ? undefined : onSubmit}
              disabled={isLoading}
              className="bg-[#C0272D] text-white hover:bg-[#9B1B20]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving…
                </>
              ) : (
                submitLabel
              )}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
