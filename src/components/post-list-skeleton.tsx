import { MumbleSkeleton } from "@ost-cas-fea-25-26/pp-design-system";

export const PostListSkeleton = ({ count }: { count: number }) => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: count }).map((_, index) => (
      <MumbleSkeleton key={`post-skeleton-${index}`} />
    ))}
  </div>
);
