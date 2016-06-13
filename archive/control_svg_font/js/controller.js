var input_text = document.getElementById("input_text");
// var scale_controller = document.getElementById("scale");
var ascender_controller = document.getElementById("ascender");
var descender_controller = document.getElementById("descender");
var h_stroke_width_controller = document.getElementById("h_stroke_width");
var v_stroke_width_controller = document.getElementById("v_stroke_width");
var kerning_controller = document.getElementById("kerning");

// var scale_value = document.getElementById("scale_value");
var ascender_value = document.getElementById("ascender_value");
var descender_value = document.getElementById("descender_value");
var h_stroke_width_value = document.getElementById("h_stroke_width_value");
var v_stroke_width_value = document.getElementById("v_stroke_width_value");
var kerning_value = document.getElementById("kerning_value");

// このタイマー処理によるテキストボックスのリアルタイム反映も全くダメ
var timer = null;
var prev_value = input_text.value;

input_text.addEventListener("focus", function() {
  timer = window.setInterval(function() {
    var new_value = input_text.value;
    if(text !== new_value) {
      update_glyphs(new_value, target_dom);
    };
    text = new_value;
  }, 10)
}, false);

/*
scale_up.addEventListener("click", function() {
  scale = scale + 0.1;
  config.width = config.width * scale;
  config.ascender = config.ascender * scale;
  config.descender = config.descender * scale;
  config.kerning = config.kerning * scale;
  config.h_stroke_width = config.h_stroke_width * scale;
  config.v_stroke_width = config.v_stroke_width * scale;
  scale_value.innerText = scale;
  update_glyphs(text, target_dom);
});

scale_down.addEventListener("click", function() {
  if(config.scale === 0) {
    return 0;
  }
  scale = scale - 0.1;
  config.width = config.width * scale;
  config.ascender = config.ascender * scale;
  conf
  config.kerning = config.kerning * scale;
  config.h_stroke_width = config.h_stroke_width * scale;
  config.v_stroke_width = config.v_stroke_width * scale;
  scale_value.innerText = scale;
  update_glyphs(text, target_dom);
});
*/

ascender_controller.addEventListener("input", function() {
  var tmp_value = Math.round(ascender_controller.value / 50 * 120);
  config.ascender = tmp_value;
  ascender_value.innerText = tmp_value;
  update_glyphs(text, target_dom);
});

descender_controller.addEventListener("input", function() {
  var tmp_value = Math.round(descender_controller.value / 50 * 120);
  config.descender = tmp_value;
  descender_value.innerText = tmp_value;
update_glyphs(text, target_dom);
});

h_stroke_width_controller.addEventListener("input", function() {
  var tmp_value = h_stroke_width_controller.value / 2;
  config.h_stroke_width = tmp_value;
  h_stroke_width_value.innerText = tmp_value;
  update_glyphs(text, target_dom);
});

v_stroke_width_controller.addEventListener("input", function() {
  var tmp_value = v_stroke_width_controller.value / 2;
  config.v_stroke_width = tmp_value;
  v_stroke_width_value.innerText = tmp_value;
  update_glyphs(text, target_dom);
});

kerning_controller.addEventListener("input", function() {
  var tmp_value = Math.round(kerning_controller.value / 50 * 120);
  config.kerning = tmp_value;
  kerning_value.innerText = tmp_value;
  update_glyphs(text, target_dom);
});
