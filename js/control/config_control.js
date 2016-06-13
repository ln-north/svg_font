var ascender_controller = document.getElementById("ascender");
var descender_controller = document.getElementById("descender");
var h_stroke_width_controller = document.getElementById("h_stroke_width");
var v_stroke_width_controller = document.getElementById("v_stroke_width");
var kerning_controller = document.getElementById("kerning");

var ascender_value = document.getElementById("ascender_value");
var descender_value = document.getElementById("descender_value");
var h_stroke_width_value = document.getElementById("h_stroke_width_value");
var v_stroke_width_value = document.getElementById("v_stroke_width_value");
var kerning_value = document.getElementById("kerning_value");

ascender_controller.addEventListener("input", function() {
  var tmp_value = Math.round(ascender_controller.value / 50 * config.width);
  config.ascender = tmp_value;
  ascender_value.innerText = Math.round(tmp_value);
  update_glyphs(text, target_dom);
});

descender_controller.addEventListener("input", function() {
  var tmp_value = Math.round(descender_controller.value / 50 * config.width);
  config.descender = tmp_value;
  descender_value.innerText = Math.round(tmp_value);
update_glyphs(text, target_dom);
});

h_stroke_width_controller.addEventListener("input", function() {
  var tmp_value = h_stroke_width_controller.value / (config.width / 4);
  config.h_stroke_width = tmp_value;
  h_stroke_width_value.innerText = Math.round(tmp_value);
  update_glyphs(text, target_dom);
});

v_stroke_width_controller.addEventListener("input", function() {
  var tmp_value = v_stroke_width_controller.value / (config.width / 4);
  config.v_stroke_width = tmp_value;
  v_stroke_width_value.innerText = Math.round(tmp_value);
  update_glyphs(text, target_dom);
});

kerning_controller.addEventListener("input", function() {
  var tmp_value = Math.round(kerning_controller.value / 50 * config.width);
  config.kerning = tmp_value;
  kerning_value.innerText = Math.round(tmp_value);
  update_glyphs(text, target_dom);
});
var text = "input your\ntext here"
draw_glyphs(text, target_dom);
