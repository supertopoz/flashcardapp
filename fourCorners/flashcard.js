// Four Corners

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
var images = [
{ url: "monkey.jpg", name: "monkey" },
{ url: "parrot.jpg", name: "parrot" },
{ url: "photo.jpg", name: "photo" },
{ url: "sunny.jpg", name: "sunny" },
{ url: "tiger.jpg", name: "tiger" },
{ url: "windy.jpg", name: "windy" },
{ url: "camel.jpg", name: "camel" },
{ url: "cloudy.jpg", name: "cloudy" },
{ url: "cold.jpg", name: "cold" },
{ url: "goat.jpg", name: "goat" },
{ url: "lion.jpg", name: "lion" }
];


$('.ui.accordion').accordion({exclusive: false});
// ************************** Format Buttons ************************************************
$(document).ready(function(){
    $('#textToggle').click(function(){
        var format = "textToggle";
        //09/11/2016 Added by Jason 
         $(this).attr('disabled',true);
         $('.apperance').not(this).attr('disabled',false);
         // End update
 imagePositioner(format);
    });
});


   //09/11/2016 Added by Jason 
$(document).ready(function(){
    $('#imageToggle').attr('disabled',true); 
});
 // End update


$(document).ready(function(){
    $('#imageToggle').click(function() {
        var format = "imageToggle";
        //09/11/2016 Added by Jason 
         $(this).attr('disabled',true);
         $('.apperance').not(this).attr('disabled',false);
         // End update
 imagePositioner(format);
});
});

$(document).ready(function(){
    $('#textndImageToggle').click(function() {
        var format = "textndImageToggle";
        //09/11/2016 Added by Jason 
         $(this).attr('disabled',true);
         $('.apperance').not(this).attr('disabled',false);
         // End update
 imagePositioner(format);
});
});

//Remove class selected from all other buttons. 
$(document).ready(function(){
    $('.apperance').click(function() {  
        $('.apperance').not(this).removeClass('active');
        $(this).toggleClass('active');
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
    //09/11/2016 Added by Jason 
    $('#imageToggle').attr('disabled',true);
    $('.apperance').not('#imageToggle').attr('disabled',false);
    // End update
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
    //$(this).toggleClass("blue");
    var cardNumber = $(this).attr('id');
    var status = $(this).attr('class');
    console.log(theCards.length);

     if (theCards.length === 4){
                $(this).toggleClass("blue");
        theCards.push(cardNumber);
        addImg();
     }


    else if ($(this).attr('class') ===
        'ui image label bordered transition visible blue')
    {
        var index = theCards.indexOf(cardNumber);
        $(this).toggleClass("blue");
        theCards.splice(index, 1);
    }
    else if (theCards.length >= 5 && $(this).attr('class') ===
        'ui image label bordered transition visible blue')
    {}
    else if (theCards.length <= 4)
    {
        $(this).toggleClass("blue");
        theCards.push(cardNumber);

    }
    else if (theCards.length === 5)
    {
        $("#warningMessage").attr('class', 'ui red message');
    }
    // Push flashcard selected out to the canvas
    imagePositioner();
});


//**************** Text Wrapper ************************************************

// Removed 30/03/2017 - Jason



//***************** Hide flash message which show up when more than 4 images selected ************************
$('#closeButton').on('click', function()
{
    $("#warningMessage").attr('class', 'ui red hidden message');
});

//*****************  Set coordinates for image position ************************

function imagePositioner(format)
{
 $('#refreshButton').removeClass('active');
 if (format === undefined){
 format =  $(".format.active").attr('id');
 }
    var incomingImages = theCards;
    canvas.clear();
    var imageCoordinates = [
    {
        left: 0,
        top: 0
    },
    {
        left: 490,
        top: 0
    },
    {
        left: 0,
        top: 400
    },
    {
        left: 490,
        top: 400
    },
    {
    	left:0,
    	top:0,
    }];
    var canVasWidth = $("#c").width();
    var canVasHeight = $("#c").height();
    imageCoordinates[1].left = canVasWidth - 160;
    imageCoordinates[3].left = canVasWidth - 160;
    imageCoordinates[2].top = canVasHeight - 200;
    imageCoordinates[3].top = canVasHeight - 200;
    imageCoordinates[4].top = canVasHeight/2 - 100;
    imageCoordinates[4].left = canVasWidth/2 - 100;
  
  
    for (var i = 0; i < incomingImages.length; i++)
    {
        var location = imageCoordinates[i];        
        var image = images[incomingImages[i]];
        renderImage(location, image, format);
    }
}

function addImg(){
    var canVasWidth = $("#c").width();
    var canVasHeight = $("#c").height();
    var myImg = 'https://s4.postimg.org/mtml8jp9p/g3361.png';
    fabric.Image.fromURL(myImg, function(img) {            
                img.scale(1);
                img.set({'left':canVasWidth/2-img.width/1.8});
                img.set({'top':canVasHeight/2-img.height/1.8});
                canvas.add(img);
                img.setControlsVisibility(
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
                setTimeout(function(){ 
                img.remove();
                    }, 800);
               
            });

}


////////////////////////////////////////////////Edit start 30/03/2017 Jason

//***************** Render each image on to the canvas with settings needed****
function renderImage(location, image, format)
{
  	var textVisible;
  	var imageVisible;
  	canvas.clear();
   		var appearanceButtonState = format 

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



   // ingest the location array of the image
        var left = location.left;
        var top = location.top;
        var imageUrl = image.url;
        var imageName =  image.name //12 //wrapCanvasText(image.name, canvas, 48, 100); Editied 15/03/2017 Jason
        // Add Text at the bottom of the images.
        fabric.Image.fromURL(imageUrl , function(img) {  

        var img1 = img.scale(scaleFactor).set({   
        opacity:imageVisible,  
        stroke: "#1678c2",
        strokeWidth: 1,
        shadow: 'rgba(0,0,0,0.5) 2px 2px 2px',
        name:'1',



        });
        img1.width = 100; // 300X300 update Added line - fix can be applied to other code
        img1.height = 100;// 300X300 update Added line - fix can be applies to other code

        var scaleFactor=1.5;
        var fontSize = 30;//12//scaleFactor * 10;     Editied 30/03/2017 Jason  
          
  			var text = new fabric.Text(imageName,
  			{
                opacity: textVisible,
                fill: 'black',
                fontFamily: 'Roboto',
                fontSize: fontSize,
            });
			//Where the text will appear on the screen
            //visible this
            if (appearanceButtonState === 'textndImageToggle' || appearanceButtonState === 'imageToggle') 
            {               
                if(text.width > img.width){
                console.log("Text Width:",(img1.width/text.width) *10)
                text.set("fontSize",(img1.width/text.width) *30);

                }
                
                text.set("top", img1.height * scaleFactor + 2);
                //Hidden this
                text.set("left", img1.width * scaleFactor / 2 - (text.width /
                    2));
                
            }
            else
            {
                text.set("fontSize", 30* scaleFactor);
                text.set("top", img1.height / 3 * scaleFactor + 2);
                //Hidden this
                text.set("left", img1.width * scaleFactor / 2 - (text.width / 2));

            
            }
          
////////////////////////////////////////////////Edit finish 30/03/2017 Jason          
          
           	var rect = new fabric.Rect(
           	{
                opacity: 0,
                fill: "#1678c2",
                height:100 * scaleFactor,
                width:100 * scaleFactor,
            });
          
    var group = new fabric.Group([img1,text, rect], { left: left, top: top});
    canvas.add(group);
      group.lockUniScaling=true    ;
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










//***************** Listen of object Events **************************
window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function(event, self)
{
	var getOpacityOfRect = canvas.getActiveObject()._objects[2].opacity;
	var getRectInGroup = canvas.getActiveObject()._objects[2];
	var getTextInGroup = canvas.getActiveObject()._objects[1];

    if (getOpacityOfRect === 1)
    {
        getRectInGroup.set('opacity', 0);
        getTextInGroup.set('opacity', 0); // Updated 15/03/2017 Fr
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
        imagePositioner();
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
//http://jsfiddle.net/yVzrb/153/
