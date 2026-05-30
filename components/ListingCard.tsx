export default function ListingCard({ item }: any) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-1">

      {/* TOP BLOCK (image placeholder style) */}
      <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300" />

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        {/* TITLE + PRICE */}
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-base leading-snug">
            {item.title}
          </h2>

          <div className="text-right">
            <p className="font-bold text-black">
              ${item.price}
            </p>
            <p className="text-xs text-gray-500">/month</p>
          </div>
        </div>

        {/* ADDRESS */}
        <p className="text-sm text-gray-500">
          📍 {item.address}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            🛏 {item.bedrooms}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            🛁 {item.bathrooms}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {item.parking ? "🚗 Parking" : "🚫 No Parking"}
          </span>
        </div>

        {/* SCORE */}
        {item.score !== undefined && (
          <div className="inline-flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            ⭐ Score {item.score}/100
          </div>
        )}

        {/* BUTTON */}
        <a
          href={item.url}
          target="_blank"
          className="block text-center bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800 transition"
        >
          View Listing
        </a>

      </div>
    </div>
  );
}