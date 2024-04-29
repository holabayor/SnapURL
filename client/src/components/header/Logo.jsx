import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <h2 className="font-extrabold text-2xl sm:text-3xl logo-gradient unselectable">
      <Link to="/">SnapURL</Link>
    </h2>
  );
};

export default Logo;
