# HWP MCP 직원용 설정 가이드

## 📋 개요

Claude Desktop에서 회사 HWP 서버에 접속하여 한글 문서를 생성할 수 있습니다.

## ✅ 설정 방법 (5분 소요)

### 1단계: Claude Desktop 설정 파일 열기

**Mac 사용자:**
```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows 사용자:**
```
%APPDATA%\Claude\claude_desktop_config.json
```
(파일 탐색기 주소창에 위 경로를 붙여넣기)

### 2단계: 설정 추가

파일을 열면 다음과 같은 내용이 있을 것입니다:

```json
{
  "mcpServers": {
  }
}
```

아래 내용을 **추가**하세요:

```json
{
  "mcpServers": {
    "hwp-remote": {
      "command": "npx",
      "args": ["-y", "hwp-mcp-client", "http://106.241.28.49:8081"]
    }
  }
}
```

**⚠️ 주의:** 이미 다른 MCP 서버가 설정되어 있다면, `"hwp-remote"` 부분만 추가하세요.

예시:
```json
{
  "mcpServers": {
    "existing-server": {
      "command": "..."
    },
    "hwp-remote": {
      "command": "npx",
      "args": ["-y", "hwp-mcp-client", "http://106.241.28.49:8081"]
    }
  }
}
```

### 3단계: Claude Desktop 재시작

1. Claude Desktop을 완전히 종료
2. 다시 실행

### 4단계: 확인

Claude Desktop에서 다음과 같이 물어보세요:

```
HWP 도구가 사용 가능한가요?
```

또는

```
주간 보고서 템플릿을 열어주세요
```

## 🎯 사용 예시

### 템플릿 목록 보기
```
사용 가능한 HWP 템플릿 목록을 보여주세요
```

### 템플릿 열기
```
주간 보고서 템플릿을 열어주세요
```

### 텍스트 입력
```
제목에 "2026년 1월 주간 보고서"를 입력해주세요
```

### 표 작성
```
3행 4열 표를 만들어주세요
```

## ❓ 문제 해결

### "HWP 도구를 찾을 수 없습니다"

1. Claude Desktop을 완전히 종료했는지 확인
2. 설정 파일의 JSON 문법이 올바른지 확인 (쉼표, 중괄호 등)
3. 로그 확인:
   - **Mac**: `~/Library/Logs/Claude/mcp*.log`
   - **Windows**: `%APPDATA%\Claude\logs\mcp*.log`

### "서버에 연결할 수 없습니다"

1. 인터넷 연결 확인
2. 서버 상태 확인:
   ```bash
   curl http://106.241.28.49:8081/health
   ```
   응답: `{"status":"ok"}` 가 나와야 정상

3. 방화벽 확인 (IT 팀에 문의)

### "npx 명령을 찾을 수 없습니다"

Node.js가 설치되어 있지 않습니다.

**Mac:**
```bash
brew install node
```

**Windows:**
https://nodejs.org/ 에서 다운로드

## 📞 지원

문제가 계속되면 IT 팀에 문의하세요:
- 서버 IP: 106.241.28.49
- 포트: 8081
- 이 문서를 함께 공유해주세요

## 🔒 보안

- 회사 내부 서버에만 접속합니다
- 외부 인터넷 연결이 필요합니다 (포트 8081)
- 생성된 문서는 로컬에 저장됩니다

## 📝 버전 정보

- HWP MCP Client: 1.0.0
- 서버: 106.241.28.49:8081
- 최종 업데이트: 2026-01-31
