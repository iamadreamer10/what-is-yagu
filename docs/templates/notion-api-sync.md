# Notion API 명세 동기화 규칙

> 레포의 OpenAPI 파일(`api.yaml`)이 원본이고, Notion은 보기·공유용 사본이다. (D-025, D-027, D-032)
> AI는 기능 상세 설계를 승인받은 뒤 이 규칙대로 Notion에 반영한다.

## 대상

- 위치: Notion 개인 워크스페이스 `취업 자료 정리 / 야구 그게 뭔데 / 프로젝트 자료 / API 명세서`
  - 페이지: https://app.notion.com/p/41751caa6b2d800496cfd6ea0b6e2cd1
  - 데이터베이스 `엔드포인트`: `collection://d1451caa-6b2d-82fc-b28b-8778b7c44a25`
- 원본: `docs/specs/<번호>-F1-<이름>/api.yaml` (기능별)

## 속성 대응

한 행 = 엔드포인트 하나 (경로 + 메서드).

| Notion 속성 | OpenAPI에서 가져오는 곳 |
| --- | --- |
| 기능 (제목) | `summary` |
| 설명 | `description` |
| Method | 메서드 |
| URL | 경로 (예: `/api/v1/questions`) |
| param | 경로·쿼리 파라미터 이름 |
| 카테고리 | `tags`. 선택지가 없으면 "이름 (TAG)" 형식으로 새로 추가 |
| 사용자 | `x-actor` 확장 필드 (유저 / 관리자) |
| 기타 | 원본 파일 경로 |
| 상태 | **쓰지 않는다.** 진행 상태는 GitHub Issues에서만 관리한다 (D-032) |

## 본문 대응

템플릿 순서를 따른다.

1. **Request** 표: 요청 본문 스키마의 각 필드
2. **Query parameter**: 쿼리 파라미터 (같은 표 형식). 없으면 비워 둔다
3. **Response** 표: 응답 스키마의 각 필드
4. **Request Example**, **Response Example**: 스키마의 `example`
5. **Status** 표: 응답 코드와 설명

Request·Response 표의 열:

| 열 | 쓰는 내용 |
| --- | --- |
| key | 필드 이름 |
| 설명 | `description` |
| value 타입 | 타입 (String, Number, Boolean, Object, Array) |
| 옵션 | 제약 조건 (길이, 형식, 허용 값). 없으면 `-` |
| Nullable | O / X 만 쓴다. 필수 필드는 X |
| 예시 | `example` |

## 운영 규칙

- `API 명세서` 페이지 맨 위에 "원본은 레포의 OpenAPI 파일. 여기서 직접 수정하지 않음"이라고 한 번 적는다.
- Notion에서 고칠 것이 보이면 레포에서 고치고 다시 동기화한다.
- 기존 행을 지우는 일은 사람에게 확인받고 한다. (템플릿에 있던 예시 행 포함)
- 동기화 시점: 기능 상세 설계를 승인할 때.
- 공통 응답 형식(예: `{code, message, data}`)은 API 설계(1주차 작업표 3-4)에서 정한다.
