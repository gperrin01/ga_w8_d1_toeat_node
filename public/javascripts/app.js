var Food = Food || {};
var View = View || {}
// we create our own sort of Food object and will link methods to it

$(function() { // = on doc ready
  Food.all();
  View.initialize(); // in here we put the event listeners
}) 


// our View and Food OBJECTS have functions as values in the key-value pairs
View = {
  initialize: function() {       // event listeners
    $('#new_toeat').on('submit', function () {
      event.preventDefault();
      var foodParams = $(this).serialize();
      Food.create(foodParams);
    });
    $('#main_container').on('click', '.delete_button', function (){
      event.preventDefault();
      var id = $(this).data('id');
      Food.delete(id);
    })
  }
}


Food = {

  all: function() {
    $.get('/foods').
      done(function(data) {
      var object = JSON.parse(data);
      $.each(object, function(index, toeat) {
        addToEat(toeat, toeat.id + 1);
      })
    })
  },
  create: function (foodParams) {
    $.post('/foods', foodParams)
    .done(function(data) {
      var object = JSON.parse(data);
      addToEat(object.toeat, object.id);
    })
    .done(function(data) {
      $('new_toeat').trigger('reset');
    })
  },
  delete: function(id) {
    $.ajax({
      type: 'DELETE',
      url: '/foods/' + id,
      data: {id: id},
      dataType: 'json'
    }).done( function(data) {
      console.log(data);
      // var object = JSON.parse(data);
      // console.log(object);
      removeFromList(data);
    })
  }

} // end of Food


function addToEat (toeat, index) {
  // var $new = $("<div data-id='" +index + "'>" + toeat.name + " -> our verdict: " + toeat.yumminess + " <button class='delete_button' data-id='" +index+ "'> Delete </button><div>");
  // $new.addClass('toeat');
  var $foods = $('#foods_container');
  var template = $('#new-toeat-template').html();
  var rendered = Mustache.render(template, {toeat: toeat, index: index});
  $foods.append(rendered);
}

function removeFromList(id) {
  var $foods = $('#foods_container');
  $("div[data-id='" +id+ "']").remove();
}


