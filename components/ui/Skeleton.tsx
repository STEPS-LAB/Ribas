"use client";

import clsx from "clsx";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-sm bg-black/8",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton_1.5s_ease-in-out_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        className
      )}
      aria-hidden
    />
  );
}
