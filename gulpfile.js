const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
function generateHTML(cb) {
  src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )

    .pipe(sync.stream())
    .pipe(dest("dist"));
  cb();
}
function generateCSS(cb) {
  src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(sync.stream())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(dest("dist/css"));
  cb();
}

function copyImg(cb) {
  src("src/img/**/*").pipe(dest("./dist/img")).pipe(sync.stream());
  cb();
}

function generateJS(cb) {
  src("src/js/*").pipe(dest("./dist/js")).pipe(sync.stream());
  cb();
}
function copyFonts(cb) {
  src("src/fonts/**/*").pipe(dest("./dist/fonts")).pipe(sync.stream());
  cb();
}
function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./dist",
    },
  });

  watch("./src/js/*.js", generateJS);
  watch("./src/scss/**.scss", generateCSS);
  watch("./src/**.html", generateHTML);
  watch("./src/template/**.html", generateHTML);
  watch("./src/**.html").on("change", sync.reload);
}
exports.sync = browserSync;
exports.css = generateCSS;
exports.html = generateHTML;
exports.default = series(
  generateCSS,
  generateHTML,
  copyImg,
  generateJS,
  copyFonts
);
exports.img = copyImg;
