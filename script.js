$(document).ready(function(){
  $.getJSON("https://jsonplaceholder.typicode.com/users", function(data){
    var ulList = $('#dropdown-menu');
    for(i = 0; i < data.length; i++) {
      var li = "<li class='hidden' title='" + data[i].name + "'>"+ data[i].name + "</li>";
      ulList.append(li);
    }
    $("#dropdown-menu li").click(function() {
       var inputText = $(this)[0].innerText;
       $("#search-box").val(inputText);
       $("#dropdown-menu").addClass("hidden"); 
    });
  });

  $(".close-dropdown").click(function() {
    $("#dropdown-menu").addClass('hidden');
    $("#search-box").val('');
  });
  
  

  $(".search-button").click(function() {
    var input = $("#search-box").val();
    if(input != '') {
      var searchHistory = $(".search-history").find('tbody');
      var d = new Date($.now());
      var formattedDate = (d.getFullYear()+"-"+d.getDate()+"-"+(d.getMonth() + 1)+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
      var newSearch = "<tr><td>" + input + "</td><td class='align-right'><span>" + formattedDate + "</span><i class='icons material-icons clear-search' title='Delete'>close</i></td></tr>";
      searchHistory.append(newSearch);
      $(".clear-search").click(function(ele) {
        ele.target.closest('tr').remove();
      });
	    $("#dropdown-menu").addClass('hidden');
    $("#search-box").val('');
    }
  });

  $(".clear-all-history").click(function() {
    var searchHistory = $(".search-history").find('tbody');
    searchHistory.empty();
  });

  $("#dropdown-menu li").click(function() {
     var inputText = $(this).innerHTML;
	 $("#search-box").val(inputText);
	 $("#dropdown-menu").addClass("hidden"); 
  });

});

function filterFunction() {
  var input = $("#search-box").val();
  var filter = input.toLowerCase();
  var dropdownMenu = $("#dropdown-menu");
  dropdownMenu.removeClass('hidden');
  $('.close-dropdown').removeClass('hidden');
  var list = dropdownMenu.find("li");

  for (var i = 0; i < list.length; i++) {
    txtValue = list[i].title
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      list[i].classList.remove('hidden');
      var highlighted = highlight(txtValue, filter);
      list[i].innerHTML = highlighted;
    } else {
      list[i].classList.add('hidden');
      list[i].innerHTML = txtValue;
    }
  }
}

function highlight(string, find){
  var re = new RegExp(find, 'gi');
  return string.replace(re, '<strong>'+find+'</strong>');
}