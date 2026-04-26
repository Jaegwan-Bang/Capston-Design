import image_73d210a63d9229d94f05ecba056d763508d69ed1 from 'figma:asset/73d210a63d9229d94f05ecba056d763508d69ed1.png'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2, Check, Brain, Eye, Smile, FileText, MapPin, Sparkles } from "lucide-react";
import { Header } from "../components/Header";

export function Analysis() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const analysisSteps = [
    {
      id: "face",
      icon: Smile,
      title: "인물 및 감정 점수 산출",
      description: "표정 기반 감정 점수를 산출하고 인물간의 관계를 추론합니다",
    },
    {
      id: "ocr",
      icon: FileText,
      title: "이미지 내 텍스트 추출 (OCR)",
      description: "간판, 티켓의 텍스트를 추출해 정확한 장소와 이벤트를 파악합니다",
    },
    {
      id: "cluster",
      icon: MapPin,
      title: "시간/장소 기반 이벤트 그룹핑",
      description: "메타데이터 기반 시공간 클러스터링으로 자연스러운 챕터를 생성합니다",
    },
    {
      id: "story",
      icon: Sparkles,
      title: "감성 서사 구조 생성",
      description: "GPT-4o가 분석 데이터를 엮어 한 편의 나레이션과 스토리를 완성합니다",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsCompleted(true);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [analysisSteps.length]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "complete";
    if (index === currentStep) return "in-progress";
    return "pending";
  };

  const progressPercentage = Math.round(((currentStep + 1) / analysisSteps.length) * 100);

  const handleContinue = () => {
    navigate("/chapters");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl">
          
          <div className="text-center mb-12 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 blur-3xl rounded-full mix-blend-multiply animate-blob" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/20 blur-3xl rounded-full mix-blend-multiply animate-blob animation-delay-2000 translate-x-4" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6 src={image_73d210a63d9229d94f05ecba056d763508d69ed1}">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/30" />
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <Brain className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-600" style={{ color: 'url(#gradient)' }} />
                  <svg width="0" height="0">
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop stopColor="#2563eb" offset="0%" />
                      <stop stopColor="#9333ea" offset="100%" />
                    </linearGradient>
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">AI가 추억을 분석하고 있습니다</h1>
              <p className="text-gray-500 text-lg max-w-lg mx-auto">
                가장 완벽한 포토북을 구성하기 위해 사진의 모든 요소를 세밀하게 확인 중입니다.
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-3xl p-8 mb-10 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20" />
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-700 text-sm tracking-wide">진행 상황</span>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {progressPercentage}
                </span>
                <span className="font-semibold text-gray-400">%</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="w-full h-full bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Analysis Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisSteps.map((step, index) => {
              const status = getStepStatus(index);
              const StepIcon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-3xl p-6 transition-all duration-500 border ${
                    status === "in-progress"
                      ? "border-blue-200 shadow-lg shadow-blue-500/10 scale-105 z-10 ring-1 ring-blue-100"
                      : status === "complete"
                      ? "border-green-100 bg-green-50/20 opacity-80"
                      : "border-gray-100 opacity-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                        status === "complete"
                          ? "bg-green-100 text-green-600 shadow-inner"
                          : status === "in-progress"
                          ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {status === "complete" ? (
                        <Check className="w-6 h-6" />
                      ) : status === "in-progress" ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className={`font-bold ${status === 'pending' ? 'text-gray-600' : 'text-gray-900'}`}>
                          {step.title}
                        </h3>
                        {status === "in-progress" && (
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full animate-pulse">분석 중</span>
                        )}
                        {status === "complete" && (
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">완료</span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${status === 'pending' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            {!isCompleted && (
              <p className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-gray-200 px-6 py-3 rounded-full text-sm text-gray-600 shadow-sm font-medium">
                <span className="animate-bounce">⏳</span> 예상 소요 시간: 약 2~3분. 잠시만 기다려주세요...
              </p>
            )}
            {isCompleted && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleContinue}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  서사 구조 확인하기
                </button>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}