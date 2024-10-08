import { ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext.tsx';

const FilterDropdown = () => {
    const { filterCriteria, setFilterCriteria, } = useAppContext();
    return (
        <div className="relative">
            <select
                id="filter"
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition duration-150 ease-in-out appearance-none bg-white text-gray-700"
            >
                <option value="all">Todos los estados</option>
                <option value="open">Abierto</option>
                <option value="won">Ganado</option>
                <option value="lost">Perdido</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
};

export default FilterDropdown;
