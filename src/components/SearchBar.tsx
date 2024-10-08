import { useAppContext } from '../context/AppContext.tsx';

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useAppContext();
    return (
        <div className="relative">
            <input
                type="text"
                id="search"
                placeholder="Buscar por nombre del evento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out text-gray-900 bg-white"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
    );
};

export default SearchBar;
