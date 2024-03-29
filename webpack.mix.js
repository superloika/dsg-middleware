const mix = require("laravel-mix");
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .webpackConfig({
        // plugins: [new VuetifyLoaderPlugin()],
        // devServer: {
        //     proxy: {
        //         '/distributor' : {
        //             target: "https://sandbox.beatroute.io/",
        //             changeOrigin: true
        //         }
        //     }
        // }
    })
    .sourceMaps(false, 'source-map')
    .version()
    // .browserSync('localhost:8004');
    ;


