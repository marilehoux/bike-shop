import React, { createContext, useContext, useState } from 'react';
import { Bike } from '../types/bike';
import { bikes as initialBikes } from '../data/bikes';

interface BikeContextType {
  bikes: Bike[];
  addBike: (bike: Omit<Bike, 'id'>) => void;
  updateBike: (bike: Bike) => void;
  deleteBike: (id: string) => void;
}

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export const BikeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bikes, setBikes] = useState<Bike[]>(initialBikes);

  const addBike = (newBike: Omit<Bike, 'id'>) => {
    const bike: Bike = {
      ...newBike,
      id: Date.now().toString(),
    };
    setBikes((prev) => [...prev, bike]);
  };

  const updateBike = (updatedBike: Bike) => {
    setBikes((prev) =>
      prev.map((bike) => (bike.id === updatedBike.id ? updatedBike : bike))
    );
  };

  const deleteBike = (id: string) => {
    setBikes((prev) => prev.filter((bike) => bike.id !== id));
  };

  return (
    <BikeContext.Provider value={{ bikes, addBike, updateBike, deleteBike }}>
      {children}
    </BikeContext.Provider>
  );
};

export const useBikes = () => {
  const context = useContext(BikeContext);
  if (!context) {
    throw new Error('useBikes must be used within a BikeProvider');
  }
  return context;
};