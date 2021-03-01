function shuffle(array){
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomPickOneFromArray(array){
    return array[Math.floor(Math.random() * array.length)]
}

function generateName(length){
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let result = ""
    for (i = 0; i < length; i++){
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }
    return result
}

module.exports = { shuffle, randomPickOneFromArray, generateName }