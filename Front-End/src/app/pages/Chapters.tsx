import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, MapPin, Image as ImageIcon, Edit2, Trash2, Plus, Sparkles, Navigation, Book } from "lucide-react";
import { Header } from "../components/Header";

export function Chapters() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "공항 출발",
      date: "2026년 3월 8일",
      location: "인천국제공항",
      photos: 12,
      narration: "설레는 마음을 담아 제주도로 향하는 첫걸음",
      tags: ["공항", "출발", "여행 시작"],
      thumbnail: "https://images.unsplash.com/photo-1771970574223-24e53a0c5a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    },
    {
      id: 2,
      title: "제주 도착 & 렌트카",
      date: "2026년 3월 8일",
      location: "제주국제공항",
      photos: 8,
      narration: "푸른 제주 하늘이 우리를 반겼다",
      tags: ["공항", "렌트카", "제주"],
      thumbnail: "https://images.unsplash.com/photo-1664627297293-baff5469bdab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    },
    {
      id: 3,
      title: "협재 해수욕장",
      date: "2026년 3월 8일",
      location: "제주 협재해수욕장",
      photos: 24,
      narration: "에메랄드빛 바다와 하얀 모래사장, 그리고 우리의 웃음소리",
      tags: ["바다", "풍경", "해변"],
      thumbnail: "https://images.unsplash.com/photo-1659695089950-96e6ea2d94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-24">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6 shadow-sm">
            <Navigation className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">챕터 구성 확인</h1>
          <p className="text-gray-600 text-lg">
            AI가 사진의 시간과 위치를 분석하여 자동으로 나눈 챕터입니다. 원하는 대로 수정해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chapter List */}
          <div className="lg:col-span-2 space-y-6">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative"
              >
                <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                  {/* Thumbnail Side */}
                  <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 relative group-hover:shadow-md transition-shadow">
                    <img src={chapter.thumbnail} alt={chapter.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 bg-black/30 backdrop-blur-md rounded-lg flex items-center gap-1.5 border border-white/20">
                      <ImageIcon className="w-3 h-3" />
                      {chapter.photos}장
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{chapter.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 mb-4 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{chapter.date}</span>
                          </div>
                          <div className="w-px h-4 bg-gray-200" />
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{chapter.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 mb-4 relative">
                      <Sparkles className="w-4 h-4 text-blue-400 absolute top-3 left-3" />
                      <p className="text-gray-700 italic font-medium pl-8">
                        "{chapter.narration}"
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {chapter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-gray-100/80 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full py-8 border-2 border-dashed border-gray-300 bg-white rounded-3xl text-gray-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 font-bold group">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-lg tracking-wide">새 챕터 추가하기</span>
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Chapter Summary */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Book className="w-4 h-4" />
                </div>
                포토북 요약
              </h3>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">총 챕터 수</span>
                  <span className="text-gray-900 font-bold bg-gray-50 px-3 py-1 rounded-lg">{chapters.length}개</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">총 사진 수</span>
                  <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg">{chapters.reduce((sum, ch) => sum + ch.photos, 0)}장</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">여행 기간</span>
                  <span className="text-gray-900 font-bold bg-gray-50 px-3 py-1 rounded-lg">3박 4일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">예상 페이지</span>
                  <span className="text-gray-900 font-bold bg-gray-50 px-3 py-1 rounded-lg">약 40페이지</span>
                </div>
              </div>
            </div>

            {/* Travel Map Preview */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                  <MapPin className="w-4 h-4" />
                </div>
                여행 경로
              </h3>
              <div className="aspect-video bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-blue-100/30" style={{ backgroundImage: 'radial-gradient(#93c5fd 1px, transparent 0)', backgroundSize: '15px 15px' }} />
                <div className="text-center font-bold relative z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-white/50 group-hover:scale-105 transition-transform">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm text-gray-700">GPS 기반 경로 맵 뷰</p>
                </div>
              </div>
              <p className="text-xs font-medium text-gray-500 mt-4 text-center">
                EXIF GPS 데이터를 기반으로 자동으로 시각화됩니다
              </p>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h4 className="font-bold text-lg mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">🤖</span>
                Insights
              </h4>
              <ul className="text-sm font-medium space-y-4">
                <li className="flex gap-3 items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="text-blue-200">✨</span> 가장 많은 사진: <span className="font-bold">협재 해수욕장</span>
                </li>
                <li className="flex gap-3 items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="text-blue-200">🎨</span> 주요 테마: <span className="font-bold">바다, 카페, 음식</span>
                </li>
                <li className="flex gap-3 items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="text-blue-200">😊</span> 감정 점수: <span className="font-bold">긍정 92%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200 gap-4">
          <button
            onClick={() => navigate("/analysis")}
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:shadow-sm transition-all border border-gray-200 w-full sm:w-auto"
          >
            이전
          </button>
          <button
            onClick={() => navigate("/editor")}
            className="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>레이아웃 편집 시작</span>
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}