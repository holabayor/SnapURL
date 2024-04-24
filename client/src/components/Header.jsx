import Logo from './header/Logo';
import Navbar from './header/Navbar';

const Header = () => {
  return (
    <header className="container mx-auto p-4 flex items-center justify-between">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
