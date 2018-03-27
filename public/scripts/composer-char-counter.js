
$(document).ready(function(){
  $("textarea").keyup(function(){
    var char = $(this).val().length;
    var charLimit = 140 - char;
    $(".counter").html(charLimit);
   if(charLimit >= 0){
      $(".counter").css("color","black");
    } else {
      $(".counter").css("color","red");
    }
  });
});
