import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bet } from '../interfaces';
import BetCard from './BetCard';
import BetListItem from './BetListItem';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import ViewToggle from './ViewToggle';
import RangeSlider from './RangeSlider';
import SortDropdown from './SortDropdown';
import { fetchBets, searchBets } from '../services/betService';
import { useAppContext } from '../context/AppContext.tsx';

const BetList = () => {
    const [bets, setBets] = useState<Bet[]>([]);
    const [filteredBets, setFilteredBets] = useState<Bet[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {
        searchTerm,
        filterCriteria,
        sortCriteria,
        view,
        oddsFilter, setOddsFilter,
        wagerFilter, setWagerFilter
    } = useAppContext();

    const { maxOdds, maxWager } = useMemo(() => {
        const odds = Math.ceil(Math.max(...bets.map(bet => bet.odds)));
        const wager = Math.max(...bets.map(bet => bet.wager));
        return { maxOdds: odds, maxWager: wager };
    }, [bets]);

    useEffect(() => {
        try {
            const fetchedBets = fetchBets();
            setBets(fetchedBets);
            setFilteredBets(fetchedBets);
            setOddsFilter(Math.ceil(Math.max(...fetchedBets.map(bet => bet.odds))));
            setWagerFilter(Math.max(...fetchedBets.map(bet => bet.wager)));
        } catch (err) {
            setError('Error al cargar las apuestas. Por favor, intente de nuevo más tarde.');
            console.error('Error fetching bets:', err);
        }
    }, []);

    useEffect(() => {
        try {
            let results: Bet[];
            if (searchTerm) {
                results = searchBets(searchTerm);
            } else {
                results = bets;
            }

            const filtered = results.filter((bet) => {
                const statusMatch = filterCriteria === 'all' || bet.status.toLowerCase() === filterCriteria.toLowerCase();
                const oddsMatch = bet.odds <= oddsFilter;
                const wagerMatch = bet.wager <= wagerFilter;
                return statusMatch && oddsMatch && wagerMatch;
            });

            const sorted = [...filtered].sort((a, b) => {
                switch (sortCriteria) {
                    case 'wager-high':
                        return b.wager - a.wager;
                    case 'wager-low':
                        return a.wager - b.wager;
                    case 'odds-high':
                        return b.odds - a.odds;
                    case 'odds-low':
                        return a.odds - b.odds;
                    default:
                        return 0;
                }
            });

            setFilteredBets(sorted);
        } catch (err) {
            setError('Error al filtrar las apuestas. Por favor, intente de nuevo más tarde.');
            console.error('Error filtering bets:', err);
        }
    }, [bets, searchTerm, filterCriteria, oddsFilter, wagerFilter, sortCriteria]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Buscar por nombre del evento
                    </label>
                    <SearchBar />
                </div>
                <div className="w-full md:w-1/4">
                    <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Filtrar por estado
                    </label>
                    <FilterDropdown />
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                    <RangeSlider
                        min={0}
                        max={maxOdds}
                        value={oddsFilter}
                        setValue={setOddsFilter}
                        label="Cuota máxima"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <RangeSlider
                        min={0}
                        max={maxWager}
                        value={wagerFilter}
                        setValue={setWagerFilter}
                        label="Apuesta máxima"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="w-48">
                    <SortDropdown/>
                </div>
                <ViewToggle />
            </div>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : filteredBets.length === 0 ? (
                <p className="text-center">No se encontraron apuestas.</p>
            ) : view === 'cards' ? (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    layout
                >
                    <AnimatePresence>
                        {filteredBets.map((bet) => (
                            <motion.div
                                key={bet.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <BetCard bet={bet} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                    className="space-y-4"
                    layout
                >
                    <AnimatePresence>
                        {filteredBets.map((bet) => (
                            <motion.div
                                key={bet.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <BetListItem bet={bet} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default BetList;
