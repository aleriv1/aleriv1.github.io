//todo: Написать функцию анаграммы

// 'finder', 'friend' === true
// 'test', 'sets' === false
// 'abc', 'aaa' === false
// 'abb', 'aab' === false

// #region task12

// Когда-то-это уже делал. Помню, показалось это очень круто. Помимо методов для строк также применяеются методы массивов -- но мы их уже проходили (правда не все методы -- но ведь предполагается дополнительное чтение)

// function anagram(String(word1), word2) {
function anagram(word1, word2) {
  // word1.toLowerCase().split("").sort().join("") === word2.toLowerCase().split("").sort().join("")
  console.log(
    `Является ли '${word2}' анаграммой '${word1}'? `,
    word1.toLowerCase().split("").sort().join("") ===
      word2.toLowerCase().split("").sort().join("")
  );
}

anagram(`finder`, `friend`);
anagram(`abb`, `aab`);

// #endregion task12
