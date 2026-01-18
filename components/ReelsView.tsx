
import React, { useEffect, useRef } from 'react';
import { Reel } from '../types';

export const SAMPLE_REELS: Reel[] = [
  {
    id: '1',
    lawTitle: 'Qaanuunka 9aad: HADDA',
    description: 'Baro sababta dib-u-dhigashadu u tahay cadowga koowaad ee guusha. #Guulhage #Success',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: '1.2K',
    comments: '45'
  },
  {
    id: '2',
    lawTitle: 'Qaanuunka 11aad: DIIRADDA',
    description: 'Hal shay xoogga saar ilaa aad ka gaarto guusha dhabta ah. #Focus #Motivation',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: '856',
    comments: '22'
  },
  {
    id: '3',
    lawTitle: 'Qaanuunka 2aad: FIKIRKA',
    description: 'Maskaxdaadu waa mishiinka noloshaada haga. Beddel fikirkaaga. #Mindset #Success',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    likes: '2.4K',
    comments: '112'
  }
];

interface ReelsViewProps {
  onAwardXP: (amount: number) => void;
  reels: Reel[];
}

const ReelsView: React.FC<ReelsViewProps> = ({ onAwardXP, reels }) => {
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const awardedVideos = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observerOptions = {
      threshold: 0.8
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        const reelId = video.dataset.id;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
          video.ontimeupdate = () => {
            if (reelId && !awardedVideos.current.has(reelId)) {
              if (video.currentTime > (video.duration * 0.9)) {
                onAwardXP(10);
                awardedVideos.current.add(reelId);
                video.ontimeupdate = null;
              }
            }
          };
        } else {
          video.pause();
          video.ontimeupdate = null;
        }
      });
    }, observerOptions);

    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [onAwardXP, reels]);

  return (
    <div className="h-screen w-full bg-black relative snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
      {reels.map((reel) => (
        <div key={reel.id} className="h-screen w-full snap-start relative flex items-center justify-center">
          <video 
            ref={(el) => {
              if (el) videoRefs.current.set(reel.id, el);
              else videoRefs.current.delete(reel.id);
            }}
            data-id={reel.id}
            className="h-full w-full object-cover" 
            loop 
            muted 
            playsInline 
            src={reel.videoUrl}
          ></video>

          {/* Side Controls */}
          <div className="absolute right-4 bottom-32 flex flex-col space-y-6 items-center">
            <div className="flex flex-col items-center">
              <button className="bg-gray-800/50 p-4 rounded-full mb-1 text-white hover:bg-yellow-500 hover:text-black transition-colors">
                <i className="fas fa-heart text-xl"></i>
              </button>
              <span className="text-[10px] font-black text-white drop-shadow-lg">{reel.likes}</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-gray-800/50 p-4 rounded-full mb-1 text-white hover:bg-yellow-500 hover:text-black transition-colors">
                <i className="fas fa-comment text-xl"></i>
              </button>
              <span className="text-[10px] font-black text-white drop-shadow-lg">{reel.comments}</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-gray-800/50 p-4 rounded-full mb-1 text-white hover:bg-yellow-500 hover:text-black transition-colors">
                <i className="fas fa-share text-xl"></i>
              </button>
              <span className="text-[10px] font-black text-white drop-shadow-lg">Share</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
            <h3 className="font-black italic text-yellow-500 text-xl mb-2 drop-shadow-lg uppercase tracking-tighter">
              {reel.lawTitle}
            </h3>
            <p className="text-sm text-gray-200 line-clamp-2 max-w-sm drop-shadow-md font-medium leading-relaxed">
              {reel.description}
            </p>
          </div>
          
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-black text-sm">G</div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Guulhage Shorts</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelsView;
