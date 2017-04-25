function displayMusic1(data) {
  let musicHTML = '';
  $.each( data.albums.items, (i, item)=>{
    musicHTML += '<div class="column">';
    musicHTML += '<img data-index="' + i + '"src="' + item.images[1].url + '" onclick="openLightbox();currentSlide(' + i + ')" class="hover-shadow">';
    musicHTML += '</div>';
  });
  $('#photos-m').html(musicHTML);
  $('#photos-m').css('display', 'flex');
  let lightboxHTML = '<span class="close-cursor" onclick="closeLightbox()">&times;</span>';
  lightboxHTML += '<div class="lightbox-content">';
  $.each( data.albums.items, (i, item)=>{
    lightboxHTML += '<div class="mySlides">';
    lightboxHTML += '<img src="' + item.images[0].url + '" style="width:100%">'
    lightboxHTML += '<div class="caption>"';
    lightboxHTML += '<p class="lightbox-name">Album Name: ' + item.name + '</p>';
    lightboxHTML += '<a class="lightbox-url" href="' + item.external_urls.spotify +'">See album in Spotify</a>';
    lightboxHTML += '</div>';
    lightboxHTML += '</div>';
  });
  lightboxHTML += '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>';
  lightboxHTML += '<a class="next" onclick="plusSlides(1)">&#10095;</a>';
  lightboxHTML += '</div>';      
  lightboxHTML += '</div>';      
  $('#lightbox-m').html(lightboxHTML);
}

function openLightbox() {
  $('#lightbox-m').css('display', 'block');
} 
    
function closeLightbox() {
  $('#lightbox-m').css('display', 'none');
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}
    
function currentSlide(n) {
    showSlides(slideIndex = n + 1);
}
 
let slideIndex = 1;

function showSlides(n) {
    const slides = $('.mySlides');
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    $(slides).each(()=>{
        $(slides).css('display', 'none');
    });
    $(slides[slideIndex-1]).css('display', 'block');
}
    
// Display album selections when button is clicked    
$('#btn-m-1').click(()=>{
  $('.selectors-m li button').removeClass('selected');
  $('#btn-m-1 button').addClass('selected');
  let spotifyAPI = "https://api.spotify.com/v1/search?";
  let spotifyOptions = {
      q: "casting+crowns",
      type: "album",
      limit: 10
  };  
  $.getJSON(spotifyAPI, spotifyOptions, displayMusic1);
});

$('#btn-m-2').click(()=>{
  $('.selectors-m li button').removeClass('selected');
  $('#btn-m-2 button').addClass('selected');
  let spotifyAPI = "https://api.spotify.com/v1/search?";
  let spotifyOptions = {
      q: "addison+road",
      type: "album",
      limit: 10
  };  
  $.getJSON(spotifyAPI, spotifyOptions, displayMusic1);
});

$('#btn-m-3').click(()=>{
  $('.selectors-m li button').removeClass('selected');
  $('#btn-m-3 button').addClass('selected');
  let spotifyAPI = "https://api.spotify.com/v1/search?";
  let spotifyOptions = {
      q: "third+day",
      type: "album",
      limit: 10
  };  
  $.getJSON(spotifyAPI, spotifyOptions, displayMusic1);
});

