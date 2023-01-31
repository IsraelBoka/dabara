import { Logo } from './icons/logo';

export const PageLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <div className="relative h-full w-full items-center ">
          <Logo classname=" transition w-16 h-16 m-4 z-30 relative bg-[#121216] rounded-full " />
          <div className=" absolute inset-0 left-7 top-3 z-20  h-10 w-10 animate-ping  rounded-full  border-2 transition-transform duration-500 ease-in-out" />
        </div>
      </div>
    </div>
  );
};
