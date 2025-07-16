
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, Download, ExternalLink } from 'lucide-react';

const EducationalResources = () => {
  const resources = [
    {
      id: 1,
      title: "The Complete Guide to Sustainable Living",
      type: "ebook",
      description: "Learn how to reduce your carbon footprint with practical daily tips.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      downloadUrl: "#",
      free: true
    },
    {
      id: 2,
      title: "Understanding Carbon Footprints",
      type: "video",
      description: "A 15-minute video explaining how your purchases impact the environment.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop",
      watchUrl: "#",
      duration: "15 min"
    },
    {
      id: 3,
      title: "Sustainable Materials Infographic",
      type: "infographic",
      description: "Visual guide to eco-friendly materials and their benefits.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
      downloadUrl: "#",
      free: true
    },
    {
      id: 4,
      title: "Zero Waste Lifestyle Masterclass",
      type: "video",
      description: "Transform your lifestyle with our comprehensive zero waste guide.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop",
      watchUrl: "#",
      duration: "45 min",
      premium: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'ebook': return <BookOpen className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'infographic': return <Download className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-4">
          Educational Resources
        </h2>
        <p className="text-sage-600 max-w-2xl mx-auto">
          Expand your knowledge about sustainability and make more informed eco-friendly choices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <div 
            key={resource.id}
            className="bg-white rounded-eco shadow-eco overflow-hidden hover-lift animate-fade-in-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={resource.image} 
                alt={resource.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                {getIcon(resource.type)}
                <span className="text-sm font-medium text-sage-600 capitalize">
                  {resource.type}
                </span>
                {resource.duration && (
                  <span className="text-xs text-sage-500">• {resource.duration}</span>
                )}
                {resource.free && (
                  <span className="bg-forest-100 text-forest-700 text-xs px-2 py-1 rounded-full ml-auto">
                    Free
                  </span>
                )}
                {resource.premium && (
                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full ml-auto">
                    Premium
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-forest-700 mb-2 line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-sm text-sage-600 mb-4 line-clamp-3">
                {resource.description}
              </p>
              
              <Button 
                className="w-full bg-forest-700 hover:bg-forest-800"
                size="sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {resource.type === 'video' ? 'Watch Now' : 'Download'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalResources;
