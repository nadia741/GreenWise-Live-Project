
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

  return (
    <Card className="bg-gradient-to-br from-tree-50 to-forest-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-tree-100 rounded-lg">
            <Brain className="h-6 w-6 text-tree-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-700">AI Eco-Recommendations</h3>
            <p className="text-sm text-sage-600">Personalized sustainability suggestions</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                  <div>
                    <h4 className="font-semibold text-forest-700">{rec.title}</h4>
                    <p className="text-sm text-sage-600">{rec.description}</p>
                  </div>
                </div>
                <Badge className={getDifficultyColor(rec.difficulty)}>
                  {rec.difficulty}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-tree-600" />
                  <span className="text-sm font-medium text-tree-600">
                    {rec.impact}% impact reduction
                  </span>
                </div>
                <Button size="sm" className="bg-tree-600 hover:bg-tree-700">
                  Start Challenge
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoRecommendations;
