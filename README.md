# AXZ AI 사용하기 — 사내 위키

AXZ 임직원이 Claude를 일상 업무에서 실제로 쓰기까지의 여정을 단계적으로 학습할 수 있도록 설계된 정적 HTML 위키입니다.

## 구조

```
wiki/
├── index.html                       # 메인 홈
├── tools.html                       # 도구 카탈로그 (28+개)
├── assets/style.css                 # 공통 스타일 (모든 HTML에 인라인됨)
├── level-0/index.html               # 시작하기 · 모델 라인업 · 보안
├── level-1/  (8개)                  # 초급 — 채팅창 · 프롬프트 · 모델
│   ├── index.html
│   ├── 01-first-meeting.html  ~  07-cheatsheet.html
│   └── practice.html                # L1 실습 트랙 (와이어프레임 30분)
├── level-2/  (7개)                  # 중급 — Claude Code · MCP · 훅
│   ├── index.html
│   ├── 01-claude-code-intro.html  ~  06-security.html
│   └── practice.html                # L2 실습 트랙 (CMS 프로토타입 25분)
└── level-3/  (11개)                 # 고급 — Agentic UX · 멀티 에이전트
    ├── index.html
    ├── 01-agentic-ux.html  ~  10-release-checklist.html
    └── practice.html                # L3 실습 트랙 (사내 사례 3종)
```

## 파일 통계

- **HTML 33개** · 총 약 800 KB
- **챕터 23개** (L0: 1 / L1: 7 / L2: 6 / L3: 10) + **실습 트랙 3개** + **부록 2개** + **인덱스 5개**
- **인라인 SVG 도식 18+개** · 결정 트리, 5요소 슬롯, MCP 아키텍처, Eval 4계층 등
- **실측 사례 카드 10+개** (모두 "예시 시나리오" 라벨)
- **608개 내부 링크 · 깨진 링크 0개**

## 디자인 시스템

- 톤: Notion·Linear 풍 톤다운
- 폰트: 시스템 폰트 (Apple SD Gothic Neo / 맑은 고딕 / system-ui)
- 메인 색: `#4f46e5` (Indigo 600)
- 단일 파일 self-contained — CSS가 모든 HTML에 인라인되어 외부 의존성 없음

## 배포

정적 HTML이므로 어느 정적 호스팅에도 그대로 올라갑니다.

- **GitHub Pages**: `Settings → Pages → Branch: main` 로 활성화
- **Vercel / Netlify**: 폴더 그대로 드래그
- **사내 S3**: `aws s3 sync . s3://bucket-name/wiki/`
- **로컬 미리보기**: `python3 -m http.server 8000` 후 브라우저에서 `localhost:8000`

## 편찬

- 편찬: 커뮤니티 팀 · 헤일로 (halo.wave@axzcorp.com)
- 기준 모델: Claude Opus 4.7 / Sonnet 4.6 / Haiku 4.5
- 본 위키는 AXZ 임직원 교육 목적의 내부 자료입니다. 외부 배포 및 상업적 사용을 금합니다.

## 자료 출처

본책 3권 + 별책 3권 PDF를 기반으로 재구성:

| 레벨 | 본책 (자율 학습) | 별책 (세미나 실습) |
|---|---|---|
| L1 | 처음 만나는 Claude 업무 활용 (55p) | 오늘 30분, Claude로 와이어프레임까지 |
| L2 | Claude Code와 MCP 커넥터 실전 (56p) | Cowork과 나만의 Skill로 프로토타입 |
| L3 | Agentic UX와 멀티 에이전트 (88p) | 에이전트 하네스 · 사내 구축 사례 3종 |
