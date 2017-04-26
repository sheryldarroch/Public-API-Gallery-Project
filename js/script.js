let movieSearch0 = "http://www.omdbapi.com/?t=guardians+of+the+galaxy";
let movieSearch1 = "http://www.omdbapi.com/?t=breakfast+club";
let movieSearch2 = "http://www.omdbapi.com/?t=princess+bride";
let movieSearch3 = "http://www.omdbapi.com/?t=sixteen+candles";
let movieSearch4 = "http://www.omdbapi.com/?t=beauty+and+the+beast&y=2017";
let movieSearch5 = "http://www.omdbapi.com/?t=the+incredibles";
let movieSearch6 = "http://www.omdbapi.com/?t=robots";
let movieSearch7 = "http://www.omdbapi.com/?t=top+gun";
let movieSearch8 = "http://www.omdbapi.com/?t=despicable+me";
let movieSearch9 = "http://www.omdbapi.com/?t=finding+nemo";


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
    lightboxHTML += '<p class="lightbox-name"><strong>Album Name:</strong> ' + item.name + '</p>';
    lightboxHTML += '<a class="lightbox-url" href="' + item.external_urls.spotify +'">Listen to this Album in Spotify</a>';
    lightboxHTML += '</div>';
    lightboxHTML += '</div>';
  });
  lightboxHTML += '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>';
  lightboxHTML += '<a class="next" onclick="plusSlides(1)">&#10095;</a>';
  lightboxHTML += '</div>';      
  lightboxHTML += '</div>';      
  $('#lightbox-m').html(lightboxHTML);
}
    
//Get Movie Info
function getMovies (url) {
   $.getJSON(url);
}

//create Movie Slides    
function movieSlides(obj) {
    let lightboxHTML = '';
    $.each(obj, ()=>{
    lightboxHTML += '<div class="mySlides">';
    lightboxHTML += '<img src="' + obj.Poster + '">'
    lightboxHTML += '<div class="caption>"';
    lightboxHTML += '<p class="lightbox-title"><strong>Movie Title:</strong> ' + obj.Title + '</p>';
    lightboxHTML += '<p class="lightbox-year"><strong>Year:</strong> ' + obj.Year + '</p>';  
    lightboxHTML += '<p class="lightbox-rated"><strong>Rated:</strong> ' + obj.Rated + '</p>';
    lightboxHTML += '<p class="lightbox-genre"><strong>Genre:</strong> ' + obj.Genre + '</p>';  
    lightboxHTML += '<p class="lightbox-plot"><strong>Plot:</strong> ' + obj.Plot + '</p>';    
    lightboxHTML += '</div>';
    lightboxHTML += '</div>';
    });  
    $('#lightbox-content-b').html(lightboxHTML);
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
    $(slides).each((i, e)=>{
        $(e).css('display', 'none');
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

//Call Movie AJAX Requests and Create Movie Lightbox
$.when($.getJSON(movieSearch0),
       $.getJSON(movieSearch1),
       $.getJSON(movieSearch2),
       $.getJSON(movieSearch3),
       $.getJSON(movieSearch4),
       $.getJSON(movieSearch5),
       $.getJSON(movieSearch6),
       $.getJSON(movieSearch7),
       $.getJSON(movieSearch8),
       $.getJSON(movieSearch9)
      )
      .done(function(data0, data1, data2, data3, data4, data5, data6, data7, data8, data9) {
          let allData = [].concat(data0).concat(data1).concat(data2).concat(data3).concat(data4).concat(data5).concat(data6).concat(data7).concat(data8).concat(data9);
          movieSlides(allData);
    });


