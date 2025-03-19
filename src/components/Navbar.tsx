import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, CpuIcon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-retro-dark/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <CpuIcon className="w-8 h-8 text-retro-accent" />
            <span className="text-xl font-bold font-code text-white">
              <span className="text-retro-accent">&lt;</span>Code
              <span className="text-retro-secondary">Bots</span>
              <span className="text-retro-accent">/&gt;</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" active={location.pathname === '/'} Icon={Code} onClick={closeMenu} />
            <NavLink to="/signup" label="Join Club" active={location.pathname === '/signup'} Icon={CpuIcon} onClick={closeMenu} />
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-retro-accent" />
            ) : (
              <Menu className="w-6 h-6 text-retro-accent" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-card p-4 m-4 rounded-lg shadow-lg">
          <nav className="flex flex-col space-y-4">
            <NavLink to="/" label="Home" active={location.pathname === '/'} Icon={Code} onClick={closeMenu} />
            <NavLink to="/signup" label="Join Club" active={location.pathname === '/signup'} Icon={CpuIcon} onClick={closeMenu} />
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  active: boolean;
  Icon: React.ElementType;
  onClick: () => void;
}

const NavLink = ({ to, label, active, Icon, onClick }: NavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 font-code text-sm ${
      active 
        ? 'text-retro-accent bg-retro-light/10 neon-border' 
        : 'text-white hover:text-retro-accent hover:bg-retro-light/5'
    }`}
    onClick={onClick}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </Link>
);

export default Navbar;
