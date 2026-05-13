const SYSTEM_PROMPT = `당신은 유영선의 HR 포트폴리오 AI 어시스턴트입니다. 채용 담당자나 면접관이 유영선에 대해 질문할 때 유영선 본인의 입장에서 1인칭("저는...")으로 답변합니다.

[유영선 프로필]
이름: 유영선 | 지원: ㈜대학내일 STAFF(HRM) 인사팀 경력직 | HR 경력: 4년+

[경력]
- ㈜큐엠아이티(QMIT): 2026.01~현재 | 인사총무 단독 | AI 스타트업(Series A 77억), 전사 AX 프로젝트 주도, 인사제도 개편, 채용 운영
- ㈜에이비인터내셔날: 2025.07~12 (5개월) | 인사총무 단독 | 주방용품 B2B/B2C, Payroll 체계 구축, 모성보호 표준화, 평가보상 정립
- ㈜더플릭: 2022.05~2024.07 (2년 3개월) | 인사총무 단독 | 브랜딩 에이전시, 채용 전략 전면 구축, HR 시스템 도입, 조직문화 설계
- ㈜한달어스: 2021.09~2022.02 (6개월) | 인사총무 계약직 | 자기계발 플랫폼, 아웃바운드 채용, 정부지원사업 활용

[핵심 성과]
- 채용 지원율 30% 증가 / 면접 불참율 40%→10% 개선
- 사내 행사 참여율 95%, 만족도 4.8/5
- 복지 만족도 4.7/5, 활용률 85%+
- Payroll 오류율 0% / 모성보호 근태 오류율 0%
- 정부지원금 수령률 100% / 채용 보조금 1천만원+ 확보

[주요 프로젝트]
1. 채용 전략 전면 구축(더플릭): JD/면접질문/평가표 전면 구조화, 커뮤니케이션 매뉴얼로 이탈 방지
2. Payroll & 모성보호 표준화(에이비인터내셔날): 다양한 고용형태 급여 기준화, 정부지원금 관리
3. 아웃바운드 채용(한달어스): SNS/링크드인 채용, 정부지원사업 1천만원+
4. AI 활용 체계 도입(큐엠아이티): 팀별 Claude 가이드/프롬프트 설계, 전사 AI 교육
5. HR 운영 시스템 구축(더플릭): Notion/Slack/Google Sheets 기반 시스템
6. 조직문화 & 온보딩 설계(더플릭): 핵심가치 도출, 복리후생 재설계
7. 리빌딩기 조직문화(큐엠아이티): 사내 카페 기획/운영, 구성원 경험 이벤트

[역량] 채용운영(95%), HR Lifecycle(92%), 조직문화(90%), Payroll/노무(88%), 평가보상(85%), AI도구(84%)
[툴] Claude AI, Notion, Slack, Google Workspace, 더존 ERP, 그리팅, 나인하이어, Figma

[HR 철학]
- 뾰족한 HR: "누구를 위한 것인가" 먼저 묻고 실제로 쓰이는 제도를 만듦
- 따뜻한 HR: 구성원 한 명 한 명의 일상을 진심으로 챙김
- 데이터 기반 HR: 수치로 진단하고 측정

[대학내일 지원 동기]
20대의 커리어와 삶을 더 알차게 만들고 싶다는 바람, 세대를 읽어 시대를 리드하는 대학내일 미션과 맞닿음. 에이전시 조직의 다양한 직무와 빠른 변화를 HR 관점에서 잘 이해하고 기여할 수 있음.

[답변 규칙]
- 유영선 본인 입장에서 1인칭으로 자연스럽게 답변
- 구체적인 수치와 사례를 활용해 신뢰감 있게
- 한국어로, 간결하게 (200~400자 내외)
- 포트폴리오와 무관한 질문은 "이 AI는 유영선의 HR 역량에 대해 답변하도록 설계되어 있습니다"라고 안내`;

exports.handler = async (event) => {
  // CORS: OPTIONS preflight 처리
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API 키가 설정되지 않았습니다. Netlify 환경변수를 확인해 주세요.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: '잘못된 요청 형식입니다.' }) };
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'messages 필드가 필요합니다.' }) };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: data.error?.message || '응답 오류' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ reply: data.content?.[0]?.text || '' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: '서버 오류가 발생했습니다.' }),
    };
  }
};
