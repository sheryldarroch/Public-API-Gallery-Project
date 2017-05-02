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

let slideIndex = 1;
function showMusicSlides(n) {
    let slides = $('.music-slides');
    if (n > slides.length) {slideIndex = 1};
    if (n < 1) {slideIndex = slides.length};
    $(slides).each((i, e)=>{
        $(e).css('display', 'none');
    });
    $(slides[slideIndex]).css('display', 'block');
}
      
let movieIndex = 1;
//Show Movie Slides Helper Function
function showMovieSlides(n) {
    let slides = $('.movie-slides');
    if(n > slides.length) {movieIndex = 0};
    if(n < 0) {movieIndex = slides.length};
    $(slides).each((i, e)=>{
        $(e).css('display', 'none');
    });
    $(slides[movieIndex]).css('display', 'block');
}  

// Add click function and Show previous Music slide when prev arrow clicked
function prevMusicSlide(e) {
  $(e).click (()=>{
      slideIndex += -1;
      showMusicSlides(slideIndex);
  });
}
    
// Add click function and Show next music slide when next arrow clicked
function nextMusicSlide(e) {
    $(e).click (()=>{
      slideIndex += 1;
      showMusicSlides(slideIndex);
  }); 
}
      
//add click function and Show previous slide when prev arrow clicked
function prevMovieSlide(e) {      
  $(e).click (()=>{
      movieIndex += -1;
      showMovieSlides(movieIndex);
  });
}
      
//add click function and Show next slide when next arrow clicked
function nextMovieSlide(e) {      
  $(e).click (()=>{
      movieIndex += 1;
      showMovieSlides(movieIndex);      
  }); 
}        
      
//Add click function and display music lightbox and slides when album is clicked
function displayMusicLightbox(e) {
  $(e).click((event)=>{
          let index = $(event.target).attr('data-index');
          $('#lightbox-m').css('display', 'block');
          showMusicSlide(index);
  });
} 

//add click function and display movie lightbox and slides when movie poster is clicked
function displayMovieLightbox(e) {      
  $(e).click((event)=>{
          let index = $(event.target).attr("data-index");
          $('#lightbox-b').css('display', 'block');
          showMovieSlides(index)      
  });
}  

//Add click function and close Music Lightbox when X is clicked helper function
function closeMusicLightbox(e) {
  $(e).click(()=>{
      $('#lightbox-m').css('display', 'none');
  });
}

//add click function and Close Movie lightbox when "X" is clicked
function closeMovieLightbox(e) {
   $(e).click(()=>{
      $('#lightbox-b').css('display', 'none');    
   });
}  

//create Music gallery and lightbox
function displayMusic1(data) {
  let musicHTML = '';
  $.each( data.albums.items, (i, item)=>{
    musicHTML += '<div class="column">';
    musicHTML += '<img data-index="' + i + '" src="' + item.images[1].url + '" class="hover-shadow music-thumb">';
    musicHTML += '</div>';
  });
  $('#photos-m').html(musicHTML);
  $('#photos-m').css('display', 'flex');
  
  let lightboxHTML = '<span class="close-cursor">&times;</span>';
  lightboxHTML += '<div class="lightbox-content">';
  $.each( data.albums.items, (i, item)=>{
    lightboxHTML += '<div class="music-slides">';
    lightboxHTML += '<img src="' + item.images[0].url + '" style="width:100%">';
    lightboxHTML += '<div class="caption">';
    lightboxHTML += '<p class="lightbox-name"><strong>Album Name:</strong> ' + item.name + '</p>';
    lightboxHTML += '<a class="lightbox-url" href="' + item.external_urls.spotify +'">Listen to this Album in Spotify</a>';
    lightboxHTML += '</div>';
    lightboxHTML += '</div>';
  });
  lightboxHTML += '<a class="prev">&#10094;</a>';
  lightboxHTML += '<a class="next">&#10095;</a>';
  lightboxHTML += '</div>';      
  lightboxHTML += '</div>';      
  $('#lightbox-m').html(lightboxHTML);
  //show lightbox when album is clicked  
  displayMusicLightbox('.music-thumb');
  //close lightbox when x is clicked    
  closeMusicLightbox('.close-cursor');
  //show previous slide when prev arrow is clicked    
  prevMusicSlide('.prev');
  //show next slide when next arrow is clicked    
  nextMusicSlide('.next');
}

//create Movie Slides    
function movieSlides(obj) {
    let lightboxHTML = '';
    $.each(obj, (i, item)=>{
    lightboxHTML += '<div class="movie-slides">';
    lightboxHTML += '<img class="movie-poster" src="' + item.Poster + '">';
    lightboxHTML += '<div class="movie-caption">';
    lightboxHTML += '<p class="movie-title"><strong>Movie Title:</strong> ' + item.Title + '</p>';
    lightboxHTML += '<p class="movie-year"><strong>Year:</strong> ' + item.Year + '</p>';  
    lightboxHTML += '<p class="movie-rated"><strong>Rated:</strong> ' + item.Rated + '</p>';
    lightboxHTML += '<p class="movie-genre"><strong>Genre:</strong> ' + item.Genre + '</p>';  
    lightboxHTML += '<p class="movie-plot"><strong>Plot:</strong> ' + item.Plot + '</p>';    
    lightboxHTML += '</div>';
    lightboxHTML += '</div>';
    });  
    $('#lightbox-content-b').html(lightboxHTML);
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
          let searches = [];
          searches.push(data0[0], data1[0], data2[0], data3[0], data4[0], data5[0], data6[0], data7[0], data8[0], data9[0]);
          movieSlides(searches);
          displayMovieLightbox('.movies');
          closeMovieLightbox('.movie-close-cursor');
          prevMovieSlide('.movie-prev');
          nextMovieSlide('.movie-next');     
    });

