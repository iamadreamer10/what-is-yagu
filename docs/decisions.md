# decisions.md (목차)

> 결정의 본문은 `docs/specs/<번호>-<작업명>/decisions.md`에 있다. 이 파일은 전체 목차이며, 새 결정을 쓰면 여기에 한 줄 추가한다.
> 상태(유효/대체됨)는 본문 파일에서만 바꾼다. 목차에는 적지 않는다. 한 번 기재된 결정은 지우지 않는다.

| 번호 | 제목 | 위치 |
| --- | --- | --- |
| D-001 | 개인으로 진행한다 | `specs/001-초기-기획/decisions.md` |
| D-002 | 6주(2주 기획/설계 + 4주 개발), MVP만 만든다 | `specs/001-초기-기획/decisions.md` |
| D-003 | 목표 우선순위를 정한다 | `specs/001-초기-기획/decisions.md` |
| D-004 | 소상공인·중소기업 전자증빙(후보 B)을 제외한다 | `specs/001-초기-기획/decisions.md` |
| D-005 | 주제를 C(자동으로 나가는 돈 미리 알려 주기)로 확정한다 | `specs/001-초기-기획/decisions.md` |
| D-006 | 주제를 A(야구 입문자 서비스)로 변경한다 | `specs/001-초기-기획/decisions.md` |
| D-007 | 응원팀 정하기는 재미 콘텐츠로 둔다 | `specs/001-초기-기획/decisions.md` |
| D-008 | 금융 기능은 확장판에서 생각한다 | `specs/001-초기-기획/decisions.md` |
| D-009 | 백엔드는 Spring으로 한다 | `specs/001-초기-기획/decisions.md` |
| D-010 | 레포 이름은 what-is-yagu로 한다 | `specs/001-초기-기획/decisions.md` |
| D-011 | SDD 방식으로 진행하고, 세부 운영은 레포에서 정하며 기록한다 | `specs/001-초기-기획/decisions.md` |
| D-012 | 문서를 작업 단위별 폴더로 나눈다 | `specs/001-초기-기획/decisions.md` |
| D-013 | 첫날(2026-11-12) 작업 단위를 하나로 합친다 | `specs/001-초기-기획/decisions.md` |
| D-014 | SDD 툴 없이 단계를 직접 구성한다 | `specs/002-1주차-설계/decisions.md` |
| D-015 | 1주차 목표를 설계 산출물까지로 넓힌다 | `specs/002-1주차-설계/decisions.md` |
| D-016 | SDD 단계는 기능 단위로 돈다 | `specs/002-1주차-설계/decisions.md` |
| D-017 | 기술스택은 효율을 기준으로 고른다 | `specs/002-1주차-설계/decisions.md` |
| D-018 | 프론트엔드는 React + Vite(SPA)로 한다 | `specs/002-1주차-설계/decisions.md` |
| D-019 | DB는 PostgreSQL + pgvector로 한다 | `specs/002-1주차-설계/decisions.md` |
| D-020 | 인프라는 AWS 무료 플랜 안에서 EC2 1대 + Docker Compose로 한다 | `specs/002-1주차-설계/decisions.md` |
| D-021 | CI/CD는 GitHub Actions로 한다 | `specs/002-1주차-설계/decisions.md` |
| D-022 | Java 21을 쓰고, Spring Boot는 Spring AI와 호환되는 최신 안정 버전으로 한다 | `specs/002-1주차-설계/decisions.md` |
| D-023 | 와이어프레임은 Stitch로 만들고, 프롬프트와 결과를 레포에 남긴다 | `specs/002-1주차-설계/decisions.md` |
| D-024 | ERD와 배포 아키텍처는 Mermaid로 그린다 | `specs/002-1주차-설계/decisions.md` |
| D-025 | API 명세는 레포의 OpenAPI 파일을 원본으로 두고, Notion에 동기화한다 | `specs/002-1주차-설계/decisions.md` |
| D-026 | 문서를 "지금 상태"와 "과정 기록"으로 나눠 둔다 | `specs/002-1주차-설계/decisions.md` |
| D-027 | Notion API 명세 템플릿과 레포 OpenAPI의 대응 규칙을 정한다 | `specs/002-1주차-설계/decisions.md` |
| D-028 | 테스트 원칙을 정한다 | `specs/002-1주차-설계/decisions.md` |
| D-029 | AI 사용 원칙(비용 최적화)을 정한다 | `specs/002-1주차-설계/decisions.md` |
| D-030 | 작업 관리는 GitHub Issues로 하고, 판단은 내가, 입력은 AI가 한다 | `specs/002-1주차-설계/decisions.md` |
| D-031 | 브랜치는 develop과 main을 둔다 | `specs/002-1주차-설계/decisions.md` |
| D-032 | Notion은 API 명세만 다루고, 진행 상태는 GitHub Issues로 관리한다 | `specs/002-1주차-설계/decisions.md` |
| D-033 | 작업 단위 폴더 이름은 번호 + 작업명으로 한다 | `specs/002-1주차-설계/decisions.md` |
| D-034 | 스터디 기록 양식에 맞춰 결정에 "결과"를 더하고, 트러블슈팅·주간 보고 템플릿을 둔다 | `specs/002-1주차-설계/decisions.md` |
| D-035 | 직관과 중계 시청을 동등하게 본다 | `specs/002-1주차-설계/decisions.md` |
| D-036 | 고객과 목적 문장을 확정한다: 한 번의 답이 아니라 이해를 쌓아 가는 서비스 | `specs/002-1주차-설계/decisions.md` |
| D-037 | 서비스의 출발점은 뉴비가 알아야 할 정보를 묶어서 보여 주는 것이다 | `specs/002-1주차-설계/decisions.md` |
| D-038 | 목적과 고객에서 출발하지 않은 기능은 제안하지 않는다 | `specs/002-1주차-설계/decisions.md` |
| D-039 | 관중 수 근거는 증가 추세만 보여 주면 충분하다 | `specs/002-1주차-설계/decisions.md` |
| D-040 | 2-2a는 AI와 내가 번갈아 제안하고 보완하는 방식으로 진행한다 | `specs/002-1주차-설계/decisions.md` |
| D-041 | 뉴비의 일상 언어를 이해하는 것을 문제 정의에 넣고, 내 감각의 한계를 고민거리로 둔다 | `specs/002-1주차-설계/decisions.md` |
| D-042 | 고객을 아직 야구를 보지 않은 관심자까지 넓힌다 | `specs/002-1주차-설계/decisions.md` |
| D-043 | 설문은 지인·가족·스터디원 중 스스로 야구를 잘 모른다고 느끼는 사람에게 보낸다 | `specs/002-1주차-설계/decisions.md` |
| D-044 | 설문은 11-17에 1차로 마감하되, 개발 전까지 계속 받는다 | `specs/002-1주차-설계/decisions.md` |
| D-045 | 야구를 잘 아는 사람(고인물)은 짧은 별도 섹션에서 입문 때를 돌아보게 한다 | `specs/002-1주차-설계/decisions.md` |
| D-046 | 핵심 기능 1은 "야구 정보"다: 리그 운영 정보, 기록 읽는 방법, 팀·선수 정보 | `specs/002-1주차-설계/decisions.md` |
| D-047 | MVP의 야구 데이터는 크롤링 없이 공식 출처를 보고 직접 쓰거나 필요한 만큼 옮긴다 | `specs/002-1주차-설계/decisions.md` |
| D-048 | 기록 읽는 방법은 1차 스탯 기준표로 시작하고, 기준·말투·풀이는 내가 쓴다 | `specs/002-1주차-설계/decisions.md` |
