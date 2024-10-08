import { Grid, List } from 'lucide-react';
import { useAppContext } from '../context/AppContext.tsx';

const ViewToggle = () => {
    const { view, setView } = useAppContext();
    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => setView('cards')}
                className={`p-2 rounded ${
                    view === 'cards' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                aria-label="Ver en tarjetas"
            >
                <Grid size={20} />
            </button>
            <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${
                    view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                aria-label="Ver en lista"
            >
                <List size={20} />
            </button>
        </div>
    );
};

export default ViewToggle;
