import { Link } from "react-router";
import {
  Sparkles,
  Upload,
  Wand2,
  Book,
  ShoppingCart,
  Brain,
  MapPin,
  MessageSquare,
  Layers,
  Image as ImageIcon,
  ChevronRight,
  BookImage,
} from "lucide-react";
import { Header } from "../components/Header";

export function Home() {
  const features = [
    {
      icon: Brain,
      title: "스토리 구조 생성",
      desc: "이벤트 자동 그룹핑 및 서사 구성",
    },
    {
      icon: Wand2,
      title: "감정 분석 & 큐레이션",
      desc: "분위기에 맞는 글귀 자동 생성",
    },
    {
      icon: MessageSquare,
      title: "감성 내레이션",
      desc: "사진 속 순간을 글로 담아냅니다",
    },
    {
      icon: Layers,
      title: "잡지형 레이아웃",
      desc: "스토리 중심의 역동적 구성",
    },
    {
      icon: MapPin,
      title: "여행 경로 시각화",
      desc: "GPS 기반 여행 지도 자동 삽입",
    },
    {
      icon: Book,
      title: "e-Book 형태 제공",
      desc: "인쇄용 PDF 및 디지털 포맷 지원",
    },
  ];

  const differentiators = [
    {
      title: "행위 단위 그룹핑",
      desc: "'공항 출발', '저녁 식사' 등 행위별 자동 분류",
      icon: "✨",
    },
    {
      title: "베스트 컷 선별",
      desc: "흔들림, 눈 감음, 구도를 분석해 가장 좋은 사진을 추천",
      icon: "📸",
    },
    {
      title: "텍스트 인식",
      desc: "간판, 티켓의 텍스트를 추출하여 장소 정보 활용",
      icon: "🔍",
    },
    {
      title: "스마트 캔버스",
      desc: "드래그 앤 드롭, 크기 조절이 자유로운 에디터",
      icon: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1694022861804-840f61d1c452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=100&w=1920"
            alt="Beautiful Photobook Memories"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/70 to-gray-50/40" />
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12 md:px-12 md:py-16 text-center relative z-10 bg-gradient-to-br from-blue-50/80 via-white/60 to-purple-50/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-8 font-medium text-sm shadow-sm animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            당신의 추억을 살아숨쉬는 이야기로
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900 leading-tight">
            가장 빛나는 순간을{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              한 권의 이야기
            </span>
            로
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            수백 장의 사진을 갤러리에만 두지 마세요. 
            사진을 분석하여 감성과 서사가 담긴 매거진 스타일의 
            포토북으로 엮어드립니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/upload"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
            >
              포토북 만들기 시작
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/samples"
              className="flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all w-full sm:w-auto"
            >
              샘플 구경하기
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section with Image */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-3xl transform -rotate-3 scale-105" />
              <img
                src="https://images.unsplash.com/photo-1758613171487-37016cf51313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwZnJpZW5kcyUyMHRha2luZyUyMHBob3RvJTIwdHJhdmVsfGVufDF8fHx8MTc3NTAyMjEzNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Friends traveling"
                className="relative rounded-3xl shadow-2xl object-cover aspect-[4/3] w-full"
              />
              {/* Floating badges */}
              <div className="absolute -right-6 top-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    감정 분석
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    긍정 98% 감지
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">사진만 올리면 완성되는<br />나만의 포토북</h2>
                <p className="text-gray-600 text-lg">
                  사진만 업로드하세요. 나머지는 알아서
                  해드립니다.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "1. 사진 업로드",
                    desc: "여행, 일상, 기념일 사진을 자유롭게 올려주세요.",
                  },
                  {
                    title: "2. 스마트 분석",
                    desc: "베스트 컷을 선별하고 시간과 장소에 맞게 스토리를 구성합니다.",
                  },
                  {
                    title: "3. 매거진 편집",
                    desc: "잡지처럼 감각적인 레이아웃과 감성적인 글귀가 더해집니다.",
                  },
                  {
                    title: "4. 평생 간직하기",
                    desc: "디지털 e-Book으로 바로 보거나, 실물 책으로 주문하세요.",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              세심한 디테일이 다릅니다
            </h2>
            <p className="text-gray-600 text-lg">
              기존 포토북 서비스와는 확실히 다른 기술력
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 group border border-gray-100"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1682979358243-816a75830f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjYWZlJTIwaW50ZXJpb3IlMjBjb2ZmZWV8ZW58MXx8fHwxNzc1MDIyMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Cafe aesthetics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            당신의 이야기는
            <br />
            지금부터 시작됩니다
          </h2>
          <p className="text-xl text-gray-200 mb-10">
            특별한 기술 없이도, 사진만 있다면 누구나 작가가 될
            수 있습니다.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-50 hover:text-blue-600 transition-all shadow-2xl hover:scale-105"
          >
            <Upload className="w-6 h-6" />
            나만의 포토북 만들기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <BookImage className="w-5 h-5 text-gray-400" />
            <span className="font-bold text-gray-900">
              Photogram
            </span>
          </div>
          <p>
            © 2026 Photogram. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-gray-900 transition-colors"
            >
              이용약관
            </a>
            <a
              href="#"
              className="hover:text-gray-900 transition-colors"
            >
              개인정보처리방침
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}