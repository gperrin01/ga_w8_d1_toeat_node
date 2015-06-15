$(function() {
  // set all event listeners

  $.get('/foods').
    done(function(data) {
      var object = JSON.parse(data);
      $(object).each(function(index, toeat) {
        console.log(index, toeat);
        addToEat(toeat);
      })
    })



// end of event listeners
}) 

function addToEat (toeat) {
  var $foods = $('#foods_container');
  var $new = $("<div>" + toeat.name + " our verdict: " + toeat.yumminess + "<div.");
  $new.addClass('toeat');
  $new.data('id', toeat.id +1);
  $foods.append($new)
}