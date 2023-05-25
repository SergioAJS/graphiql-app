import { cx } from 'classix';
import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { removeToast } from 'redux/toastSlice';

export interface IToast {
  duration?: number;
  message?: string;
  type: 'inform' | 'danger' | 'green';
  id: number;
}

const classes = {
  alert: {
    base: 'max-w-xs border text-sm rounded-md shadow-md',
    inform:
      'bg-gray-100 border-gray-200 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400',
    danger: 'bg-red-100 border-red-200 text-red-500 ',
    green: 'bg-green-100 border-green-200 text-green-500 rounded-md',
  },

  button: {
    base: 'inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm',
    inform:
      'text-gray-400 hover:text-gray-600 focus:ring-offset-gray-100 focus:ring-gray-400 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:ring-offset-gray-700',
    danger: 'text-red-400 hover:text-red-600 focus:ring-offset-red-100 focus:ring-red-400',
    green: 'text-green-400 hover:text-green-600 focus:ring-offset-green-100 focus:ring-green-400',
  },
};

export const Toast = ({
  duration = 3000,
  message = 'Hello, world! This is a toast message.',
  type,
  id,
}: IToast) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeToast({ id })), duration);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className={cx(classes.alert.base, classes.alert[type])} role="alert">
      <div className="flex p-4">
        {message}
        <div className="ml-2">
          <button
            onClick={() => dispatch(removeToast({ id }))}
            type="button"
            className={cx(classes.button.base, classes.button[type])}
          >
            <span className="sr-only">Close</span>
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg
    className="h-3.5 w-3.5"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
      fill="currentColor"
    />
  </svg>
);
