# 모리 (Mori) - 미용실 예약 관리 시스템

## 소개
모리는 미용실 예약을 효율적으로 관리할 수 있는 웹 애플리케이션입니다. 고객 예약 관리, 스케줄 확인, 디자이너 관리 등의 기능을 제공합니다.

## 기술 스택
- Frontend: React, TanStack Router, TanStack Form
- Backend: Supabase
- UI: Tailwind CSS, shadcn/ui
- Package Manager: pnpm

## 시작하기

### 필수 조건
- Node.js 18 이상
- pnpm

### 설치
```bash
# 의존성 설치
pnpm install
```

### 개발 서버 실행
```bash
# 개발 서버 시작
pnpm dev
```

## 주요 기능
- 예약 관리
  - 예약 생성/수정/삭제
  - 캘린더 뷰로 예약 확인
  - 예약 상세 정보 조회
- 고객 관리
  - 고객 정보 등록/수정
  - 고객별 예약 이력 조회
- 디자이너 관리
  - 디자이너별 예약 스케줄 확인
  - 담당 고객 관리

## 프로젝트 구조
src/
├── ui/              # client 
├── manager/         # server
│   ├── controller/  # API 엔드포인트 및 요청 처리
│   ├── service/     # 비즈니스 로직 처리
│   └── repository/  # 데이터베이스 접근 계층
└── types/           # 타입 정의