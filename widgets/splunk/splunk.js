widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    var $h2 = $('h2', el);
    if (data.title) {
      $h2.text(data.title);
    }

    // Display the search results
    var rows = data.results.rows;

    var $table = $('.content table', el).empty();
    var fontSize = ((el.height() - $h2.height()) / rows.length) / 2;
    for(var i = 0; i < rows.length; i++) {
      var $tr = $('<tr>');
      $tr.attr('data-row', 'row-' + i);

      var values = rows[i];
      for(var j = 0; j < values.length; j++) {
          var value = values[j];
          var $td = $('<td>')
              .text(value)
              .css('font-size', fontSize);

          $tr.append($td);
      }

      $table.append($tr);
    }
  }
};