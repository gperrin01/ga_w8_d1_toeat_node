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
      var object = JSON.parse(data);
      addToEat(object.toeat, object.id);
      })
  })

  $('#main_container').on('click', '.delete_button', function (){
    event.preventDefault();
    console.log('clicked on delete button');
    var id = $(this).data('id');
    $.ajax({
      type: 'DELETE',
      url: '/foods/'+id,
      data: {id: id},
      dataType: 'json'
    }).done( function(data) {
        // here data = the data-id of the list item to delete
        removeFromList(data);
      })
  })


// end of event listeners
}) 

function addToEat (toeat, index) {
  var $foods = $('#foods_container');
  var $new = $("<div data-id='" +index + "'>" + toeat.name + " -> our verdict: " + toeat.yumminess + " <button class='delete_button' data-id='" +index+ "'> Delete </button><div>");
  $new.addClass('toeat');
  $foods.append($new)
}

function removeFromList(id) {
  var $foods = $('#foods_container');
  $("div[data-id='" +id+ "']").remove();
}