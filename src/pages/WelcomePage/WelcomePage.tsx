export const WelcomePage = () => {
  return (
    <div className="relative flex h-full w-full grow justify-center">
      <img
        className="absolute h-full w-full object-cover opacity-90"
        src="/images/welcome.webp"
        alt="background_image"
      />
      <div className="absolute mt-20 p-8">
        <div className="text-black">WelcomePage</div>
      </div>
    </div>
  );
};
