# Photogram - AI 포토북 생성기

사진을 업로드하면 AI가 자동으로 분석하여 감성적인 포토북을 만들어주는 웹 애플리케이션입니다.

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 열기
```

## 📦 포함된 기능

- ✅ 홈페이지 (로그인/회원가입 버튼 포함)
- ✅ 사진 업로드 & 프롬프트 입력
- ✅ AI 분석 프로세스 시각화
- ✅ 이미지 선택 인터페이스
- ✅ 챕터 구성 & 편집기
- ✅ 미리보기 & 내보내기
- ✅ 샘플 갤러리

## 🛠 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS v4
- **라우팅**: React Router v7
- **UI 컴포넌트**: Radix UI + shadcn/ui
- **아이콘**: Lucide React
- **애니메이션**: Motion (Framer Motion)

## 📂 프로젝트 구조

```
photogram-app/
├── src/
│   ├── app/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   │   ├── ui/         # shadcn/ui 컴포넌트
│   │   │   ├── figma/      # Figma 전용 컴포넌트
│   │   │   └── Header.tsx  # 헤더 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   │   ├── Home.tsx
│   │   │   ├── Upload.tsx
│   │   │   ├── ProcessingImages.tsx
│   │   │   ├── ImageSelection.tsx
│   │   │   ├── Analysis.tsx
│   │   │   ├── Chapters.tsx
│   │   │   ├── Editor.tsx
│   │   │   ├── Preview.tsx
│   │   │   ├── Export.tsx
│   │   │   └── Samples.tsx
│   │   ├── App.tsx         # 메인 앱 컴포넌트
│   │   └── routes.ts       # 라우터 설정
│   ├── styles/             # 전역 스타일
│   │   ├── fonts.css
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── main.tsx           # 진입점
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 주요 페이지

### 홈 (/)
- 서비스 소개
- 주요 기능 안내
- **로그인/회원가입 버튼** (우측 상단)

### 업로드 (/upload)
- 사진 드래그 앤 드롭 업로드
- 프롬프트 입력
- 문체 스타일 선택

### 분석 (/processing → /analysis)
- AI 처리 진행 상황 시각화
- 자동 이미지 분석 및 선별

### 편집 (/chapters → /editor)
- 챕터 구성
- 드래그 앤 드롭 레이아웃 편집

### 미리보기 & 내보내기 (/preview → /export)
- 최종 결과물 미리보기
- PDF/디지털 포맷 다운로드

## 📝 개발 가이드

### 새 페이지 추가

1. `src/app/pages/` 에 새 컴포넌트 생성
2. `src/app/routes.ts` 에 라우트 추가

### 새 UI 컴포넌트 추가

- `src/app/components/ui/` 에 추가
- Radix UI 기반 컴포넌트 사용 권장

### 스타일 수정

- 테마 색상: `src/styles/theme.css`
- 전역 스타일: `src/styles/index.css`

## 🔧 빌드 & 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

---

Made with ❤️ by Claude Code
