"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listing";

// 🚨 关键：Leaflet 必须 SSR 关闭
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

export default function Home() {
  // ======================
  // STATE
  // ======================
  const [maxPrice, setMaxPrice] = useState(2500);
  const [bedrooms, setBedrooms] = useState(0);

  // ======================
  // SCORE FUNCTION
  // ======================
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

  // ======================
  // FILTER + SCORE + SORT
  // ======================
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
    <main className="max-w-2xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        🏠 Nestly
      </h1>

      {/* 🗺 MAP */}
      <MapView listings={scoredListings} />

      {/* FILTER PANEL */}
      <div className="mb-6 p-4 border rounded-xl space-y-4 mt-4">

        {/* PRICE */}
        <div>
          <label className="block mb-1">
            Max Price: ${maxPrice}
          </label>

          <input
            type="range"
            min="1000"
            max="4000"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Number(e.target.value))
            }
          />
        </div>

        {/* BEDROOMS */}
        <div>
          <label className="block mb-1">
            Bedrooms: {bedrooms === 0 ? "Any" : bedrooms + "+"}
          </label>

          <select
            value={bedrooms}
            onChange={(e) =>
              setBedrooms(Number(e.target.value))
            }
            className="border p-1 rounded"
          >
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
          </select>
        </div>

      </div>

      {/* LISTINGS */}
      <div className="space-y-4">
        {scoredListings.length === 0 ? (
          <p className="text-gray-500">
            No listings found 😢
          </p>
        ) : (
          scoredListings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))
        )}
      </div>

    </main>
  );
}