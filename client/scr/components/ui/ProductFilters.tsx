import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { formatPrice } from "@/lib/utils/product-utils";

interface FilterProps {
  onFilterChange: (filters: any) => void;
  brands: string[];
  categories: string[];
}

export default function ProductFilters({ onFilterChange, brands, categories }: FilterProps) {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    applyFilters({ priceRange: value });
  };
  
  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...selectedBrands, brand]
      : selectedBrands.filter(b => b !== brand);
    
    setSelectedBrands(newBrands);
    applyFilters({ brands: newBrands });
  };
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    
    setSelectedCategories(newCategories);
    applyFilters({ categories: newCategories });
  };
  
  const handleInStockChange = (checked: boolean) => {
    setInStock(checked);
    applyFilters({ inStock: checked });
  };
  
  const handleOnSaleChange = (checked: boolean) => {
    setOnSale(checked);
    applyFilters({ onSale: checked });
  };
  
  const applyFilters = (changedFilter: any) => {
    const filters = {
      priceRange,
      brands: selectedBrands,
      categories: selectedCategories,
      inStock,
      onSale,
      ...changedFilter
    };
    
    onFilterChange(filters);
  };
  
  const clearFilters = () => {
    setPriceRange([0, 100]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setInStock(false);
    setOnSale(false);
    
    onFilterChange({
      priceRange: [0, 100],
      brands: [],
      categories: [],
      inStock: false,
      onSale: false
    });
  };
  
  return (
    <div className="space-y-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm text-gray-400 hover:text-emerald-500"
          onClick={clearFilters}
        >
          Clear all
        </Button>
      </div>
      
      <Separator className="bg-gray-700" />
      
      <div>
        <h4 className="font-medium text-white mb-3">Price Range</h4>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="my-6"
        />
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">{formatPrice(priceRange[0] * 10000)}</span>
          <span className="text-gray-400 text-sm">{formatPrice(priceRange[1] * 10000)}</span>
        </div>
      </div>
      
      <Separator className="bg-gray-700" />
      
      <Accordion type="multiple" defaultValue={["brands", "categories"]}>
        <AccordionItem value="brands" className="border-gray-700">
          <AccordionTrigger className="text-white hover:text-emerald-500">
            Brands
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <label 
                    htmlFor={`brand-${brand}`}
                    className="text-sm text-gray-300 cursor-pointer"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="categories" className="border-gray-700">
          <AccordionTrigger className="text-white hover:text-emerald-500">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="text-sm text-gray-300 cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Separator className="bg-gray-700" />
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="in-stock" 
            checked={inStock}
            onCheckedChange={(checked) => handleInStockChange(checked as boolean)}
          />
          <label 
            htmlFor="in-stock"
            className="text-sm text-gray-300 cursor-pointer"
          >
            In Stock Only
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="on-sale" 
            checked={onSale}
            onCheckedChange={(checked) => handleOnSaleChange(checked as boolean)}
          />
          <label 
            htmlFor="on-sale"
            className="text-sm text-gray-300 cursor-pointer"
          >
            On Sale
          </label>
        </div>
      </div>
      
      <Button className="w-full" onClick={() => applyFilters({})}>
        Apply Filters
      </Button>
    </div>
  );
}
