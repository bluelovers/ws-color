# @lazy-color/rand-util

隨機顏色生成工具，提供 RGB 色彩隨機值的工具函數 (Random color generation utilities providing RGB color random value functions)

## 安裝 (Installation)

```bash
# 使用 yarn / Using yarn
yarn add @lazy-color/rand-util

# 使用 yarn-tool / Using yarn-tool
yarn-tool add @lazy-color/rand-util
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add @lazy-color/rand-util

# 使用 pnpm / Using pnpm
pnpm add @lazy-color/rand-util

# 使用 npm / Using npm
npm install @lazy-color/rand-util
```

## 使用方式 (Usage)

```typescript
import { _rgbRand, _rgbObjectRand, _rgbObjectToArray, IOptionsRandColorUtil } from '@lazy-color/rand-util';

// 基本 RGB 陣列隨機生成
const rgb1 = _rgbRand(); // e.g., [123, 45, 67]
const rgb2 = _rgbRand([100, 50], { randFn: () => 0.5 }); // 從 [100, 50, 255] 開始

// 基本 RGB 物件隨機生成
const rgbObj1 = _rgbObjectRand(); // e.g., { r: 123, g: 45, b: 67 }
const rgbObj2 = _rgbObjectRand({ r: 255 }, { randFn: () => 0.5 }); // 從 { r: 255, g: 255, b: 255 } 開始

// RGB 物件轉陣列
const rgbObj = { r: 255, g: 128, b: 0 };
const rgbArray = _rgbObjectToArray(rgbObj); // [255, 128, 0]

// 自定義隨機函式（例如：種子隨機）
const seededRand = _rgbRand(undefined, {
  randFn: () => {
    // 簡單的線性同餘生成器
    let seed = Date.now();
    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }
});
const color = _rgbRand(undefined, seededRand);
```

## API 參考

### _rgbRand<T extends IColorRGBA>(_rgba?, opts?)
產生隨機的 RGB 陣列 ([r, g, b])，每個值在 0-255 之間。

**參數:**
- `_rgba` (T, 可選): 可選的初始陣列，用於填充缺失的值
- `opts` (IOptionsRandColorUtil, 可選): 配置選項

**返回值:** 隨機 RGB 陣列

### _rgbObjectRand<T extends IColorRGBObject>(_rgba?, opts?)
產生隨機的 RGB 物件 ({ r, g, b })，每個值在 0-255 之間。

**參數:**
- `_rgba` (T, 可選): 可選的初始物件，用於填充缺失的值
- `opts` (IOptionsRandColorUtil, 可選): 配置選項

**返回值:** 隨機 RGB 物件

### _rgbObjectToArray<T extends { r: number, g: number, b: number, a?: number }>(_rgba)
將 RGB 物件轉換為 RGB 陣列格式。

**參數:**
- `_rgba` (T): RGB 物件

**返回值:** RGB 陣列

### IOptionsRandColorUtil 介面

- `randFn` (() => number, 可選): 自定義隨機函式，預設為 Math.random

## 範例

### 基本使用
```typescript
import { _rgbRand, _rgbObjectRand } from '@lazy-color/rand-util';

// 產生隨機 RGB 陣列
const rgb = _rgbRand();
console.log(rgb); // [123, 45, 67]

// 產生隨機 RGB 物件
const rgbObj = _rgbObjectRand();
console.log(rgbObj); // { r: 123, g: 45, b: 67 }
```

### 指定初始值
```typescript
import { _rgbRand } from '@lazy-color/rand-util';

// 從部分初始值開始
const rgb = _rgbRand([255, 128]); // [255, 128, 隨機0-255]
```

### 自定義隨機函式
```typescript
import { _rgbRand } from '@lazy-color/rand-util';

// 使用種子隨機產生可重複的結果
const seeded = _rgbRand(undefined, {
  randFn: () => {
    let seed = 12345;
    return () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
  }
});
const color1 = _rgbRand(undefined, seeded);
const color2 = _rgbRand(undefined, seeded); // 相同的序列
```

