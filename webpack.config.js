const path = require("path");

module.exports = {
  // entry: "./src/index.js",
  entry: "./js_lessons/js_lesson_12/js/app12.js",
  output: {
    // path: path.resolve(__dirname, "dist"),
    // path: path.resolve(__dirname, "js"),
    path: path.resolve(__dirname, "./js_lessons/js_lesson_12/js"),
    filename: "bundle.js",
  },
  mode: `development`,
};
