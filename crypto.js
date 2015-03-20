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

function hexDecode(input) {
  var i = 0,
      output = '',
      hexes = input.match(/.{1,4}/g) || [],
      ii = hexes.length;

  for(; i < ii; i++) {
      output += String.fromCharCode(parseInt(hexes[i], 16));
  }

  return output;
}

function analyzeFrequency(input) {
  var i = 0,
      ii = input.length,
      output = {},
      letter;

  for (; i < ii; i++) {
    if (output[input[i]]) {
      output[input[i]].count++;
    } else {
      output[input[i]] = {
        count: 1
      };
    }
  }

  for (letter in output) {
    output[letter].percentage = ((output[letter].count / ii) * 100).toFixed(2);
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
  // output.base64 = atob(input);
  output.hexdecode = hexDecode(input);
  output.frequency = analyzeFrequency(input);

  return output;
}
