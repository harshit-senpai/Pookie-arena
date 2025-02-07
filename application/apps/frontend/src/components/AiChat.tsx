"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, StopCircle, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";

export const AITherapist = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<
    { role: "ai" | "user"; content: string }[]
  >([]);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startSession = async () => {
    setIsSessionStarted(true);
    const greeting =
      "Hello, I'm your AI therapist. What would you like to talk about today?";
    setMessages([{ role: "ai", content: greeting }]);
    await playTTS(greeting);
  };

  const visualize = (stream: MediaStream) => {
    if (!canvasRef.current) return;

    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 64;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!analyserRef.current || !ctx) return;

      animationFrameRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        ctx.fillStyle = "#FFB800";
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };

    draw();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        transcribeAudio(blob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      visualize(stream);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [...prev, { role: "user", content: data.text }]);
        getAIResponse(data.text);
      }
    } catch (err) {
      console.error("Transcription failed:", err);
    }
  };

  const getAIResponse = async (userMessage: string) => {
    setIsAIResponding(true);
    try {
      const therapistRes = await fetch("/api/ai/therapist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const { content } = await therapistRes.json();
      setMessages((prev) => [...prev, { role: "ai", content }]);
      setIsAIResponding(true);
      await playTTS(content);
      setIsAIResponding(false);
    } catch (err) {
      console.error("Failed to get AI response:", err);
    } finally {
      setIsAIResponding(false);
    }
  };

  const playTTS = async (text: string) => {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await res.blob();
      const audio = new Audio(URL.createObjectURL(audioBlob));
      await audio.play();
    } catch (err) {
      console.error("TTS playback failed:", err);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center h-full">
      <Card className="w-full max-w-2xl mx-auto bg-transparent border-none shadow-none">
        <CardContent className="py-4">
          {!isSessionStarted ? (
            <div className="flex flex-col items-center space-y-10">
              <div className="h-48 w-48 rounded-full bg-[#FFB800]" />
              <Button
                onClick={startSession}
                className="max-w-xl mx-auto bg-blue-500 hover:bg-blue-500/90 text-white"
              >
                begin session
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-8">
              {isRecording && (
                <p className="text-gray-600 text-sm">listening...</p>
              )}
              {isAIResponding && (
                <p className="text-gray-600 text-sm">AI is responding...</p>
              )}
              <div className="h-48 w-48 rounded-full bg-[#FFB800]" />
              <div
                className={`w-full h-24 flex items-center justify-center ${
                  isRecording ? "block" : "hidden"
                }`}
              >
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={60}
                  className={cn(
                    "w-full max-w-md transition-opacity duration-200",
                    isRecording ? "block" : "hidden"
                  )}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {isSessionStarted && (
            <div className="flex justify-center space-x-8 w-full">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isAIResponding}
                size="icon"
                variant="outline"
                className={cn(
                  "flex items-center gap-2 rounded-full transition-colors",
                  isRecording && "border-[#FFB800] border-2"
                )}
              >
                {isRecording ? <Square size={20} /> : <Mic size={20} />}
              </Button>
              <Button
                onClick={() => setIsSessionStarted(false)}
                disabled={isAIResponding}
                size="icon"
                variant="outline"
                className="rounded-full"
              >
                <X size={20} />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
