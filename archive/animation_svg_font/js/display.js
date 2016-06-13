function arr_max(arr) {
  var result = 0;
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] > result) {
      result = arr[i];
    }
  }
  return result;
}

// order文字目のグリフのボディ長方形の原点（左上の点）を計算する
// 引数は何行目(l_th), 何文字目(n_th)
// 返り値は原点座標x, y というプロパティを持ったオブジェクト
function calc_glyph_origin(l_th, n_th) {
  var tmp_x = (n_th - 1) * (config.v_stroke_width + config.width + config.kerning) + (config.v_stroke_width / 2);
  var tmp_y = config.h_stroke_width + (l_th - 1) * (config.ascender + config.width + config.descender + config.line_space);
  return {x: tmp_x, y: tmp_y};
}

// (x1, y1), (x2, y2)のベクトルをとって、そのx or y方向の符号を返す関数
// 引数はarr = [x1, y1, x2, y2], 基底 base = "x" or "y"
// 返り値は1, -1, baseの値がx, y 以外の時は0
function sign(arr, base) {
  var vect;
  if(base === "x") {
    vect = arr[2] - arr[0]
  } else if(base === "y") {
    vect = arr[3] - arr[1]
  } else {
    return 0;
  }

  if(vect > 0) {
    return 1;
  } else {
    return -1;
  }
}

// アセンダ・ディセンダの判定込みで高さを返す
// 引数;num = dataの始点のy座標
// 返り値: 高さ
function calc_height (num) {
  if(num < config.step + 1)  {
    return config.ascender / config.step * num;
  } else if(num < 2 * config.step + 1) {
    return config.ascender + (config.width / config.step) * (num - config.step);
  } else {
    return config.ascender + config.width + (config.descender / config.step) * (num - 2 * config.step);
  }
}

// 水平な画となるrect要素を生成する関数
// data.jsにあるhorizontalの中の配列データarr, 何行目かの情報l_th, 何文字目かの情報n_th
// 返り値はrectのDOMを返す
function draw_h_stroke(arr, l_th, n_th) {
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  var glyph_origin = calc_glyph_origin(l_th, n_th);

  // 始点終点を設定
  rect.setAttribute("x", glyph_origin.x + ((config.width / config.step) * arr[0]) - config.v_stroke_width / 2);
  rect.setAttribute("y", glyph_origin.y + calc_height(arr[1]) - config.h_stroke_width / 2);

  // 幅・高さを設定
  rect.setAttribute("width", ((config.width / config.step) * arr[2]) + config.v_stroke_width);
  rect.setAttribute("height", config.h_stroke_width);

  rect.setAttribute("fill", config.h_fillcolor);

  return rect;
}

// 垂直な画となるrect要素を生成する関数
// data.jsにあるhorizontalの中の配列データarr, 何文字目かの情報n_th
// 返り値はrectのDOMを返す
function draw_v_stroke(arr, l_th, n_th) {
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  var glyph_origin = calc_glyph_origin(l_th, n_th);


  // 始点終点を設定
  rect.setAttribute("x", glyph_origin.x + ((config.width / config.step) * arr[0]) - config.v_stroke_width / 2);
  rect.setAttribute("y", glyph_origin.y + (calc_height(arr[1])) - config.h_stroke_width / 2);

  // 幅・高さを設定
  rect.setAttribute("width", config.v_stroke_width);
  rect.setAttribute("height", (calc_height(arr[1] + arr[2]) - calc_height(arr[1])) + config.h_stroke_width);

  rect.setAttribute("fill", config.v_fillcolor);

  return rect;
}

function draw_sl_stroke(arr, l_th, n_th) {
  var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  var points_arr = [];
  var glyph_origin = calc_glyph_origin(l_th, n_th);
  var stroke_path = [glyph_origin.x + arr[0] * config.width / config.step,  // 始点x座標
      glyph_origin.y + calc_height(arr[1]),  // 始点y座標
      glyph_origin.x + arr[2] * config.width / config.step,  // 終点x座標
      glyph_origin.y + calc_height(arr[3])   // 終点y座標
        ];

  var path_tan_abs = Math.abs((stroke_path[3] - stroke_path[1]) / (stroke_path[2] - stroke_path[0]));
  var stroke_width = config.v_stroke_width / 2 / Math.sin(Math.atan(path_tan_abs));
  // points_arrの 1 -> 2 -> 3 -> 4 は時計回りのパス
  if(arr[4] === "j") {
    // 本当は象限で場合分けしなければならないが、面倒なので一旦jの第三象限方向のみ実装
    points_arr = [stroke_path[0] - config.v_stroke_width / 2,                                                    // 1st x
               stroke_path[1] + config.h_stroke_width / 2,                                                    // 1st y
               stroke_path[0] + config.v_stroke_width / 2,                                                    // 2nd x
               stroke_path[1] + config.h_stroke_width / 2,                                                    // 2nd y
               stroke_path[0] + config.v_stroke_width / 2,                                                    // 3rd x -> joint
               stroke_path[1] + config.h_stroke_width / 2 + config.v_stroke_width / path_tan_abs,             // 3rd y -> joint
               stroke_path[2] + stroke_width + (sign(arr, "x") * config.h_stroke_width / path_tan_abs / 2),   // 4th x
               stroke_path[3] + (sign(arr, "y") * config.h_stroke_width / 2),                                 // 4th y
               stroke_path[2] - stroke_width + (sign(arr, "x") * config.h_stroke_width / path_tan_abs / 2),   // 5th x
               stroke_path[3] + (sign(arr, "y") * config.h_stroke_width / 2)                                  // 5th y
                 ];
  } else {
    points_arr = [stroke_path[0] - stroke_width - (sign(arr, "x") * config.h_stroke_width / path_tan_abs / 2), // 1st x
      stroke_path[1] - (sign(arr, "y") * config.h_stroke_width / 2),                                 // 1st y
        stroke_path[0] + stroke_width - (sign(arr, "x") * config.h_stroke_width / path_tan_abs / 2),   // 2nd x
        stroke_path[1] - (sign(arr, "y") * config.h_stroke_width / 2),                                 // 2nd y
        stroke_path[2] + stroke_width + (sign(arr, "x") * config.h_stroke_width / path_tan_abs / 2),   // 3rd x
        stroke_path[3] + (sign(arr, "y") * config.h_stroke_width / 2),                                 // 3rd y
        stroke_path[2] - stroke_width + (sign(arr, "x") * config.h_stroke_width / path_tan_abs / 2),   // 4th x
        stroke_path[3] + (sign(arr, "y") * config.h_stroke_width / 2)                                  // 4th y
          ];
  }
  var points_value = "";
  for(var i = 0; i < points_arr.length; i++) {
    points_value += points_arr[i]
      if(i === points_arr.length - 1) {
        break;
      }
      else if(i % 2 === 1) {
        points_value += " ";
      } 
      else {
        points_value += ","
      }
  } 
  polygon.setAttribute("points", points_value);
  polygon.setAttribute("fill", config.sl_fillcolor);
  return polygon;

}

function draw_sl_stroke_line(arr, l_th, n_th) {
  var glyph_origin = calc_glyph_origin(l_th, n_th);
  var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  var stroke_path = [glyph_origin.x + arr[0] * config.width / config.step,  // 始点x座標
      glyph_origin.y + calc_height(arr[1]),  // 始点y座標
      glyph_origin.x + arr[2] * config.width / config.step,  // 終点x座標
      glyph_origin.y + calc_height(arr[3])   // 始a点y座標
        ];
  line.setAttribute("x1", stroke_path[0]);
  line.setAttribute("y1", stroke_path[1]);
  line.setAttribute("x2", stroke_path[2]);
  line.setAttribute("y2", stroke_path[3]);
  line.setAttribute("stroke", "blue");
  line.setAttribute("stroke-width", 1);

  return line;
}


function create_glyphs(text) {
  // 入力されたテキストを行で分けて、更にそれぞれ1文字1文字に分ける
  var text_line = [];
  var text_arr = [];
  var l;
  var n = [];

  text_line = text.split("\n");
  l = text_line.length;
  for(var i = 0; i < l; i++) {
    text_arr[i] = text_line[i].split("");
    n[i] = text_arr[i].length;
  }

  // 文字を入れるsvg要素を作成
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // svgの外枠を設定する
  svg.setAttribute("width", arr_max(n) * (config.width + config.v_stroke_width) + arr_max(n) * config.kerning);
  svg.setAttribute("height", l * (config.width + config.ascender + config.descender + 2 * config.h_stroke_width) + (l - 1) * config.line_space);

  // グリフのエレメントを入れていく
  for(var k = 0; k < l; k++) {
  for(var i = 0; i < text_arr[k].length; i++) {
    var glyph = glyphs[text_arr[k][i]];

    if(glyph === undefined) {
      glyph = glyphs.none;
    }

    // 水平な画
    if(!(glyph.h.length === 0)) {
      var h_rect = [];
      for(var j = 0; j < glyph.h.length; ++j) {
        h_rect[j] = draw_h_stroke(glyph.h[j], k + 1, i + 1);
        svg.appendChild(h_rect[j]);
      }
    }
    // 垂直な画
    if(!(glyph.v.length === 0)) {
      var v_rect = [];
      for(var j = 0; j < glyph.v.length; ++j) {
        v_rect[j] = draw_v_stroke(glyph.v[j], k + 1, i + 1);
        svg.appendChild(v_rect[j]);
      }
    }
    // 斜めの画
    if(!(glyph.sl.length === 0)) {
      var sl_polygon = [];
      for(var j = 0; j < glyph.sl.length; ++j) {
        sl_polygon[j] = draw_sl_stroke(glyph.sl[j], k + 1, i + 1);
        svg.appendChild(sl_polygon[j]);
      }
    }
    // Debug
    /*
    if(!(glyph.sl.length === 0)) {
      var sl_polygon = [];
      for(var j = 0; j < glyph.sl.length; ++j) {
        sl_polygon[j] = draw_sl_stroke_line(glyph.sl[j], i + 1);
        svg.appendChild(sl_polygon[j]);
     }
    }
    */
  }
  }

  return svg
}

function draw_glyphs(text, target_dom) {
  var svg = create_glyphs(text);
  target_dom.appendChild(svg);
}

function update_glyphs(text, target_dom) {
  target_dom.innerHTML = "";
  draw_glyphs(text, target_dom);
}

draw_glyphs(text, draw_target);
