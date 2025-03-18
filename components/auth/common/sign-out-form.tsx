import Form from 'next/form';
import { LogOut } from 'lucide-react';

export const SignOutForm = ({
  signOutAction,
}: {
  signOutAction: () => Promise<void>;
}) => {
  return (
    <Form
      action={signOutAction}
      className="w-full"
    >
      <button
        type="submit"
        className="w-full bg-red-400 text-black font-bold p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all
                 flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Sign out
      </button>
    </Form>
  );
};
