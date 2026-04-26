import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, X, FileText, Sparkles, ImagePlus, Loader2, AlertCircle, CheckCircle, FileX } from "lucide-react";
import { Header } from "../components/Header";

interface UploadedImage {
  id: string;
  src: string;
  name: string;
}

interface ValidationError {
  fileName: string;
  reason: string;
  type: "invalid-format" | "too-large" | "other";
}

export function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("travel");
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/heic", "image/heif"];
  const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".heic"];
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

  const validateFile = (file: File): { valid: boolean; error?: ValidationError } => {
    // 형식 검증
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!SUPPORTED_EXTENSIONS.includes(ext)) {
        return {
          valid: false,
          error: {
            fileName: file.name,
            reason: `지원하지 않는 형식입니다. (지원: JPG, PNG, HEIC)`,
            type: "invalid-format",
          },
        };
      }
    }

    // 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: {
          fileName: file.name,
          reason: `파일 크기가 너무 큽니다. (최대 100MB, 현재 ${(file.size / 1024 / 1024).toFixed(1)}MB)`,
          type: "too-large",
        },
      };
    }

    return { valid: true };
  };

  const processFiles = async (files: FileList) => {
    setIsUploading(true);
    const newImages: UploadedImage[] = [];
    const newErrors: ValidationError[] = [];

    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      // 검증
      const validation = validateFile(file);
      if (!validation.valid && validation.error) {
        newErrors.push(validation.error);
        continue;
      }

      // 파일을 Data URL로 변환
      try {
        const result = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            reject(new Error("Failed to read file"));
          };
          reader.readAsDataURL(file);
        });

        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          src: result,
          name: file.name,
        });
      } catch (err) {
        newErrors.push({
          fileName: file.name,
          reason: "파일을 읽을 수 없습니다.",
          type: "other",
        });
      }
    }

    setUploadedImages([...uploadedImages, ...newImages]);
    if (newErrors.length > 0) {
      setErrors([...errors, ...newErrors]);
      setShowErrors(true);
    }
    setIsUploading(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processFiles(event.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleContinue = () => {
    if (uploadedImages.length > 0) {
      navigate("/processing");
    }
  };

  const handleUseRecommended = () => {
    if (uploadedImages.length > 0) {
      navigate("/chapters");
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
    setShowErrors(false);
  };

  const styles = [
    { id: "travel", name: "여행 에세이형", desc: "감성적인 여행 일기 스타일", icon: "✈️" },
    { id: "blog", name: "블로그형", desc: "가볍고 편안한 블로그 스타일", icon: "☕" },
    { id: "emotional", name: "감성형", desc: "시적이고 감성적인 표현", icon: "🌙" },
    { id: "comic", name: "만화형", desc: "재미있는 만화 스타일", icon: "💬" },
  ];

  const invalidFormatErrors = errors.filter((e) => e.type === "invalid-format");
  const tooLargeErrors = errors.filter((e) => e.type === "too-large");

  return (
    <div className="min-h-screen bg-gray-50/30 font-sans text-gray-900 pb-20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6">
            <ImagePlus className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">사진 업로드</h1>
          <p className="text-gray-600 text-lg">
            포토북에 담을 사진들을 업로드하고 원하는 스타일을 지정해주세요. 최대 200장까지 선택 가능합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Messages */}
            {showErrors && errors.length > 0 && (
              <div className="bg-white rounded-3xl border-2 border-red-200 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-red-900">업로드 오류</h3>
                  </div>
                  <button
                    onClick={clearErrors}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {invalidFormatErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                      <p className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <FileX className="w-4 h-4" /> 지원하지 않는 파일 형식
                      </p>
                      <ul className="text-sm text-red-800 space-y-1">
                        {invalidFormatErrors.map((err, idx) => (
                          <li key={idx} className="ml-6">
                            • {err.fileName}: {err.reason}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-red-700 mt-2 ml-6">
                        💡 지원 형식: JPG, PNG, HEIC만 업로드할 수 있습니다.
                      </p>
                    </div>
                  )}

                  {tooLargeErrors.length > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                      <p className="text-sm font-semibold text-orange-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> 파일 크기 초과
                      </p>
                      <ul className="text-sm text-orange-800 space-y-1">
                        {tooLargeErrors.map((err, idx) => (
                          <li key={idx} className="ml-6">
                            • {err.fileName}: {err.reason}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-orange-700 mt-2 ml-6">
                        💡 각 이미지는 100MB 이하여야 합니다. 이미지 압축 도구를 사용해보세요.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`bg-white rounded-3xl border-2 border-dashed p-12 transition-all duration-300 group cursor-pointer ${
                isDragActive
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : "border-blue-200 hover:bg-blue-50/50 hover:border-blue-300"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.heic"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="text-center flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all ${
                    isDragActive
                      ? "bg-blue-500 text-white scale-110"
                      : "bg-blue-100 text-blue-600 group-hover:scale-110"
                  }`}
                >
                  {isUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <UploadIcon className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">클릭하거나 사진을 드래그하세요</h3>
                <p className="text-gray-500 mb-6">최고의 해상도로 저장된 원본 사진을 권장합니다</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  지원 형식: JPG, PNG, HEIC (최대 100MB) | EXIF 포함 권장
                </div>
              </div>
            </div>

            {/* Uploaded Images Grid */}
            {uploadedImages.length > 0 && (
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    업로드된 사진 
                    <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">{uploadedImages.length}장</span>
                  </h2>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
                  >
                    + 추가하기
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                      <img src={img.src} alt={img.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(img.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs truncate">{img.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Prompt Input */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">프롬프트</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                원하는 포토북의 분위기나 특별히 강조하고 싶은 이야기를 자유롭게 적어주세요.
              </p>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예: 제주도 3박 4일 여행의 추억을 따뜻하고 감성적으로 표현해주세요. 바다와 카페 중심으로..."
                rows={5}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none text-gray-700"
              />
            </div>

            {/* Style Selection */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">문체 스타일</h3>
              </div>
              <div className="space-y-3">
                {styles.map((style) => (
                  <label
                    key={style.id}
                    className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                      selectedStyle === style.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={style.id}
                      checked={selectedStyle === style.id}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-bold text-gray-900 flex items-center gap-2">
                        {style.icon} {style.name}
                      </p>
                      <p className={`text-sm mt-1 ${selectedStyle === style.id ? 'text-blue-700/80' : 'text-gray-500'}`}>
                        {style.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span> 분석 포인트
              </h4>
              <ul className="text-sm text-blue-800/80 space-y-2">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> EXIF 메타데이터 (시간, 위치)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 객체 및 씬 인식 (YOLOv8)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 얼굴 표정 및 감정 분석</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 간판, 영수증 텍스트 추출</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> A-Cut 자동 선별 알고리즘</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200 gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:shadow-sm transition-all border border-gray-200 w-full sm:w-auto"
          >
            돌아가기
          </button>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleUseRecommended}
              disabled={uploadedImages.length === 0}
              className={`px-10 py-4 font-bold rounded-2xl transition-all w-full sm:w-auto flex items-center justify-center gap-2 ${
                uploadedImages.length > 0
                  ? "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 shadow-sm hover:shadow-md"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-transparent"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              추천 그대로 사용
            </button>
            <button
              onClick={handleContinue}
              disabled={uploadedImages.length === 0}
              className={`px-10 py-4 font-bold rounded-2xl transition-all w-full sm:w-auto ${
                uploadedImages.length > 0
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              스마트 분석 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}