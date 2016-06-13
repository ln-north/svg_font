// Debug
var text = "";
var target_dom = document.getElementById("draw_target");
var scale = 1;
var config = {
  step: 6, // 固定推奨(いじらない) const 型とかつけて定義すればいいのかもしれないけどj
  width: 120,  // 固定推奨 (基本的にscaleでいじるべき)
  ascender: 120,
  descender: 120,
  h_stroke_width: 10,
  v_stroke_width: 10,
  kerning: 120,
  h_fillcolor: "black",
  v_fillcolor: "black",
  sl_fillcolor: "black"
}


// データ構造
// 文字名: {
//   h: [ // 水平方向の画のデータを入れる
//     [x, y, 長さ],  // x, y は始点、長さはそこからの長さを記入
//                    // x : 0 ~ config.step + 2 / y : 0 ~ config.step * 3 + 2
//                    // config.step の標準は6
//     ...
//   ],
//   v: [ // 垂直方向のデータを入れる
//     [x, y, 長さ, 状態],
//     ...
//   ],
//   sl: [  // 斜め線(slating)のデータを入れる
//     [x1, y1, x2, y2, 状態],   // 始点・終点
//                               // 状態 "n":普通の斜め線 or "j":垂直な画と接続している
//                               // "j"の場合は、接続している方を始点にすること
//     ...
//   ]
//   水平・垂直・斜め、それぞれ画が存在しない場合は[]とする

var glyphs= {
  a: {
    h: [
      [0, 6, 6],
      [0, 9, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 9, 3],
      [6, 6, 6]
    ],
    sl: []
  },
  b: {
    h: [
      [0, 6, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 0, 12],
      [6, 6, 6]
    ],
    sl: []
  },
  c: {
    h: [
      [0, 6, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 6, 6]
    ],
    sl: []
  },
  d: {
    h: [
      [0, 6, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 0, 12]
    ],
    sl: []
  },
  e: {
    h: [
      [0, 6, 6],
      [0, 9, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 3]
    ],
    sl: []
  },
  f: {
    h: [
      [1, 0, 5],
      [0, 6, 6]
    ],
    v: [
      [1, 0, 12]
    ],
    sl: []
  },
  g: {
    h: [
      [0, 6, 6],
      [0, 12, 6],
      [0, 18, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 12]
    ],
    sl: []
  },
  h: {
    h: [
      [0, 6, 6]
    ],
    v: [
      [0, 0, 12],
      [6, 6, 6]
    ],
    sl: []
  },
  i: {
    h: [
      [1.5, 6, 2.5],
      [1.5, 12, 4.5]
    ],
    v: [
      [4, 6, 6],
      [4, 1.5, 1.5]
    ],
    sl: []
  },
  j: {
    h: [
      [1.5, 6, 2.5]
    ],
    v: [
      [4, 1.5, 1.5],
      [4, 6, 6]
    ],
    sl: [
      [4, 12, 1.5, 18, "j"]
    ]
  },
  k: {
    h: [
      [0, 9, 3]
    ],
    v: [
      [0, 0, 12]
    ],
    sl: [
      [3, 9, 6, 6, "n"],
      [3, 9, 6, 12, "n"]
    ]
  },
  l: {
    h: [
      [2.5, 12, 2]
    ],
    v: [
      [2.5, 0, 12]
    ],
    sl: []
  },
  m: {
    h: [
      [0, 6, 6]
    ],
    v: [
      [0, 6, 6],
      [3, 6, 6],
      [6, 6, 6]
    ],
    sl: []
  },
  n: {
    h: [
      [0, 6, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 6]
    ],
    sl: []
  },
  o: {
    h: [
      [0, 6, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 6]
    ],
    sl: []
  },
  p: {
    h: [
      [0, 6, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 6, 12],
      [6, 6, 6]
    ],
    sl: []
  },
  q: {
    h: [
      [0, 6, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 12]
    ],
    sl: []
  },
  r: {
    h: [
      [0, 6, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 2]
    ],
    sl: []
  },
  s: {
    h: [
      [0, 6, 6],
      [0, 9, 6],
      [0, 12, 6]
    ],
    v: [
      [0, 6, 3],
      [6, 9, 3]
    ],
    sl: []
  },
  t: {
    h: [
      [0.5, 6, 4.5],
      [2, 12, 3]
    ],
    v: [
      [2, 3.5, 8.5]
    ],
    sl: []
  },
  u: {
    h: [
      [0, 12, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 6]
    ],
    sl: []
  },
  v: {
    h: [
      [2.5, 12, 1]
    ],
    v: [
    ],
    sl: [
      [0, 6, 2, 12, "n"],
      [6, 6, 4, 12, "n"],
    ]
  },
  w: {
    h: [
      [0, 12, 6]
    ],
    v: [
      [0, 6, 6],
      [3, 7.5, 4.5],
      [6, 6, 6]
    ],
    sl: []
  },
  x: {
    h: [
    ],
    v: [
    ],
    sl: [
      [0.5, 6, 5.5, 12, "n"],
      [5.5, 6, 0.5, 12, "n"]
    ]
  },
  y: {
    h: [
      [0, 12, 6],
      [0, 18, 6]
    ],
    v: [
      [0, 6, 6],
      [6, 6, 12]
    ],
    sl: []
  },
  z: {
    h: [
      [0.5, 6, 5],
      [1, 12, 5]
    ],
    v: [
    ],
    sl: [
      [6, 6, 0.5, 12, "n"]
    ]
  }
}
