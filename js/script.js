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


//Music Slides Helper Function to use with Click Arrows
function showMusicSlides(n) {
  let musicSlides = $('.music-slides');
  let currentSlide = $('.music-slides:visible');
  let index = musicSlides.index(currentSlide);
  index += n;
  if(index < 0) {
    index = musicSlides.length -1;
  } else if(index >= musicSlides.length) {
      index = 0;
    }
    musicSlides.hide();
    musicSlides.eq(index).show();
}

//Movie Slides Helper Function to use with Click Arrows
function showMovieSlides(n) {
      let movieSlides = $('.movie-slides');
      let currentSlide = $('.movie-slides:visible');
      let index = movieSlides.index(currentSlide);
      index += n;
      if(index < 0) {
          index = movieSlides.length -1;
       } else if(index >= movieSlides.length) {
            index = 0;
         }
         movieSlides.hide();
         movieSlides.eq(index).show();
}

//Add click function and move through Music Slides when arrows are clicked
function clickMusicArrow(e) {
    $(e).click((event)=>{
      let target = $(event.target);
      if(target.is('.next')) {
          showMusicSlides(1);
      } else {
            showMusicSlides(-1);       
        }
    });
}

//Add click function and move through Movie Slides when arrows are clicked
function clickMovieArrow(e) {
    $(e).click((event)=>{
      let target = $(event.target);
      if(target.is('.movie-next')) {
          showMovieSlides(1);
      } else {
            showMovieSlides(-1);
        }
    });
}
      
    
//Add click function and display music lightbox and slides when album is clicked
function displayMusicLightbox(e) {
  $(e).click((event)=>{
          let albumIndex = $(event.target).attr('data-index');
          let index = parseInt(albumIndex, 10);
          let musicSlides = $('.music-slides');
          $('#lightbox-m').show();
          musicSlides.eq(index).show();          
  });
} 

//add click function and display movie lightbox and slides when movie poster is clicked
function displayMovieLightbox(e) {      
  $(e).click((event)=>{
          let posterIndex = $(event.target).attr("data-index");
          let index = parseInt(posterIndex, 10);
          let movieSlides = $('.movie-slides');
          $('#lightbox-b').show();
           movieSlides.eq(index).show();
  });
}  

//Add click function and close Lightbox when X is clicked helper function
function closeLightbox(e) {
  $(e).click(()=>{
    if (e === '.close-cursor') {
      $('#lightbox-m').hide();
      $('.music-slides').hide();
    } else if (e === '.movie-close-cursor') {
      $('#lightbox-b').hide();
      $('.movie-slides').hide();
    } else if (e === '.movie-sorted-close') {
      $('#lightbox-a').hide();
    }
  });
}

//create Music gallery and lightbox
function displayMusic(data) {
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
  lightboxHTML += '<a class="arrow prev">&#10094;</a>';
  lightboxHTML += '<a class="arrow next">&#10095;</a>';
  lightboxHTML += '</div>';      
  lightboxHTML += '</div>';      
  $('#lightbox-m').html(lightboxHTML);
  displayMusicLightbox('.music-thumb');
  closeLightbox('.close-cursor');
  clickMusicArrow('.arrow');  
}

//create Movie Slides    
function createMovieSlides(obj) {
    let lightboxHTML = '';
    $.each(obj, (i, item)=>{
    lightboxHTML += '<div class="movie-slides">';
    lightboxHTML += '<img class="movie-poster" src="' + item.Poster + '">';
    lightboxHTML += '<div class="movie-caption">';
    lightboxHTML += '<p><span><strong>Movie Title:</strong></span><span class="movie-title"> ' + item.Title + '</span></p>';
    lightboxHTML += '<p><span><strong>Year:</strong></span><span class="movie-year"> ' + item.Year + '</span></p>';  
    lightboxHTML += '<p><span><strong>Rated:</strong></span><span class="movie-rated"> ' + item.Rated + '</span></p>';
    lightboxHTML += '<p><strong>Genre:</strong> ' + item.Genre + '</p>';  
    lightboxHTML += '<p><strong>Plot:</strong> ' + item.Plot + '</p>';    
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
  $.getJSON(spotifyAPI, spotifyOptions, displayMusic);
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
  $.getJSON(spotifyAPI, spotifyOptions, displayMusic);
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
  $.getJSON(spotifyAPI, spotifyOptions, displayMusic);
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
          createMovieSlides(searches);
          displayMovieLightbox('.movies');
          closeLightbox('.movie-close-cursor');
          clickMovieArrow('.movie-arrow');
    });

function sortMoviesByName(a, b) {
    let aName = a.textContent.toLowerCase();
    let bName = b.textContent.toLowerCase();
    return ((aName < bName) ? -1: (aName > bName) ? 1 : 0);
}

$('#btn-name').click(()=>{
    let movies = $('.movie-title');
    let sortedMovies = movies.sort(sortMoviesByName);
    let lightboxHTML = '<div class="movie-slides-sorted">';
    $('#lightbox-a').show();   
    $.each(sortedMovies, (i, item)=>{
    lightboxHTML += '<p class="movie-title-sorted">' + item.innerText + '</p>';
    });
    lightboxHTML += '</div>';
    $('#lightbox-content-a').html(lightboxHTML);
    $('#lightbox-content-a').show();
    closeLightbox('.movie-sorted-close');
});











