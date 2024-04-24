import { Info } from 'lucide-react';
import SearchBox from './SearchBox.jsx';

const Hero = () => {
  return (
    <div className="h-full">
      <div className="py-20 w-full flex flex-col items-center justify-center text-center">
        <h2 className="font-extrabold text-2xl xs:text-3xl md:text-4xl lg:text-5xl text-gradient">
          Shorten Your Loooong Links :)
        </h2>
        <p className="p-4 md:p-8 text-sm md:text-base">
          SnapURL is an efficient and easy-to-use URL shortening service that{' '}
          <br />
          streamlines your online experience.
        </p>
      </div>
      <div className="py-8 px:4 xs:px-8 md:px-12 lg:px-20">
        <SearchBox />
      </div>
      <p className="p-4 text-center">
        You can create
        <span className="mx-1 font-bold text-rose-500"> 05 </span> more links.
        Register Now to enjoy Unlimited usage
        {/* <Info size={22} className="invisible md:visible ml-2" /> */}
      </p>
    </div>
  );
};

export default Hero;
