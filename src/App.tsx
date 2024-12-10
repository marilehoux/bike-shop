import React, { useState } from 'react';
import { Bike, BarChart } from 'lucide-react';
import { BikeList } from './components/BikeList';
import { BikeForm } from './components/BikeForm';
import { StockStats } from './components/StockStats';
import { BikeProvider, useBikes } from './context/BikeContext';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Bike as BikeType } from './types/bike';

function BikeManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<BikeType | undefined>();
  const [currentView, setCurrentView] = useState<'list' | 'stats'>('list');
  const { bikes, addBike, updateBike } = useBikes();

  const handleEditBike = (bike: BikeType) => {
    setSelectedBike(bike);
    setIsFormOpen(true);
  };

  const handleSubmit = (bikeData: Omit<BikeType, 'id'> | BikeType) => {
    if ('id' in bikeData) {
      updateBike(bikeData);
    } else {
      addBike(bikeData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedBike(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bike className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Gestion de Vélos
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="flex rounded-lg shadow-sm" role="group">
                <button
                  onClick={() => setCurrentView('list')}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentView === 'list'
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  } border border-gray-200 dark:border-gray-600 rounded-l-lg`}
                >
                  Liste
                </button>
                <button
                  onClick={() => setCurrentView('stats')}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentView === 'stats'
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  } border border-l-0 border-gray-200 dark:border-gray-600 rounded-r-lg flex items-center gap-2`}
                >
                  <BarChart size={16} />
                  Statistiques
                </button>
              </div>
              {currentView === 'list' && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Ajouter un vélo
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {currentView === 'list' ? (
          <BikeList bikes={bikes} onEditBike={handleEditBike} />
        ) : (
          <StockStats />
        )}
        {isFormOpen && (
          <BikeForm
            bike={selectedBike}
            onSubmit={handleSubmit}
            onClose={handleCloseForm}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BikeProvider>
        <BikeManagement />
      </BikeProvider>
    </ThemeProvider>
  );
}

export default App;