var input_text = document.getElementById("input_text");

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
