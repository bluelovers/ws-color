# loop-colors

提供顏色陣列循環迭代功能的工具庫，支援隨機順序與自定義生成器 (Utility library for circular iteration over color arrays with random order and custom generator support)

## 安裝 (Installation)

```bash
# 使用 yarn / Using yarn
yarn add loop-colors

# 使用 yarn-tool / Using yarn-tool
yarn-tool add loop-colors
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add loop-colors

# 使用 pnpm / Using pnpm
pnpm add loop-colors

# 使用 npm / Using npm
npm install loop-colors
```

## 使用方式 (Usage)

```typescript
import { loopColors, cssColors, cliColors, IOptions } from 'loop-colors';

// 基本順序循環
const seqGen = loopColors(['#FF0000', '#00FF00', '#0000FF']);
const seqIter = seqGen();
console.log(seqIter.next().value); // '#FF0000'
console.log(seqIter.next().value); // '#00FF00'
console.log(seqIter.next().value); // '#0000FF'
console.log(seqIter.next().value); // '#FF0000' (循環回到開始)

// 隨機循環
const randGen = loopColors(['#FF0000', '#00FF00', '#0000FF'], { rand: true });
const randIter = randGen();
console.log(randIter.next().value); // 隨機選擇一個顏色

// 自定義生成器
const upperGen = loopColors(['red', 'blue', 'green'], {
  generator: (colors, pos) => colors[pos].toUpperCase()
});
const upperIter = upperGen();
console.log(upperIter.next().value); // 'RED'

// 設定生成上限
const limitedGen = loopColors(['#FF0000', '#00FF00', '#0000FF'], { limit: 3 });
const limitedIter = limitedGen();
const values = [];
let result = limitedIter.next();
while (!result.done) {
  values.push(result.value);
  result = limitedIter.next();
}
// values 包含 ['#FF0000', '#00FF00', '#0000FF'] (3 個值)

// 使用預設 CSS 顏色
const cssGen = loopColors(cssColors());
const cssIter = cssGen();
console.log(cssIter.next().value); // 第一個 CSS 顏色

// 使用終端機顏色
const cliGen = loopColors(cliColors());
const cliIter = cliGen();
console.log(cliIter.next().value); // 第一個終端機顏色

// 指定起始索引
const indexedGen = loopColors(['#FF0000', '#00FF00', '#0000FF'], {});
const indexedIter = indexedGen(1);
console.log(indexedIter.next().value); // 從索引 1 開始：'#00FF00'
```

## API 參考

### loopColors<T, R = T>(colors, options?)
創建一個可迭代的顏色生成器。

**參數:**
- `colors` (ITSArrayListMaybeReadonly<T>): 輸入顏色陣列
- `options` (IOptions<T, R>, 可選): 配置選項

**返回值:** Generator 函式，返回可迭代物件

### cssColors()
取得預設的 CSS 顏色列表。

**返回值:** 只讀顏色陣列，包含 7 種基本顏色的十六進位色碼

### cliColors()
取得終端機可用的標準顏色名稱列表。

**返回值:** 終端機顏色名稱陣列

### IOptions<T, R> 介面

- `rand` ((index?: number, length?: number, ...argv: any[]) => number | boolean, 可選): 隨機函式或是否啟用隨機
- `limit` (number | -1, 可選): 生成上限次數，-1 表示無限制
- `generator` ((colors: readonly T[], position: number, idx: number, len: number) => R, 可選): 自定義生成器函式

## 範例

### 基本使用
```typescript
import { loopColors } from 'loop-colors';

// 順序循環顏色
const colorLoop = loopColors(['#FF0000', '#00FF00', '#0000FF']);
const iter = colorLoop();
for (let i = 0; i < 5; i++) {
  console.log(iter.next().value);
}
// 輸出: #FF0000, #00FF00, #0000FF, #FF0000, #00FF00
```

### 隨機顏色選擇
```typescript
import { loopColors } from 'loop-colors';

// 隨機循環（不重複直到用完所有選項）
const randomColorLoop = loopColors(['#FF0000', '#00FF00', '#0000FF'], { rand: true });
const randIter = randomColorLoop();
for (let i = 0; i < 6; i++) {
  console.log(randIter.next().value);
}
// 輸出: 隨機順序的三種顏色，然後重複
```

### 自定義顏色處理
```typescript
import { loopColors } from 'loop-colors';

// 自動將顏色轉換為大寫
const upperCaseLoop = loopColors(['red', 'blue', 'green'], {
  generator: (colors, pos) => colors[pos].toUpperCase()
});
console.log(upperCaseLoop().next().value); // 'RED'
```

### 限制生成數量
```typescript
import { loopColors } from 'loop-colors';

// 只生成前 5 個值
const limitedLoop = loopColors(['#FF0000', '#00FF00', '#0000FF'], { limit: 5 });
const limitedIter = limitedLoop();
const results = [];
let item = limitedIter.next();
while (!item.done) {
  results.push(item.value);
  item = limitedIter.next();
}
// results = ['#FF0000', '#00FF00', '#0000FF', '#FF0000', '#00FF00']
```

