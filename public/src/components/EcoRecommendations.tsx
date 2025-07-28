
import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'energy' | 'transport' | 'food' | 'shopping';
  impact: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const EcoRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate AI-powered recommendations based on user behavior
    setTimeout(() => {
      const aiRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'Switch to LED Bulbs',
          description: 'Replace 5 incandescent bulbs to save 75% energy consumption',
          category: 'energy',
          impact: 85,
          difficulty: 'easy'
        },
        {
          id: '2',
          title: 'Try Meatless Mondays',
          description: 'Reduce weekly carbon footprint by 12kg CO₂ with plant-based meals',
          category: 'food',
          impact: 68,
          difficulty: 'easy'
        },
        {
          id: '3',
          title: 'Use Public Transport',
          description: 'Take bus/train twice a week instead of driving',
          category: 'transport',
          impact: 92,
          difficulty: 'medium'
        },
        {
          id: '4',
          title: 'Buy from Local Markets',
          description: 'Support local businesses and reduce transportation emissions',
          category: 'shopping',
          impact: 76,
          difficulty: 'easy'
        }
      ];
      setRecommendations(aiRecommendations);
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy': return '⚡';
      case 'transport': return '🚲';
      case 'food': return '🌱';
      case 'shopping': return '🛒';
      default: return '🌿';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null; // Component removed as requested
};

export default EcoRecommendations;
