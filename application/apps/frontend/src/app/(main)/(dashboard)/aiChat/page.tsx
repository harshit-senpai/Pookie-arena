"use client";

import { AITherapist } from "@/components/AiChat";
import { personalities } from "@/types";
import { useSearchParams } from "next/navigation";

export default function CallPage() {
  const searchParams = useSearchParams();
  const personalityId = searchParams.get("personality");
  const personality =
    personalities.find((p) => p.id === personalityId) || personalities[0];

  return (
    <div className="h-[calc(100vh-9rem)]">
      <AITherapist personality={personality}/>
    </div>
  );
}
