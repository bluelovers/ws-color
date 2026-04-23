# colord-rand-loop

基於 Colord 的隨機顏色循環生成器，提供去重功能的顏色生成工具 (Random color loop generator based on Colord with deduplication functionality)

## 安裝 (Installation)

```bash
# 使用 yarn / Using yarn
yarn add colord-rand-loop

# 使用 yarn-tool / Using yarn-tool
yarn-tool add colord-rand-loop
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add colord-rand-loop

# 使用 pnpm / Using pnpm
pnpm add colord-rand-loop

# 使用 npm / Using npm
npm install colord-rand-loop
```

## 使用方式 (Usage)

```typescript
import { colordRandLoop, createColordRandLoop, IOptionsColordRandLoop } from 'colord-rand-loop';

// 基本使用 - 從預設顏色開始生成隨機顏色
const generator = colordRandLoop();
const color1 = generator.next().value; // 第一個隨機顏色
const color2 = generator.next().value; // 第二個隨機顏色（不重複）

// 指定起始索引
const generatorFromIndex = colordRandLoop(2); // 從索引 2 開始

// 自定義顏色來源
const myColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
const customGenerator = colordRandLoop(0, { colors: myColors });

// 自定義隨機函式
const seededGenerator = colordRandLoop(0, {
  randFn: () => 0.5 // 固定隨機種子
});

// 進階配置
const options: IOptionsColordRandLoop = {
  colors: ['#FF0000', '#00FF00'],
  randFn: Math.random,
  // cache 會自動管理
};
const advancedGenerator = createColordRandLoop(options);

// 使用方式
for (let i = 0; i < 5; i++) {
  const color = advancedGenerator.next().value;
  console.log(color.toHex()); // 輸出十六進位顏色
}
```

## API 參考

### colordRandLoop(startIndex?, options?)
創建一個配置完成的 Colord 隨機循環生成器。

**參數:**
- `startIndex` (number, 可選): 起始索引，預設為 0
- `options` (IOptionsColordRandLoop, 可選): 配置選項

**返回值:** 可迭代的 Generator，每次調用 `.next().value` 返回一個 Colord 實例

### createColordRandLoop(options?)
創建一個可配置的 Colord 隨機循環生成器工廠。

**參數:**
- `options` (IOptionsColordRandLoop, 可選): 配置選項

**返回值:** 配置完成的 Generator 函式

### IOptionsColordRandLoop 介面

- `cache` (Set<string>, 可選): 用於去重的顏色快取集合
- `colors` (ITSArrayListMaybeReadonly<IColorInput>, 可選): 顏色來源陣列
- 繼承自 `IOptions<IColorInput, Colord>` 和 `IOptionsRandColorUtil`

## 範例

### 基本隨機顏色生成
```typescript
import { colordRandLoop } from 'colord-rand-loop';

const rgbValues = [];
const gen = colordRandLoop();

for (let i = 0; i < 10; i++) {
  const color = gen.next().value;
  rgbValues.push(color.toRgb());
}
// rgbValues 包含 10 個不重複的隨機 RGB 顏色
```

### 自定義顏色盤
```typescript
import { colordRandLoop } from 'colord-rand-loop';

const brandColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B'];
const brandGen = colordRandLoop(0, { colors: brandColors });

// 只會從品牌顏色中選擇
const color = brandGen.next().value;
```

