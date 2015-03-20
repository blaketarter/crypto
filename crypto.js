var realAplhabet = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x',
  'y', 'z'
];

function rotate(input, amount) {
  var i = 0,
      ii,
      key = {},
      output = '',
      cipherAlphabet = [
        'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x',
        'y', 'z'
      ];
  
  if (amount) {
    for (; amount > 0; amount--) {
      cipherAlphabet.push(cipherAlphabet.shift());
    }
  }
  
  i = 0;
  ii = cipherAlphabet.length;
  
  for (; i < ii; i++) {
    key[cipherAlphabet[i]] = realAplhabet[i];
  }
  
  i = 0;
  ii = input.length;
  
  for (; i < ii; i++) {
    output += (key[input[i]]) ? key[input[i]] : input[i];
  }
  
  return output;
}

function rotateAll(input) {
  var i = 1,
      ii = 25,
      output = {};
      
  for (; i <= ii; i++) {
    output[i] = rotate(input, i);
  }
  
  return output;
}

function decypher(input) {
  var output = {};
  
  output.rotate = rotateAll(input);
  
  return output;
}
