 
 
//$(document).ready(function(){  //moves the squares left 24 pixels
           
//});  
 
$(function(){   //jquery main  	
  
  	var nameOfDrag;
  	var nameOfDrop;
  	var dropboxObject = {};
	var dropsquare1Arr = [];
	var dropsquare2Arr = [];
	var dropsquare3Arr = [];
	var dropsquare4Arr = [];
	var whiteboardArr = [];
	var dropArrVar = [];

function resetVars(){
  			nameOfDrag;
  			nameOfDrop;
  			dropboxObject = {};
			dropsquare1Arr = [];
			dropsquare2Arr = [];
			dropsquare3Arr = [];
			dropsquare4Arr = [];
			whiteboardArr = [];
			dropArrVar = [];
	};

//window puts function in browser scope to call.
window.reset = (function placeSquares(){
	
	//could do a count of items jquery funtion instead of using the integer 7
 	var indexCount = 6;
   var moveCount = 0; 
    return {
    	set: function () {
    		resetVars();
    		resetTotals();
    		var indexCount = 7;
   			var moveCount = 0;
    		$("#dragging div").each(function() {
        		$(this).css("z-index", indexCount)
        		if (moveCount > -1)
        		$(this).animate({ left: moveCount * 24 + 100 + "px", top: 40 + "px"}, 1000);
        		indexCount = indexCount - 1;
        		moveCount = moveCount + 1;
   			});
		}
 	}; 	
})();


//call the reset function on window load
reset.set();

  
  
    $( ".draggabledrop" ).draggable({  snap: ".droppabledrop", snapMode: "inner", snapTolerance: 20, opacity: 0.75, stack: ".draggabledrop", containment: $( ".widthwrapper" ), scroll: false });
    $( ".droppabledrop" ).droppable({ greedy: true, tolerance: "fit",
    	drop: function(event, ui){
    		nameOfDrag = $(ui.draggable).text();  //text of dragged item
    		
    		//$( this ).find( "p" ).html( "Dropped!" );  //flag on box when dropped
    		
    		$(ui.draggable).effect( "bounce", "slow" );
	
			var dropzoneRecord = $(ui.draggable).data('dropRecord');	
			var dropzoneCurrent = $(this).attr('id');
    
         // checks to see if moved from one drop zone to another
    		if ((typeof dropzoneRecord !== 'undefined' ) && (dropzoneRecord  !==  dropzoneCurrent)) {
   				
			
				//set dropArrVar to previous dropzonearray if moved from another dropzone not whiteboard.
 
				 if (dropzoneRecord === "dropzone1"){ 
  	       	dropArrVar = dropsquare1Arr;
  	       	};
  	       
  	      		if (dropzoneRecord === "dropzone2"){ 
  	       	dropArrVar = dropsquare2Arr;
  	       	};
  	       
  	       	if (dropzoneRecord === "dropzone3"){ 
  	       	dropArrVar = dropsquare3Arr;
  	       	};
  	       
  	       	if (dropzoneRecord === "dropzone4"){ 
  	       	dropArrVar = dropsquare4Arr;
  	       	};
			  
			 	decreasePileCount(dropzoneRecord, nameOfDrag, dropArrVar);

   			};

    		
			nameOfDrop = $(this).attr('id');  //dropzone id
    		
    		//set dropArrVar to current dropzonearray if moved from whiteboard, not another dropzone.
  	       if (nameOfDrop === "dropzone1"){ 
  	       dropArrVar = dropsquare1Arr;
  	       };
  	       
  	       if (nameOfDrop === "dropzone2"){ 
  	       dropArrVar = dropsquare2Arr;
  	       };
  	       
  	       if (nameOfDrop === "dropzone3"){ 
  	       dropArrVar = dropsquare3Arr;
  	       };
  	       
  	       if (nameOfDrop === "dropzone4"){ 
  	       dropArrVar = dropsquare4Arr;
  	       };
    		
    		
    		$(ui.draggable).data('dropRecord', nameOfDrop); //set name of drop to a new property if it hits a dropzone

    		increasePileCount(nameOfDrag, dropArrVar);
    		
    	}   		
    });
   
    $("#whiteboard" ).droppable({
        drop: function(event, ui) {
       	nameOfDrag = $(ui.draggable).text();
     	   nameOfDrop = $(ui.draggable).data('dropRecord');  //SET A PROPERTY OR CLASS TO THE DROPPABLE OBJECT.
           	
  	       if (nameOfDrop === "dropzone1"){ 
  	       dropArrVar = dropsquare1Arr;
  	       };
  	       
  	       if (nameOfDrop === "dropzone2"){ 
  	       dropArrVar = dropsquare2Arr;
  	       };
  	       
  	       if (nameOfDrop === "dropzone3"){ 
  	       dropArrVar = dropsquare3Arr;
  	       };
  	       
  	       if (nameOfDrop === "dropzone4"){ 
  	       dropArrVar = dropsquare4Arr;
  	       };        	
        	     	
         	decreasePileCount(nameOfDrop, nameOfDrag, dropArrVar); 
         	             	
        }      
    });
    	
	
	function addWhiteboardArray(nameOfDrag) {	
	whiteboardArray.push(nameOfDrag);
	};
	
	
	function increasePileCount(nameOfDrag, dropArrVar) //pass var name here? 
	{ 
	if ($.inArray(nameOfDrag, dropArrVar)  == -1) {
	dropArrVar.push(nameOfDrag); //if the nameOfDrag is already present don't increase count.
		}	
		changeTotal(nameOfDrop, dropArrVar);
		dropArrVar = [];
	};
	
	
		
	function decreasePileCount(nameOfDrop, nameOfDrag, dropArrVar)
	{ 
		removeSquareIndex = $.inArray(nameOfDrag, dropArrVar); //get the index of dragged item in arrary
		if (removeSquareIndex != -1) {  //if the item is in arrary then splice. (other than negative one means in array)
			dropArrVar.splice(removeSquareIndex,1);
		}	
		changeTotal(nameOfDrop, dropArrVar);
	};
	
	
	
	 function changeTotal(nameOfDrop, dropArrVar) {  //changes the total labels to equal dropArrVar array length
      	     	  	
	  	$('#' + nameOfDrop + 'T').text("Total: " + dropArrVar.length);
	  
	  	if (dropArrVar.length){	
	  		$('#' + nameOfDrop + 'L').text(dropArrVar);
	 	}
		else {
			$('#' + nameOfDrop + 'L').text("--");
		}
	
      var totalDropLocal = (dropsquare1Arr.length + dropsquare2Arr.length + dropsquare3Arr.length + dropsquare4Arr.length);	
	
		$('#totalzoneP').text('total in square holes: ' + totalDropLocal);
	   $('#totalboardP').text("total on board: " + (7 - totalDropLocal));  //tooltip - separate object holds members of the board space.
	 };	   	

	 
	 
	function  resetTotals() {	 
	$(".totalInZone").each(function() {
      	  	$(this).text("Total: 0");
			});
	$(".containZone").each(function() {
      	  	$(this).text("--");
			});	
	$("#totalzoneP").text('total in square holes: 0');
	$("#totalboardP").text('total on board: 7');
	};
	    	
  //- Using a function pointer:
//document.getElementById("clickMe").onclick = doFunction;
  
$("#instruct").click(function() {instructionLightbox()});
$("#reset").click(function() {reset.set()});

    	
}); //end of main jquery fn





// display isntruction ightbox
function instructionLightbox(){

	// add lightbox/shadow <div/>'s if not previously added
	if($('#lightbox').size() == 0){
		var theLightbox = $('<div id="lightbox"/>');
		var theShadow = $('<div id="lightbox-shadow"/>');
		$(theShadow).click(function(e){
			closeLightbox();
		});
		$('body').append(theShadow);
		$('body').append(theLightbox);
	}

	// remove any previously added content
	$('#lightbox').empty();

	// insert content
	var insertContent = '<h3>the game of square holes</h3><ol><li>pick up a square and move it into a hole.</li><li>pick up another square and move it into a different hole.</li><li>move a square from one hole to another hole.</li><li>move a square back out of a hole.</li><li>watch the total section update</li><li>this data is pulled from javascript objects.</li></ol><ul><BR><BR><li>enjoy</li></ul>';
	if(insertContent != null){
		$('#lightbox').append(insertContent);
	}


	// move the lightbox to the current window top + 100px
	$('#lightbox').css('top', $(window).scrollTop() + 100 + 'px');

	// display the lightbox
	$('#lightbox').show();
	$('#lightbox-shadow').show();

}


// close the lightbox
function closeLightbox(){

	// hide lightbox and shadow <div/>'s
	$('#lightbox').hide();
	$('#lightbox-shadow').hide();

	// remove contents of lightbox in case a video or other content is actively playing
	$('#lightbox').empty();
}



