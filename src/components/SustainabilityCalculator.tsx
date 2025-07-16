
import React, { useState } from 'react';
import { Calculator, BarChart3, Lightbulb, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

interface LifestyleFactors {
  transport: number;
  energy: number;
  diet: number;
  waste: number;
  shopping: number;
}

const SustainabilityCalculator = () => {
  const [factors, setFactors] = useState<LifestyleFactors>({
    transport: 50,
    energy: 50,
    diet: 50,
    waste: 50,
    shopping: 50
  });

  const [showResults, setShowResults] = useState(false);

  const calculateScore = () => {
    const weights = {
      transport: 0.25,
      energy: 0.25,
      diet: 0.2,
      waste: 0.15,
      shopping: 0.15
    };

    return Math.round(
      factors.transport * weights.transport +
      factors.energy * weights.energy +
      factors.diet * weights.diet +
      factors.waste * weights.waste +
      factors.shopping * weights.shopping
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const score = calculateScore();

  return (
    <Card className="bg-gradient-to-br from-tree-50 to-sage-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-tree-100 rounded-lg">
            <Calculator className="h-6 w-6 text-tree-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-700">Sustainability Score Calculator</h3>
            <p className="text-sm text-sage-600">Assess your environmental impact</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Transport */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-forest-700">🚗 Transportation</label>
              <span className="text-sm text-sage-600">{factors.transport}%</span>
            </div>
            <Slider
              value={[factors.transport]}
              onValueChange={(value) => setFactors({...factors, transport: value[0]})}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-sage-500">How often do you use eco-friendly transport?</p>
          </div>

          {/* Energy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-forest-700">⚡ Energy Usage</label>
              <span className="text-sm text-sage-600">{factors.energy}%</span>
            </div>
            <Slider
              value={[factors.energy]}
              onValueChange={(value) => setFactors({...factors, energy: value[0]})}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-sage-500">How energy-efficient is your home?</p>
          </div>

          {/* Diet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-forest-700">🥗 Diet</label>
              <span className="text-sm text-sage-600">{factors.diet}%</span>
            </div>
            <Slider
              value={[factors.diet]}
              onValueChange={(value) => setFactors({...factors, diet: value[0]})}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-sage-500">How plant-based is your diet?</p>
          </div>

          {/* Waste */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-forest-700">♻️ Waste Management</label>
              <span className="text-sm text-sage-600">{factors.waste}%</span>
            </div>
            <Slider
              value={[factors.waste]}
              onValueChange={(value) => setFactors({...factors, waste: value[0]})}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-sage-500">How well do you recycle and reduce waste?</p>
          </div>

          {/* Shopping */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-forest-700">🛒 Shopping Habits</label>
              <span className="text-sm text-sage-600">{factors.shopping}%</span>
            </div>
            <Slider
              value={[factors.shopping]}
              onValueChange={(value) => setFactors({...factors, shopping: value[0]})}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-sage-500">How sustainable are your purchases?</p>
          </div>

          <Button 
            onClick={handleCalculate}
            className="w-full bg-tree-600 hover:bg-tree-700"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Calculate My Score
          </Button>

          {showResults && (
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-tree-200 animate-fade-in">
              <div className="text-center mb-4">
                <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-lg font-semibold text-forest-700">
                  {getScoreLabel(score)}
                </div>
                <Progress value={score} className="mt-4 h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">Top Recommendations:</span>
                </div>
                <ul className="text-sm text-sage-600 space-y-1 ml-6">
                  {score < 60 && <li>• Consider using public transport more often</li>}
                  {factors.energy < 70 && <li>• Switch to LED bulbs and energy-efficient appliances</li>}
                  {factors.diet < 60 && <li>• Try incorporating more plant-based meals</li>}
                  {factors.waste < 70 && <li>• Improve recycling and composting habits</li>}
                </ul>
              </div>

              <div className="mt-4 p-3 bg-tree-50 rounded-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-tree-600" />
                <span className="text-sm text-tree-700">
                  Keep improving to earn sustainability badges!
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SustainabilityCalculator;
