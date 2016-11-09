//****** init canvas *********************8
var canvas = new fabric.Canvas('c', { selection: false });
var grid = 30;



$('.ui.dropdown')
  .dropdown({
    allowAdditions: true
  })
;


$('.ui.sidebar').sidebar({
    context: $('.bottom.segment')
  })
  .sidebar('attach events', '.sidebar.tiny.icon');

// ***************************Seed data for development ****************************************
var images = [{url: "http://avatarbox.net/avatars/img30/the_simpsons_krusty_the_clown_avatar_picture_41741.png", name: "Homer"},
{url: "http://sciencewiz.com/Portal_Images/DNA_Default.png", name: "DNA"},
{url: "https://media.gq.com/photos/56ccac81154b2d0e6b1258bd/1:1/w_100,c_limit/sam-schube.jpg", name: "Man"},
{url: "https://media.licdn.com/mpr/mpr/shrink_100_100/p/4/005/0b7/3af/16367cc.jpg", name: "Lion"},
{url: "http://squawalpine.com/sites/default/files/styles/slideshow_thumb/public/multiple_medias/media_dog-sled.jpg", name: "Dog"},
{url: "http://www.theverylittlewar.com/images/profil/sample.jpg", name: "Flower"},
{url: "http://www.thanettoolsupplies.co.uk/shopimages/products/thumbnails/GED40Z-1-tn.jpg", name: "Spanner"},
{url: "http://thumb7.shutterstock.com/thumb_small/654136/299439665/stock-photo-surprised-young-woman-excitement-299439665.jpg", name: "Woman"},
{url: "https://www.croatia-tourist-agency.com/images/upload/vechile/small_boat-rent-speedboat-punat-59.jpg", name: "Boat"},
{url: "http://store.thecoop.com/coopstore/images/t_9010.jpg", name: "Chair"},
{url: "http://restorationmasterfinder.com/restoration/wp-content/uploads/2013/04/fire-100x100.jpg", name: "Fire"},
{url: "https://yt3.ggpht.com/-Uqwr0hWfOic/AAAAAAAAAAI/AAAAAAAAAAA/Rip1vis4UrM/s100-c-k-no-rj-c0xffffff/photo.jpg", name: "Cat"}];
var theCards = [];

$('.ui.accordion').accordion({exclusive: false});
//***************** Add images to top of page as mini labeled icons ************************
//Remove class selected from all other buttons.
/*$(document).ready(function(){
    $('.apperance').click(function() {
        $('.apperance').not(this).removeClass('active');
        $(this).toggleClass('active');
    });
});*/
    //09/11/2016 Added by Jason 
$(document).ready(function() {
    $('#imageToggle').attr('disabled',true);
});
    // End update    





$(document).ready(function() {
    $('#textToggle').click(function() {
    //09/11/2016 Added by Jason 
    $(this).attr('disabled',true);
    $('.apperance').not('#textToggle').attr('disabled',false);
    // End update    

        if ($(this).attr('class') ===
            'ui button format apperance') {
            $(this).toggleClass('active');
            $('.apperance').not(this).removeClass('active');
            var format = "textToggle";
            cardPositioner(theCards, format);
        }
    });
});

$(document).ready(function() {
    $('#imageToggle').click(function() {
    //09/11/2016 Added by Jason 
    $(this).attr('disabled',true);
    $('.apperance').not('#imageToggle').attr('disabled',false);
    // End update  
        if ($(this).attr('class') ===
            'ui button format apperance') {
            $('.apperance').not(this).removeClass('active');
            $(this).toggleClass('active');
            var format = "imageToggle";
            cardPositioner(theCards, format);
        }
    });
});

//***************** Add images to top of page as mini labeled icons ************************
var loadImages = function()
{
    // Iterate through image object and add them to the page.
    for (var i = 0; i < images.length; i++)
    {
        var label = "";
        var value = i;
        var img = "<img src=" + images[i].url + ">";
        var txt1 = "<a class='ui image label bordered' id='" + value +
            "'\">" + img + label + "</a>"; // Create element with HTML
        $("#imagesDiv").append(txt1); // Append the new elements
        }
    };
loadImages();
//****************** Refesh button to remove all selected flash cards**********
$('#refreshButton').on('click', function(e)

{
    //09/11/2016 Added by Jason 
    $('#imageToggle').attr('disabled',true);
    $('.apperance').not('#imageToggle').attr('disabled',false);
    // End update  
    $('a.image').removeClass('blue');
    $('.random').removeClass('active');
    $('.apperance').not(this).removeClass('active');
    $('#imageToggle').addClass('active');
    canvas.clear();
    $('#refreshButton').removeClass('active');
    theCards.length = 0;
    });



//****************** Push images to canvas **********
$(".label").on('click', function()
{
	if($('.random').attr('class') === 'ui button format random active'){
		canvas.clear();
		$('.random').removeClass('active');
		theCards.length = 0;
	}
    $(this).toggleClass("blue");
    var cardNumber = $(this).attr('id');
    var status = $(this).attr('class');
    var index = theCards.indexOf(cardNumber);

   if (theCards.length+1 > 10 && status === "ui image label bordered transition visible blue" ){
    	alert("working2")
        theCards.push(cardNumber);
        theCards.pop()
        $(".message").attr('class', 'ui red message');
        $(this).removeClass('blue');
    }
    else if (status === "ui image label bordered transition visible blue")
    {
        theCards.push(cardNumber);
    }
    else
    {

        theCards.splice(index, 1);
    }
    // Push flashcard selected out to the canvas
    console.log(theCards)
    cardPositioner(theCards);
});

//***************** Randomly load cards *****************************************
function getRandomInt(min, max) {
//	alert("working2");
  min = Math.ceil(min);
  max = Math.floor(max);
//  console.log(Math.floor(Math.random() * (max - min)) + min);
  return(Math.floor(Math.random() * (max - min)) + min);
}


//var cards = [];
function getCards(){
	//alert("working1");
  while (theCards.length <= 9){
  	//	alert('cards.length:' + cards.length);
      var card = getRandomInt(1, images.length);
      var n = card.toString();
        if(theCards.indexOf(n) === -1){
          theCards.push(n)
    }
  }
 //   alert("working");
  cardPositioner(theCards);
  };



function emptyCards() {
    theCards.length = 0;
}
$('#random').on('click', function() {
    //	alert($('#random').attr('class'));
    if ($('#random').attr('class') === 'ui button format random active') {
        $('a.image').removeClass('blue');
        canvas.clear();
        $('#refreshButton').removeClass('active');
        theCards.length = 0;
        $('#random').toggleClass('active');
    } else {
        $('a.image').removeClass('blue');
        $('#random').toggleClass('active');
        theCards.length = 0;
        getCards()
    }
});


//***************** Hide flash message which show up when more than 4 images selected ************************
$('#closeButton').on('click', function()
{
    $(".message").attr('class', 'ui red hidden message');
  //  $(".label").attr('class','ui image label bordered transition visible');
   // canvas.clear();
});

//***************** Render each image on to the canvas with settings needed****
//***************** Used to push flashcards into the canvas. *****************
function cardPositioner(theCards, format) {


        $('#refreshButton').removeClass('active');
        if (format === undefined) {
            format = $(".apperance.active").attr('id');
        }
     //   canvas.clear();
        var cards = theCards;
        console.log(cards);
        var totalFlashCards = cards.length;
        var thisCardNumber = 0;
        var theCard;
        var canVasWidth = $("#c").width() - 2;
        var scaleFactor = canVasWidth / 900;
        var imageWidth = 100;
        var rows = [];
        for (var row = 1; row <= 6; row++)
        { // use let in es6
            var cells = []; // use let in es6
            rows[row - 1] = cells;
            for (var cell = 0; cell <= row - 1; cell++)
            { // use let in es6
                cells[cell] = canVasWidth / 2 - (imageWidth*scaleFactor) * row / 2 +
                    imageWidth*scaleFactor * cell*1.1
            }
        }
        //    console.log(rows);
        for (var i = 0; i < rows.length; i++)
        {
            for (var x = 0; x < rows[i].length; x++)
            {
                var left = rows[i][x] - 1.1;
                var top = imageWidth * i * 1.1 * scaleFactor - (rows.length) + 5;
                theCard = cards[thisCardNumber];
                renderImage(theCard, left, top, totalFlashCards, scaleFactor, format);
                thisCardNumber += 1;
            }
        }
    }

//***************** Render each image on to the canvas with settings needed****

function renderImage(theCard, left, top, totalFlashCards, scaleFactor, format)
{
    var textVisible;
    var imageVisible;
    canvas.clear();
   	
        var appearanceButtonState = format;
        if (appearanceButtonState === 'textToggle')
        {
            textVisible = 1;
            imageVisible = 0;
        }
        else
        {
            textVisible = 0;
        }
        if (appearanceButtonState === 'imageToggle')
        {
            imageVisible = 1;
            textVisible = 0;
        }
        var flashCards = theCard;


    //    var imageUrl = images[flashCards].url;

        if ( images[flashCards] !== undefined){
         
         var imageUrl = images[flashCards].url
 
        var imageName = images[flashCards].name;
        // Add Render the images.
        fabric.Image.fromURL(imageUrl, function(img)
        {
            var fontSize = scaleFactor * 28;
            var img1 = img.scale(scaleFactor).set(
            {
                opacity: imageVisible,
                stroke: "#1678c2",
                strokeWidth: 1,
                shadow: 'rgba(0,0,0,0.5) 2px 2px 2px',
                lockMovementX: true,
                lockMovementY: true
            });

            var text = new fabric.Text(imageName,
            {
                opacity: textVisible,
                fill: 'black',
                fontFamily: 'Roboto',
                fontSize: fontSize,
            });
            //Where the text will appear on the screen
            //visible this
            if (appearanceButtonState === 'textndImageToggle')
            {
                text.set("top", img1.height * scaleFactor + 2);
                //Hidden this
                text.set("left", img1.width * scaleFactor / 2 - (text.width /
                    2));
            }
            else
            {
                text.set("top", img1.height / 3 * scaleFactor + 2);
                //Hidden this
                text.set("left", img1.width * scaleFactor / 2 - (text.width /
                    2));
            }
            var rect = new fabric.Rect(
            {
                opacity: 1,
                fill: "#1678c2",
                height: img1.height * scaleFactor,
                width: img1.width * scaleFactor,
            });
            var group = new fabric.Group([img1, text, rect],
            {
                left: left,
                top: top,
            });
            canvas.add(group);
            group.setControlsVisibility(
            {
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

    }

//********************* Track state of objects and their location **********************
function trackObjects (){
var canvasLocations = json = '';
json = canvas.toJSON();
canvas.loadFromJSON(json, CallBack, function(o, object) {
//    canvas.setActiveObject(object);
});

function CallBack() {
    canvas.renderAll();
    canvas.calcOffset();
}
console.log(canvasLocations);  
}



//***************** Listen of object Events **************************
window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (event, self) 
{
    var getOpacityOfRect = canvas.getActiveObject()._objects[2].opacity;
    var getRectInGroup = canvas.getActiveObject()._objects[2];


    if (getOpacityOfRect === 1)
    {
        getRectInGroup.set('opacity', 0);
    }
    else
    {
        getRectInGroup.set('opacity', 1);
    }
      canvas.renderAll();
});
    // This is where When the window resizes the Canvas changes and the flashcards re generated.
$(document).ready(function()
{
    responsive();
});
window.addEventListener('resize', responsive);

function responsive()
    {
        var p = $("#canvasDiv");
        var width = p.innerWidth(); //(window.innerWidth > 0) ? window.innerWidth : screen.width;
        var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
        var widthn = width - 30;
        var heightn = height - 110;
        canvas.setDimensions(
        {
            width: widthn,
            height: heightn
        });
        var flashCards = $(".blue").map(function()
        {
            return $(this).attr('id');
        }).get();
        cardPositioner(theCards);
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

