import betsData from '../assets/data/betsHistory.json';
import betDetailsData from '../assets/data/betsDetailHistory.json';
import { Bet, BetDetail } from '../interfaces';

export const fetchBets = (): Bet[] => {
    return betsData.map(bet => ({
        ...bet,
        id: bet.game,
    }));
};

export const fetchBetDetails = (game: string): BetDetail | undefined => {
    return betDetailsData.find(bet => bet.BetId.toString() === game);
};

export const searchBets = (searchTerm: string): Bet[] => {
    // Primero buscamos en betDetailsData
    const matchingDetails = betDetailsData.filter(detail =>
        detail.BetSelections.some(selection =>
            selection.EventName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Luego cruzamos los resultados con betsData
    const matchingBets = betsData.filter(bet =>
        matchingDetails.some(detail => detail.BetId.toString() === bet.game)
    );

    return matchingBets.map(bet => ({
        ...bet,
        id: bet.game,
    }));
};
