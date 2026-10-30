import React, { useRef, useEffect, useState } from 'react';

export default function HeroTruckAnimation({
  sheets = [
    '/assets/caminhao/novo-caminhao-sheet-0.jpg',
    '/assets/caminhao/novo-caminhao-sheet-1.jpg',
    '/assets/caminhao/novo-caminhao-sheet-2.jpg',
    '/assets/caminhao/novo-caminhao-sheet-3.jpg',
    '/assets/caminhao/novo-caminhao-sheet-4.jpg',
  ],
  columns = 4,
  rows = 3,
  frameCount = 60,
  frameWidth = 960,
  frameHeight = 540,
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Preload all 5 sprite sheets
  useEffect(() => {
    let loadedCount = 0;
    const imgs = sheets.map((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === sheets.length) {
          setIsLoaded(true);
        }
      };
      return img;
    });
    imagesRef.current = imgs;
  }, [sheets]);

  // Draw frame on canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const clientW = canvas.clientWidth || 960;
    const clientH = canvas.clientHeight || 540;
    const w = Math.max(Math.round(clientW * dpr), 1);
    const h = Math.max(Math.round(clientH * dpr), 1);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const framesPerSheet = columns * rows; // 12
    const sheetIdx = Math.floor(frameIndex / framesPerSheet);
    const img = imagesRef.current[sheetIdx];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const frameInSheet = frameIndex % framesPerSheet;
    const col = frameInSheet % columns;
    const row = Math.floor(frameInSheet / columns);

    const sx = col * frameWidth;
    const sy = row * frameHeight;

    const scale = Math.max(w / frameWidth, h / frameHeight);
    const dw = frameWidth * scale;
    const dh = frameHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, frameWidth, frameHeight, dx, dy, dw, dh);
  };

  // Automatic Smooth Playback Loop (FPS ~ 24)
  useEffect(() => {
    if (!isLoaded || !isPlaying) return;

    const fpsInterval = 1000 / 24; // 24 FPS
    let animationId;

    const loop = (timestamp) => {
      animationId = window.requestAnimationFrame(loop);

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed > fpsInterval) {
        lastTimeRef.current = timestamp - (elapsed % fpsInterval);
        frameRef.current = (frameRef.current + 1) % frameCount;
        drawFrame(frameRef.current);
      }
    };

    animationId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [isLoaded, isPlaying, frameCount]);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded]);

  return (
    <div className="w-full bg-white border-b border-slate-200 overflow-hidden py-4 sm:py-6">
      <div className="mx-auto max-w-5xl px-4">
        
        {/* Canvas Video Container */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-200">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
            title="Clique para pausar ou reproduzir o vídeo"
          />

          {/* Overlay Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Frota Max Frios em Operação</span>
          </div>

          {/* Play/Pause pill at bottom */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              type="button"
              className="text-[11px] font-extrabold text-blue-600 hover:text-blue-700 uppercase"
            >
              {isPlaying ? '⏸ Pausar' : '▶ Reproduzir'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
