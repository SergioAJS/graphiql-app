import { createPortal } from 'react-dom';
import { IToast, Toast } from './Toast';

type Props = {
  toasts: IToast[];
  removeToast?: (id: number) => void;
};

export const ToastContainer = ({ toasts }: Props) => {
  const toastRoot = document.getElementById('toast-root') as HTMLDivElement;

  return createPortal(
    <div className="absolute right-2 top-16 z-30 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    toastRoot
  );
};
