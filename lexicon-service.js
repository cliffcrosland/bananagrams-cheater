angular.module("App").service('lexiconService', ['lexiconWords', function (lexiconWords) {
  var _primes = {
    'a': 2,
    'b': 3,
    'c': 5,
    'd': 7,
    'e': 11,
    'f': 13,
    'g': 17,
    'h': 19,
    'i': 23,
    'j': 29,
    'k': 31,
    'l': 37,
    'm': 41,
    'n': 43,
    'o': 47,
    'p': 53,
    'q': 59,
    'r': 61,
    's': 67,
    't': 71,
    'u': 73,
    'v': 79,
    'w': 83,
    'x': 89,
    'y': 97,
    'z': 101,
  };

  var _hashWords = {};
  initializeHashWords();

  function getWords(letters, callback) {
    setTimeout(function () {
      var wordsMap = {};
      _.each(getStringSubsets(letters), function (letterSubset) {
        var hash = primeHash(letterSubset);
        var words = getWordsWithHash(hash);
        _.each(words, function (word) {
          wordsMap[word] = 1;
        });
      });
      var words = _.sortBy(_.keys(wordsMap), function (word) { return -1 * word.length; });
      callback(words);
    }, 5);
  }

  function getStringSubsets(string) {
    var subsets = [];
    getStringSubsetsRec(string, "", subsets);
    return subsets;
  }

  function getStringSubsetsRec(pool, soFar, subsets) {
    if (pool.length == 0) {
      subsets.push(soFar);
      return;
    }
    var ch = pool[0];
    pool = pool.slice(1);
    getStringSubsetsRec(pool, soFar + ch, subsets);
    getStringSubsetsRec(pool, soFar, subsets);
  }

  function primeHash(letters) {
    var prod = 1;
    _.each(letters, function (letter) {
      prod *= _primes[letter.toLowerCase()];
    });
    return prod;
  }

  function getWordsWithHash(hash) {
    return _hashWords[hash] || [];
  }

  function initializeHashWords() {
    _.each(lexiconWords.getLexiconWords(), function (word) {
      word = word.toLowerCase();
      var hash = primeHash(word);
      if (!_hashWords[hash]) {
        _hashWords[hash] = [];
      }
      _hashWords[hash].push(word);
    });
  }

  return {
    getWords: getWords
  };
}]);

