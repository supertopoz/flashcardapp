$('.ui.sidebar').sidebar({
    context: $('.bottom.segment')
  })
  .sidebar('attach events', '.sidebar.tiny.icon');

  $('.ui.dropdown')
  .dropdown({
    allowAdditions: true,


  })
;

// ***************************Seed data for development ****************************************
categories = [];
words = [];
dataArr = [];
$.getJSON(
    "https://spreadsheets.google.com/feeds/list/18gLaNPUnt7Cn9HIlYIQY7rlzgIU4n1Fmup_I8FcbhaQ/od6/public/basic?alt=json",
    function(data) {
        getData(data);

    });


    // Extract the unique categories from the data
    function getData(data) {
        //first row "title" column
        for (i = 0; i < data.feed.entry.length; i++) {
            var stream = data.feed.entry[i].title.$t;
            dataArr.push(JSON.parse(stream));
        }
        // Build word array 
        for (i = 0; i < dataArr.length; i++) {
            var newWord = dataArr[i].name;
            if (words.indexOf(newWord) == -1) {
                words.push(newWord);
            }
        }
        var itemslist = words.sort();
        runWords(itemslist);
        //Build Category array
        for (y = 0; y < 10; y++) {
            for (i = 0; i < dataArr.length; i++) {
                newCategory = dataArr[i].categories[y];
                if (categories.indexOf(newCategory) == -1) {
                    categories.push(newCategory);
                }
            }
        }
        var catlist = categories.sort();
        runCatergories(catlist);
    }



$('#words').on('click', function() {
    var classification = $('#classification').val();
  //      alert(classification);
    if (classification !== '') {
        $("#wordListMenu").empty();
        var selectedItem = $('#classification').val();
    //  alert(selectedItem);
    filterbyCatergories(selectedItem);

 
    } else {
//      alert("empty");
     $("#wordListMenu").empty();     
      runWords(words);
      }
    $('#classList').addClass('default text').text('Classification');
    $('#classification').val('');
    $('#classMenu > .item').removeClass('selected');
    $('#classMenu > .item').removeClass('active');  
  

  
  
  
  
  
});
// Filter by category 
function filterbyCatergories(selectedItem) {
        //  alert("Working");
        var array = [];
        for (var y = 0; y < 5; y++) {
            for (var i = 0; i < dataArr.length; i++) {
                var item = dataArr[i];
                if (item.categories[y] === selectedItem) {
                    array.push(item.name);
                }
            }
        }
        var newArray = array.sort();
        runWords(newArray);
        array.length = 0;
        newArray.length = 0;
    }

function getWordData(data) {

}

function runCatergories(itemslist) {
    var newSelect = '';
    var menu = "";
    for (i = 0; i < itemslist.length; i = i + 1) {
        menu += "<div class='item listed'  data-value='" + itemslist[i] + "'>" +
            itemslist[i] + "</div>";
    }
    $('#classMenu').append(menu);
}

function runWords(itemslist) {
    var newSelect = '';
    var menu = "";
    for (i = 0; i < itemslist.length; i = i + 1) {
        menu += "<div class='item listed'  data-value='" + itemslist[i] +
            "'></i>" + itemslist[i] + "</div>";
    }
    $('#wordListMenu').append(menu);
  menu.length = 0;
}
// Delete cards 
$('.ui.three.stackable.cards').on("click", '.ui.red.button', function(){
   $(this).closest('.ui.raised.card').remove();
});

function addContent(){
    var all = $(".ui.mini.fluid.multiple.search.selection.dropdown").map(function() {
        return this.innerHTML;
        }).get();
        console.log(all.join());

    setTimeout(function(){
             
    }, 1000);
}


// Edits cards 


// Get the title of the card. 

$('.ui.three.stackable.cards').on("click", ".ui.button.edit", function(){
    var header = $(this).closest('.ui.raised.card').find( '.main.header').text().trim()
    var content = $(this).closest('.ui.raised.card').find( '.ui.small.feed').text().trim();
    alert(content);
    // Get the main header and change it into an input box with the edit header.... 
    $(this).closest('.ui.raised.card').find( '.main.header').replaceWith("<div class='ui input'><input type='text' value='"+header+"'></div>"); 
     $(this).closest('.ui.raised.card').find( '.ui.sub.header').replaceWith("<div></div>");
    // Get the flash cards and add them into dropdown menus.  
    $(this).closest('.ui.raised.card').find( '.ui.small.feed').replaceWith(
                        "<div class='ui.small.feed'>"
                        +"<div class='ui mini fluid selection dropdown transparent'>"
                        +"<input id='classification' type='hidden'> <i class='dropdown icon'></i>"
                        +"<div id='classList' class='default text'>Classification</div>"
                        +"<div class='menu'></div>"
                        +"</div>"
                        +"</div>"
                        +"<div id='updateMultiSelect' class='ui mini fluid multiple search selection dropdown'>"
                        +"<input type='hidden'><i class='dropdown icon'></i>"
                        +"<input class='search' autocomplete='off' tabindex='0'>"
                        +"<div class='default text'>"
                        +"Start typing..."
                        +"</div>"
                        +"<div class='menu' tabindex='-1'>"
                        +"<div class='item listed' data-value='DNA'>DNA</div>"
                        +"</div>"
                        +"</div>");

           $('.ui.mini.fluid.multiple.search.selection.dropdown').dropdown('set selected',['Role1']); 
});
// Get the words in the card. 



// Add Cards 
$("#saveCollection").on("click", function(){
    var collectionTitle = $("#titleText").val();
    var flashCardList = $("#flashCardList").val();
    var flashCards = flashCardList.replace(/,/g, ", ");
    //alert(flashCardList);
    $("#newCards").after("<div class='ui raised card'><div class='content'><div class='main header'>"
                            + collectionTitle +  "</div></div>"
                            +"<div class='content'><h4 class='ui sub header'>Contents</h4><div class='ui small feed'>"
                            +flashCards+"</div>"
                            +"</div><div class='extra content'><button class='ui mini button open'>open</button><div class='ui mini icon buttons'>"
                            +"<button class='ui button edit'><i class='edit icon'></i></button><button class='ui red button'><i class='trash icon'></i></button>"
                            +"</div></div></div>");
});












