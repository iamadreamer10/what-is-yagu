"""Claude Code 세션 로그에서 AI 사용량(토큰, 호출 수, 대화 턴 수)을 집계한다.

PR 템플릿의 "AI 사용 기록"을 채울 때 쓴다. (D-030)

사용법:
    python tools/ai-usage.py                      # 이 레포의 가장 최근 세션
    python tools/ai-usage.py --since 2026-11-14T09:00   # 그 시각 이후만 (브랜치를 만든 시각 등)
    python tools/ai-usage.py --session <로그 파일 경로>

주의: Claude Code 내부 로그 형식에 기대므로, 업데이트로 형식이 바뀌면 고쳐야 할 수 있다.
"""

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

KEYS = [
    ("input_tokens", "입력 (새로 읽음)"),
    ("cache_creation_input_tokens", "캐시 저장"),
    ("cache_read_input_tokens", "캐시 읽기"),
    ("output_tokens", "출력"),
]


def project_log_dir() -> Path:
    name = re.sub(r"[:\\/]", "-", str(Path.cwd()))
    return Path.home() / ".claude" / "projects" / name


def parse_time(value: str) -> datetime:
    t = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if t.tzinfo is None:
        t = t.astimezone()  # 시간대가 없으면 이 PC의 시간대로 본다
    return t


def is_user_text(entry: dict) -> bool:
    if entry.get("type") != "user":
        return False
    content = (entry.get("message") or {}).get("content")
    if isinstance(content, str):
        return True
    if isinstance(content, list):
        return any(isinstance(c, dict) and c.get("type") == "text" for c in content)
    return False


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")  # Windows 콘솔에서 한글이 깨지지 않게
    parser = argparse.ArgumentParser(description="Claude Code 세션의 AI 사용량 집계")
    parser.add_argument("--session", type=Path, help="세션 로그(.jsonl) 경로")
    parser.add_argument("--since", help="이 시각 이후만 집계 (ISO 형식, 예: 2026-11-14T09:00)")
    args = parser.parse_args()

    log = args.session
    if log is None:
        logs = sorted(project_log_dir().glob("*.jsonl"), key=lambda p: p.stat().st_mtime)
        if not logs:
            raise SystemExit(f"세션 로그를 찾지 못했어요: {project_log_dir()}")
        log = logs[-1]
    since = parse_time(args.since) if args.since else None

    usage_by_message = {}
    turns = 0
    with open(log, encoding="utf-8") as f:
        for line in f:
            try:
                entry = json.loads(line)
            except json.JSONDecodeError:
                continue
            stamp = entry.get("timestamp")
            if since and (not stamp or parse_time(stamp) < since):
                continue
            if is_user_text(entry):
                turns += 1
            message = entry.get("message") or {}
            if message.get("usage") and message.get("id"):
                usage_by_message[message["id"]] = message["usage"]  # 같은 응답이 여러 줄에 나뉘어 기록되므로 id로 한 번만 센다

    totals = {k: sum(u.get(k) or 0 for u in usage_by_message.values()) for k, _ in KEYS}

    scope = f"{since.isoformat(timespec='minutes')} 이후" if since else "세션 전체"
    print(f"<!-- 집계: python tools/ai-usage.py / {log.name} / {scope} -->")
    print("| 항목 | 값 |")
    print("| --- | --- |")
    print(f"| AI 호출 횟수 | {len(usage_by_message):,} |")
    print(f"| 대화 턴 수 (사람 입력) | {turns:,} |")
    for key, label in KEYS:
        print(f"| {label} | {totals[key]:,} |")


if __name__ == "__main__":
    main()
