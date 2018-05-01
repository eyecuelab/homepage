var animatedWords = [
  ['e', 'n', 't', 'e', 'r', 'p', 'r', 'i', 's', 'e', '', 's', 'a', 'a', 's'],   // 15
  ['m', 'a', 'r', 'k', 'e', 't', 'p', 'l', 'a', 'c', 'e', 's', '', '', ''],     // 12
  ['a', 'i', '', 'a', 'p', 'p', 'l', 'i', 'c', 'a', 't', 'i', 'o', 'n', 's'],   // 15
  ['i', 'o', 't', '', 'p', 'r', 'o', 'd', 'u', 'c', 't', 's', '', '', ''],      // 12
  ['b', 'l', 'o', 'c', 'k', 'c', 'h', 'a', 'i', 'n', '', 'a', 'p', 'p', 's'],   // 15
  ['y', 'o', 'u', 'r', '', 's', 't', 'a', 'r', 't', 'u', 'p', '', '', '']       // 12
];

function switchWords() {
  for (var i = 0; i < animatedWords.length; i++) {
    var counterI = 0;
    setTimeout(function() {
      // var parentContainer = document.getElementById("animated-header");
      // parentContainer.getElementsByTagName('span').classList.remove("new");
      // parentContainer.getElementsByTagName('span').classList.add("old");
      for (var j = 0; j < 15; j++) {
        var id = 'animated-word-' + j;
        // var element = document.getElementById(id);
        // element.innerHTML = animatedWords[counterI][j];
        // element.classList.remove("entering");
        // element.classList.add("entering");
        var parentContainer = document.getElementById(id);
        parentContainer.innerHTML = '';
        var newElement = document.createElement("span");
        newElement.setAttribute('id', j);
        newElement.innerHTML = animatedWords[counterI][j];
        newElement.classList.add("animate");
        parentContainer.appendChild(newElement);
      }
      counterI++;
    }, i * 5000);
  }
}

function scrollToSection(sectionId) {
  var el = document.getElementById(sectionId);
  el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  // var parentContainer = document.getElementById("nav-bar");
  // parentContainer.getElementsByTagName('span').classList.remove("active");
  // parentContainer.getElementsByClassName(sectionId).classList.add("active");
}

function openModal() {
  var el = document.getElementById('overlay');
  el.classList.add("show");
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
  // switchWords();
  // setInterval(function() { switchWords(); }, 40000); 
}