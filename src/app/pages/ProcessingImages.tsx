import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Sparkles, Eye, Zap, Brain, CheckCircle2, Camera, BookImage } from "lucide-react";

interface ProcessingStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  duration: number;
}

const PROCESSING_STEPS: ProcessingStep[] = [
  {
    id: "exif",
    label: "EXIF 메타데이터 분석 중",
    icon: <Eye className="w-5 h-5" />,
    duration: 1500,
  },
  {
    id: "yolo",
    label: "YOLOv8 객체 인식 실행 중",
    icon: <Zap className="w-5 h-5" />,
    duration: 2500,
  },
  {
    id: "quality",
    label: "사진 품질 평가 중",
    icon: <Brain className="w-5 h-5" />,
    duration: 2000,
  },
  {
    id: "selection",
    label: "권장 사진 선별 중",
    icon: <CheckCircle2 className="w-5 h-5" />,
    duration: 1500,
  },
];

export function ProcessingImages() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [processedImages, setProcessedImages] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalImages = 18; // Mock total images

  useEffect(() => {
    const totalDuration = PROCESSING_STEPS.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTime = 0;

    const interval = setInterval(() => {
      elapsedTime += 50;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Calculate current step
      let stepDuration = 0;
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        stepDuration += PROCESSING_STEPS[i].duration;
        if (elapsedTime <= stepDuration) {
          setCurrentStepIndex(i);
          break;
        }
      }

      // Simulate processing images
      const imagesProcessed = Math.floor((newProgress / 100) * totalImages);
      setProcessedImages(imagesProcessed);

      if (elapsedTime >= totalDuration) {
        clearInterval(interval);
        setIsCompleted(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const currentStep = PROCESSING_STEPS[currentStepIndex];

  const handleContinue = () => {
    navigate("/image-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 font-sans text-gray-900">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Processing Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-2xl p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex flex-col items-center justify-center mb-6">
              <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-4 rounded-xl mb-3 animate-pulse shadow-lg shadow-blue-500/30 transition-transform">
                <BookImage className="w-10 h-10 text-white" />
              </div>
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-[24px]">Photogram</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI가 사진을 분석하고 있습니다
            </h1>
            <p className="text-gray-600 text-lg">
              최고의 순간을 찾기 위해 각 사진을 꼼꼼히 검토 중입니다
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm">
              <span className="font-bold text-gray-700">{Math.round(progress)}% 완료</span>
              <span className="text-gray-500">
                {processedImages} / {totalImages} 장 처리됨
              </span>
            </div>
          </div>

          {/* Current Step */}
          <div className="mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  {currentStep.icon}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900">{currentStep.label}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-xs text-gray-500">처리 중...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            {PROCESSING_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    isCurrent
                      ? "bg-blue-50 border-2 border-blue-200"
                      : isCompleted
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 border border-gray-200 opacity-60"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md animate-pulse"
                        : isCompleted
                        ? "bg-green-500 text-white shadow-sm"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${
                        isCurrent
                          ? "text-blue-900"
                          : isCompleted
                          ? "text-green-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {isCompleted && (
                    <div className="flex-shrink-0">
                      <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        완료
                      </div>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        진행 중
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Info Text */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              잠시만 기다려주세요. 더 나은 포토북을 위해 AI가 열심히 작업 중입니다.
            </p>
          </div>

          {/* Complete Button */}
          {isCompleted && (
            <div className="mt-8 text-center">
              <button
                onClick={handleContinue}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                분석 결과 확인하기
              </button>
            </div>
          )}
        </div>

        {/* Fun Facts Section */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-2">💡 Tip</p>
              <p className="text-sm text-gray-600">
                AI는 초점, 구도, 노출, 얼굴 표정 등 15가지 이상의 요소를 분석하여 최고의 A-Cut을 선별합니다.
                흔들림이나 눈 감음이 감지된 사진은 비권장 목록에 포함됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
