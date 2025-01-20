import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';

import { Product } from '../context/ShopContext';
import { ProductItem } from '../components/ProductItem';

const Collection: React.FC = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterProduct, setFilterProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>('relevant');

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = (): void => {
    let productsCopy = [...products];
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilterProduct(productsCopy);
  };

  const sortProduct = (): void => {
    let sortedProducts = [...filterProduct];
    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        break;
    }
    setFilterProduct(sortedProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-[250px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="text-lg font-medium cursor-pointer flex items-center gap-2 mb-4"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="Toggle"
            className={`h-4 transition-transform ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>

        {/* Category Filter */}
        <div className={`border p-4 rounded-md ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="text-sm font-semibold mb-3">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {['Men', 'Women', 'Kids'].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  onChange={toggleCategory}
                  className="w-4 h-4"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border p-4 rounded-md mt-4 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="text-sm font-semibold mb-3">TYPES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  onChange={toggleSubCategory}
                  className="w-4 h-4"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>

        {/* Product Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProduct.map((item) => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;