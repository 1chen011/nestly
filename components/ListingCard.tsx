"use client";

type Props = {
  item: any;
  selected?: boolean;
  onSelect?: () => void;
};

export default function ListingCard({
  item,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer
        rounded-2xl
        border border-gray-200
        bg-white
        p-5
        space-y-3

        transition-all duration-200 ease-out

        hover:shadow-lg hover:-translate-y-1
        active:scale-[0.99]

        ${selected ? "ring-2 ring-black shadow-lg" : ""}
      `}
    >
      {/* SCORE + TYPE */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black text-white">
          🏆 {item.score ?? 0}
        </span>

        <span className="text-xs text-gray-500 capitalize">
          {item.type}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-bold text-black leading-snug">
        {item.title}
      </h2>

      {/* PRICE + LOCATION */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xl font-bold text-black">
            ${item.price}
            <span className="text-sm font-normal text-gray-500">
              /mo
            </span>
          </p>
        </div>

        <p className="text-sm text-gray-600">
          📍 {item.address}
        </p>
      </div>

      {/* DETAILS GRID */}
      <div className="flex flex-wrap gap-2 text-xs pt-1">
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          🛏 {item.bedrooms} bed
        </span>

        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          🚿 {item.bathrooms} bath
        </span>

        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          🚇 {item.distanceToSubway} min subway
        </span>

        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          🛒 {item.distanceToGrocery} min grocery
        </span>

        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          🚗 {item.parking ? "Parking" : "No Parking"}
        </span>
      </div>

      {/* CTA */}
      <button
        className="
          w-full mt-2
          bg-black text-white
          py-2.5 rounded-xl
          text-sm font-medium

          hover:bg-gray-800
          transition
        "
      >
        View Original Listing →
      </button>
    </div>
  );
}