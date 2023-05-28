export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className={`group mr-8 inline-flex cursor-pointer items-center whitespace-nowrap border-b-2 px-2 py-4 text-sm font-medium leading-5 ${
      isActive
        ? 'border-blue-500 text-blue-500 focus:border-blue-600 focus:text-blue-600 focus:outline-none'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 focus:border-gray-300 focus:text-gray-600'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
