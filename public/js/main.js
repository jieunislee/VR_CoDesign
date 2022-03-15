var textIndex = 1;
$("#add_text").click(function(){
  $("#component_text_list").append('<li class="component-li"><div class="component-ul-text">text'+ textIndex +'</div></li>')
  // $( ".component-li" ).draggable();
  textIndex++;
});

$( ".component-ul" ).sortable();
