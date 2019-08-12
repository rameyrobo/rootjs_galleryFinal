/* your javascript goes here */
$( document ).ready( initiateApp );

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];

function initiateApp(){
	/*advanced: add jquery sortable call here to make the gallery able to be sorted
		//on change, rebuild the images array into the new order
	*/
	makeGallery( pictures );
	addModalCloseHandler();
	draggable();
}

function makeGallery(imageArray) {
	//use loops and jquery dom creation to make the html structure inside the #gallery section
	//Add Gallery Div
	var gallery = $( '<div>', { id: 'gallery'} );
	$('body').append( gallery );

	//Add Modals
	var modalBox = $( '<div>', { class: 'modal fade', id: 'myModal', role: 'dialog' } );
	var modalDialogue = $( '<div>', { class: 'modal-dialog' } );
	var modalContent = $( '<div>', { class: 'modal-content' } );
	var modalHeader = $( '<div>', { class: 'modal-header' } );
	var modalTitle = $( '<h4>', { class: 'modal-title' } );
	var modalBody = $( '<div>', { class: 'modal-body' } );
	var modalImg = $( '<img>', { class: 'modal-img' } );
	$( '#gallery' ).after(modalBox);
	$( '.modal' ).append(modalDialogue);
	$( '.modal-dialog' ).append(modalContent);
	$( '.modal-content' ).append(modalHeader);
	$( '.modal-header' ).append(modalTitle); //append(modalButton).append(modalTitle);
	$( '.modal-header' ).after(modalBody);
	$( '.modal-body' ).append(modalImg);

	//create a loop to go through the images in the imageArray
	for ( var imageArray = 0; imageArray < pictures.length; imageArray++ ) {
		//create the elements needed for each picture, store the elements in variable
		var galImg = $( '<figure>', { class: 'imageGallery col-xs-12 col-sm-6 col-md-4'}).css('background-image', 'url(' + pictures[imageArray] + ')' ).attr( 'ondragleave', 'dragged(event)');
		var x = pictures[imageArray].lastIndexOf('/');
		var imgTxt = pictures[imageArray].substring( x + 1);
		var galCap = $( galImg ).append( $( '<figcaption>' ).text( imgTxt ) );
		//append the element to the #gallery section
		$( '#gallery' ).append( galImg ).append( galCap );
	}
	//attach a click handler to the figure you create.  call the "displayImage" function.
	$( '.imageGallery' ).click( displayImage );
	// side note: make sure to remove the hard coded html in the index.html when you are done!
}

function addModalCloseHandler(){
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$( '.modal' ).click( function(){
		$( '#myModal' ).modal( 'hide' );
	});
}

function displayImage(){
	//find the url of the image by grabbing the background-image source, store it in a variable
		var bg = $(this).css( 'background-image' );

	//grab the direct url of the image by getting rid of the other pieces you don't need
	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
		// pexels-photo-132037
		//take a look at the lastIndexOf method
	bgReplace = bg.replace( 'url(','').replace(')','' ).replace(/\"/gi, "" );
	var n = bgReplace.lastIndexOf( '/' );
	var title = bgReplace.substring( n + 1 );

	//change the modal-title text to the name you found above
	$( '.modal-title' ).text( title );

	//change the src of the image in the modal to the url of the image that was clicked on
	$( '.modal-img' ).attr( 'src', bgReplace );
	//show the modal with JS.  Check for more info here:
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$( '#myModal' ).modal({
		backdrop: true
	});
}

function draggable() {
	$( function() {
			$( '#gallery' ).sortable();
			$( '#gallery' ).disableSelection();
		});
}

function dragged(event) {
	var images = $('.imageGallery').map(function(){
		return $(this).attr('style').replace( 'background-image:','').replace( 'url(','').replace(')','' ).replace(/\"/gi, "" );
	}).get()
	console.log(images);
}