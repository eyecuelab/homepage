
var scrolling = false;
var fullsize = false;

function openModal() {
  var el = document.getElementById('overlay');
  el.classList.add("show");
  $('body').css({ "overflow": "hidden" });
}

function closeModal() {
  var el = document.getElementById('overlay');
  el.classList.remove("show");
  $('body').css({ "overflow": "auto" });
}

function scrollToSection(sectionId, navItem) {
  var el = document.getElementById(sectionId);
  var activeNav = document.getElementById(navItem);

  this.scrolling = true;
  var topOfElement = el.offsetTop - 50;
  window.scroll({ top: topOfElement, behavior: "smooth" });

  for (var i = 2; i <= 5; i++) {
    var inactiveNav = document.getElementById('nav-' + i);
    inactiveNav.classList.remove('active');
  }

  if (!navItem) { return; }

  activeNav.classList.add('active');

  setTimeout(function() {
    this.scrolling = false;
  }, 1100);
}

function setActiveNav() {
  var scrollY = window.scrollY + 50;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  var nav2 = document.getElementById('nav-2');
  var nav3 = document.getElementById('nav-3');
  var nav4 = document.getElementById('nav-4');
  var nav5 = document.getElementById('nav-5');
  var section1Height = document.getElementById('section-1').offsetHeight;
  var section2Height = document.getElementById('section-2').offsetHeight;
  var section3Height = document.getElementById('section-3').offsetHeight;
  var section4Height = document.getElementById('section-4').offsetHeight;
  var section5Height = document.getElementById('section-5').offsetHeight;

  if (this.scrolling) { return; }

  if ((window.innerHeight + scrollY) >= document.body.offsetHeight) {
    nav2.classList.remove('active');
    nav3.classList.remove('active');
    nav4.classList.remove('active');
    nav5.classList.add('active');
  } else if (scrollY >= section1Height + section2Height + section3Height) {
    nav2.classList.remove('active');
    nav3.classList.remove('active');
    nav5.classList.remove('active');
    nav4.classList.add('active');
  } else if (scrollY >= section1Height + section2Height) {
    nav2.classList.remove('active');
    nav4.classList.remove('active');
    nav5.classList.remove('active');
    nav3.classList.add('active');
  } else if (scrollY >= section1Height) {
    nav3.classList.remove('active');
    nav4.classList.remove('active');
    nav5.classList.remove('active');
    nav2.classList.add('active');
  } else {
    nav2.classList.remove('active');
    nav3.classList.remove('active');
    nav4.classList.remove('active');
    nav5.classList.remove('active');
  }
}

var setBgScroll = function(el) {
  var win = $(window);
  var height = win.height();
  var windowPos = win.scrollTop() + 50;
  var id = el.attr('id');
  var top = el.offset().top;
  var mid = top + (height * 0.25);
  var bottom = top + height;
  if (windowPos > mid && windowPos < bottom) {
    var dist = windowPos - mid;
    var offset = id == 'section-4-a' ? 50 : 0;
    var bg = "0px " + (offset - (dist * 0.25)) + "px";
    el.css({ "background-position": bg });
  } else {
    var offset = id == 'section-4-a' ? '50px' : '0px';
    el.css({ "background-position": `0px ${offset}`});
  }
}

var fadeOnScrollOut = function(el, init, breakpt) {
  // set init equal to initial value of opacity of the element;
  var win = $(window);
  var windowPos = win.scrollTop() + 50;
  var top = el.offset().top;
  var mid = top + (el.height() * breakpt);
  var bottom = top + el.height();
  if (windowPos > top && windowPos < mid) {
    var ratio = 1 - (windowPos - top) / (mid - top);
    var opacity = `${ratio * init}`;
    el.css({ "opacity": opacity });
  } else if (windowPos > mid) {
    el.css({ "opacity": 0 });
  } else {
    el.css({ "opacity": init });
  }
}

function setLogoText() {
  if (fullsize) {
    $("#logo-text").text("People EyeCue");
  } else {
    $("#logo-text").text("");
  }
}

function setFullSize() {
  var mobile = $(".mobile-indicator").is(':visible');
  return !mobile
}

$(window).resize(function() {
  fullsize = setFullSize();
  setLogoText();
});

$(window).scroll(function() {
  $(".section-2-textbox").each(function() {
    var el = $(this);
    fadeOnScrollOut(el, 1, 1);
  });
  if (fullsize) {
    $(".parallax").each(function() {
      var el = $(this);
      setBgScroll(el);
    });
  }
});

$(document).ready(function() {
  setTimeout(function() {
    $(window).scroll(function() {
      fadeOnScrollOut($(".section-1-card-wrapper"), 0.95, 0.4);
    });
  }, 1500); // set delay equal to the duration of the element's animation

  $("#contact-form").submit(function(e) {
    e.preventDefault();
    closeModal();
    var email = $('input[name="email"]').val();
    var hris = $('select[name="HRIS"]').val();
    var size = $('select[name="company-size"]').val();
    // var url = `http://localhost:8080/contact`;
    var url = `https://www.eyecuelab.com/contact`;
    var data = { email, hris, size };
    $.ajax({
      url,
      dataType: 'json',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function() { console.log('done') },
      error: function() { console.log('error') }
    });
  });
});

window.addEventListener('scroll', function(e) {
  setActiveNav();
});

window.addEventListener('resize', function(e) {
  setActiveNav();
});

window.onload = function() {
  setActiveNav();
  fullsize = setFullSize();
  setLogoText();
}
