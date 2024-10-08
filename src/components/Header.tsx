import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white text-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img
                        src="https://www.apuestatotal.com/_next/static/media/logofull.5b236246.png"
                        alt="Apuesta Total Logo"
                        className="hidden md:block h-8"
                    />
                    <img
                        src="https://www.apuestatotal.com/_next/static/media/logomin.fa0bada0.png"
                        alt="Apuesta Total Logo"
                        className="md:hidden h-8"
                    />
                </Link>

                {/* Menú de escritorio */}
                <nav className="hidden md:flex space-x-4">
                    <Link to="/" className="hover:border-b-2 border-primary-500 pb-1 transition-all duration-200">Inicio</Link>
                    <Link to="/estadisticas" className="hover:border-b-2 border-primary-500 pb-1 transition-all duration-200">Estadísticas</Link>
                    <Link to="/perfil" className="hover:border-b-2 border-primary-500 pb-1 transition-all duration-200">Perfil</Link>
                </nav>

                {/* Botón de menú hamburguesa */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                >
                    <div className={`w-6 h-0.5 bg-primary-500 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-primary-500 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-primary-500 transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </div>

            {/* Menú móvil */}
            <nav className={`md:hidden ${isMenuOpen ? 'max-h-40' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col space-y-2 mt-4">
                    <Link to="/" className="hover:border-b-2 border-primary-500 pb-1 transition-all duration-200" onClick={toggleMenu}>Inicio</Link>
                    <Link to="/estadisticas" className="hover:border-b-2 border-primary-500 pb-1 transition-all duration-200" onClick={toggleMenu}>Estadísticas</Link>
                    <Link to="/perfil" className="hover:border-b-2 border-primary-500 pb-1 transition-all duration-200" onClick={toggleMenu}>Perfil</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
