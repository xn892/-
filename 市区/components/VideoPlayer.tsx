"use client";

type VideoPlayerProps = {
  videoId: string;
  title: string;
};

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="flex items-center gap-2 bg-ink px-4 py-2.5 text-sm text-white">
        <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold">▶ 教学视频</span>
        <span className="truncate text-white/80">{title}</span>
      </div>
    </div>
  );
}
