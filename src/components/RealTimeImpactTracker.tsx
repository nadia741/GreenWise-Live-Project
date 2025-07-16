
import React, { useState, useEffect } from 'react';
import { Activity, Leaf, Droplets, Zap, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ImpactMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const RealTimeImpactTracker = () => {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const updateMetrics = () => {
      const newMetrics: ImpactMetric[] = [
        {
          id: 'carbon',
          name: 'Carbon Saved',
          value: Math.random() * 50 + 25,
          unit: 'kg CO₂',
          change: Math.random() * 10 - 5,
          icon: <Leaf className="h-5 w-5" />,
          color: 'text-green-600'
        },
        {
          id: 'water',
          name: 'Water Conserved',
          value: Math.random() * 100 + 50,
          unit: 'liters',
          change: Math.random() * 15 - 7,
          icon: <Droplets className="h-5 w-5" />,
          color: 'text-blue-600'
        },
        {
          id: 'energy',
          name: 'Energy Reduced',
          value: Math.random() * 30 + 15,
          unit: 'kWh',
          change: Math.random() * 8 - 4,
          icon: <Zap className="h-5 w-5" />,
          color: 'text-yellow-600'
        },
        {
          id: 'transport',
          name: 'Miles Avoided',
          value: Math.random() * 20 + 10,
          unit: 'miles',
          change: Math.random() * 5 - 2,
          icon: <Car className="h-5 w-5" />,
          color: 'text-purple-600'
        }
      ];
      setMetrics(newMetrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-forest-50 to-tree-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-forest-100 rounded-lg">
            <Activity className={`h-6 w-6 text-forest-600 ${isLive ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-700">Real-Time Impact</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <p className="text-sm text-sage-600">Live environmental metrics</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 bg-gray-50 rounded-lg ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  metric.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 text-sm">{metric.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-forest-700">
                    {metric.value.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <Progress 
                  value={Math.min(metric.value, 100)} 
                  className="mt-2 h-2"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-tree-100 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-tree-700">
              {(metrics.reduce((sum, m) => sum + m.value, 0) / 4).toFixed(1)}
            </div>
            <div className="text-sm text-tree-600">Overall Impact Score</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeImpactTracker;
