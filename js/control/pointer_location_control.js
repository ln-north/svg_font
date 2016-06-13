var text = "lorem ipsum dolor\nsit amet, consectetuer\nadipiscing elit. \naenean commodo \nligula eget dolor. \naenean massa. cum sociis \nnatoque penatibus et magnis \ndis parturient montes,";

config.h_fillcolor = "rgb(0, 196, 204)";
config.v_fillcolor = "rgb(0, 196, 204)";
config.sl_fillcolor = "rgb(0, 196, 204)";

draw_glyphs(text, draw_target);

var tmp_v_stroke_width = config.v_stroke_width;
var tmp_h_stroke_width = config.h_stroke_width;

document.onmousemove = function (e){
  var pointer_v_norm = Math.abs((e.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2));
  var pointer_h_norm = Math.abs((e.clientY - (window.innerHeight / 2)) / (window.innerWidth / 2));

  config.v_stroke_width = tmp_v_stroke_width * pointer_v_norm * 3;
  config.h_stroke_width = tmp_h_stroke_width * pointer_h_norm * 3;

  update_glyphs(text, target_dom);
};
