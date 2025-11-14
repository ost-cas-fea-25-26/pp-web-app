export const PostSkeleton = () => {
  return (
    <div className="h-[200px] rounded-xl border border-gray-200 bg-gray-100 shadow-sm p-4 animate-pulse">
      <div className="h-4 w-3/4 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
    </div>
  );
};
