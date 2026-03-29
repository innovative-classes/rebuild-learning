"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  optionAText: string;
  optionBText: string;
  optionCText: string;
  optionAScore: number;
  optionBScore: number;
  optionCScore: number;
}

interface AttemptData {
  attemptId: string;
  questions: Question[];
  answers: Record<string, string>;
}

export default function QuizAttemptPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<AttemptData | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      const res = await fetch(`/api/assessments/${slug}/start`, { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setAnswers(json.answers || {});
        // Resume from last unanswered question
        const answered = Object.keys(json.answers || {}).length;
        if (answered > 0 && answered < json.questions.length) {
          setCurrentQ(answered);
        }
      }
      setLoading(false);
    }
    loadQuiz();
  }, [slug]);

  async function selectAnswer(questionId: string, option: string) {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    // Save to server
    await fetch(`/api/assessments/${slug}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attemptId: data?.attemptId,
        questionId,
        selectedOption: option,
      }),
    });
  }

  async function handleSubmit() {
    if (!data) return;
    setSubmitting(true);

    const res = await fetch(`/api/assessments/${slug}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId: data.attemptId }),
    });

    if (res.ok) {
      router.push(`/assessments/${slug}/report`);
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-2xl text-center py-24">
        <p className="text-neutral-500">Unable to load quiz. Please try again.</p>
        <Link href="/assessments" className="text-sm text-neutral-900 hover:underline mt-2 inline-block">
          Back to assessments
        </Link>
      </div>
    );
  }

  const question = data.questions[currentQ];
  const totalQuestions = data.questions.length;
  const selectedOption = answers[question.id];
  const allAnswered = Object.keys(answers).length === totalQuestions;

  const options = [
    { label: "A", text: question.optionAText, value: "A" },
    { label: "B", text: question.optionBText, value: "B" },
    { label: "C", text: question.optionCText, value: "C" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <Link href={`/assessments/${slug}`} className="text-sm text-neutral-500 hover:text-neutral-900 transition">
          ← Back to module
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-900">
            Question {currentQ + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-neutral-400">
            {Object.keys(answers).length}/{totalQuestions} answered
          </span>
        </div>
        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 mb-6">
        <p className="text-lg font-medium text-neutral-900 leading-relaxed mb-8">
          {question.questionText}
        </p>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectAnswer(question.id, opt.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedOption === opt.value
                  ? "border-red-600 bg-red-50"
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    selectedOption === opt.value
                      ? "bg-red-600 text-white"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {opt.label}
                </span>
                <span className="text-sm text-neutral-700 leading-relaxed">{opt.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {currentQ < totalQuestions - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            disabled={!selectedOption}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit & See Results"
            )}
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {data.questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentQ(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentQ
                ? "bg-red-600 scale-125"
                : answers[q.id]
                ? "bg-neutral-400"
                : "bg-neutral-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
