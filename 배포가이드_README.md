# 유영선 HR 포트폴리오 — Netlify 배포 가이드

방문자가 API 키 없이 AI와 바로 대화할 수 있는 포트폴리오 배포 방법입니다.
전체 과정 약 **5분** 소요, 완전 무료입니다.

---

## 📁 파일 구조

```
📂 portfolio/               ← 이 폴더 전체를 업로드합니다
├── index.html              ← 포트폴리오 메인 페이지
├── netlify.toml            ← Netlify 설정 파일
└── netlify/
    └── functions/
        └── chat.js         ← AI 채팅 서버 함수 (API 키 보관)
```

---

## 🚀 배포 순서

### 1단계 — GitHub에 올리기

1. [github.com](https://github.com) 접속 후 로그인 (없으면 무료 가입)
2. 우측 상단 **+** → **New repository** 클릭
3. Repository name: `portfolio` (아무 이름)
4. **Create repository** 클릭
5. 화면에 나오는 **Upload files** 클릭
6. 이 폴더 안의 **모든 파일과 폴더**를 드래그해서 올리기
7. **Commit changes** 클릭

---

### 2단계 — Netlify에 배포하기

1. [netlify.com](https://netlify.com) 접속 후 **GitHub으로 로그인**
2. **Add new site** → **Import an existing project** 클릭
3. **Deploy with GitHub** 선택
4. 방금 만든 `portfolio` 저장소 선택
5. 설정은 그대로 두고 **Deploy site** 클릭
6. 잠시 기다리면 배포 완료 ✅

---

### 3단계 — API 키 등록하기 ⚠️ 가장 중요

> API 키는 Netlify 서버에만 저장되며, 방문자에게 절대 노출되지 않습니다.

**API 키 발급 (처음 한 번만):**
1. [console.anthropic.com](https://console.anthropic.com) 접속
2. 로그인 → 좌측 **API Keys** 메뉴
3. **Create Key** 클릭 → 키 복사 (`sk-ant-...` 형태)
4. 무료 크레딧 $5 자동 지급됩니다

**Netlify에 API 키 등록:**
1. Netlify 대시보드 → 내 사이트 선택
2. **Site configuration** → **Environment variables**
3. **Add a variable** 클릭
4. Key: `ANTHROPIC_API_KEY`
5. Value: 복사한 API 키 붙여넣기
6. **Save** 클릭
7. **Deploys** 탭 → **Trigger deploy** → **Deploy site** 클릭

---

## ✅ 완료!

배포된 URL (예: `https://유영선-portfolio.netlify.app`)을 공유하면,
방문자가 별도 가입이나 API 키 없이 AI와 바로 대화할 수 있습니다.

---

## 🔧 사이트 주소 변경하기

Netlify 기본 주소는 랜덤한 영문자로 생성됩니다. 변경하려면:

1. Netlify → **Site configuration** → **Site information**
2. **Change site name** 클릭
3. 원하는 이름 입력 (예: `yys-hr-portfolio`)
4. 주소가 `https://yys-hr-portfolio.netlify.app`으로 변경됩니다

---

## ❓ 자주 묻는 질문

**Q. 비용이 드나요?**
A. Netlify 무료 플랜(월 100GB 트래픽)으로 충분합니다. Anthropic API도 무료 크레딧이 있고, 1회 대화당 약 0.002달러(약 3원) 수준으로 매우 저렴합니다.

**Q. AI가 잘못된 답변을 하면?**
A. `netlify/functions/chat.js` 파일 상단의 `SYSTEM_PROMPT`를 수정하면 AI 답변 내용을 바꿀 수 있습니다. 수정 후 GitHub에 다시 올리면 자동으로 재배포됩니다.

**Q. GitHub/Netlify 계정이 없어도 되나요?**
A. 둘 다 무료 가입이 필요합니다. 이메일만 있으면 1분이면 가입 됩니다.
