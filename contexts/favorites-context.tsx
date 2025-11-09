import React, { createContext, useContext, useState, ReactNode } from "react";
import { FoodsData } from "@/constants/foods";

interface FavoritesContextType {
  favoriteIds: Set<number>;
  toggleFavorite: (foodId: number) => void;
  isFavorite: (foodId: number) => boolean;
  getFavoriteFoods: (allFoods: FoodsData[]) => FoodsData[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  const toggleFavorite = (foodId: number) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(foodId)) {
        newSet.delete(foodId);
      } else {
        newSet.add(foodId);
      }
      return newSet;
    });
  };

  const isFavorite = (foodId: number) => {
    return favoriteIds.has(foodId);
  };

  const getFavoriteFoods = (allFoods: FoodsData[]) => {
    return allFoods.filter((food) => favoriteIds.has(food.id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite, getFavoriteFoods }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

