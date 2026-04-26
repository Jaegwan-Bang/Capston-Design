import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, BookOpen, Smartphone, Download, Share2, MapPin } from "lucide-react";
import { Header } from "../components/Header";

export function Preview() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"spread" | "single">("spread");
  const totalPages = 42;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(viewMode === "spread" ? currentPage + 2 : currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(viewMode === "spread" ? Math.max(1, currentPage - 2) : currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-gray-900 pb-24">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 text-blue-600 mb-6 shadow-sm border border-blue-50">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">포토북 미리보기</h1>
          <p className="text-gray-600 text-lg">
            완성된 포토북을 책을 넘기듯 감상해보세요.
          </p>
        </div>

        {/* Preview Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-10 flex flex-wrap items-center justify-between gap-4 shadow-sm mx-auto max-w-5xl">
          <div className="flex items-center gap-6">
            <div className="flex bg-gray-100 p-1.5 rounded-xl">
              <button
                onClick={() => setViewMode("spread")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                  viewMode === "spread"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                펼침
              </button>
              <button
                onClick={() => setViewMode("single")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                  viewMode === "single"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                단일
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 border-l border-gray-200 pl-6">
              <button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors">
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-bold text-gray-700 w-12 text-center">100%</span>
              <button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors">
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 shadow-sm hover:text-blue-600 hover:scale-105"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-gray-700 tracking-widest">
              {currentPage}
              {viewMode === "spread" && currentPage < totalPages && ` - ${currentPage + 1}`} 
              <span className="text-gray-400 mx-2">/</span> 
              {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages}
              className={`p-2 rounded-full transition-all ${
                currentPage >= totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 shadow-sm hover:text-blue-600 hover:scale-105"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area - Realistic Book Effect */}
        <div className="relative mb-12 flex justify-center perspective-[1500px]">
          
          <div className="max-w-[1000px] w-full relative">
            {/* Book Drop Shadow */}
            <div className="absolute -bottom-8 left-10 right-10 h-10 bg-black/10 blur-xl rounded-[100%]" />

            {viewMode === "spread" ? (
              <div className="flex w-full bg-white rounded-sm shadow-2xl relative">
                {/* Book Spine Center Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 z-30 opacity-50" />
                
                {/* Left Page (Chapter Intro) */}
                <div className="flex-1 aspect-[3/4] bg-[#FAFAFA] relative overflow-hidden group">
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent z-10 pointer-events-none" />
                  
                  <div className="h-full flex flex-col justify-center items-center text-center p-12 relative z-0">
                    <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center mb-8 border border-gray-100">
                      <span className="text-4xl">🏖️</span>
                    </div>
                    <p className="text-blue-600 font-bold tracking-widest text-sm mb-4 uppercase">Chapter 3</p>
                    <h2 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">협재 해수욕장</h2>
                    
                    <div className="w-12 h-1 bg-gray-200 rounded-full mb-8" />
                    
                    <div className="text-sm font-medium text-gray-500 space-y-2">
                      <p>2026. 08. 24</p>
                      <p>JEJU ISLAND</p>
                    </div>
                    
                    <div className="mt-12 w-full h-48 rounded-2xl overflow-hidden shadow-sm relative group-hover:shadow-md transition-shadow duration-500 border border-gray-200/50">
                      <div className="absolute inset-0 bg-blue-50/50" style={{ backgroundImage: 'radial-gradient(#93c5fd 1.5px, transparent 0)', backgroundSize: '15px 15px' }} />
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-white/90 text-blue-600 font-bold px-4 py-2 rounded-full text-xs tracking-wider shadow-sm flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> 여행 경로 지도
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-8 text-xs font-bold text-gray-400">
                    {currentPage}
                  </div>
                </div>

                {/* Right Page (Photo + AI Text) */}
                <div className="flex-1 aspect-[3/4] bg-white relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none" />
                  
                  <div className="h-full flex flex-col p-10 relative z-0">
                    {/* Beautiful Photo Frame */}
                    <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-md mb-8 relative border border-gray-100 bg-gray-50 group-hover:shadow-xl transition-shadow duration-500">
                      <img 
                        src="https://images.unsplash.com/photo-1659695089950-96e6ea2d94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" 
                        alt="Beach" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>

                    {/* Narration */}
                    <div className="px-1 pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed text-[15px] italic">
                        그날 바다는 유난히 투명했다. 모래사장에 발을 담그고 한참을 서 있었는데, 파도가 발목을 간질이는 감촉이 아직도 생생하다. 옆에서 누가 웃었는지 기억나지 않지만, 다 같이 웃었던 건 확실하다.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-8 text-xs font-bold text-gray-400">
                    {currentPage + 1}
                  </div>
                </div>
              </div>
            ) : (
              /* Single Page View */
              <div className="max-w-[500px] mx-auto bg-white rounded-sm shadow-2xl relative aspect-[3/4] overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10" />
                <div className="h-full flex flex-col p-8 md:p-12 relative z-0">
                  <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-md mb-8 relative border border-gray-100 bg-gray-50 group-hover:shadow-xl transition-shadow duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1659695089950-96e6ea2d94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" 
                      alt="Beach" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="px-1 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed md:text-lg italic">
                      그날 바다는 유난히 투명했다. 모래사장에 발을 담그고 한참을 서 있었는데, 다 같이 웃었던 건 확실하다.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-6 right-8 text-xs font-bold text-gray-400">
                  {currentPage + 1}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page Spread Navigation */}
        <div className="mb-12 max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">페이지 이동</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
            {Array.from({ length: 21 }).map((_, i) => {
              const spreadNum = i + 1;
              const leftPage = spreadNum * 2 - 1;
              const rightPage = spreadNum * 2;
              const isActive = currentPage === leftPage;

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(leftPage)}
                  className={`p-4 rounded-xl shadow-sm border transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg scale-105"
                      : "bg-white text-gray-900 border-gray-200 hover:shadow-md hover:border-blue-300"
                  }`}
                >
                  <p className={`font-bold text-sm ${isActive ? "text-white" : "text-gray-900"}`}>
                    {leftPage}-{rightPage}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/editor")}
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all text-lg"
          >
            편집으로 돌아가기
          </button>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:w-auto px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-200 hover:text-gray-900 transition-all flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">공유</span>
            </button>
            <button
              onClick={() => navigate("/export")}
              className="flex-1 sm:flex-none px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>다운로드 / 실물 주문</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}