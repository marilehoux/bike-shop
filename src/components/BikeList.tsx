import React, { useState } from 'react';
import { BikeCard } from './BikeCard';
import { BikeDetail } from './BikeDetail';
import { Bike } from '../types/bike';
import { useBikes } from '../context/BikeContext';

interface BikeListProps {
  bikes: Bike[];
  onEditBike?: (bike: Bike) => void;
}

export const BikeList: React.FC<BikeListProps> = ({ bikes, onEditBike }) => {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const { updateBike } = useBikes();

  const handleUpdateBike = (updatedBike: Bike) => {
    updateBike(updatedBike);
    setSelectedBike(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike) => (
          <BikeCard
            key={bike.id}
            bike={bike}
            onEdit={onEditBike}
            onView={() => setSelectedBike(bike)}
          />
        ))}
      </div>
      
      {selectedBike && (
        <BikeDetail
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          onUpdate={handleUpdateBike}
        />
      )}
    </>
  );
};