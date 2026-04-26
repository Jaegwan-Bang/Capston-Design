# Photogram 프로젝트 다운로드 가이드

## 압축 파일 위치
`/workspaces/default/code/photogram-project.tar.gz` (61KB)

## 압축 해제 방법
```bash
tar -xzf photogram-project.tar.gz
cd [압축 해제된 폴더]
npm install
npm run dev
```

## 포함된 파일 목록

### 루트 파일
- package.json - 프로젝트 의존성
- vite.config.ts - Vite 설정

### 소스 파일 (src/)
- app/App.tsx - 메인 앱
- app/routes.ts - 라우터 설정
- app/components/Header.tsx - 헤더 컴포넌트
- app/components/figma/ImageWithFallback.tsx
- app/components/ui/* - 50개 UI 컴포넌트

### 페이지 (src/app/pages/)
- Home.tsx - 홈 화면 (로그인/회원가입 버튼 포함)
- Upload.tsx - 업로드 페이지
- ProcessingImages.tsx - 처리 중 페이지
- ImageSelection.tsx - 이미지 선택 페이지
- Analysis.tsx - 분석 페이지
- Chapters.tsx - 챕터 구성 페이지
- Editor.tsx - 에디터 페이지
- Preview.tsx - 미리보기 페이지
- Export.tsx - 내보내기 페이지
- Samples.tsx - 샘플 페이지

### 스타일 (src/styles/)
- fonts.css
- index.css
- tailwind.css
- theme.css

## 로컬에서 시작하기

1. 새 폴더 생성
```bash
mkdir photogram-app
cd photogram-app
```

2. 이 압축 파일의 내용을 복사

3. package.json 수정 (name 변경)
```json
{
  "name": "photogram-app",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

4. index.html 생성
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Photogram - AI 포토북</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

5. src/main.tsx 생성
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

6. tsconfig.json 생성
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

7. tsconfig.node.json 생성
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

8. 설치 및 실행
```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 열기
