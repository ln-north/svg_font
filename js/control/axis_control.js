var text = "lorem \nipsum \ndolor\nsit amet, \nconsect";
config.width = 60;
config.ascender = 50;
config.descender = 30;
config.kerning = 20;
config.v_stroke_width = 10;
config.h_stroke_width = 10;
config.h_fillcolor = "rgb(255, 212, 47)";
config.v_fillcolor = "rgb(255, 212, 47)";
config.sl_fillcolor = "rgb(255, 212, 47)";

function round_nth( number, n ) {
	var _pow = Math.pow( 10 , n ) ;

	return Math.round( number * _pow ) / _pow ;
}

draw_glyphs(text, draw_target);

var tmp_v_stroke_width = config.v_stroke_width;
var tmp_h_stroke_width = config.h_stroke_width;

var value = document.getElementById("test_value");

window.addEventListener('deviceorientation', function(event){

  var tan_v_norm = round_nth(Math.abs(event.gamma / 90), 3); // 上下方向の傾き
  var tan_h_norm = round_nth(Math.abs(event.beta / 90), 3);  // 左右方向の傾き
  if(tan_h_norm > 1) {
     tan_h_norm = 1;
  }

  config.v_stroke_width = tmp_v_stroke_width * tan_v_norm * 2.5;
  config.h_stroke_width = tmp_h_stroke_width * tan_h_norm * 2.5;

  var msg = tan_v_norm + " / " + tan_h_norm + " / " + config.v_stroke_width + " / " + config.h_stroke_width;
  value.innerHTML = msg;


  update_glyphs(text, target_dom)
});
