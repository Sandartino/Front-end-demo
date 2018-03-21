let gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite');

let config = {
    transform: [
        {
            svgo: {
                plugins: [
                    {
                        "cleanupIDs": false
                    },
                    {
                        "convertStyleToAttrs": false
                    },
                    {
                        "cleanupNumericValues": false
                    },
                    {
                        "convertShapeToPath": false
                    },
                    {
                        "convertPathData": false
                    },
                    {
                        "removeComments": false
                    }
                ]
            }
        }
    ],
    svg: {
        namespaceIDs: false,
        namespaceClassnames: false,
        xmlDeclaration: false
    },
    mode: {
        symbol: {
            sprite: "sprite-symbol.svg"
        },
        // css: {
        //     render: {css: true},
        //     bust:false,
        //     sprite:"sprite-css.svg"
        // }
    }
};

gulp.task('svg', function () {
    return gulp.src('assets/svg/*.svg')
        .pipe(svgSprite(config)).on('error', function (error) {
            console.log(error);
        })
        .pipe(gulp.dest('SVG-sprite'));
});