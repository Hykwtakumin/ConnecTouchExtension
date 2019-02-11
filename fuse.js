const {FuseBox, QuantumPlugin } = require("fuse-box");
const { Sparky } = require("fsbx");
const {TypeChecker} = require("fuse-box-typechecker");
const plugins = [];
if (process.env.NODE_ENV === "production") {
    plugins.push(QuantumPlugin({
        uglify: {
            mangle: {
                safari10: true,
            }
        },
        treeshake: true,
        bakeApiIntoBundle: "index",
    }))
}

const fuse = FuseBox.init({
    homeDir: "src",
    sourceMaps: true,
    target: "browser@es6",
    output: "./dist/$name.js",
    plugins
});

/*background script用bundle*/
const background = fuse
    .bundle("background")
    .instructions(`> src/background.ts`);
/*content script用bundle*/
const content = fuse
    .bundle("content")
    .instructions(`> src/content.ts`);
/*option page用bundle*/
const option = fuse
    .bundle("option")
    .instructions(`> src/option.ts`);


if (process.env.NODE_ENV !== "production") {
    const testWatch = TypeChecker({
        tsConfig: './tsconfig.json',
        basePath:'./',
        name: 'Watch Async'
    });
    testWatch.runWatch('./src');
    background.watch();
    content.watch();
    option.watch();
}

/*以下各種タスク*/
Sparky.task("clean", () => {
    return Sparky.src("./dist").clean("dist/");
});

Sparky.task("copy:img", () => {
    return Sparky.src("./icons").dest("dist/");
});

Sparky.task("copy:json", () => {
    return Sparky.src("./manifest.json").dest("dist/");
});

Sparky.task("copy:html", () => {
    return Sparky.src("./**.html").dest("dist/");
});

Sparky.task("dev", ["copy:json", "copy:img", "copy:html"], () => {
    fuse.run();
});

