import { cn } from '@/utils/helpers';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeClasses: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export default function LoadingSpinner({ size = 'md', color = '#C0272D' }: LoadingSpinnerProps) {
  return (
    <span
      className={cn('inline-block animate-spin rounded-full border-solid border-transparent border-t-current', sizeClasses[size])}
      style={{ color }}
      aria-label="Loading"
    />
  );
}

