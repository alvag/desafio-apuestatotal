import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterCriteria: string;
    setFilterCriteria: (criteria: string) => void;
    sortCriteria: string;
    setSortCriteria: (criteria: string) => void;
    view: 'cards' | 'list';
    setView: (view: 'cards' | 'list') => void;
    oddsFilter: number;
    setOddsFilter: (value: number) => void;
    wagerFilter: number;
    setWagerFilter: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('all');
    const [sortCriteria, setSortCriteria] = useState('default');
    const [view, setView] = useState<'cards' | 'list'>('cards');
    const [oddsFilter, setOddsFilter] = useState(0);
    const [wagerFilter, setWagerFilter] = useState(0);

    return (
        <AppContext.Provider value={{
            searchTerm,
            setSearchTerm,
            filterCriteria,
            setFilterCriteria,
            sortCriteria,
            setSortCriteria,
            view,
            setView,
            oddsFilter,
            setOddsFilter,
            wagerFilter,
            setWagerFilter
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext debe usarse dentro de un AppProvider');
    }
    return context;
};
