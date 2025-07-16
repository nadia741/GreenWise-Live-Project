
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RewardsContextType {
  points: number;
  tier: string;
  earnPoints: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
  getPointsFromPurchase: (purchaseAmount: number) => number;
  tierBenefits: { [key: string]: any };
  availableOffers: string[];
  claimOffer: (offer: string) => void;
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
  const { user } = useAuth();
  const { toast } = useToast();
  const [points, setPoints] = useState(0);
  const [availableOffers, setAvailableOffers] = useState<string[]>([]);

  const tierBenefits = {
    'Seedling': { pointsRequired: 0, multiplier: 1, benefits: ['Welcome bonus', 'Member discounts'] },
    'Sprout': { pointsRequired: 50, multiplier: 1.25, benefits: ['Free shipping', 'Early access'] },
    'Tree': { pointsRequired: 150, multiplier: 1.5, benefits: ['Exclusive products', 'Priority support'] },
    'Forest': { pointsRequired: 300, multiplier: 2, benefits: ['VIP events', 'Personalized service'] }
  };

  const getCurrentTier = () => {
    if (points >= 300) return 'Forest';
    if (points >= 150) return 'Tree';
    if (points >= 50) return 'Sprout';
    return 'Seedling';
  };

  const tier = getCurrentTier();

  const earnPoints = (amount: number) => {
    const multiplier = tierBenefits[tier].multiplier;
    // Points calculation: 3-9 points based on price
    // $1-10 = 3 points, $11-25 = 5 points, $26-50 = 7 points, $50+ = 9 points
    let basePoints = 3;
    if (amount >= 50) basePoints = 9;
    else if (amount >= 26) basePoints = 7;
    else if (amount >= 11) basePoints = 5;
    
    const pointsEarned = Math.floor(basePoints * multiplier);
    const oldPoints = points;
    const newPoints = oldPoints + pointsEarned;
    
    setPoints(newPoints);
    
    // Check for special offers every 50 points
    const oldTier = Math.floor(oldPoints / 50);
    const newTier = Math.floor(newPoints / 50);
    
    if (newTier > oldTier) {
      const newOffers = [];
      for (let i = oldTier + 1; i <= newTier; i++) {
        const offer = `${i * 10}% OFF your next purchase!`;
        newOffers.push(offer);
      }
      setAvailableOffers(prev => [...prev, ...newOffers]);
      
      toast({
        title: "🎉 Special Offer Unlocked!",
        description: `You've earned ${pointsEarned} points! New offer available: ${newOffers[0]}`,
        duration: 5000,
      });
    } else {
      toast({
        title: "🌱 Points Earned!",
        description: `You earned ${pointsEarned} sustainability points!`,
        duration: 3000,
      });
    }
  };

  const redeemPoints = (amount: number): boolean => {
    if (points >= amount) {
      setPoints(prev => prev - amount);
      return true;
    }
    return false;
  };

  const getPointsFromPurchase = (purchaseAmount: number): number => {
    const multiplier = tierBenefits[tier].multiplier;
    let basePoints = 3;
    if (purchaseAmount >= 50) basePoints = 9;
    else if (purchaseAmount >= 26) basePoints = 7;
    else if (purchaseAmount >= 11) basePoints = 5;
    
    return Math.floor(basePoints * multiplier);
  };

  const claimOffer = (offer: string) => {
    setAvailableOffers(prev => prev.filter(o => o !== offer));
    toast({
      title: "🎁 Offer Claimed!",
      description: `${offer} has been applied to your account.`,
      duration: 4000,
    });
  };

  useEffect(() => {
    // Load user's points from storage
    if (user) {
      const savedPoints = localStorage.getItem(`rewards_${user.id}`);
      const savedOffers = localStorage.getItem(`offers_${user.id}`);
      if (savedPoints) {
        setPoints(parseInt(savedPoints));
      }
      if (savedOffers) {
        setAvailableOffers(JSON.parse(savedOffers));
      }
    }
  }, [user]);

  useEffect(() => {
    // Save points and offers to storage
    if (user) {
      localStorage.setItem(`rewards_${user.id}`, points.toString());
      localStorage.setItem(`offers_${user.id}`, JSON.stringify(availableOffers));
    }
  }, [points, availableOffers, user]);

  return (
    <RewardsContext.Provider value={{
      points,
      tier,
      earnPoints,
      redeemPoints,
      getPointsFromPurchase,
      tierBenefits,
      availableOffers,
      claimOffer
    }}>
      {children}
    </RewardsContext.Provider>
  );
};
