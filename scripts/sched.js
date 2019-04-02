var fullsize = false;

function setFullSize() {
  var mobile = $(".mobile-indicator").is(':visible');
  return !mobile
}

function setLogoText() {
  if (fullsize) {
    $("#logo-text").html("<a href='/people'>People EyeCue</a>");
  } else {
    $("#logo-text").text("");
  }
}

function setCalendlyUrl() {
  var location = window.location.href.split("?");
  var defaults = location[1] ? location[1] : '';
  var url = `https://calendly.com/mike-west-2/people-eyecue-consultation?${defaults}`;
  $(".calendly-inline-widget").attr("data-url", url);
  $("#schedule-section-1").append('<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>');
}

window.onload = function() {
  fullsize = setFullSize();
  setLogoText();
  setCalendlyUrl();
}

window.addEventListener('resize', function(e) {
  fullsize = setFullSize();
  setLogoText();
});
