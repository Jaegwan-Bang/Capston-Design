import { Link } from "react-router";
import { Header } from "../components/Header";
import { Search, Sparkles, BookOpen, Heart, Eye } from "lucide-react";

export function Samples() {
  const categories = ["전체", "여행", "웨딩", "가족/아기", "반려동물", "일상/음식"];

  const samples = [
    {
      id: 1,
      title: "우리의 첫 유럽 여행",
      author: "여행자_김",
      category: "여행",
      likes: 342,
      views: "1.2k",
      coverUrl: "https://images.unsplash.com/photo-1645497265363-e9ace9158db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "감성에세이형",
    },
    {
      id: 2,
      title: "봄날의 제주, 그리고 우리",
      author: "jeju_lover",
      category: "여행",
      likes: 856,
      views: "3.4k",
      coverUrl: "https://images.unsplash.com/photo-1659695089950-96e6ea2d94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "매거진형",
    },
    {
      id: 3,
      title: "영원히 기억될 그 날",
      author: "웨딩아카이브",
      category: "웨딩",
      likes: 1205,
      views: "5.1k",
      coverUrl: "https://images.unsplash.com/photo-1571502189597-d7d3a0f114fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "프리미엄 웨딩",
    },
    {
      id: 4,
      title: "지호의 1년 기록",
      author: "초보엄마빠",
      category: "가족/아기",
      likes: 428,
      views: "1.8k",
      coverUrl: "https://images.unsplash.com/photo-1753613256514-82b7eca4a022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "블로그형",
    },
    {
      id: 5,
      title: "초코와의 주말 나들이",
      author: "초코언니",
      category: "반려동물",
      likes: 673,
      views: "2.5k",
      coverUrl: "https://images.unsplash.com/photo-1755962179802-734c1cc178ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "만화형",
    },
    {
      id: 6,
      title: "홈카페 레시피 북",
      author: "coffee_holic",
      category: "일상/음식",
      likes: 215,
      views: "980",
      coverUrl: "https://images.unsplash.com/photo-1546361897-1c790e8d96b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "레시피노트",
    },
    {
      id: 7,
      title: "2025 가족 캠핑 연말결산",
      author: "캠핑마니아",
      category: "가족/아기",
      likes: 531,
      views: "2.1k",
      coverUrl: "https://images.unsplash.com/photo-1548849929-a63fe18c9ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "포토북 기본",
    },
    {
      id: 8,
      title: "골목길 카페 탐방기",
      author: "골목대장",
      category: "일상/음식",
      likes: 189,
      views: "850",
      coverUrl: "https://images.unsplash.com/photo-1682979358243-816a75830f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      theme: "빈티지",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 font-sans text-gray-900 pb-24">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            다른 사람들의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">이야기</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            AI가 완성한 다양한 스타일의 포토북 갤러리입니다. <br/>
            영감을 얻고 나만의 멋진 포토북을 만들어보세요.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group mt-10">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-24 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
              placeholder="관심있는 주제나 테마를 검색해보세요 (예: 제주도, 돌잔치)"
            />
            <button className="absolute inset-y-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-medium transition-colors shadow-sm">
              검색
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category, idx) => (
            <button
              key={category}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                idx === 0
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {samples.map((sample) => (
            <div key={sample.id} className="group cursor-pointer">
              {/* Book Cover Container */}
              <div className="relative aspect-[3/4] bg-white rounded-r-xl rounded-l-sm shadow-md mb-4 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/10 via-transparent to-transparent z-20 pointer-events-none" />
                
                <img 
                  src={sample.coverUrl} 
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Link
                      to="/preview"
                      className="bg-white/90 backdrop-blur text-gray-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      자세히 보기
                    </Link>
                  </div>
                </div>

                {/* Theme Badge */}
                <div className="absolute top-3 left-4 z-10">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    {sample.theme}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {sample.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium text-gray-600">by {sample.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {sample.views}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-400" /> {sample.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm">
            더 많은 샘플 보기
          </button>
        </div>
      </div>
    </div>
  );
}