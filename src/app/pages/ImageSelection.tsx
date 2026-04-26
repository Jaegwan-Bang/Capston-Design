import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import {
  Check,
  X,
  Eye,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Info,
  Camera,
  BookImage,
} from "lucide-react";

interface ImageItem {
  id: string;
  url: string;
  aiRecommended: boolean;
  qualityScore: number;
  reason: string;
  selected: boolean;
}

const unsplashUrls = [
  "https://images.unsplash.com/photo-1664627297293-baff5469bdab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", // Jeju landscape
  "https://images.unsplash.com/photo-1740329289227-9a12b340bed0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", // Mountain
  "https://images.unsplash.com/photo-1659695089950-96e6ea2d94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", // Beach
  "https://images.unsplash.com/photo-1682979358243-816a75830f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", // Cafe
  "https://images.unsplash.com/photo-1758613171487-37016cf51313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", // Friends
  "https://images.unsplash.com/photo-1771970574223-24e53a0c5a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", // Airport
  "https://images.unsplash.com/photo-1689832832238-7d04910c63d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", // BBQ
];

export function ImageSelection() {
  const navigate = useNavigate();
  const [expandRecommended, setExpandRecommended] =
    useState(true);
  const [expandNotRecommended, setExpandNotRecommended] =
    useState(true);

  // Generate mock images using real Unsplash URLs
  const [images, setImages] = useState<ImageItem[]>([
    ...Array.from({ length: 12 }, (_, i) => ({
      id: `rec-${i + 1}`,
      url: unsplashUrls[i % unsplashUrls.length],
      aiRecommended: true,
      qualityScore: 85 + Math.floor(Math.random() * 15),
      reason: [
        "선명한 초점",
        "자연스러운 미소",
        "아름다운 구도",
        "적절한 노출",
      ][i % 4],
      selected: true,
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `not-rec-${i + 1}`,
      url: unsplashUrls[(i + 3) % unsplashUrls.length],
      aiRecommended: false,
      qualityScore: 30 + Math.floor(Math.random() * 30),
      reason: [
        "흔들림 감지",
        "중복된 구도",
        "노출 부족",
        "초점 흐림",
      ][i % 4],
      selected: false,
    })),
  ]);

  const toggleImage = (id: string) => {
    setImages(
      images.map((img) =>
        img.id === id
          ? { ...img, selected: !img.selected }
          : img,
      ),
    );
  };

  const toggleAll = (recommended: boolean, select: boolean) => {
    setImages(
      images.map((img) =>
        img.aiRecommended === recommended
          ? { ...img, selected: select }
          : img,
      ),
    );
  };

  const recommendedImages = useMemo(
    () => images.filter((img) => img.aiRecommended),
    [images],
  );
  const notRecommendedImages = useMemo(
    () => images.filter((img) => !img.aiRecommended),
    [images],
  );
  const selectedCount = useMemo(
    () => images.filter((img) => img.selected).length,
    [images],
  );

  const handleContinue = () => {
    navigate("/analysis");
  };

  const handleUseRecommended = () => {
    // 추천 사진만 선택하고 비추천은 모두 해제
    setImages(
      images.map((img) => ({
        ...img,
        selected: img.aiRecommended,
      })),
    );
    // 바로 서사 생성 단계로 이동
    navigate("/analysis");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-20">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex flex-col items-center justify-center mb-6">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-xl mb-3 transition-transform">
              <BookImage className="w-12 h-12 text-white" />
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-[24px]">
              Photogram
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            이미지 선별 결과
          </h1>
          <p className="text-gray-600 text-lg">
            AI가 사진 품질을 분석하여 A-Cut을 선별했습니다.
            최종적으로 사용할 사진을 결정해주세요.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                <ImageIcon className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm font-bold text-gray-500 mb-1">
                전체 사진
              </p>
              <p className="text-3xl font-extrabold text-gray-900">
                {images.length}
                <span className="text-xl font-semibold text-gray-400 ml-1">
                  장
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-3">
                <ThumbsUp className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm font-bold text-gray-500 mb-1">
                추천 (A-Cut)
              </p>
              <p className="text-3xl font-extrabold text-green-600">
                {recommendedImages.length}
                <span className="text-xl font-semibold text-green-400 ml-1">
                  장
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-3">
                <ThumbsDown className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-sm font-bold text-gray-500 mb-1">
                비추천
              </p>
              <p className="text-3xl font-extrabold text-orange-500">
                {notRecommendedImages.length}
                <span className="text-xl font-semibold text-orange-400 ml-1">
                  장
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-bold text-gray-500 mb-1">
                최종 선택
              </p>
              <p className="text-3xl font-extrabold text-blue-600">
                {selectedCount}
                <span className="text-xl font-semibold text-blue-400 ml-1">
                  장
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommended Images */}
        <div className="bg-white rounded-3xl border border-green-100 mb-10 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="w-full px-8 py-6 flex items-center justify-between bg-green-50/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900">
                  추천 사진{" "}
                  <span className="text-green-600 ml-2">
                    ({recommendedImages.length})
                  </span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  초점, 구도, 노출이 훌륭한 베스트 컷입니다
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleAll(true, true)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              >
                모두 선택
              </button>
              <button
                onClick={() => toggleAll(true, false)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                선택 해제
              </button>
              <div className="w-px h-8 bg-gray-200 mx-2" />
              <button
                onClick={() =>
                  setExpandRecommended(!expandRecommended)
                }
                className="hover:bg-green-50/50 transition-colors rounded-lg p-1"
              >
                {expandRecommended ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {expandRecommended && (
            <div className="p-8 border-t border-green-100">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {recommendedImages.map((img) => (
                  <div
                    key={img.id}
                    className={`relative aspect-square rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden ${
                      img.selected
                        ? "ring-4 ring-green-500 shadow-lg shadow-green-500/20 transform -translate-y-1"
                        : "ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300"
                    }`}
                    onClick={() => toggleImage(img.id)}
                  >
                    <img
                      src={img.url}
                      alt="recommendation"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Dark gradient overlay at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 opacity-80" />

                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium border border-white/10 shadow-sm">
                      <Eye className="w-3 h-3 text-green-300" />
                      {img.qualityScore}점
                    </div>

                    <div
                      className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        img.selected
                          ? "bg-green-500 text-white scale-110"
                          : "bg-white/80 backdrop-blur-sm text-gray-400 border border-gray-200"
                      }`}
                    >
                      {img.selected && (
                        <Check className="w-4 h-4 font-bold" />
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-xs font-medium truncate drop-shadow-md">
                        ✨ {img.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Not Recommended Images */}
        <div className="bg-white rounded-3xl border border-orange-100 mb-12 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md opacity-90 hover:opacity-100">
          <div className="w-full px-8 py-6 flex items-center justify-between bg-orange-50/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                <ThumbsDown className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900">
                  비추천 사진{" "}
                  <span className="text-orange-600 ml-2">
                    ({notRecommendedImages.length})
                  </span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  흔들림이나 눈 감음, 중복 등이 감지된
                  사진입니다
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleAll(false, true)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
              >
                모두 선택
              </button>
              <button
                onClick={() => toggleAll(false, false)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                선택 해제
              </button>
              <div className="w-px h-8 bg-gray-200 mx-2" />
              <button
                onClick={() =>
                  setExpandNotRecommended(!expandNotRecommended)
                }
                className="hover:bg-orange-50/50 transition-colors rounded-lg p-1"
              >
                {expandNotRecommended ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {expandNotRecommended && (
            <div className="p-8 border-t border-orange-100">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {notRecommendedImages.map((img) => (
                  <div
                    key={img.id}
                    className={`relative aspect-square rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden ${
                      img.selected
                        ? "ring-4 ring-orange-500 shadow-lg shadow-orange-500/20 transform -translate-y-1"
                        : "ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300 grayscale hover:grayscale-0"
                    }`}
                    onClick={() => toggleImage(img.id)}
                  >
                    <img
                      src={img.url}
                      alt="not recommended"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 opacity-80" />

                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium border border-white/10 shadow-sm">
                      <AlertCircle className="w-3 h-3 text-orange-300" />
                      {img.qualityScore}점
                    </div>

                    <div
                      className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        img.selected
                          ? "bg-orange-500 text-white scale-110"
                          : "bg-white/80 backdrop-blur-sm text-gray-400 border border-gray-200"
                      }`}
                    >
                      {img.selected && (
                        <Check className="w-4 h-4 font-bold" />
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-xs font-medium truncate drop-shadow-md text-orange-200">
                        ⚠️ {img.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-200 gap-4">
          <button
            onClick={() => navigate("/upload")}
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:shadow-sm transition-all border border-gray-200 w-full sm:w-auto"
          >
            이전 단계로
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-3 bg-blue-50 text-blue-800 px-6 py-3 rounded-2xl font-medium border border-blue-100 w-full sm:w-auto justify-center">
              <Info className="w-5 h-5 text-blue-500" />
              <span>
                총{" "}
                <strong className="text-xl font-bold">
                  {selectedCount}
                </strong>
                장 선택됨
              </span>
            </div>

            

            <button
              onClick={handleContinue}
              disabled={selectedCount === 0}
              className={`px-10 py-4 font-bold rounded-2xl transition-all w-full sm:w-auto ${
                selectedCount > 0
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              선택 완료 및 서사 분석
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}