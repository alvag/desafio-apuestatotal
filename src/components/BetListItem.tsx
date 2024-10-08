import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Bet } from '../interfaces';

interface BetListItemProps {
    bet: Bet;
}

const BetListItem: React.FC<BetListItemProps> = ({ bet }) => {
    const getBetStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'bg-blue-500';
            case 'won':
                return 'bg-green-500';
            case 'lost':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'Abierto';
            case 'won':
                return 'Ganado';
            case 'lost':
                return 'Perdido';
            default:
                return status;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className={`${getBetStatusColor(bet.status)} h-2`} />
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{bet.type}</h3>
                    <p className="text-sm text-gray-600">
                        Apuesta: <span className="font-medium text-gray-800">S/ {bet.wager.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Cuota: <span className="font-medium text-gray-800">{bet.odds.toFixed(2)}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(bet.created_date).toLocaleString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
                <div className="flex flex-col items-end">
          <span className={`text-sm font-medium px-2 py-1 rounded ${getBetStatusColor(bet.status)} text-white`}>
            {getStatusText(bet.status)}
          </span>
                    <Link
                        to={`/bet/${bet.game}`}
                        className="inline-flex items-center text-sm bg-gray-600 hover:bg-gray-700 text-white font-medium py-1 px-3 rounded transition duration-300 mt-2"
                    >
                        Ver detalle
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BetListItem;
