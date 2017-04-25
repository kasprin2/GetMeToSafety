//STATE OBJECT
var state = {
    eNumAPI: {
        url: 'https://emergencynumberapi.com/api/country/',
        emergencyNumberData: ''
    },
    embassyDirectionsAPI: {
        params: {
            part: '',
            q: ''
        },
        url: '',
        address: {
            street: '',
            city: '',
            country: ''
        },
    }
};

//STATE FUNCTIONS
function getRequest(){
    console.log('getRequest', searchTerm);
//   state.eNumAPI.params.q = searchTerm;
  $.ajax({
        crossOrigin: true,
        url: state.eNumAPI.url + searchTerm,
        success: function (data) {
            data = JSON.parse(data);
            console.log('success',data);
            state.eNumAPI.emergencyNumberData = data.data;
            render();
        },
        error: function(data){
            alert('Something Went Wrong!')
        }
  });
};

//DOM FUNCTIONS
function render(){
    // $('h1').replace('Information for ' + state.params.q);
    $('h2').html('');
    if(state.eNumAPI.emergencyNumberData.ambulance.all[0].length){
      $('h2').append('Call ' + state.eNumAPI.emergencyNumberData.ambulance.all[0] + ' if you have an emergency requiring an ambulance');
    }
    if(state.eNumAPI.emergencyNumberData.fire.all[0].length){
      if( $('h2').length){ $('h2').append('<br/><br/>'); }
      $('h2').append('Call ' + state.eNumAPI.emergencyNumberData.ambulance.all[0] + ' if you have an emergency involving a fire');
    }
     if(state.eNumAPI.emergencyNumberData.police.all[0].length){
      if( $('h2').length){ $('h2').append('<br/><br/>'); }
      $('h2').append('Call ' + state.eNumAPI.emergencyNumberData.police.all[0] + ' if you have an emergency and need the police');
     }
    // $('.embassy').html('Address of the American embassy in ' + state.params.q)
    $('instructions').append('For directions to the US Embassy click on the Get Directions button')
    // $('.instructions').replace('To get the emergency number and directions to an American embassy in a different location, enter the city and country below and click submit.')
};


//EVENT LISTENERS
//make sure to add an event listener and function to narrow down search. look for other methods on this

var searchTerm = $('#query').val();
$('select').chosen();
$('#search-term').submit(function(event){
  event.preventDefault();
  event.stopPropagation();
  searchTerm = $('#query').val();
  console.log(searchTerm);
  getRequest();
  $('#query').val("");
  return false;
});

