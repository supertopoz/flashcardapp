$('.add .dimmer').dimmer({on: 'click'});

$('.ui.sidebar').sidebar(
{
    context: $('.bottom.segment')
}).sidebar('attach events', '.sidebar.tiny.icon');
$('.ui.dropdown').dropdown(
{
    allowAdditions: true
});
// ***************************Seed data for development ****************************************
var categories = [];
var catlist = [];
var words = [];
var dataArr = [];
$.getJSON(
    "https://spreadsheets.google.com/feeds/list/18gLaNPUnt7Cn9HIlYIQY7rlzgIU4n1Fmup_I8FcbhaQ/od6/public/basic?alt=json",
    function(data)
    {
        getData(data);
    });

function getData(data)
    {
//push the incoming data to a clientside data array
        for (i = 0; i < data.feed.entry.length; i++)
        {
            var stream = data.feed.entry[i].title.$t;
            dataArr.push(JSON.parse(stream));
        }
// Extract the words from the data and store in their own array called "words"
        for (i = 0; i < dataArr.length; i++)
        {
            var newWord = dataArr[i].name;
            if (words.indexOf(newWord) == -1)
            {
                words.push(newWord);
            }
        }
// sort the words alphabetically      
              words = words.sort();
// Extract the unique category tags from within the data and store in their own array called "categories"     

        var newCategory;
        for (y = 0; y < 10; y++)
        {
            for (i = 0; i < dataArr.length; i++)
            {
                newCategory = dataArr[i].categories[y];
                if (categories.indexOf(newCategory) == -1)
                {
                    categories.push(newCategory);
                }
            }
        }
// sort the categories alphabetically.       
        categories = categories.sort();
// add the catergories to the UI      
        applyCatergories(categories);
    }

//Populate the words dropwndown with the list of words 
function runWords(itemslist)
{
    var menu = "";
    for (i = 0; i < itemslist.length; i = i + 1)
    {
        menu += "<div class='item listed'  data-value='" + itemslist[i] +
            "'></i>" + itemslist[i] + "</div>";
    }
    $('.listMenu').append(menu);
//    menu.length = 0;
}
setTimeout(function(){ 
  runWords(words); 
}, 1000);


// filter the the contents of the word list if the classification is populated. 
$(document).on('change', '.ui.mini.fluid.selection.dropdown.transparent',
    function()
    {
        var classification = $(this).closest(".ui.small.feed").find('input').val();
        if (classification !== '')
        {
           $(".listMenu").empty();  
            filterbyCatergories(classification);
        }
    });

// Filter by category 
function filterbyCatergories(selectedItem)
{    
    var newArray= [];
    var array = [];
    for (var y = 0; y < 5; y++)
    {
        for (var i = 0; i < dataArr.length; i++)
        {
            var item = dataArr[i];
            if (item.categories[y] === selectedItem)
            {
                array.push(item.name);
            }
        }
    }
    newArray = array.sort();
    runWords(newArray);
    array.length = 0;

}

    // Add the catergories to the first list

function applyCatergories()
    {
        var list = categories;
        var menu = "";
        for (i = 0; i < list.length; i = i + 1)
        {
            menu += "<div class='item listed'  data-value='" + list[i] + "'>" +
                list[i] + "</div>";
        }
        $('.classmenu').append(menu);
    }
// Delete cards 
$('.ui.three.stackable.cards').on("click", '.ui.red.button', function()
{
    $(this).closest('.ui.raised.card').remove();
});



// Add Cards 
$("#saveCollection").on("click", function()
{
    var collectionTitle = $("#titleText").val();
    var flashCardList = $("#flashCardList").val();
    var flashCards = flashCardList.replace(/,/g, ", ");
    //alert(flashCardList);
    $("#newCards").after(
        "<div class='ui raised card'><div class='content'><div class='main header'>" +
        collectionTitle + "</div></div>" +
        "<div class='content'><h4 class='ui sub header'>Contents</h4><div class='ui small feed'>" +
        flashCards + "</div>" +
        "</div><div class='extra content'><button class='ui mini button open'>open</button><div class='ui mini icon buttons'>" +
        "<button class='ui button edit'><i class='edit icon'></i></button><button class='ui red button'><i class='trash icon'></i></button>" +
        "</div></div></div>");
});

// save Edited card Cards 
$(document).on("click", ".save" , function()
{
$(this).hide();
      var header = $(this).closest('.ui.raised.card').find('input').val();
 //   alert(header);
     var content = $(this).closest('.ui.raised.card').find('.wordsDropdown > input').val();
   
   
    var flashCards = content.replace(/,/g, ", ");
 //  alert(flashCards);
      $(this).closest('.ui.raised.card').replaceWith(
        "<div class='ui raised card'><div class='content'><div class='main header'>" +
        header + "</div></div>" +
        "<div class='content'><h4 class='ui sub header'>Contents</h4><div class='ui small feed'>" +
        flashCards + "</div>" +
        "</div><div class='extra content'><button class='ui mini button open'>open</button><div class='ui mini icon buttons'>" +
        "<button class='ui button edit'><i class='edit icon'></i></button><button class='ui red button'><i class='trash icon'></i></button>" +
        "</div></div></div>");
});











// Edits cards 
// Get the title of the card. 
$(document).on("click", ".ui.button.edit", function()
{
    var header = $(this).closest('.ui.raised.card').find('.main.header')
        .text().trim();
    var content = $(this).closest('.ui.raised.card').find(
        '.ui.small.feed').text().trim().split(",");
    //var contentWords = JSON.parse(content);
    content = content.map(Function.prototype.call, String.prototype.trim);
    console.log(content);
    // Get the main header and change it into an input box with the edit header.... 
    $(this).closest('.ui.raised.card').find('.main.header').replaceWith(
        "<div class='ui input'><input type='text' value='" + header +
        "'></div>");
    $(this).closest('.ui.raised.card').find('.ui.sub.header').replaceWith(
        "<div></div>");
    // Get the flash cards and add them into dropdown menus.  
    $(this).closest('.ui.raised.card').find('.ui.small.feed').replaceWith(
        "<div class='ui.small.feed'>" +
        "<div class='ui mini fluid selection dropdown transparent'>" +
        "<input id='classification' type='hidden'> <i class='dropdown icon'></i>" +
        "<div id='classList' class='default text'>Classification</div>" +
        "<div class='menu classmenu'></div>" + "</div>" + "</div>" +
        "<div id='thisone' class='ui mini fluid multiple search selection dropdown wordsDropdown'>" +
        "<input type='hidden'> <i class='dropdown icon'></i>" +
        "<input class='search' autocomplete='off' tabindex='0'>" +
        "<div class='default text'>Start typing...</div>" +
        "<div class='menu listMenu'>" +
        "</div></div>"
    );
   $(this).closest('.ui.raised.card').find('.ui.mini.button.open').replaceWith("<button class='ui mini button green save'>Save</button>");
    applyCatergories();

    //   $('.ui.dropdown').dropdown('refresh');
    runWords(words);
    var wordsDropdown = $(this).closest(".ui.raised.card").find(
        ".wordsDropdown");
    $(wordsDropdown).dropdown('set selected', content);
});
//  runCatergories();
// Get the words in the card. 
// Add the words to the second list. 

$('#expose').click(function(e){
    $('#expose').toggleClass('topout');
    $('#dark').fadeIn(200);
});

$('#dark').click(function(e){
    $('#dark').fadeOut(400, function(){
        $('#expose').css('z-index','1');
    });
});
