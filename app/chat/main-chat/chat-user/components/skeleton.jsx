'use client'
import { Skeleton } from "@/components/ui/skeleton";

const getRandomWidth = () => {
  const widths = ["w-36", "w-48", "w-56", "w-64", "w-72"];
  return widths[Math.floor(Math.random() * widths.length)];
};

const getRandomHeight = () => {
  const heights = ["h-8", "h-40", "h-20", "h-16"];
  return heights[Math.floor(Math.random() * heights.length)];
};

const getRandomLineCount = () => Math.floor(Math.random() * 2) + 1;

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      {[...Array(4)].map((_, index) => {
        const isCurrentUser = index % 2 !== 0;
        const lineCount = getRandomLineCount();
        return (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            {!isCurrentUser && (
              <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            )}
            <div className="flex flex-col space-y-2">
              {[...Array(lineCount)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={`${getRandomHeight()} ${getRandomWidth()} rounded-xl`}
                />
              ))}
              <Skeleton className="h-3 w-16 rounded-md ml-auto" />
            </div>
            {isCurrentUser && (
              <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
};
