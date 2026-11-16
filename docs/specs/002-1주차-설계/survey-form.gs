/**
 * 야구 뉴비 설문을 구글 설문으로 만드는 Apps Script.
 * 원본 문항: docs/specs/002-1주차-설계/survey.md (결정: D-043~D-045)
 *
 * 쓰는 법
 * 1. https://script.google.com 에서 "새 프로젝트"를 만든다.
 * 2. 이 파일 내용을 통째로 붙여 넣고 저장한다.
 * 3. 함수 createSurvey 를 실행한다. 처음 한 번 권한(구글 설문 만들기)을 허용한다.
 * 4. 실행 로그에 나온 편집 링크로 들어가 미리보기로 분기를 확인한다.
 *
 * 흐름
 *   A2(얼마나 아는지) ─ 4~5 → G(고인물) → D(마무리)
 *                    └ 1~3 → A1-1(관심 여부) ─ 없다 → 종료
 *                                              └ 있다/잘 모르겠다 → A1·A3 ─ 본 적 있다 → B → D
 *                                                                          └ 아직 없다 → C → D
 * 구글 설문은 섹션 하나에 분기 문항을 하나만 둘 수 있어서 A2, A1-1, A1을 각각 다른 섹션에 둔다.
 * 마감 후에도 설문을 닫지 않는다 (D-044). 1차 마감 11-17 23:59는 공유 메시지에만 적는다.
 */

// 여러 문항에서 다시 쓰는 선택지
const CHOICES_LEARN = [
  '경기를 직접 보면서 익힌다',
  '검색해서 찾아본다 (포털, 나무위키 등)',
  '유튜브 같은 영상으로 본다 (입문 영상, 하이라이트 등)',
  'ChatGPT 같은 AI에게 묻는다',
  '야구를 잘 아는 친구·가족에게 묻는다',
  '야구 커뮤니티에 묻거나 글을 읽는다',
  '따로 알아보지 않는다 / 아직 알아본 적 없다',
];

const CHOICES_STUCK = [
  '경기 규칙 (아웃, 진루, 파울 등)',
  '야구 용어 (병살, 볼넷, 희생번트 등)',
  '숫자·기록 (전광판의 타율, 방어율 등)',
  '경기 흐름 (몇 회까지 하는지, 왜 투수를 바꾸는지 등)',
  '팀·선수 (누가 잘하는지, 지금 순위 등)',
  '응원 문화 (응원가, 응원석, 홈·원정 등)',
];

const CHOICES_KEEP = [
  '응원 분위기',
  '마음에 드는 팀이나 선수가 생겼다',
  '같이 보는 사람',
  '경기를 이해하게 되면서 재미있어졌다',
  '먹거리·나들이 같은 야구장 경험',
  '특별히 없다',
];

function addCheckbox_(form, title, choices) {
  return form.addCheckboxItem()
    .setTitle(title)
    .setChoiceValues(choices)
    .showOtherOption(true)
    .setRequired(true);
}

function createSurvey() {
  const form = FormApp.create('야구, 어디서 막히셨나요? (야구 뉴비 설문)');
  form.setDescription([
    '야구를 잘 모르는 분들이 어디서 막히는지 알고 싶어 만든 설문입니다.',
    '3~4분 정도 걸리고, 이름이나 연락처는 받지 않습니다. 정답은 없으니 떠오르는 대로 답해 주세요.',
    '야구를 잘 아시는 분께는 처음 입문할 때를 떠올리는 짧은 질문만 드립니다. ' +
      '주변의 야구 입문자나 관심 있는 분께도 전달해 주시면 큰 도움이 됩니다.',
  ].join('\n'));
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setConfirmationMessage('응답해 주셔서 고맙습니다!');

  // 구글 설문은 항목을 추가한 순서대로 쌓인다. 섹션 구분선 → 그 섹션의 문항 순으로 추가한다.

  // ── 섹션 1: A2 얼마나 아는지 (분기) ──
  const a2 = form.addMultipleChoiceItem()
    .setTitle('야구를 얼마나 안다고 느끼나요?')
    .setRequired(true);

  // ── 섹션 2: A1-1 관심 여부 (분기) ──
  const pageInterest = form.addPageBreakItem().setTitle('야구에 대한 관심');
  const a11 = form.addMultipleChoiceItem()
    .setTitle('앞으로 야구를 더 알아 가고 싶은 마음이 있나요?')
    .setRequired(true);

  // ── 섹션 3: A1 본 적 있는지 (분기), A3 어떻게 알아 가는지 ──
  const pageCommon = form.addPageBreakItem().setTitle('야구와 나');
  const a1 = form.addMultipleChoiceItem()
    .setTitle('야구 경기를 본 적이 있나요?')
    .setRequired(true);
  addCheckbox_(form, '야구에 대해 알아볼 때 주로 어떻게 하나요? (여러 개 선택)', CHOICES_LEARN);

  // ── 섹션 B: 본 사람 ──
  const pageSeen = form.addPageBreakItem().setTitle('야구를 본 경험');
  form.addMultipleChoiceItem()
    .setTitle('야구를 처음 본 지 얼마나 됐나요?')
    .setChoiceValues(['올해 처음 봤다', '1~2년 됐다', '3년 이상 됐다'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('처음에는 누구와 봤나요?')
    .setChoiceValues(['가족', '친구', '애인', '회사·모임 사람들', '혼자'])
    .showOtherOption(true)
    .setRequired(true);
  addCheckbox_(form, '주로 어떤 쪽에서 막혔나요? (여러 개 선택)', CHOICES_STUCK);
  addCheckbox_(form, '야구에 대해 알아볼 때 아쉬웠던 점이 있나요? (여러 개 선택)', [
    '설명에 또 모르는 용어가 나왔다',
    '뭐라고 검색해야 할지 몰랐다',
    '설명이 너무 길거나 많았다',
    '맞는 정보인지 알 수 없었다',
    '물어보기가 미안하거나 귀찮았다',
    '특정 팀 이야기로 치우쳤다',
    '특별히 없었다',
  ]);
  addCheckbox_(form, '야구를 계속 보고 싶게 만든 것이 있나요? (여러 개 선택)', CHOICES_KEEP);
  addCheckbox_(form, '보다가 마음이 식었던 순간이 있나요? (여러 개 선택)', [
    '무슨 상황인지 몰라서',
    '경기가 너무 길어서',
    '같이 볼 사람이 없어서',
    '응원할 팀이 없어서',
    '표를 구하기 어려워서',
    '특별히 없다',
  ]);

  // ── 섹션 C: 아직 안 본 사람 ──
  const pageNotSeen = form.addPageBreakItem().setTitle('아직 야구를 보지 않은 분께');
  addCheckbox_(form, '야구에 관심이 생긴 계기는 무엇인가요? (여러 개 선택)', [
    '주변 사람이 야구를 봐서',
    '뉴스·SNS에서 야구가 인기라는 걸 봐서',
    '응원이나 야구장 분위기 영상을 봐서',
    '관심 가는 선수가 있어서',
    '국제대회(WBC 등)를 봐서',
  ]);
  addCheckbox_(form, '아직 보지 않은 이유는 무엇인가요? (여러 개 선택)', [
    '규칙을 몰라 재미없을 것 같아서',
    '같이 볼 사람이 없어서',
    '어느 팀을 응원해야 할지 몰라서',
    '경기가 길 것 같아서',
    '표를 구하기 어려워서',
    '시간이 안 맞아서',
  ]);
  addCheckbox_(form, '보러 간다면 미리 알고 싶은 것은 무엇인가요? (여러 개 선택)', [
    '경기 규칙',
    '야구 용어',
    '숫자·기록 읽는 법',
    '경기 흐름 (몇 회까지, 얼마나 걸리는지 등)',
    '팀·선수',
    '응원 문화',
    '직관 준비 (예매, 좌석, 준비물 등)',
  ]);

  // ── 섹션 G: 야구를 잘 아는 사람 (고인물) ──
  const pageVeteran = form.addPageBreakItem()
    .setTitle('야구를 잘 아시는 분께')
    .setHelpText('처음 입문할 때를 떠올려 답해 주세요.');
  addCheckbox_(form, '처음 볼 때 가장 막혔던 것은 무엇인가요? (여러 개 선택)', CHOICES_STUCK);
  addCheckbox_(form, '그때 어떻게 알아 갔나요? (여러 개 선택)', CHOICES_LEARN);
  addCheckbox_(form, '야구를 계속 보게 만든 것은 무엇인가요? (여러 개 선택)', CHOICES_KEEP);
  addCheckbox_(form, '입문하는 사람이 가장 먼저 알면 좋은 것은 무엇인가요? (최대 3개)', CHOICES_STUCK)
    .setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(3).build());

  // ── 섹션 D: 마무리 ──
  const pageEnd = form.addPageBreakItem().setTitle('마지막');
  form.addParagraphTextItem()
    .setTitle('야구를 볼 때 더 제공되었으면 하는 정보가 있다면 자유롭게 적어 주세요. (선택)')
    .setRequired(false);

  // ── 분기 ──
  a2.setChoices([
    a2.createChoice('1 거의 모른다 (규칙도 잘 모른다)', pageInterest),
    a2.createChoice('2 기본 규칙만 조금 안다', pageInterest),
    a2.createChoice('3 경기 흐름은 대충 따라간다', pageInterest),
    a2.createChoice('4 기록이나 작전도 어느 정도 안다', pageVeteran),
    a2.createChoice('5 잘 안다', pageVeteran),
  ]);

  a11.setChoices([
    a11.createChoice('있다', pageCommon),
    a11.createChoice('잘 모르겠다', pageCommon),
    a11.createChoice('없다', FormApp.PageNavigationType.SUBMIT),
  ]);

  a1.setChoices([
    a1.createChoice('야구장에서 직접 본 적 있다', pageSeen),
    a1.createChoice('TV·온라인 중계로만 봤다', pageSeen),
    a1.createChoice('둘 다 해 봤다', pageSeen),
    a1.createChoice('아직 본 적 없다', pageNotSeen),
  ]);

  // setGoToPage는 "이 구분선 바로 앞 섹션을 마친 뒤" 갈 곳을 정한다.
  pageNotSeen.setGoToPage(pageEnd); // B를 마치면 C·G를 건너뛰고 마무리로
  pageVeteran.setGoToPage(pageEnd); // C를 마치면 G를 건너뛰고 마무리로
  // G를 마치면 바로 다음인 마무리로 간다.

  Logger.log('편집 링크: ' + form.getEditUrl());
  Logger.log('응답 링크: ' + form.getPublishedUrl());
}
