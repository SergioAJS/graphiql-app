import { CustomLink } from 'components/CustomLink/CustomLink';

export const NotFoundPage = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-black/50">
      <img
        className="absolute h-full w-full object-cover mix-blend-overlay"
        src="/images/404.webp"
        alt="background_image"
      />
      <div className="flex flex-wrap items-center justify-center gap-10 p-8">
        <div className="flex flex-col">
          <h2 className="w-60 text-4xl font-semibold text-gray-300">Oops!</h2>
          <h2 className="w-60 text-4xl font-semibold text-gray-300">
            The page you are looking for does not exist.
          </h2>
        </div>
        <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
      </div>
      <CustomLink class="z-10" to="/">
        <button className="w-60 rounded-md bg-blue-500 p-2 text-blue-50 transition-colors duration-300 hover:bg-blue-600">
          Back to Home
        </button>
      </CustomLink>
    </div>
  );
};
