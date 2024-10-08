import { ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext.tsx';

const SortDropdown = () => {
    const { sortCriteria, setSortCriteria } = useAppContext();
    return (
        <div className="relative">
            <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none bg-white text-gray-700"
            >
                <option value="default">Por defecto</option>
                <option value="wager-high">Apuesta más alta</option>
                <option value="wager-low">Apuesta más baja</option>
                <option value="odds-high">Cuota más alta</option>
                <option value="odds-low">Cuota más baja</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
};

export default SortDropdown;
