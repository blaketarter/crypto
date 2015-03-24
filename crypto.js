//TODO: find frequent combos and double letter combos, also make guesses based on frequency, analyze letter placement, make guess based on placement, implement other type of ciphers

var realAplhabet = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x',
  'y', 'z'
];

var frequencyAlphabet = [
  'e', 't', 'a', 'o', 'i',
  'n', 's', 'h', 'r', 'd',
  'l', 'c', 'u', 'm', 'w',
  'f', 'g', 'y', 'p', 'b',
  'v', 'k', 'j', 'x', 'q',
  'z'
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

  input = input.toLowerCase();

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
      ii,
      output = {},
      letter;

  input = input.replace(/[\.,-\/#!$%\^&\?*;:{}=\-_`~()]/g, '');
  input = input.replace(/\s/g, '');
  input = input.toUpperCase();

  ii = input.length;

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

function sortFrequency(input) {
  var i = 0,
      keys = Object.keys(input),
      ii = keys.length,
      sorted = [],
      letter;

  for (; i < ii; i++) {
    sorted.push([keys[i], input[keys[i]].percentage]);
  }

  sorted.sort(function(a, b) {
    return b[1] - a[1];
  });

  return sorted;
}

function guessFrequencyLetter(input) {
  var i = 0,
      ii = frequencyAlphabet.length,
      guess = {};

      // input = input.replace(/[\.,-\/#!$%\^&\?*;:{}=\-_`~()]/g, '');
      // input = input.replace(/\s/g, '');
      // input = input.toLowerCase();

  for (; i < ii; i++) {
    if (input[i]) {
      guess[input[i][0].toLowerCase()] = frequencyAlphabet[i];
    } else {
      guess[frequencyAlphabet[i]] = frequencyAlphabet[i];
    }
  }

  return guess;
}

function guessFrequencyText(input, guessFrequencyLetter, hint) {
  var i = 0,
      ii = input.length,
      output = '';

  input = input.toLowerCase();

  for (; i < ii; i++) {
    if (hint && hint[input[i]]) {
      output += hint[input[i]];
    } else if (guessFrequencyLetter[input[i]] && !hint) {
      output += guessFrequencyLetter[input[i]];
    } else {
      output += input[i].toUpperCase();
    }
  }

  return output;
}

function applyHint(input, guessFrequencyLetter, hint) {
  return guessFrequencyText(input, guessFrequencyLetter, hint);
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

function decypher(input, hint) {
  var output = {};

  output.rotate = rotateAll(input);
  // output.base64 = atob(input);
  output.hexdecode = hexDecode(input);
  output.frequency = sortFrequency(analyzeFrequency(input));
  output.guessFrequencyLetter = guessFrequencyLetter(output.frequency);
  output.guessFrequencyText = guessFrequencyText(input, output.guessFrequencyLetter);
  output.withHint = applyHint(input, output.guessFrequencyLetter, hint);

  return output;
}
