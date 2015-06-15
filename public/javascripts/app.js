$(function() {
  // set all event listeners

  $.get('/foods').
    done(function(data) {
      var object = JSON.parse(data);
      // why did we send JSON on the get / but not Post?
      $(object).each(function(index, toeat) {
        addToEat(toeat, toeat.id + 1);
      })
    })

  $('#new_toeat').on('submit', function () {
    event.preventDefault();
    var $this = $(this);
    var formData = $this.serialize();
    $.post('/foods', formData).
      done(function(data) {
      // why did we send JSON on the get / but not Post?
      addToEat(data.toeat, data.id);
      })
  })

// end of event listeners
}) 

function addToEat (toeat, index) {
  var $foods = $('#foods_container');
  var $new = $("<div data-id='" +index + "'>" + toeat.name + " -> our verdict: " + toeat.yumminess + "<div>");
  $new.addClass('toeat');
  // $new.data('id', id);
  $foods.append($new)
}