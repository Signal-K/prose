import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';

export function SubmitButton({
  children,
  isSuccessful,
  className, // Add className to props
}: {
  children: React.ReactNode;
  isSuccessful: boolean;
  className?: string; // Make className optional
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={pending ? 'button' : 'submit'}
      aria-disabled={pending || isSuccessful}
      disabled={pending || isSuccessful}
      className={`relative ${className}`} // Apply className here
    >
      {children}

      {(pending || isSuccessful) && (
        <span className="animate-spin absolute right-4">
          <LoaderIcon />
        </span>
      )}

      <output aria-live="polite" className="sr-only">
        {pending || isSuccessful ? 'Loading' : 'Submit form'}
      </output>
    </Button>
  );
}