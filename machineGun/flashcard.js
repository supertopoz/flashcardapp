// randomizing tool
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var bombCards =[{url: "http://www.clker.com/cliparts/f/8/8/a/1366305676297157843free-game-icons-bomb-th.png", name:"bomb"},
{url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Korea_Expressway_No.100.svg/100px-Korea_Expressway_No.100.svg.png", name:"+100"},
{url: "http://img.android.downloadatoz.com/download/icon2/3/9/a/d4041d4920caa78560863eb78f81fa93.jpg",name:"200"},
{url: "http://is2.mzstatic.com/image/thumb/Purple49/v4/ab/df/d6/abdfd69d-52f9-9a5c-98c6-2e03e1e3c183/mzl.ssemuinx.png/100x100bb-85.jpg",name:"+1000"},
{url: "http://www.onepeopleoneworld.net/wp-content/uploads/2014/03/dance.jpg",name:"dance"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"},
{url: "http://images2.wikia.nocookie.net/__cb20080328053922/keroro/images/thumb/7/7e/Keron_star.svg/100px-Keron_star.svg.png",name:"-100"}
]


$('.ui.dropdown').dropdown({
    allowAdditions: true
  })
;

$('.ui.dropdown').on('change',function(){
 //   alert($(this).val());

})



//****** init canvas *********************8
var canvas = new fabric.Canvas('c', { selection: false });
var grid = 30;


$('.ui.sidebar').sidebar({
    context: $('.bottom.segment')
  })
  .sidebar('attach events', '.sidebar.tiny.icon');
//*************************** Get Card Data ****************************************************
var dataArr = [];

$.getJSON(
    "https://spreadsheets.google.com/feeds/list/1O4O0TAvBflqi9B1POxelRO2hIcI_BSWcrHbQ_3an1Zs/od6/public/basic?alt=json",
    function(data)
    {
        getData(data);
    });

function getData(data)
{
    for (i = 0; i < data.feed.entry.length; i++)
    {
        var stream = data.feed.entry[i].content.$t;
        dataArr.push(stream.split(','));

    }
show();
}

var imageURL =[];
var imageNames =[];
var imageText = [];
var theCards = [];
var themesArr = [];
//var randomCardList = []
var cardList =[];
var images = [];
var numberCard = "";

function show(){
    var list = $('#themeList').children().length;
  //  alert(list);
    var theme = $('#theme').val();
    imageURL.length = 0;
    imageNames.length = 0;
    $.each(dataArr, function(key, value){
        var dataTheme = value[0].replace('theme:','')
        themesArr.push(dataTheme);
        if(dataTheme === theme){
        imageNames.push(value[1].replace(' name:',''))
        imageText.push(value[2].replace(' text:',''));
        var url = value[3].replace(' url:','');
        imageURL.push(url.replace(' ',''))
	}
      })
    numberCards = Number(imageNames.length-1);
    themesArr = $.unique(themesArr);

  
    if (list < themesArr.length){
    $.each(themesArr, function(key, value){

    $("#themeList").append("<div class='item' data-value='"+value+"'>"+value+"</a></div>");  
    })


    }


addDescriptions();
}

function createDropDown(){

}



function GetRandomCards(numberCards) {
 var randomCardlist = [];
    for (var i = 0; i <= 16; i++) {
        var x = getRandomInt(0, numberCards);
        randomCardlist.push(x);
    }

  randomPositioning(randomCardlist)
}




function addDescriptions(){
    $.each(imageURL, function(key, value){
            $('#cardsHolder').append("<div class='seven wide column'>"+
                            "<div class='ui segment'>"+
                            "<div  class='ui grid'>"+
                            "<div class='three wide column photo'>"+
                            "<img class='ui image' src='"+imageURL[key]+"'>"+
                            "</div>"+
                            "<div class='nine wide column photoText'>"+imageText[key]+"</div>"+
                            "</div>"+
                            "</div>"+
                            "</div>");
    });

}



//************* Card random positioning *************************
function randomPositioning(randomCardlist){
     cardList.length = 0;
for(var y=0; y<=16; y++){
    cardList.push({type:"image",position:y,card:randomCardlist[y]});

}
cardPositioner(cardList)
}





// Init the listeners on the buttons

//***************** Render each image on to the canvas with settings needed****

//***************** Used to push flascardListhcards into the canvas as a 4 by 4 grid. *****************
function cardPositioner(cardList) {

    canvas.clear();
    if (cardList === undefined){
        cardList = 0;
        alert("working");
    }

    var totalFlashCards = cardList.length;
    var thisCardNumber = 1;
    var theCard;
    var canVasWidth = $("#c").width() - 2;
    var canVasHeight = $("#c").height() - 2;
    var scaleFactor =canVasWidth/480;
    var imageWidth =100;
    var rows = [];
    for (var row = 1; row <= 4
         ; row++) { // use let in es6
        var cells = []; // use let in es6
        rows[row - 1] = cells;
        for (var cell = 0; cell <= 4 - 1; cell++) { // use let in es6
            cells[cell] = canVasWidth / 2 - (imageWidth*scaleFactor*4+1.1*4)  / 2 +
                imageWidth*scaleFactor * cell*1.1;
        }
    }
 
    for (var i = 0; i < 4; i++) {
        for (var x = 0; x < rows[i].length; x++) {
            var left = rows[i][x];
            var top = imageWidth*i*1.1*scaleFactor-(rows.length);
            theCard = cardList[thisCardNumber];
            renderImage(theCard, left, top, totalFlashCards, scaleFactor,thisCardNumber);
            thisCardNumber += 1;
        }
    }
}

//***************** Render each image on to the canvas with settings needed****
function renderImage(theCard, left, top, totalFlashCards, scaleFactor,thisCardNumber) {
        
        canvas.clear();
        var imageVisible = 1
        var imageArr;
        var imageArrTwo;
        var imageName;
        var imageUrl = imageURL[theCard.card];
        fabric.Image.fromURL(imageUrl, function(img) {
            var fontSize = scaleFactor * 40;
            var img1 = img.scale(scaleFactor).set({
                opacity: imageVisible,
                shadow: 'rgba(0,0,0,0.5) 2px 2px 2px',
                lockMovementX: true,
                lockMovementY: true,
            });
            var cardNumberText = "" + thisCardNumber +""
            var text = new fabric.Text(cardNumberText, {
                opacity: 1,
                fill: 'white',
                fontFamily: 'Roboto',
                fontSize: fontSize,
            });
            //Where the text will appear on the screen
            text.set("top", img1.height / 3 * scaleFactor);
            //Hidden this
            text.set("left", img1.width * scaleFactor / 2 - (text.width /2) + 4);
            var rect = new fabric.Rect({
                opacity: 1,
                fill: "#1678c2",
                height: img1.height * scaleFactor+8,
                width: img1.width * scaleFactor+8,
                left: -4,
                top: -5
	
            });
            var group = new fabric.Group([ img1, rect, text ], {
                left: left,
                top: top,
            });
            canvas.add(group);
            group.setControlsVisibility({
                mr: false,
                mt: false,
                ml: false,
                mb: false,
                tl: false,
                tr: false,
                br: false,
                bl: false,
                mtr: false,
            });
        });
    }
    //***************** Listen of object Events **************************
window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function(event,
    self) {
    var getOpacityOfRect = canvas.getActiveObject()._objects[1].opacity;
    var getRectInGroup = canvas.getActiveObject()._objects[1];
    var getOpacityOfText = canvas.getActiveObject()._objects[2].opacity;
    var getTextInGroup = canvas.getActiveObject()._objects[2];
    //alert(getRectInGroup);
    if (getOpacityOfRect === 1) {
        getRectInGroup.set('opacity', 0);
        getTextInGroup.set('opacity', 0);
    } else {
        getRectInGroup.set('opacity', 1);
        getTextInGroup.set('opacity', 1);
    }
    canvas.renderAll();
});

    // This is where When the window resizes the Canvas changes and the flashcards re generated.
$(document).ready(function()
{
   responsive()
});
window.addEventListener('resize', responsive);

function responsive()
    {
        var p = $("#canvasDiv");

        var width = p.innerWidth();
        var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
        var widthn = width - 30;
        var heightn = height - 110;
        canvas.setDimensions(
        {
            width: widthn,
            height: heightn
        });
    }
    // snap to grid
canvas.on('object:moving', function(options)
{
    options.target.set(
    {
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
    });
});
//Resize canvas



$('#theme').on('change', function(){   
    $('#cardsHolder').empty();
    imageURL.length =0;
    imageNames.length =0;
    imageText.length =0;
    theCards.length =0;
    show();
 //   themesArr.length =0;
   // alert('working');
GetRandomCards(numberCards);


})