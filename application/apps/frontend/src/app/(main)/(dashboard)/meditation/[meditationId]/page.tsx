"use client";

import React, { useState, useRef, useEffect } from "react";
import { use } from "react";
import { Card } from "@/components/ui/card";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Music } from "@/constants";
import type { MusicPlaylist, Song } from "@/types";

const MeditationIdPage = ({
  params,
}: {
  params: Promise<{ meditationId: string }>;
}) => {
  const { meditationId } = use(params);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get playlist with type safety
  const currentPlaylist =
    Music.find(
      (m) => m.playlist.toLowerCase() === meditationId.toLowerCase()
    ) || Music[0];

  const { playlist: name, songs } = currentPlaylist || {
    playlist: "",
    songs: [],
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleMetadata = () => setDuration(audio?.duration || 0);

    if (audio) {
      audio.addEventListener("loadedmetadata", handleMetadata);
      return () => audio.removeEventListener("loadedmetadata", handleMetadata);
    }
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio?.currentTime || 0);

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      return () => audio.removeEventListener("timeupdate", updateTime);
    }
  }, [currentSong]);

  // Type-safe event handlers
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1]);
      setIsPlaying(true);
    }
  };

  const handlePreviousSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex > 0) {
      setCurrentSong(songs[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="h-[calc(100vh-9rem)] dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black bg-gradient-to-b from-slate-400 to-white dark:text-white">
      <audio
        ref={audioRef}
        src={currentSong?.music}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onEnded={handleNextSong}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={`/assets/${currentPlaylist.thumbnail}`}
            alt={name}
            className="w-52 h-52 shadow-xl bg-slate-600 rounded-md"
          />
          <div>
            <p className="text-sm uppercase mb-2 font-mono">Playlist</p>
            <h1 className="text-5xl font-bold mb-4">{name}</h1>
            <p className="text-sm text-gray-600">{songs.length} tracks</p>
          </div>
        </div>

        <div className="mt-8">
          {songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => handlePlaySong(song)}
              className={`grid grid-cols-[0.1fr,2fr,1fr] items-center px-4 py-2 hover:bg-white/10 rounded-lg cursor-pointer ${
                currentSong?.id === song.id ? "bg-white/20" : ""
              }`}
            >
              <span className="text-gray-400">{index + 1}</span>
              <div className="flex items-center gap-4">
                <img
                  src={song.thumbnail}
                  alt={song.name}
                  className="w-10 h-10 bg-slate-600 rounded-md"
                />
                <span className="font-medium">{song.name}</span>
              </div>
              <span className="text-gray-400">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 dark:bg-neutral-900 border-t dark:border-neutral-800 border-neutral-500/50 p-4">
          <div className="max-w-6xl mx-auto grid grid-cols-3 items-center">
            <div className="flex items-center gap-4">
              <img
                src={currentSong.thumbnail}
                alt={currentSong.name}
                className="w-14 h-14 bg-slate-600 rounded-md"
              />
              <div>
                <p className="font-medium">{currentSong.name}</p>
                <p className="text-sm text-gray-400">{name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-6">
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={handlePreviousSong}
                >
                  <SkipBack size={20} />
                </button>
                <button
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black"
                  onClick={() => {
                    if (currentSong) {
                      setIsPlaying(!isPlaying);
                    }
                  }}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={handleNextSong}
                >
                  <SkipForward size={20} />
                </button>
              </div>
              <div className="w-full flex items-center gap-2 text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <span>{currentSong?.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button onClick={toggleMute}>
                {isMuted ? (
                  <VolumeX size={20} className="text-gray-400" />
                ) : (
                  <Volume2 size={20} className="text-gray-400" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MeditationIdPage;
