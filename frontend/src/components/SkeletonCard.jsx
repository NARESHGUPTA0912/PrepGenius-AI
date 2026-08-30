const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded-xl p-4 bg-gray-100 shadow-sm border border-gray-200">
      
      {/* ✨ Shimmer Effect */}
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />

      <div className="space-y-4">
        
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="h-3 bg-gray-300 rounded w-16" />
        </div>

        {/* Question */}
        <div className="h-4 w-3/4 rounded-md bg-gray-300" />

        {/* Answer lines */}
        <div className="space-y-2">
          <div className="h-3.5 bg-gray-300 rounded w-5/6" />
          <div className="h-3.5 bg-gray-200 rounded w-full" />
          <div className="h-3.5 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;