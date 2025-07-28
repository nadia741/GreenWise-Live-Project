
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RewardsContextType {
  earnPoints: (amount: number) => void;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  const earnPoints = (amount: number) => {
    toast({
      title: "🎉 Order Placed!",
      description: "Your order has been confirmed successfully!",
      duration: 3000,
    });
  };

  return (
    <RewardsContext.Provider value={{
      earnPoints
    }}>
      {children}
    </RewardsContext.Provider>
  );
};
