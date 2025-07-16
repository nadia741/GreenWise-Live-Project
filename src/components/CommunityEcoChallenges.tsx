
import React, { useState } from 'react';
import { Users, Trophy, Target, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  reward: string;
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

const CommunityEcoChallenges = () => {
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Zero Waste Week',
      description: 'Reduce household waste to zero for 7 consecutive days',
      participants: 1247,
      duration: '7 days',
      reward: '500 EcoPoints + Badge',
      progress: 65,
      difficulty: 'intermediate',
      category: 'Waste Reduction'
    },
    {
      id: '2',
      title: 'Green Commute Challenge',
      description: 'Use eco-friendly transportation for 2 weeks',
      participants: 892,
      duration: '14 days',
      reward: '300 EcoPoints',
      progress: 23,
      difficulty: 'beginner',
      category: 'Transportation'
    },
    {
      id: '3',
      title: 'Local Food Month',
      description: 'Source 80% of groceries from local producers',
      participants: 654,
      duration: '30 days',
      reward: '1000 EcoPoints + Certificate',
      progress: 45,
      difficulty: 'advanced',
      category: 'Food & Agriculture'
    }
  ]);

  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);
  const { toast } = useToast();

  const joinChallenge = (challengeId: string, title: string) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId]);
      toast({
        title: "🎯 Challenge Joined!",
        description: `You're now participating in "${title}". Good luck!`,
        duration: 3000,
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-sage-50 to-tree-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-sage-100 rounded-lg">
            <Users className="h-6 w-6 text-sage-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-700">Community Eco-Challenges</h3>
            <p className="text-sm text-sage-600">Join thousands in sustainable action</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {challenges.map((challenge) => {
            const isJoined = joinedChallenges.includes(challenge.id);
            return (
              <div key={challenge.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-tree-400">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-forest-700 text-lg">{challenge.title}</h4>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sage-600 mb-3">{challenge.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants.toLocaleString()} participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span>{challenge.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Community Progress</span>
                    <span className="text-sm text-gray-500">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-tree-600 border-tree-200">
                    {challenge.category}
                  </Badge>
                  <Button 
                    onClick={() => joinChallenge(challenge.id, challenge.title)}
                    disabled={isJoined}
                    className={`${
                      isJoined 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                        : 'bg-tree-600 hover:bg-tree-700 text-white'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Star className="h-4 w-4 mr-2" />
                        Joined
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Join Challenge
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-tree-100 rounded-lg text-center">
          <h4 className="font-semibold text-tree-700 mb-2">🏆 Leaderboard</h4>
          <div className="text-sm text-tree-600">
            You're ranked #47 out of 2,793 active participants this month!
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityEcoChallenges;
