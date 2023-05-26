import { GitHuBIcon } from 'components/Footer/Footer';

type Props = {
  image?: string;
  description?: string;
  name?: string;
  title?: string;
  color?: string;
  link?: string;
};

export const TeamCard = ({ image, title, name, description, link, color = '#6b7280' }: Props) => (
  <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-slate-900 md:p-6">
    <div className="flex items-center gap-x-4">
      <img className="h-20 w-20 rounded-full" src={image} alt="Description" />
      <div className="grow">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{name}</h3>
        <p className="text-ssm uppercase text-gray-500">{title}</p>
      </div>
    </div>
    <p className="mt-3 text-gray-500">{description}</p>
    <div className="mt-auto space-x-1 ">
      <a
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-800 hover:shadow-sm dark:border-gray-700 dark:hover:text-gray-200 dark:hover:shadow-slate-700/[.7]"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <GitHuBIcon color={color} />
      </a>
    </div>
  </div>
);
