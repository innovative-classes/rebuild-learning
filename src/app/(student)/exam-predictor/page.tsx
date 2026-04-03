import { Target } from "lucide-react";

export default function ExamPredictorPage() {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Target className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-xl font-bold text-green-900 mb-2">Exam Predictor</h1>
      <p className="text-sm text-green-600/60 mb-6">
        Our AI-powered exam prediction tool will help you estimate your rank and college
        admission chances based on your mock test scores. Launching soon.
      </p>
      <span className="inline-flex items-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
        Coming Soon
      </span>
    </div>
  );
}
