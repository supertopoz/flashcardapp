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
{url: "https://yt3.ggpht.com/-9yY6hEP8-KI/AAAAAAAAAAI/AAAAAAAAAAA/1OG4HqHDY6M/s100-c-k-no-rj-c0xffffff/photo.jpg", name: "DNA"},
{url: "https://media.gq.com/photos/56ccac81154b2d0e6b1258bd/1:1/w_100,c_limit/sam-schube.jpg", name: "Man"},
{url: "https://media.licdn.com/mpr/mpr/shrink_100_100/p/4/005/0b7/3af/16367cc.jpg", name: "Lion"},
{url: "http://squawalpine.com/sites/default/files/styles/slideshow_thumb/public/multiple_medias/media_dog-sled.jpg", name: "Dog"},
{url: "http://www.theverylittlewar.com/images/profil/sample.jpg", name: "Flower"},
{url: "http://www.thanettoolsupplies.co.uk/shopimages/products/thumbnails/GED40Z-1-tn.jpg", name: "Spanner"},
{url: "http://thumb7.shutterstock.com/thumb_small/654136/299439665/stock-photo-surprised-young-woman-excitement-299439665.jpg", name: "Woman"},
{url: "https://www.croatia-tourist-agency.com/images/upload/vechile/small_boat-rent-speedboat-punat-59.jpg", name: "Boat"},
{url: "http://store.thecoop.com/coopstore/images/t_9010.jpg", name: "Chair"},
{url: "http://restorationmasterfinder.com/restoration/wp-content/uploads/2013/04/fire-100x100.jpg", name: "Fire"},
{url: "https://yt3.ggpht.com/-Uqwr0hWfOic/AAAAAAAAAAI/AAAAAAAAAAA/Rip1vis4UrM/s100-c-k-no-rj-c0xffffff/photo.jpg", name: "Cat"},{url: "https://yt3.ggpht.com/-Uqwr0hWfOic/AAAAAAAAAAI/AAAAAAAAAAA/Rip1vis4UrM/s100-c-k-no-rj-c0xffffff/photo.jpg", name: "Cat"}];


$('.ui.accordion').accordion({exclusive: false});
//***************** Add images to top of page as mini labeled icons ************************
//Remove class selected from all other buttons. 
$(document).ready(function(){
   // alert("Working");
    $('.apperance').click(function() {  
        $('.apperance').not(this).removeClass('active');
        $(this).toggleClass('active');
    });
});

$(document).ready(function(){
    $('#textToggle').click(function(){

cardPositioner(theCards)
    });
});

$(document).ready(function(){
    $('#imageToggle').click(function() {
cardPositioner(theCards)
});
});

$(document).ready(function(){
    $('#textndImageToggle').click(function() {
cardPositioner(theCards)
});
});



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
        //      alert(images[i].name);
    }
};
loadImages();

var theCards = [];
//****************** Refesh button to remove all selected flash cards**********


$('#refreshButton').on('click', function(e)

{
    $('a.image').removeClass('blue');
    $('.apperance').not(this).removeClass('active');
    $('#imageToggle').addClass('active');
    canvas.clear();
    $('#refreshButton').removeClass('active');
    theCards.length = 0;
    });

//****************** Push images to canvas **********
$(".label").on('click', function()
{
    //count how many icons are selected and display warning if it exceeds twelve.
    trackObjects();
    var cardNumber = $(this).attr('id');
 //   alert(cardNumber);
    theCards.push(cardNumber);
 // Push flashcard selected out to the canvas
    cardPositioner(theCards);
});

//***************** Render each image on to the canvas with settings needed****
//***************** Used to push flashcards into the canvas. *****************
function cardPositioner(theCards)
{
	    trackObjects();
   //     canvas.clear();
        var cards = theCards;
        console.log(cards);
        var totalFlashCards = cards.length;
        var thisCardNumber = 0;
        var theCard;
        var canVasWidth = $("#c").width() - 2;
        var scaleFactor = canVasWidth / 800;
        var imageWidth = 100;
        var rows = [];
        for (var row = 1; row <= 6; row++)
        { // use let in es6
            var cells = []; // use let in es6
            rows[row - 1] = cells;
            for (var cell = 0; cell <= 6 - 1; cell++)
            { // use let in es6
                cells[cell] = canVasWidth / 2 - (imageWidth * scaleFactor * 6 *
                    1.2) / 2 + imageWidth * scaleFactor * cell * 1.2;
            }
        }
        //    console.log(rows);
        for (var i = 0; i < rows.length; i++)
        {
            for (var x = 0; x < rows[i].length; x++)
            {
                var left = canVasWidth / 2 - imageWidth / 2;
                var top = 20;
                theCard = cards[thisCardNumber];
                renderImage(theCard, left, top, totalFlashCards, scaleFactor);
                thisCardNumber += 1;
            }
        }

    }

//***************** Render each image on to the canvas with settings needed****

function renderImage(theCard, left, top, totalFlashCards, scaleFactor)
{
    var textVisible;
    var imageVisible;
    var thisCard = 0;
   // canvas.clear();
        var appearanceButtonState = $(".ui.button.format.apperance.active").attr('id');
      //  alert(appearanceButtonState);
        //alert(appearanceButtonState);
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
        if (appearanceButtonState === 'textndImageToggle')
        {
            imageVisible = 1;
            textVisible = 1;
        }


        var flashCards = theCard;
        var imageUrl = images[flashCards].url;
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
                lockMovementX: false,
                lockMovementY: false,
                id: theCard     

            });
            var id = 'Hello'
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
                opacity: 0,
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
                tl: true,
                tr: true,
                br: true,
                bl: true,
                mtr: true,
            });
        });
              theCards.length = 0;
    }
//***************** Hold the position of object on the Canvas ****************
function trackObjects (){
var canvasLocations = json = '';
json = canvas.toJSON();
canvas.loadFromJSON(json, CallBack, function(o, object) {
    canvas.setActiveObject(object);
});

function CallBack() {
    canvas.renderAll();
    canvas.calcOffset();
}
console.log(canvasLocations);  
}

function deleteKeyListen(updated){
//    alert(obj)
 $('html').keyup(function(e){
    if(e.keyCode == 46 || e.keyCode == 8) {
    //    alert('Delete Key Pressed');
    var obj = canvas.getActiveObject();
         canvas.remove(obj);
    }
});
}




window.fabric.util.addListener(canvas.upperCanvasEl, 'click', function (event, self){
    //alert("working");   
     deleteKeyListen()
 //    var obj = ""; 
});

//***************** Listen of object Events **************************
window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (event, self)
{
   
    var getOpacityOfRect = canvas.getActiveObject()._objects[1].opacity;
    var getRectInGroup = canvas.getActiveObject()._objects[2];
    var getTextInGroup = canvas.getActiveObject()._objects[1];

    if (getOpacityOfRect === 1)
    {
        getRectInGroup.set('opacity', 0);
        getTextInGroup.set('opacity', 1);
    }
    else
    {
        getRectInGroup.set('opacity', 1);
        getTextInGroup.set('opacity', 0);
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
        //  alert("running");
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
        trackObjects();
     //   cardPositioner(theCards);

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

