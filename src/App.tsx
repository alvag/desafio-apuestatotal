import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BetList from './components/BetList';
import BetDetail from './components/BetDetail';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider } from './context/AppContext.tsx';

function App() {

    return (
        <AppProvider>
            <Router>
                <ErrorBoundary>
                    <div className="min-h-screen bg-gray-100">
                        <Header />
                        <main className="container mx-auto px-4 py-8 conta">
                            <Routes>
                                <Route path="/" element={<BetList />} />
                                <Route path="/bet/:game" element={<BetDetail />} />
                            </Routes>
                        </main>
                    </div>
                </ErrorBoundary>
            </Router>
        </AppProvider>
    );
}

export default App
