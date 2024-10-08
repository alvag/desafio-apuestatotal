import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, DollarSign, Percent, Calendar, Clock, Award } from 'lucide-react';
import { fetchBetDetails } from '../services/betService';
import { BetDetail as BetDetailType } from '../interfaces';

const BetDetail = () => {
    const { game } = useParams<{ game: string }>();
    const [betDetail, setBetDetail] = useState<BetDetailType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBetDetail = async () => {
            if (!game) return;
            try {
                const detail = fetchBetDetails(game);
                if (detail) {
                    setBetDetail(detail);
                } else {
                    setError('No se encontraron detalles para esta apuesta.');
                }
            } catch (err) {
                setError('Error al cargar los detalles de la apuesta. Por favor, intente de nuevo más tarde.');
                console.error('Error fetching bet details:', err);
            }
        };

        loadBetDetail();
    }, [game]);

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!betDetail) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Volver a la lista
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">Detalles de la Apuesta</h2>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center">
                            <DollarSign className="w-6 h-6 text-green-500 mr-2" />
                            <div>
                                <p className="text-sm text-gray-600">Apuesta Total</p>
                                <p className="text-lg font-semibold text-gray-800">S/ {betDetail.TotalStake}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Award className="w-6 h-6 text-yellow-500 mr-2" />
                            <div>
                                <p className="text-sm text-gray-600">Ganancia Potencial</p>
                                <p className="text-lg font-semibold text-gray-800">S/ {betDetail.TotalWin}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Percent className="w-6 h-6 text-purple-500 mr-2" />
                            <div>
                                <p className="text-sm text-gray-600">Cuota Total</p>
                                <p className="text-lg font-semibold text-gray-800">{betDetail.TotalOdds}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-6 h-6 text-red-500 mr-2" />
                            <div>
                                <p className="text-sm text-gray-600">Fecha de Creación</p>
                                <p className="text-lg font-semibold text-gray-800">{betDetail.CreatedDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-4 mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-lg font-semibold text-gray-600">Estado de la Apuesta</p>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                                betDetail.BetStatusName === 'Abierto' ? 'bg-blue-500' :
                                    betDetail.BetStatusName === 'Perdido' ? 'bg-red-500' :
                                        'bg-green-500'
                            }`}>
                {betDetail.BetStatusName}
              </span>
                        </div>
                        <p className="text-sm text-gray-600">Tipo de Apuesta: {betDetail.BetTypeName}</p>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Selecciones de la Apuesta</h3>
                    <div className="space-y-4">
                        {betDetail.BetSelections.map((selection, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{selection.EventName}</h4>
                                        <p className="text-sm text-gray-600">{selection.MarketName}</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Cuota: {selection.Price}
                  </span>
                                </div>
                                <p className="mt-2 text-gray-700">{selection.Name}</p>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {selection.EventDate}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BetDetail;
