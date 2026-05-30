export default function ListingCard({ item }: any) {
  return (
    <div className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3 bg-white">

      {/* TITLE + PRICE */}
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-lg leading-tight">
          {item.title}
        </h2>

        <div className="text-right">
          <p className="font-bold text-green-600">
            ${item.price}
          </p>
          <p className="text-xs text-gray-500">/month</p>
        </div>
      </div>

      {/* ADDRESS */}
      <p className="text-gray-500 text-sm">
        📍 {item.address}
      </p>

      {/* TAGS ROW */}
      <div className="flex gap-2 flex-wrap text-xs">
        <span className="bg-gray-100 px-2 py-1 rounded-full">
          🛏 {item.bedrooms} bed
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded-full">
          🛁 {item.bathrooms} bath
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded-full">
          🚗 {item.parking ? "Parking" : "No Parking"}
        </span>
      </div>

      {/* LOCATION INFO */}
      <div className="text-sm text-gray-600 space-y-1 pt-1">
        <p>🚇 Subway: {item.distanceToSubway} min</p>
        <p>🛒 Grocery: {item.distanceToGrocery} min</p>
      </div>

      {/* SCORE BADGE */}
      {item.score !== undefined && (
        <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          🏆 Score: {item.score}/100
        </div>
      )}

      {/* LINK */}
      <a
        href={item.url}
        target="_blank"
        className="block text-center mt-2 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
      >
        View Listing →
      </a>

    </div>
  );
}