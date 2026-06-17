# 구현 청사진

이 문서는 다른 Codex 또는 개발자가 같은 결과물을 재현할 수 있도록 `index.html`에 들어간 변경 구조를 상세히 설명합니다.

## 전체 구현 위치

현재 최신 구현은 거의 모두 `index.html` 안에 있습니다.

수정해야 하는 주요 영역:

- `<style>` 내부 CSS
- 홈 화면 `<section id="home-view">`
- 미로 화면 `<section id="maze-view">`
- 사진/동영상 퍼즐 화면 `<section id="photo-puzzle-view">`
- `const app = { ... }`
- `const mazeGame = { ... }`
- `const photoPuzzleGame = { ... }`

기존 `css/style.css`, `js/app.js`, `js/flag-game.js`, `js/clock-game.js`도 존재하지만, 현재 사용자가 확인하는 최신 결과는 `index.html` 내부 구현 기준입니다.

## 앱 라우터 구조

`app.views` 배열에는 모든 화면 id가 들어가야 합니다.

필수 포함:

```js
views: [
  'home-view',
  'records-view',
  'flag-view',
  'clock-view',
  'animal-view',
  'sequence-view',
  'sudoku-view',
  'magic-view',
  'maze-view',
  'photo-puzzle-view'
]
```

기록 화면 진입용 메서드도 있어야 합니다.

```js
showRecords() {
  this.showView('records-view');
  gameRecords.renderRecords();
}
```

`goHome()`에서는 홈으로 돌아간 뒤 프로필 UI를 갱신합니다.

```js
goHome() {
  this.showView('home-view');
  gameRecords.renderUserControls();
}
```

## 로컬 유저/기록 시스템

객체 이름은 `gameRecords`입니다. `app`보다 먼저 선언되어야 하며, 페이지 로드 후 초기화됩니다.

```js
window.addEventListener('DOMContentLoaded', () => {
  gameRecords.init();
});
```

저장 키:

```js
storageKey: 'miniGamePlayRecords.v1'
```

기본 데이터:

```js
data: {
  users: [],
  activeUserId: '',
  records: []
}
```

필수 메서드:

- `init()`
- `load()`
- `save()`
- `ensureDefaultUser()`
- `createUser(name)`
- `getActiveUser()`
- `addUserFromInput()`
- `setActiveUser(userId)`
- `recordGameResult(record)`
- `renderUserControls()`
- `renderRecords()`
- `formatDate(value)`

`ensureDefaultUser()`는 유저가 없을 때 `게스트`를 자동 생성해야 합니다.

`recordGameResult(record)`는 아래 공통 형태로 저장합니다.

```js
{
  id: "record_...",
  userId: activeUser.id,
  gameType: record.gameType,
  gameName: record.gameName,
  difficulty: record.difficulty || "기본",
  startedAt,
  endedAt,
  durationSec,
  success: Boolean(record.success),
  score: record.score || 0,
  hintsUsed: record.hintsUsed || 0,
  stats: record.stats || {}
}
```

홈 화면에는 아래 id들이 필요합니다.

- `active-user-name`
- `user-select`
- `new-user-name`

기록 화면에는 아래 id들이 필요합니다.

- `records-view`
- `records-user-name`
- `record-summary`
- `record-list`

`app.startGame(type)`에는 다음 분기가 있어야 합니다.

```js
} else if (type === 'maze') {
  this.showView('maze-view');
  mazeGame.init();
} else if (type === 'photoPuzzle') {
  this.showView('photo-puzzle-view');
  photoPuzzleGame.init();
}
```

## 홈 화면 카드

홈 화면의 `.game-list` 안에 다음 카드가 있어야 합니다.

```html
<button class="game-card" onclick="app.startGame('maze')">
  <div class="card-icon-wrap">🌀</div>
  <h2>미로찾기</h2>
</button>
<button class="game-card" onclick="app.startGame('photoPuzzle')">
  <div class="card-icon-wrap">🖼️</div>
  <h2>사진 퍼즐</h2>
</button>
```

주의: 기존 `숫자 패턴 맞추기` 카드에 닫는 `</button>`이 빠져 있던 문제가 있었으므로, 카드 마크업이 서로 중첩되지 않도록 확인해야 합니다.

## 미로찾기 CSS

필수 클래스:

- `.maze-panel`
- `.maze-status-row`
- `.maze-stat`
- `.maze-difficulty-row`
- `.maze-difficulty-btn`
- `.maze-difficulty-btn.active`
- `.maze-board`
- `.maze-cell`
- `.maze-cell.wall`
- `.maze-cell.start`
- `.maze-cell.exit`
- `.maze-cell.entrance`
- `.maze-cell.exit-gate`
- `.maze-cell.hint`
- `.maze-cell.visited::after`
- `.maze-cell.player .maze-player-character`
- `.maze-player-number`
- `.maze-controls`
- `.maze-move-btn`
- `.maze-feedback`

미로 보드는 CSS 변수 `--maze-size`로 크기를 제어합니다.

```css
.maze-board {
  --maze-size: min(72vw, 520px);
  display: grid;
  width: var(--maze-size);
  height: var(--maze-size);
}
```

모바일에서는 `--maze-size: min(88vw, 420px)`로 줄입니다.

## 미로찾기 DOM 구조

`maze-view` 안에는 아래 id들이 반드시 있어야 합니다.

- `maze-score`
- `maze-difficulty-label`
- `maze-steps`
- `maze-hints`
- `maze-difficulty-easy`
- `maze-difficulty-normal`
- `maze-difficulty-hard`
- `maze-difficulty-extreme`
- `maze-board`
- `maze-feedback`

난이도 버튼은 다음 식별자를 써야 `updateStats()`가 active 상태를 갱신할 수 있습니다.

```html
id="maze-difficulty-easy"
id="maze-difficulty-normal"
id="maze-difficulty-hard"
id="maze-difficulty-extreme"
```

## mazeGame 상태값

필수 속성:

```js
size: 15,
difficulty: 'normal',
difficulties: {
  easy: { label: '쉬움', size: 11, hints: 4, randomPickRate: 0.25 },
  normal: { label: '보통', size: 15, hints: 3, randomPickRate: 0.45 },
  hard: { label: '어려움', size: 21, hints: 2, randomPickRate: 0.65 },
  extreme: { label: '매우 어려움', size: 31, hints: 1, randomPickRate: 0.8 }
},
grid: [],
player: { x: 0, y: 1 },
exit: { x: 14, y: 13 },
steps: 0,
wins: 0,
hintsLeft: 3,
hintCells: new Set(),
visited: new Set(),
isFinished: false,
keyHandlerReady: false
```

## 미로 생성 알고리즘

요구사항:

- 미로는 랜덤 생성되어야 합니다.
- 시작점과 출구는 바깥 벽과 연결되어야 합니다.
- 길이 두 줄로 뭉치는 넓은 통로를 만들지 않아야 합니다.
- 순환형 통로가 없어야 합니다.
- 갈림길은 난이도에 따라 충분히 생겨야 합니다.

현재 방식:

1. `grid`를 전부 벽 `1`로 채웁니다.
2. 내부 시작점 `(1, 1)`을 길 `0`으로 만듭니다.
3. `activeCells` 배열을 사용합니다.
4. 매 반복마다 `activeCells`에서 하나를 고릅니다.
5. 고르는 방식은 난이도별 `randomPickRate`로 조정합니다.
6. 아직 방문하지 않은 2칸 거리 이웃을 찾아 벽을 한 칸 뚫고 이동합니다.
7. 이 방식은 연결 그래프가 트리라서 순환 통로가 생기지 않습니다.
8. `placeExitAtFarthestEdge()`로 시작점에서 먼 가장자리 길을 찾습니다.
9. `openExitGate()`로 바깥 벽 출구를 뚫습니다.
10. 왼쪽 입구 `(0, 1)`과 내부 시작점 `(1, 1)`을 엽니다.

`addExtraBranches()`처럼 나중에 벽을 임의로 뚫는 방식은 사용하면 안 됩니다. 이 방식은 순환 통로와 두 줄 길을 만들 수 있습니다.

## 미로 힌트

`findPath()`는 현재 플레이어 위치에서 출구까지 BFS로 경로를 찾습니다.

힌트 버튼 동작:

- `hintsLeft <= 0`이면 메시지 표시
- 경로가 있으면 `path.slice(1, 7)`만 `hintCells`에 저장
- 즉, 전체 경로가 아니라 다음 최대 6칸만 보여줍니다.

## 미로 기록 저장

`mazeGame`에는 아래 상태가 필요합니다.

```js
hintsUsed: 0,
startedAt: ''
```

`newMaze()`에서:

- `startedAt = new Date().toISOString()`
- `hintsUsed = 0`

`showHint()`에서 실제 힌트를 보여줄 때:

- `hintsLeft--`
- `hintsUsed++`

출구 도착 시 `gameRecords.recordGameResult()`를 호출합니다.

필수 저장값:

```js
{
  gameType: 'maze',
  gameName: '미로찾기',
  difficulty: config.label,
  startedAt: this.startedAt,
  success: true,
  score: Math.max(1, (this.size * this.size) - this.steps - (this.hintsUsed * 10)),
  hintsUsed: this.hintsUsed,
  stats: {
    steps: this.steps,
    mazeSize: this.size,
    exitX: this.exit.x,
    exitY: this.exit.y
  }
}
```

## 사진/동영상 퍼즐 CSS

필수 클래스:

- `.photo-puzzle-panel`
- `.photo-puzzle-controls`
- `.photo-puzzle-field`
- `.photo-puzzle-stage`
- `.photo-puzzle-area`
- `.photo-puzzle-board`
- `.photo-puzzle-tray`
- `.photo-puzzle-slot`
- `.photo-puzzle-piece`
- `.photo-puzzle-piece.selected`
- `.photo-puzzle-piece.locked`
- `.photo-puzzle-feedback`
- `.photo-puzzle-video-wrap`
- `.photo-puzzle-video-wrap video`

퍼즐판은 정사각형 고정 영역입니다.

```css
.photo-puzzle-board {
  height: var(--puzzle-size);
}
```

조각은 줄/칸 비율에 맞춰 `aspectRatio`를 JS에서 지정합니다.

## 사진/동영상 퍼즐 DOM 구조

`photo-puzzle-view` 안에는 아래 id들이 반드시 있어야 합니다.

- `photo-puzzle-score`
- `photo-puzzle-file`
- `photo-puzzle-rows`
- `photo-puzzle-cols`
- `photo-puzzle-board`
- `photo-puzzle-tray`
- `photo-puzzle-feedback`
- `photo-puzzle-video-wrap`
- `photo-puzzle-video`

파일 입력은 사진과 동영상을 모두 허용해야 합니다.

```html
<input
  id="photo-puzzle-file"
  type="file"
  accept="image/*,video/*,.jpg,.jpeg,.png,.webp,.mp4,.mov,.webm"
  aria-label="갤러리에서 사진 또는 동영상 선택"
>
```

모바일에서는 이 입력을 통해 갤러리/파일 선택 UI가 뜹니다. 특정 기기에서 카메라가 먼저 보일 수도 있는데, 이는 브라우저/OS 정책입니다.

## photoPuzzleGame 상태값

필수 속성:

```js
imageUrl: '',
sourceUrl: '',
videoUrl: '',
mediaType: '',
rows: 3,
cols: 3,
draggedPiece: null,
selectedPiece: null,
initialized: false
```

역할:

- `imageUrl`: 퍼즐 조각 배경으로 사용할 이미지 URL입니다. 사진이면 object URL, 동영상이면 첫 프레임 data URL입니다.
- `sourceUrl`: 원본 파일 object URL입니다.
- `videoUrl`: 동영상 완성 후 재생할 원본 동영상 URL입니다.
- `mediaType`: `'image'` 또는 `'video'`입니다.
- `draggedPiece`: PC 드래그 앤 드롭용 현재 조각입니다.
- `selectedPiece`: 모바일 터치 선택 배치용 현재 조각입니다.

## 사진 파일 처리

사진 선택 시:

1. 기존 URL을 `clearMediaUrls()`로 정리합니다.
2. `URL.createObjectURL(file)`을 만듭니다.
3. `imageUrl = sourceUrl`
4. 피드백 메시지를 표시합니다.

## 동영상 파일 처리

동영상 선택 시:

1. 기존 URL을 `clearMediaUrls()`로 정리합니다.
2. `sourceUrl = URL.createObjectURL(file)`을 만듭니다.
3. `mediaType = 'video'`
4. `captureVideoFrame(sourceUrl)`를 호출합니다.
5. 숨은 `<video>` 요소에 동영상을 로드합니다.
6. `loadeddata` 이벤트에서 `video.videoWidth`, `video.videoHeight`로 캔버스 크기를 정합니다.
7. `canvas.getContext('2d').drawImage(video, 0, 0, width, height)`를 실행합니다.
8. `canvas.toDataURL('image/jpeg', 0.9)`를 `imageUrl`로 저장합니다.
9. `videoUrl = sourceUrl`로 저장해 완성 후 재생에 사용합니다.

실패 처리:

- 8초 타임아웃
- `error` 이벤트
- 실패 시 “이 동영상은 첫 장면을 읽지 못했어요. 다른 영상을 골라주세요.” 메시지 표시

## 퍼즐 생성

`createPuzzle()` 흐름:

1. `imageUrl`이 없으면 사진/동영상을 먼저 고르라는 메시지 표시
2. 줄/칸 값을 읽고 2~8 사이로 보정
3. `draggedPiece`, `selectedPiece` 초기화
4. 비디오 플레이어 숨김
5. 보드와 트레이를 비움
6. 보드 grid columns/rows 설정
7. 각 슬롯에 `dataset.row`, `dataset.col` 부여
8. 조각 생성 후 섞어서 트레이에 넣음
9. 점수 갱신

## 조각 생성

각 조각은 div입니다.

필수 설정:

```js
piece.className = 'photo-puzzle-piece';
piece.draggable = true;
piece.dataset.row = row;
piece.dataset.col = col;
piece.style.backgroundImage = `url("${this.imageUrl}")`;
piece.style.backgroundSize = `${this.cols * 100}% ${this.rows * 100}%`;
piece.style.backgroundPosition = `${...}% ${...}%`;
piece.style.aspectRatio = `${this.rows} / ${this.cols}`;
```

## PC 조작

HTML Drag and Drop을 사용합니다.

- `dragstart`에서 `draggedPiece` 저장
- `dragover`에서 `event.preventDefault()`
- `drop`에서 `placePiece(draggedPiece, zone)`

## 모바일 조작

HTML Drag and Drop은 모바일에서 불안정하므로 선택 배치 방식을 지원합니다.

흐름:

1. 조각을 터치/클릭하면 `selectPiece(piece)`
2. 조각에 `.selected` 클래스 추가
3. 슬롯이나 트레이를 터치/클릭하면 `placePiece(selectedPiece, zone)`
4. 배치 후 `clearSelection()`

## 힌트

`useHint()` 흐름:

1. 보드 슬롯 중 아직 맞지 않은 첫 슬롯을 찾습니다.
2. 해당 슬롯의 `row`, `col`과 일치하는 조각을 찾습니다.
3. 슬롯에 잘못 놓인 조각이 있으면 트레이로 보냅니다.
4. 정답 조각을 슬롯에 넣습니다.
5. `.locked` 클래스 추가
6. `draggable = false`
7. 점수 갱신

## 완성 처리

`isComplete()`는 모든 슬롯에 정답 조각이 있는지 확인합니다.

## 사진/동영상 퍼즐 기록 저장

`photoPuzzleGame`에는 아래 상태가 필요합니다.

```js
startedAt: '',
hintsUsed: 0,
moves: 0,
completed: false
```

`createPuzzle()`에서:

- `startedAt = new Date().toISOString()`
- `hintsUsed = 0`
- `moves = 0`
- `completed = false`

`placePiece()`에서 실제 배치가 일어나면 `moves++`합니다.

`useHint()`에서 실제 힌트가 적용되면 `hintsUsed++`합니다.

`checkComplete()`는 `this.completed`가 false일 때만 기록을 저장해야 합니다. 중복 저장을 막기 위해 완성 직후 `this.completed = true`로 바꿉니다.

필수 저장값:

```js
{
  gameType: 'photoPuzzle',
  gameName: this.mediaType === 'video' ? '동영상 퍼즐' : '사진 퍼즐',
  difficulty: `${this.rows} x ${this.cols}`,
  startedAt: this.startedAt,
  success: true,
  score: Math.max(1, (this.rows * this.cols * 10) - (this.hintsUsed * 5)),
  hintsUsed: this.hintsUsed,
  stats: {
    rows: this.rows,
    cols: this.cols,
    pieces: this.rows * this.cols,
    moves: this.moves,
    mediaType: this.mediaType || 'image'
  }
}
```

완성 시:

- 사진이면 “완성! 사진 퍼즐을 다 맞췄어요.” 표시
- 동영상이면 “완성! 이제 동영상을 볼 수 있어요.” 표시
- `showVideoPlayer()` 호출

`showVideoPlayer()`:

1. `photo-puzzle-video-wrap`에서 `hidden` 제거
2. `photo-puzzle-video.src = videoUrl`
3. `video.play()` 시도
4. 자동 재생이 막히면 “완성! 재생 버튼을 누르면 동영상이 시작돼요.” 표시

## 검증 명령

스크립트 문법:

```powershell
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]); for (const s of scripts) new Function(s); console.log('script parse ok:', scripts.length);"
```

diff 공백:

```powershell
git diff --check -- index.html docs
```

대상 폴더 복사 후 검증:

```powershell
node -e "const fs=require('fs');const html=fs.readFileSync('C:/Users/PC/vs-workspace/game/game/index.html','utf8');const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]); for (const s of scripts) new Function(s); console.log('target script parse ok:', scripts.length);"
```
