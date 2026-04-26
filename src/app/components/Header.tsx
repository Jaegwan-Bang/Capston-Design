import { Link, useLocation } from "react-router";
import { BookImage } from "lucide-react";

export function Header() {
  const location = useLocation();

  const steps = [
    { path: "/upload", label: "업로드", number: 1 },
    { path: "/analysis", label: "분석", number: 2 },
    { path: "/chapters", label: "챕터 구성", number: 3 },
    { path: "/editor", label: "편집", number: 4 },
    { path: "/preview", label: "미리보기", number: 5 },
    { path: "/export", label: "완료", number: 6 },
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const isInProcess = currentStepIndex >= 0;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <BookImage className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Photogram
            </span>
          </Link>

          {isInProcess && (
            <nav className="flex items-center gap-6 hidden md:flex">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.path} className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors duration-300 ${
                        isCurrent
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : isCompleted
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isCurrent ? "text-blue-600" : isCompleted ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </nav>
          )}

          {!isInProcess && (
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
                로그인/회원가입
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}