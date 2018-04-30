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

window.onload = function() {
  // switchWords();
  // setInterval(function() { switchWords(); }, 40000); 
}