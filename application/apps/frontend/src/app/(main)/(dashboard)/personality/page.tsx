"use client";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/utils/apiClient";

type Question = {
  id: string;
  text: string;
};

export default function QuizPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [gender, setGender] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await apiClient.getQuizQuestions(currentPage);
        setQuestions(res.questions);
        setTotalQuestions(res.totalQuestions);
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    };
    loadQuestions();
  }, [currentPage]);

  const handleSubmit = async () => {
    const responseArray = Object.entries(responses).map(
      ([questionId, score]) => ({
        questionId,
        score,
      })
    );

    try {
      const result = await apiClient.submitQuiz({
        responses: responseArray,
        gender: gender,
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <section className="h-[calc(100vh-9rem)]">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full transition-all"
              style={{
                width: `${((currentPage * 5) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {questions.map((question) => (
          <div key={question.id} className="mb-8">
            <h3 className="text-lg mb-4">{question.text}</h3>
            <Slider
              defaultValue={[2.5]}
              min={0}
              max={5}
              step={0.1}
              className="bg-blue-500"
              onValueChange={(value) =>
                setResponses((prev) => ({ ...prev, [question.id]: value[0] }))
              }
            />
            <div className="flex justify-between text-sm mt-2">
              <span>Strongly Disagree</span>
              <span>Neutral</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        ))}

        {currentPage * 5 >= totalQuestions ? (
          <div className="mt-8">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mb-4 p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <Button onClick={handleSubmit}>Submit Quiz</Button>
          </div>
        ) : (
          <Button
            className="mt-4 bg-blue-500"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </section>
  );
}
