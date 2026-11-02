"use client";

import { useRef } from "react";
import { useT } from "./Providers";

/** Customer video reviews, stored in public/reviews. */
export const videoReviews = Array.from({ length: 10 }, (_, index) => ({
  src: `/reviews/review-${index + 1}.mp4`,
  poster: `/reviews/review-${index + 1}.jpg`,
}));

/** A grid of portrait video reviews. Only one plays at a time. */
export default function VideoReviews({ limit }: { limit?: number }) {
  const t = useT();
  const grid = useRef<HTMLDivElement>(null);
  const items = limit ? videoReviews.slice(0, limit) : videoReviews;

  function pauseOthers(current: HTMLVideoElement) {
    grid.current?.querySelectorAll("video").forEach((video) => {
      if (video !== current) video.pause();
    });
  }

  return (
    <div ref={grid} className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
      {items.map((item, index) => (
        <div key={item.src} className="card overflow-hidden bg-black p-0">
          <video
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="none"
            onPlay={(event) => pauseOthers(event.currentTarget)}
            className="aspect-[9/16] w-full bg-black object-cover"
            aria-label={`${t.reviewsPage.videoLabel} ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}
