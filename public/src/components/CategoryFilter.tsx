
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

const CategoryFilter = ({ 
  selectedCategory, 
  selectedSubcategory, 
  onCategoryChange, 
  onSubcategoryChange 
}: CategoryFilterProps) => {
  const categoryEntries = Object.entries(categories);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-forest-700 mb-3">Categories</h3>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => onCategoryChange('all')}
            className="w-full justify-start text-sm"
          >
            All Categories
          </Button>
          {categoryEntries.map(([key, category]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => onCategoryChange(key)}
              className="w-full justify-start text-sm"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {selectedCategory !== 'all' && categories[selectedCategory as keyof typeof categories] && (
        <div>
          <h3 className="font-semibold text-forest-700 mb-3">Subcategories</h3>
          <div className="space-y-2">
            <Button
              variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
              onClick={() => onSubcategoryChange('all')}
              className="w-full justify-start text-sm"
              size="sm"
            >
              All {categories[selectedCategory as keyof typeof categories].name}
            </Button>
            {categories[selectedCategory as keyof typeof categories].subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={selectedSubcategory === subcategory ? 'default' : 'outline'}
                onClick={() => onSubcategoryChange(subcategory)}
                className="w-full justify-start text-sm"
                size="sm"
              >
                {subcategory}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
