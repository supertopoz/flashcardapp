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
{url: "https://yt3.ggpht.com/-Uqwr0hWfOic/AAAAAAAAAAI/AAAAAAAAAAA/Rip1vis4UrM/s100-c-k-no-rj-c0xffffff/photo.jpg", name: "Cat"}];


$('.ui.accordion').accordion({exclusive: false});
// ************************** Format Buttons ************************************************
//Remove class selected from all other buttons.
$(document).ready(function(){
    $('.apperance').click(function() {
        $('.apperance').not(this).removeClass('active');
        $(this).toggleClass('active');
    });
});

$(document).ready(function(){
    $('#textToggle').click(function(){
        var format = "textToggle"
 flashCardRunner(theCards, format);
    });
});

$(document).ready(function(){
    $('#imageToggle').click(function() {
        var format = "imageToggle"
 flashCardRunner(theCards, format);
});
});

$(document).ready(function(){
    $('#textndImageToggle').click(function() {
        var format = "textndImageToggle"
 flashCardRunner(theCards, format);
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
//***************** Positioning button ***************************************
//***************** Toggle vertical and horizontal button ************************

$('#hbuttonClick').click(function()
{
$('#hbutton').each(function()
    {
        var classes = ['resize horizontal icon','resize vertical icon',];
        this.className = classes[($.inArray(this.className,
            classes) + 1) % classes.length];
    });
        var flashCards = $(".blue").map(function()
        {
            return $(this).attr('id');
        }).get();
        flashCardRunner();
    });

//****************** Push images to canvas **********
$(".label").on('click', function()
{

        $(this).toggleClass("blue");
    // Push flashcard selected out to the canvas
        flashCardRunner()
});

//***************** Used to push flashcards into the canvas. *****************
function flashCardRunner(flashCards)
    {
        canvas.clear()
          var flashCards = $(".blue").map(function()
        {
            return $(this).attr('id');
        }).get();
        var totalFlashCards = flashCards.length;
        var thisCardNumber = 0;
        var theCard;
        for (var i = 0; i <= flashCards.length; i++)
        {
            theCard = flashCards[i];
            renderImage(theCard, totalFlashCards, thisCardNumber);
            thisCardNumber += 1;
        }
    }

//***************** Render each image on to the canvas with settings needed****

function renderImage(theCard, totalFlashCards, thisCardNumber)
    {
        canvas.clear();
        var flashCards = theCard;
        var imageUrl = images[flashCards].url;
        var imageName = images[flashCards].name;
        var canVasWidth = $("#c").width() - 2;
        var canVasHeight = $("#c").height();
        var imageOpacity = 1; 
        var textOpacity = 1; 
        var scaleFactor;
        var imageStartWidth;
        var cardNumber = thisCardNumber+1
        var number = cardNumber.toString();

        if($('.ui.button.format.active.apperance').attr('id') === 'textToggle'){
            imageOpacity = 0;
        } else {
            imageOpacity = 1; 
        }
        if($('.ui.button.format.active.apperance').attr('id') === 'imageToggle'){
            textOpacity = 0;
        } else {
            textOpacity = 1;
        }


//If the hbutton is clicked then this is the scale factor calculation
        if ($('#hbutton').attr('class') === 'resize horizontal icon')
        {
            if (totalFlashCards ===1)
            {
                imageStartWidth = 350 * totalFlashCards * 1.1;
                scaleFactor = (canVasWidth / imageStartWidth);
            }
            else if (totalFlashCards === 2)
            {
                imageStartWidth = 200 * totalFlashCards * 1.1;
                scaleFactor = (canVasWidth / imageStartWidth);
            }
            else if (totalFlashCards === 3)
            {
                imageStartWidth = 150 * totalFlashCards * 1.1;
                scaleFactor = (canVasWidth / imageStartWidth);
            }
            else if (totalFlashCards > 3)
            {
                imageStartWidth = 100 * totalFlashCards * 1.1;
                scaleFactor = (canVasWidth / imageStartWidth);
            }
//If the hbutton is not clicked then this is the scale factor calculation
        }
         if ($('#hbutton').attr('class') === 'resize vertical icon')
        {
           if (totalFlashCards ===1)
            {
                imageStartWidth = 400 * totalFlashCards * 1.1;
                scaleFactor = (canVasHeight / imageStartWidth *2);
            }
            else if (totalFlashCards === 2)
            {
                imageStartWidth = 300 * totalFlashCards * 1.1;
                scaleFactor = (canVasHeight / imageStartWidth *2);
            }
            else if (totalFlashCards === 3)
            {
                imageStartWidth = 200 * totalFlashCards * 1.1;
                scaleFactor = (canVasHeight / imageStartWidth*2);
            } else{
                 imageStartWidth = 200 * totalFlashCards * 1.1;
                scaleFactor = (canVasHeight / imageStartWidth*2);
            }
        }
// Add Render the images.
        fabric.Image.fromURL(imageUrl, function(img)
        {
            var fontSize = scaleFactor * 20;
            var textFontSize = scaleFactor * 60
            var img1 = img.scale(scaleFactor).set(
            {
                opacity: imageOpacity,
                stroke: "#1678c2",
                strokeWidth: 1,
                shadow: 'rgba(0,0,0,0.5) 2px 2px 2px',
            });
            var text = new fabric.Text(imageName,
            {
                opacity: textOpacity,
                fill: 'black',
                fontFamily: 'Roboto',
                fontSize: scaleFactor * 30,
            });
            //Where the text will appear on the screen
            //visible this
             if( $('#hbutton').attr('class') === 'resize horizontal icon' && $('.ui.button.format.active.apperance').attr('id') === 'imageToggle' ){
                text.set("opacity", 0);
             }
            if( $('#hbutton').attr('class') === 'resize vertical icon' && $('.ui.button.format.active.apperance').attr('id') === 'imageToggle' ){
                text.set("opacity", 0);
             }
            if( $('#hbutton').attr('class')=== 'resize horizontal icon' && $('.ui.button.format.active.apperance').attr('id') === 'textToggle' ){
             //   alert("working");
                text.set("top", img1.height/2 * scaleFactor - text.height/2);
                text.set("opacity", 1);
                text.set("left", img1.width * scaleFactor / 2 - (text.width /2));


             }
             if( $('#hbutton').attr('class')=== 'resize vertical icon' && $('.ui.button.format.active.apperance').attr('id') === 'textToggle' ){
             //   alert("working");
                text.set("top", img1.height * scaleFactor/ 2  - text.height/2);
                text.set("opacity", 1);
                text.set("left", img1.width * scaleFactor / 2 - (text.width / 2));
                text.set("fontSize", textFontSize);

             }
            if( $('#hbutton').attr('class')=== 'resize vertical icon' && $('.ui.button.format.active.apperance').attr('id') === 'textndImageToggle' ){
             //   alert("working");
                text.set("top", img1.height * scaleFactor/2 - text.height/2);
                text.set("opacity", 1);
                text.set("left", img1.width * scaleFactor + 10);
                text.set("fontSize", textFontSize);
             }
             if( $('#hbutton').attr('class')=== 'resize horizontal icon' && $('.ui.button.format.active.apperance').attr('id') === 'textndImageToggle' ){
             //   alert("working");
                text.set("top", img1.height * scaleFactor + 10);
                text.set("opacity", 1);
                text.set("left", img1.width/2*scaleFactor - text.width/2);

             }


// Control if the images are going to be vertical or horizontal.
            var leftPos;
            var nextCard;
            var topStart;
            // if the hbutton is clicked then run this.  
            if ($('#hbutton').attr('class') ===
                'resize horizontal icon')
            {
//****************************Set image horizontal **************************
                var totalWidth = (img1.width * scaleFactor) *
                    totalFlashCards;
                var startpoint = canVasWidth / 2 - totalWidth / 2 * 1.1;
                nextCard = (img1.width * scaleFactor) * thisCardNumber *
                    1.1;
                leftPos = startpoint + nextCard;
                topStart = canVasHeight/3-(img1.width *scaleFactor)/2;
            }
//************************ Set image vertical *****************************
            else
            {
                leftPos = canVasWidth / 2 - img1.width - 70 * scaleFactor ;
                nextCard = (img1.width * scaleFactor) * thisCardNumber *
                    1.1;
                topStart = nextCard;
            }


            console.log(thisCardNumber);
            var numberText = new fabric.Text(number, {
               // opacity: textVisible,
                fill:'white',
                fontFamily: 'Roboto',       
                fontSize:fontSize,
          
            });
            
            var circle = new fabric.Circle({
                radius: 18*scaleFactor,
                left: 1,
                top: 1,
                hasControls: false,
                hasBorders: false,
                originX: "left",
                originY: "top",
                stroke: "#1678c2",
                strokeWidth: 1*scaleFactor,
                fill: "#1678c2"

            });
// Re-position group attributes for number circles and number text. 

            if ($('#hbutton').attr('class')=== 'resize vertical icon'){
            numberText.set("originX","center");
            numberText.set("top",img1.height*scaleFactor/2-numberText.height +5*scaleFactor);
            numberText.set("left", -36*scaleFactor);
            numberText.set("fontSize", fontSize*2);
            circle.set("radius", 18*scaleFactor*1.5);
            circle.set("originX", "right");
            circle.set("left", -10*scaleFactor);
            circle.set("top", img1.height * scaleFactor / 2 - circle.height / 2);
         
            }else{
            numberText.set("top",img1.height*scaleFactor*-0.32);
            numberText.set("left",img1.width * scaleFactor / 2 - numberText.width/2);
            circle.set("left", img1.width*scaleFactor/2-circle.width/2);
            circle.set("top", -40*scaleFactor);
            }
            var group = new fabric.Group([img1, text, circle, numberText],
            {
                left: leftPos,
                top: topStart
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
        flashCardRunner();
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
