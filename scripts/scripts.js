var animatedWords = [
  ['e', 'n', 't', 'e', 'r', 'p', 'r', 'i', 's', 'e', '', 's', 'a', 'a', 's'],
  ['m', 'a', 'r', 'k', 'e', 't', 'p', 'l', 'a', 'c', 'e', 's', ' ', ' ', ' '],
  ['a', 'i', '', 'a', 'p', 'p', 'l', 'i', 'c', 'a', 't', 'i', 'o', 'n', 's'],
  ['i', 'o', 't', ' ', 'p', 'r', 'o', 'd', 'u', 'c', 't', 's', '', '', ''], 
  ['b', 'l', 'o', 'c', 'k', 'c', 'h', 'a', 'i', 'n', '', 'a', 'p', 'p', 's'],
  ['y', 'o', 'u', 'r', ' ', 's', 't', 'a', 'r', 't', 'u', 'p', ' ', ' ', ' '],
  ['e', 'n', 't', 'e', 'r', 'p', 'r', 'i', 's', 'e', '', 's', 'a', 'a', 's'],
];

function switchWords() {
  for (var i = 0; i < animatedWords.length - 1; i++) {

    var counterI = 0;
    setTimeout(function() {
      var parentContainer = document.getElementById("animated-header-container");
      while (parentContainer.firstChild) parentContainer.removeChild(parentContainer.firstChild);

      var enteringContainer = document.createElement("div");
      enteringContainer.classList.add('header-wrapper');
      enteringContainer.classList.add('entering');
      parentContainer.appendChild(enteringContainer);
      var exitingContainer = document.createElement("div");
      exitingContainer.classList.add('header-wrapper');
      parentContainer.appendChild(exitingContainer);

      for (var j = 0; j < 15; j++) {
        var id = 'animated-word-' + j;

        var exitingElement = document.createElement("div");
        exitingContainer.appendChild(exitingElement);
        exitingElement.innerHTML = animatedWords[counterI][j];
        exitingElement.classList.add('animated-header');
        exitingElement.classList.add('square-' + (j+1));
        exitingElement.classList.add('exiting');

        var enteringElement = document.createElement("div");
        enteringElement.classList.add('animated-header');
        enteringContainer.appendChild(enteringElement);
        enteringElement.innerHTML = animatedWords[counterI + 1][j];
        enteringElement.classList.add('animated-header');
        enteringElement.classList.add('square-' + (j+1));
        enteringElement.classList.add('entering');
      }
      counterI++;
    }, i * 3500);
  }
}

var scrolling = false;

function showCard() {
  setTimeout(function() {
    // document.getElementById('captcha').classList.add('animate'); // removed tempoarily to see if captcha is needed
    var infoBox1 = document.getElementById("info-box-1");
    infoBox1.innerHTML = "";
    infoBox1.innerHTML += "<span class='sub-header'>general inquiries</span>";
    infoBox1.innerHTML += "<span><a href='mailto:hello@eyecuelab.com'>hello@eyecuelab.com</a></span>";
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

window.addEventListener('scroll', function(e) {
  setActiveNav();
});

window.addEventListener('resize', function(e) {
  setActiveNav();
});

window.onload = function() {
  setActiveNav();
  switchWords();
  setInterval(function(){ switchWords(); }, 21000);
}