# 재현 프롬프트

아래 내용을 다른 Codex에게 그대로 전달하면 현재 프로젝트의 핵심 결과물을 같은 방향으로 재현하거나 이어서 개발할 수 있습니다.

```text
너는 `hiphop5782/game` 프로젝트를 이어 개발하는 Codex다.

프로젝트는 정적 HTML 기반 미니게임 모음이다. 최신 구현은 `index.html` 내부 `<style>`과 `<script>`에 들어 있다. 기존 `css/style.css`, `js/*.js`가 있어도 이번 작업은 `index.html` 기준으로 해야 한다.

목표:
1. 기존 미니게임 홈에 `미로찾기`와 `사진 퍼즐` 게임이 있어야 한다.
2. `미로찾기`는 랜덤 미로, 난이도, 힌트, 키보드/버튼 이동, 바깥 입구/출구, 오리지널 숫자 블록 캐릭터를 지원해야 한다.
3. `사진 퍼즐`은 사진 또는 동영상을 선택해 줄/칸 수대로 퍼즐을 만들고, PC 드래그 앤 드롭과 모바일 터치 선택 배치를 지원해야 한다.
4. 동영상을 선택하면 첫 프레임을 캔버스로 캡처해 퍼즐 이미지로 쓰고, 퍼즐 완성 후 원본 동영상을 표시 및 재생해야 한다.
5. `/docs`에는 프로젝트 맥락, 작업내역, 기능명세, 다음 작업, AI 작업 가이드, 구현 청사진, 재현 프롬프트, QA 체크리스트가 있어야 한다.
6. 작업 후 결과물을 `C:\Users\PC\vs-workspace\game\game`으로 복사해야 한다.

미로찾기 구현 조건:
- 홈 카드:
  - onclick: `app.startGame('maze')`
  - 제목: `미로찾기`
- view id: `maze-view`
- 게임 객체: `mazeGame`
- app.views에 `maze-view` 추가
- app.startGame에 `maze` 분기 추가
- 난이도:
  - 쉬움: 11 x 11, 힌트 4, randomPickRate 0.25
  - 보통: 15 x 15, 힌트 3, randomPickRate 0.45
  - 어려움: 21 x 21, 힌트 2, randomPickRate 0.65
  - 매우 어려움: 31 x 31, 힌트 1, randomPickRate 0.8
- 미로는 루프 없는 트리형이어야 한다.
- 벽을 나중에 임의로 뚫는 방식은 쓰지 마라. 두 줄 통로와 순환 통로가 생긴다.
- 시작점은 왼쪽 바깥 입구 `(0,1)`이다.
- 출구는 시작점에서 먼 가장자리로 잡고 바깥 벽을 열어야 한다.
- `findPath()`는 BFS로 현재 위치에서 출구까지 찾는다.
- 힌트는 다음 최대 6칸만 표시한다.
- 플레이어는 저작권 캐릭터가 아니라 CSS로 만든 오리지널 숫자 블록 캐릭터다.

사진/동영상 퍼즐 구현 조건:
- 홈 카드:
  - onclick: `app.startGame('photoPuzzle')`
  - 제목: `사진 퍼즐`
- view id: `photo-puzzle-view`
- 게임 객체: `photoPuzzleGame`
- app.views에 `photo-puzzle-view` 추가
- app.startGame에 `photoPuzzle` 분기 추가
- 파일 입력:
  - id: `photo-puzzle-file`
  - type: file
  - accept: `image/*,video/*,.jpg,.jpeg,.png,.webp,.mp4,.mov,.webm`
  - aria-label: `갤러리에서 사진 또는 동영상 선택`
- 줄 입력 id: `photo-puzzle-rows`, min 2, max 8, 기본 3
- 칸 입력 id: `photo-puzzle-cols`, min 2, max 8, 기본 3
- 보드 id: `photo-puzzle-board`
- 트레이 id: `photo-puzzle-tray`
- 피드백 id: `photo-puzzle-feedback`
- 동영상 표시 영역:
  - wrap id: `photo-puzzle-video-wrap`
  - video id: `photo-puzzle-video`
  - controls, playsinline
- 사진은 object URL을 그대로 퍼즐 이미지로 쓴다.
- 동영상은 `captureVideoFrame(videoUrl)`로 첫 프레임을 캔버스에 그려 data URL로 만든다.
- 동영상 캡처 실패 시 사용자 메시지를 보여준다.
- 퍼즐 조각은 별도 파일로 자르지 말고 CSS background-position으로 표현한다.
- 조각에는 `dataset.row`, `dataset.col`이 있어야 한다.
- PC는 HTML Drag and Drop을 지원한다.
- 모바일은 `조각 선택 -> 칸 터치` 방식도 지원한다.
- 선택된 조각은 `.selected` 스타일을 가진다.
- 힌트는 아직 맞지 않은 조각 하나를 정답 위치에 배치하고 `.locked` 처리한다.
- 완성 후 사진이면 완성 메시지, 동영상이면 비디오 플레이어 표시 및 재생 시도.
- 자동 재생이 막히면 재생 버튼을 누르라는 메시지를 보여준다.

문서화 조건:
- `/docs/README.md`
- `/docs/PROJECT_CONTEXT.md`
- `/docs/WORKLOG.md`
- `/docs/FEATURE_SPECS.md`
- `/docs/NEXT_STEPS.md`
- `/docs/AI_CODING_GUIDE.md`
- `/docs/IMPLEMENTATION_BLUEPRINT.md`
- `/docs/REPRODUCTION_PROMPT.md`
- `/docs/QA_CHECKLIST.md`

검증:
- `node`로 `index.html` 내부 script 문법 검사
- `git diff --check -- index.html docs`
- 복사 대상 `C:\Users\PC\vs-workspace\game\game\index.html`도 script 문법 검사
- 인앱 브라우저가 file:// 페이지면 자동화가 보안 정책으로 막힐 수 있으니 억지 우회하지 말고 사용자에게 새로고침 후 직접 확인하게 안내

복사:
- 최종 `index.html`과 `/docs/*.md`를 `C:\Users\PC\vs-workspace\game\game`으로 덮어쓴다.
```

