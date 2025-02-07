"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";

export const AITherapist = () => {
  const [recording, setRecording] = useState(false);
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Initialize microphone
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };
    });
  }, []);

  const handleSession = async () => {
    if (recording) {
      mediaRecorder.current?.stop();
      setRecording(false);

      try {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });

        // Convert to WAV format
        const wavBlob = await convertToWav(audioBlob);
        const formData = new FormData();
        formData.append("audio", wavBlob, "recording.wav");

        // Speech to Text
        const sttRes = await fetch("/api/speech-to-text", {
          method: "POST",
          body: formData,
        });
        const { text } = await sttRes.json();

        // Get AI Response
        const therapistRes = await fetch("/api/ai/therapist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const { content } = await therapistRes.json();

        // Update conversation
        setConversation((prev) => [
          ...prev,
          { role: "user", content: text },
          { role: "assistant", content },
        ]);
      } catch (error) {
        console.error("Session error:", error);
      }
    } else {
      audioChunks.current = [];
      mediaRecorder.current?.start();
      setRecording(true);
    }
  };

  // Add WebM to WAV conversion
  const convertToWav = async (webmBlob: Blob): Promise<Blob> => {
    const audioContext = new AudioContext();
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Conversion logic from previous answers
    const wavBuffer = audioBufferToWav(audioBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Button
        onClick={handleSession}
        className="rounded-full size-20"
        variant={recording ? "destructive" : "default"}
      >
        {recording ? <StopCircle size={24} /> : <Mic size={24} />}
      </Button>

      <div className="mt-4 space-y-4 w-full max-w-2xl">
        {conversation.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-4 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
