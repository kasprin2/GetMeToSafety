//STATE OBJECT
var state = {
    eNumAPI: {
        url: 'http://emergencynumberapi.com/api/country/',
        emergencyNumberData: ''
    },
    embassyDirectionsAPI: {
        params: {
            part: '',
            q: '',
            mapKey: '&key=AIzaSyAY_xCg4frGNv6lfl5b2jpsiPJwlitNN2U'
        },
        baseURL: 'https://maps.googleapis.com/maps/api/staticmap?center=American+Embassy+',
        center: '',
        size: '&size=640x400',
        marker: {
          position: 'American Embassy'
        }
        },
};

//STATE FUNCTIONS
function getENum(){
    console.log('getRequest', searchTerm);
  $.ajax({
    crossOrigin: true,
     url: state.eNumAPI.url + searchTerm,
    success: function (data) {
      data = JSON.parse(data);
      console.log('success',data);
      state.eNumAPI.emergencyNumberData = data.data;
      render();
    },
    error:function(data){
      console.log(data);
      alert('Something Went Wrong!')
    }
  });
};

function getEmbassy() {
  // state.embassyDirectionsAPI.center = searchTerm;
  $.getJSON(
    'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCjKNWgjJz26C98ZKo-W-U4tJyur96DNWY&address=American+Embassy,+'+state.embassyDirectionsAPI.isoCode+searchTerm,
    function(data) {
      console.log(data);
    }
    ) 
  console.log(state.embassyDirectionsAPI.isoCode);
  }


function initMap() {
  map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 16,
    center: new google.maps.LatLng(-33.91722, 151.23064),
    mapTypeId: 'roadmap'
  });
}      

//DOM FUNCTIONS
function render(){
  $('#countryName').html('Country Selected: ' + state.eNumAPI.emergencyNumberData.country.name).append('<br/><br/>');
  $('.numbersInput').fadeIn(400);
  // $('img').attr('src', state.embassyDirectionsAPI.baseURL+state.embassyDirectionsAPI.center+state.embassyDirectionsAPI.size+state.embassyDirectionsAPI.params.mapKey);
  initMap();

  $('.instructions').html('Wrong country? Select the correct country in which you are residing, and we will give you the number(s) to call in case of an emergency.')
  $('.numbers').html('');
  if(state.eNumAPI.emergencyNumberData.ambulance.all[0].length){
    $('.numbers').append('Call <a href="tel:state.eNumAPI.emergencyNumberData.ambulance.all[0]">' + state.eNumAPI.emergencyNumberData.ambulance.all[0] + ' </a> if you have an emergency requiring an ambulance.');
  }
  if(state.eNumAPI.emergencyNumberData.fire.all[0].length){
    if( $('.numbers').text().length){ $('.numbers').append('<br/><br/>'); }
    $('.numbers').append('Call <a href="tel:state.eNumAPI.emergencyNumberData.fire.all[0]"> ' + state.eNumAPI.emergencyNumberData.fire.all[0] + ' </a> if you have an emergency involving a fire.');
  }
  if(state.eNumAPI.emergencyNumberData.police.all[0].length){
    if( $('.numbers').text().length){ $('.numbers').append('<br/><br/>'); } 
    $('.numbers').append('Call <a href="tel:state.eNumAPI.emergencyNumberData.police.all[0]"> ' + state.eNumAPI.emergencyNumberData.police.all[0] + ' </a> if you have an emergency and need the police.');
  }
  if(state.eNumAPI.emergencyNumberData.dispatch.all &&
    state.eNumAPI.emergencyNumberData.dispatch.all[0].length){
    if( $('.numbers').text().length){ $('.numbers').append('<br/><br/>'); }
    $('.numbers').append('Call <a href="tel:state.eNumAPI.emergencyNumberData.dispatch.all[0]"> ' + state.eNumAPI.emergencyNumberData.dispatch.all[0] + ' </a> if you have an emergency.');
  }
 if(state.eNumAPI.emergencyNumberData.dispatch.fixed &&
    state.eNumAPI.emergencyNumberData.dispatch.fixed[0].length){
  console.log($('.numbers').length)
    if( $('.numbers').text().length){ $('.numbers').append('<br/><br/>'); }
    $('.numbers').append('Call <a href="tel:state.eNumAPI.emergencyNumberData.dispatch.fixed[0]">' + state.eNumAPI.emergencyNumberData.dispatch.fixed[0] + ' </a>if you have an emergency.');
  }
};


//EVENT LISTENERS

var searchTerm = $('#query').val();
//when user hits submit the value of their input gets passed to the getRequest function (above)
$('#search-term').submit(function(event){
  event.preventDefault();
  event.stopPropagation();
  searchTerm = $('#query').val();
  console.log(searchTerm);
  getENum();
  getEmbassy();
  $('#query').val("");
  return false;
});
