$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});

if (Modernizr.canvas) {
  alert("This browser supports HTML5 canvas!");
} else {
  alert("no canvas :(");
}
