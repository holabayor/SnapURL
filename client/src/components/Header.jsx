import Logo from './header/Logo';

const Header = () => {
  return (
    <header className="flex justify-between">
      <Logo />
      <div>
        <button>Login</button>
        <button>Register</button>
      </div>
    </header>
  );
};

export default Header;
