function getRandomColor() {
    var letters = '1289ABEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function invertHex(hexnum){
    hexnum = hexnum.slice(1);

    if(hexnum.length != 6) {
      alert("Hex color must be six hex numbers in length.");
      return false;
    }
      
    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";
      
    for(var i=0; i<6; i++){
      if(!isNaN(splitnum[i])) {
        resultnum += simplenum[splitnum[i]]; 
      } else if(complexnum[splitnum[i]]){
        resultnum += complexnum[splitnum[i]]; 
      } else {
        alert("Hex colors must only include hex numbers 0-9, and A-F");
        return false;
      }
    }
      
    return "#"+resultnum;
  }