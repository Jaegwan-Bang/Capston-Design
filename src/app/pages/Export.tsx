import { useState } from "react";
import { useNavigate } from "react-router";
import { Download, FileText, Smartphone, ShoppingCart, Check, Package, Printer } from "lucide-react";
import { Header } from "../components/Header";

export function Export() {
  const navigate = useNavigate();
  const [exportType, setExportType] = useState<"download" | "order">("download");
  const [downloadFormat, setDownloadFormat] = useState("pdf");
  const [orderComplete, setOrderComplete] = useState(false);

  const handleDownload = () => {
    alert("PDF 다운로드를 시작합니다...");
  };

  const handleOrder = () => {
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl mb-4">주문이 완료되었습니다!</h1>
            <p className="text-gray-600 mb-2">
              주문번호: <span className="font-semibold">PB-AI-2026-03-12-001</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              주문 확인 및 배송 정보는 이메일로 발송됩니다
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">📦 제작 및 배송 안내</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• 분석 및 최종 레이아웃 검수: 1일</p>
                <p>• 고해상도 PDF 렌더링: 1일</p>
                <p>• 인쇄 및 제본: 2~3일</p>
                <p>• 배송: 2~3일 (택배)</p>
                <p className="font-semibold text-blue-900 mt-3">총 예상 기간: 6~8일</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-3 text-left">📥 디지털 파일 제공</h3>
              <p className="text-sm text-gray-600 text-left mb-4">
                인쇄본 발송과 함께 고해상도 PDF와 e-Book 파일을 이메일로 전송해드립니다
              </p>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition text-sm">
                  <FileText className="w-4 h-4 inline mr-2" />
                  PDF 다운로드
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition text-sm">
                  <Smartphone className="w-4 h-4 inline mr-2" />
                  e-Book 다운로드
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">다운로드 및 주문</h1>
          <p className="text-gray-600">완성된 포토북을 다운로드하거나 인쇄본을 주문하세요</p>
        </div>

        {/* Export Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setExportType("download")}
            className={`p-8 rounded-lg border-2 transition text-left ${
              exportType === "download"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              {exportType === "download" && (
                <Check className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <h3 className="text-xl mb-2">디지털 다운로드</h3>
            <p className="text-gray-600 text-sm mb-3">
              고해상도 PDF 또는 e-Book 형태로 즉시 다운로드
            </p>
            <p className="text-2xl font-semibold text-blue-600">무료</p>
          </button>

          <button
            onClick={() => setExportType("order")}
            className={`p-8 rounded-lg border-2 transition text-left ${
              exportType === "order"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              {exportType === "order" && (
                <Check className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <h3 className="text-xl mb-2">인쇄본 주문</h3>
            <p className="text-gray-600 text-sm mb-3">
              프리미엄 품질의 인쇄 포토북 + 디지털 파일 제공
            </p>
            <p className="text-2xl font-semibold text-purple-600">49,000원~</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {exportType === "download" ? (
              /* Download Options */
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">다운로드 형식 선택</h3>
                  <div className="space-y-3">
                    <label
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition ${
                        downloadFormat === "pdf"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="format"
                        value="pdf"
                        checked={downloadFormat === "pdf"}
                        onChange={(e) => setDownloadFormat(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">고해상도 PDF</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          인쇄소 규격에 맞는 고품질 PDF (300 DPI, CMYK)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          파일 크기: 약 120MB | 페이지: 42p
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition ${
                        downloadFormat === "ebook"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="format"
                        value="ebook"
                        checked={downloadFormat === "ebook"}
                        onChange={(e) => setDownloadFormat(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Smartphone className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold">e-Book (디지털 뷰어용)</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          모바일 및 태블릿에 최적화된 e-Book 형태
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          파일 크기: 약 45MB | 형식: PDF (최적화)
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition ${
                        downloadFormat === "both"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="format"
                        value="both"
                        checked={downloadFormat === "both"}
                        onChange={(e) => setDownloadFormat(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="w-5 h-5 text-green-600" />
                          <span className="font-semibold">전체 패키지</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          고해상도 PDF + e-Book + 원본 사진 ZIP
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          파일 크기: 약 280MB | 권장
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-blue-900">💡 다운로드 안내</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• 파일은 최대 7일간 다운로드 링크가 유효합니다</li>
                    <li>• 고해상도 PDF는 로컬 인쇄소에서 출력 가능합니다</li>
                    <li>• e-Book 파일은 모바일 기기에 최적화되어 있습니다</li>
                  </ul>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>다운로드 시작</span>
                </button>
              </div>
            ) : (
              /* Order Options */
              <div className="space-y-6">
                {/* Print Options */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">인쇄 옵션</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">포토북 크기</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>A4 (21x29.7cm) - 49,000원</option>
                        <option>정사각형 (25x25cm) - 54,000원</option>
                        <option>대형 (30x30cm) - 69,000원</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-2">표지 재질</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>하드커버 (양장) - 기본</option>
                        <option>소프트커버 - 기본</option>
                        <option>프리미엄 가죽 - +15,000원</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-2">용지 종류</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>일반 코팅지 (200g) - 기본</option>
                        <option>프리미엄 매트지 (250g) - +8,000원</option>
                        <option>아트지 (300g) - +12,000원</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-2">수량</label>
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">배송 정보</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">받는 분</label>
                      <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">연락처</label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">주소</label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="우편번호"
                            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                            우편번호 찾기
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="기본 주소"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="상세 주소"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">주문 요약</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">총 페이지</span>
                  <span>42페이지</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">총 사진</span>
                  <span>127장</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">챕터 수</span>
                  <span>5개</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">자동 생성 텍스트</span>
                  <span>38개</span>
                </div>
              </div>

              {exportType === "order" && (
                <>
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">포토북 (A4)</span>
                      <span>49,000원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">배송비</span>
                      <span>3,000원</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg mb-6">
                    <span className="font-semibold">총 결제 금액</span>
                    <span className="text-blue-600 font-semibold">52,000원</span>
                  </div>

                  <button
                    onClick={handleOrder}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-3"
                  >
                    주문하기
                  </button>
                </>
              )}

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2 text-purple-900 flex items-center gap-1">
                  <Printer className="w-4 h-4" />
                  포함 사항
                </h4>
                <ul className="text-xs text-purple-800 space-y-1">
                  {exportType === "order" ? (
                    <>
                      <li>✓ 프리미엄 인쇄 포토북</li>
                      <li>✓ 고해상도 PDF 파일</li>
                      <li>✓ e-Book 파일</li>
                      <li>✓ 원본 사진 ZIP</li>
                    </>
                  ) : (
                    <>
                      <li>✓ 자동 레이아웃</li>
                      <li>✓ GPT-4o 생성 텍스트</li>
                      <li>✓ 여행 경로 지도</li>
                      <li>✓ 7일간 다운로드 가능</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => navigate("/preview")}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            이전
          </button>
        </div>
      </div>
    </div>
  );
}