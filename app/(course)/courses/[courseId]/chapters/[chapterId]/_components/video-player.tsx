"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  playbackId: string;
  isLocked: boolean;
  title: string;
  chapterId?: string;
  courseId?: string;
  nextChapterId?: string;
  completeOnEnd?: boolean;
}

const VideoPlayer = ({
  playbackId,
  isLocked,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-12 w-12 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">Bab ini terkunci</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
            title={title}
            className={cn(
                !isReady && "hidden"
            )}
            onCanPlay={() => setIsReady(true)}
            autoPlay
            playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
