
var scrolling = false;

function showCard() {
  setTimeout(function() {
    var infoBox1 = document.getElementById("info-box-1");
    infoBox1.innerHTML = "";
    infoBox1.innerHTML += "<span class='sub-header'>general inquiries</span>";
    infoBox1.innerHTML += "<span><a href='mailto:mike.west@eyecuelab.com'>mike.west@eyecuelab.com</a></span>";
    infoBox1.innerHTML += "<span><a href='tel:1-971-337-0494'>(971) 337-0494</a></span>";
    var infoBox2 = document.getElementById("info-box-2");
    infoBox2.innerHTML = "";
    infoBox2.innerHTML += "<span class='sub-header'>location</span>";
    infoBox2.innerHTML += "<span>532 NW 12th Ave</span>";
    infoBox2.innerHTML += "<span>Portland, OR 97209</span>";
    infoBox1.classList.add('animate-1');
    infoBox2.classList.add('animate-2');
  }, 0);
}


function scrollToSection(sectionId, navItem) {
  var el = document.getElementById(sectionId);
  var activeNav = document.getElementById(navItem);

  this.scrolling = true;
  el.scrollIntoView({ block: 'start', behavior: 'smooth' });

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

function openModal() {
  var el = document.getElementById('overlay');
  el.classList.add("show");
  this.showCard()
}

function closeModal() {
  var el = document.getElementById('overlay');
  el.classList.remove("show");
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
  var top = el.offset().top;
  var mid = top + (height * 0.25);
  var bottom = top + height;
  if (windowPos > mid && windowPos < bottom) {
    var dist = windowPos - mid;
    var bg = "0px -" + (dist * 0.25) + "px";
    el.css({ "background-position": bg });
  } else {
    el.css({ "background-position": "0px 0px"})
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
  } else if (windowPos > mid && windowPos < bottom) {
    el.css({ "opacity": 0 })
  } else {
    el.css({ "opacity": init });
  }
}

$(window).scroll(function() {
  $(".section-2-subsection").each(function() {
    var el = $(this);
    setBgScroll(el);
  });
  $(".section-2-textbox").each(function() {
    var el = $(this);
    fadeOnScrollOut(el, 1, 0.9);
  })
});

$(document).ready(function() {
  setTimeout(function() {
    $(window).scroll(function() {
      fadeOnScrollOut($(".section-1-card-wrapper"), 0.9, 0.75);
    });
  }, 3000) // set delay equal to the duration of the animation as set in .section-1-card animation in styles.scss
});

window.addEventListener('scroll', function(e) {
  setActiveNav();
});

window.addEventListener('resize', function(e) {
  setActiveNav();
});

window.onload = function() {
  setActiveNav();
}
