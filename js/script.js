

$('#btn-m-1').click(()=>{
  $('button').removeClass('selected');
  $(this).addClass('selected');  
  let spotifyAPI = "https://api.spotify.com/v1/search?";
  let spotifyOptions = {
      q: "casting+crowns",
      type: "album" 
  };  
  
  function displayMusic1(data) {
    console.log(data);
    console.log(data.albums.items[2].images[2].url);

    $.each( data.items, (i, item)=>{
//      let musicHTML = '<div class="column">';
//      musicHTML += '<img src="' + images[2].url + '" class="hover-shadow">';
//        musicHTML += '</div>';
      $('<img>').attr( 'src', item[i].images[2].url ).appendTo('#photos-m');
      if (i === 10) {
        return false;
      }
    });
//      $('#photos-m').html(musicHTML);
      $('#photos-m').css('display', 'flex');
  }
  $.getJSON(spotifyAPI, spotifyOptions, displayMusic1);

});