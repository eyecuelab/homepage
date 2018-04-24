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
      for (var j = 0; j < 15; j++) {
        var id = 'animated-word-' + j;
        document.getElementById(id).innerHTML = animatedWords[counterI][j];
      }
      counterI++;
    }, i * 5000);
  }
}

window.onload = function() {
  switchWords();
  setInterval(function() { switchWords(); }, 40000); 
}