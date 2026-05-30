"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listing";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

export default function Home() {
  const [maxPrice, setMaxPrice] = useState(2500);
  const [bedrooms, setBedrooms] = useState(0);

  function getScore(item: any) {
    let score = 0;

    if (item.price <= 2000) score += 25;
    else if (item.price <= 2500) score += 15;
    else score += 5;

    if (item.bedrooms >= bedrooms) score += 20;

    if (item.type === "condo") score += 10;

    if (item.distanceToSubway <= 5) score += 25;
    else if (item.distanceToSubway <= 10) score += 15;
    else score += 5;

    if (item.distanceToGrocery <= 5) score += 15;
    else if (item.distanceToGrocery <= 10) score += 10;
    else score += 5;

    if (item.parking) score += 10;

    return score;
  }

  const scoredListings = listings
    .filter((item) => {
      return (
        item.price <= maxPrice &&
        (bedrooms === 0 || item.bedrooms >= bedrooms)
      );
    })
    .map((item) => ({
      ...item,
      score: getScore(item),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <div className="sticky top-0 bg-white z-10 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">🏠 Nestly</h1>

          <div className="flex gap-4 text-sm">
            <span className="text-gray-500">Find homes in Toronto</span>
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="max-w-6xl mx-auto px-6 pt-4">
        <div className="rounded-2xl overflow-hidden shadow-sm border">
          <MapView listings={scoredListings} />
        </div>
      </div>

      {/* FILTERS */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="bg-white border rounded-2xl p-4 flex flex-col md:flex-row gap-6">

          {/* PRICE */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Max Price</p>
            <p className="font-medium mb-2">${maxPrice}</p>

            <input
              className="w-full"
              type="range"
              min="1000"
              max="4000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          {/* BEDROOMS */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Bedrooms</p>

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 w-full"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
            </select>
          </div>
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="max-w-6xl mx-auto px-6 mt-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoredListings.length === 0 ? (
            <p className="text-gray-500">No listings found 😢</p>
          ) : (
            scoredListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}