import SearchBox from './SearchBox';

const Hero = () => {
  return (
    <div className="h-full px-2 sm:px-4 md:px-16">
      <div className="py-14 xs:py-20 w-full flex flex-col items-center justify-center text-center">
        <h2 className="font-extrabold text-2xl xs:text-3xl md:text-4xl lg:text-5xl text-gradient unselectable">
          Shorten Your Loooong Links :)
        </h2>
        <p className="p-2 md:p-6 text-sm md:text-base">
          SnapURL is an efficient and easy-to-use URL shortening service that{' '}
          <br />
          streamlines your online experience.
        </p>
      </div>
      <div className="px:4 xs:px-8 md:px-12 lg:px-20">
        <SearchBox />
      </div>
      <p className="p-4 text-center">
        You can create
        <span className="mx-1 font-bold text-rose-500"> 05 </span> more links.
        Register Now to enjoy Unlimited usage
      </p>
    </div>
  );
};

export default Hero;
