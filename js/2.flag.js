//import * as Snap from 'snapsvg';
let sceneTwo = (function () {
    function init(controller) {
        let sceneTwo = new ScrollMagic.Scene({
            triggerElement: '#second-page',
            triggerHook: 0.85,
            duration: '100%'
        })
            .on('enter', flagInit)
            .on('leave', flagOff)
            // .addIndicators({
            //     name: 'Second Page',
            //     indent: 100,
            //     colorTrigger: 'white',
            //     colorStart: 'yellow',
            //     colorEnd: 'black'
            // })
            .addTo(controller);

        let circle = $('#circlePath, #circleCross'),
            spiritPath = $("#spirit-path"),
            tlFlag = new TimelineMax({paused: true}),
            tlLeaf = new TimelineMax({paused: true, delay: 1}),
            tlCirclesBotLeft = new TimelineMax({paused: true, repeat: -1, yoyo: true}),
            circleClosed = true,
            tlSword = new TimelineMax({paused: true}),
            tlCircle = new TimelineMax({
                paused: true,
                onStart: () => circleClosed = !circleClosed,
                onReverseComplete: () => circleClosed = true
            });


        function pathPrepareDraw(el) {
            let lineLength = el[0].getTotalLength();
            el.css('stroke-dasharray', lineLength);
            el.css('stroke-dashoffset', lineLength);
            pathPrepareDraw.eLength = lineLength
        }

        pathPrepareDraw(circle);
        pathPrepareDraw(spiritPath);
        spiritPath.data = pathPrepareDraw.eLength;

        tlFlag
            .to('#white-long', 1, {width: '34%'})
            .to('#green-long', 1, {width: '33%'})
            .to('#green-short', 1, {right: 0}, 0)
            .to('#red-long', 1, {width: '33%'})
            .to('#red-short', 1, {right: 0}, 0)
            .to(circle, 1.8, {strokeDashoffset: 0})
            .from("#dot", .5, {opacity: 0});

        tlCircle
            .set("#circleCross", {opacity: 1})
            .to('#whiteCircle', .5, {y: 80, ease: Back.easeOut})
            .to('#greenCircle', .5, {x: 55, y: 55, ease: Back.easeOut}, 0)
            .to('#redCircle', .5, {x: 80, ease: Back.easeOut}, 0);

        // use commented SVGpathToBezierPlugin() at bottom to edit/generate values
        let path = [[{x: 0, y: 0}, {x: 0, y: 0}, {x: 159.59, y: 180.84}, {x: 222.57, y: 121.36}],
            [{x: 222.57, y: 121.36}, {x: 222.57, y: 121.36}, {x: 65.47, y: 300.61}, {x: 2.4899999999999807, y: 241.13}],
            [{x: 2.4898, y: 241.12}, {x: 2.4898, y: 241.12}, {x: 162.3898, y: 401.73}, {x: 225.3698, y: 342.25}],
            [{x: 225.37, y: 342.25}, {x: 225.37, y: 342.25}, {x: 201.175, y: 384.677}, {x: 159.163, y: 400.321}],
            [{x: 159.16, y: 400.33}, {x: 159.16, y: 400.33}, {x: 63.14399999999999, y: 425.978}, {
                x: 63.14399999999999,
                y: 425.978
            }],
            [{x: 63.144, y: 425.97}, {x: 67.3736, y: 510.447}, {x: 156.278, y: 671.26}, {x: 314.894, y: 651.82}],
            [{x: 314.89, y: 651.83}, {x: 314.89, y: 651.83}, {
                x: 225.03199999999998,
                y: 821.8900000000001
            }, {x: 116.47999999999999, y: 803.72}],
            [{x: 116.48, y: 803.72}, {x: 116.48, y: 803.72}, {x: 237.15, y: 973.0500000000001}, {x: 328, y: 963.73}],
            [{x: 328, y: 963.73}, {x: 328, y: 963.73}, {x: 381.2, y: 935.157}, {x: 381.2, y: 935.157}],
            [{x: 381.2, y: 935.16}, {x: 381.2, y: 935.16}, {x: 372.0707, y: 939.5778}, {x: 372.0707, y: 939.5778}]];

        tlLeaf
            .to('#leaf', 2, {bezier: {type: "cubic", values: path[0], autoRotate: -48}, ease: Sine.easeInOut})
            .to('#leaf', 2, {bezier: {type: "cubic", values: path[1], autoRotate: 137}, ease: Sine.easeInOut})
            .to('#leaf', 2, {bezier: {type: "cubic", values: path[2], autoRotate: -45}, ease: Sine.easeInOut})
            .to('#leaf', 1.6, {bezier: {type: "cubic", values: path[3], autoRotate: 150}, ease: Sine.easeIn})
            .to('#leaf', 5, {
                bezier: {type: "cubic", values: path[4]},
                rotation: 45,
                transformOrigin: "40% 40%",
                ease: Power2.easeIn
            })
            .addLabel("after roof")
            .to('#leaf', 2, {bezier: {type: "cubic", values: path[5], autoRotate: -45}, ease: Sine.easeInOut})
            .to('#leaf', 1, {skewX: 75, scale: .6}, '-=1')
            .to('#leaf', 2, {bezier: {type: "cubic", values: path[6], autoRotate: 185}, ease: Sine.easeInOut})
            .to('#leaf', 1, {skewX: 0, scale: 1}, '-=1')
            .to('#leaf', 2, {bezier: {type: "cubic", values: path[7], autoRotate: -45}, ease: Sine.easeInOut})
            .to('#leaf', 3, {
                bezier: {type: "cubic", values: path[8]},
                rotation: -4,
                transformOrigin: "left top",
                ease: Sine.easeInOut
            }, "-=.10")
            .to('#leaf', 3, {
                bezier: {type: "cubic", values: path[9]},
                rotation: -12,
                transformOrigin: "left top",
                ease: Sine.easeInOut
            })
            .timeScale(1.7);

        tlCirclesBotLeft
            .to("#c1", 9, {
                bezier: [{x: 47, y: 110}, {x: 44, y: 108}, {x: 42, y: 113}, {x: 49, y: 112}, {x: 47, y: 110}],
                ease: Power1.easeInOut
            })
            .to("#c2", 9, {
                bezier: [{x: 80, y: 60}, {x: 82, y: 58}, {x: 78, y: 58}, {x: 78, y: 65}, {x: 82, y: 65},
                    {x: 80, y: 60}], ease: Power1.easeInOut
            }, 0)
            .to("#c3", 9, {
                bezier: [{x: 66, y: 45}, {x: 64, y: 35}, {x: 55, y: 50}, {x: 65, y: 70}, {x: 70, y: 65},
                    {x: 66, y: 45}, {x: 70, y: 40}, {x: 75, y: 50}, {x: 66, y: 45}], ease: Power0.easeNone
            }, 0);

        tlSword
            .set("#sword-1, #sword-2", {scale: .6, opacity: 0})
            .to("#sacrifice-text", 2, {z: 68})
            .to("#sword-1", 2.5, {x: 130, y: -130, opacity: 1, ease: Power3.easeInOut}, 1)
            .to("#sword-2", 2.5, {x: -330, y: -130, opacity: 1, ease: Power3.easeInOut}, 1);

        function flagInit(event) {
            if (event.scrollDirection === "FORWARD") {
                $('#second-page').velocity("scroll", {duration: 1200, easing: "ease-out"})
            }
            TweenMax.to(spiritPath, 4, {strokeDashoffset: 0, delay: .8});
            TweenMax.to("#spirit-title, #nature-title, #sacrifice-title", 2.5, {opacity: 1});
            tlFlag.play().timeScale(2);
            circle.on('click', function () {
                if (circleClosed) {
                    tlCircle.play();
                } else {
                    TweenMax.set("#circleCross", {opacity: 0});
                    TweenMax.set("#red-short", {backgroundColor: "initial"});
                    tlCircle.reverse();
                    $('#green-scene, #red-scene').css("zIndex", -1);
                    new TimelineMax()
                        .to('#white-long', 1, {width: '34%'})
                        .to('#green-long, #red-long', 1, {width: '33%'}, 0)
                        .to("#white-scene, #green-scene, #red-scene", 1, {opacity: 0}, 0)
                        .to("#spirit-title, #nature-title, #sacrifice-title", 1, {opacity: 1})
                }
            });

            $('#whiteCircle, #spirit-title').on('click', function () {
                tlCircle.play();
                new TimelineMax()
                    .set("#spirit-title", {opacity: 0})
                    .to('#white-long', 1, {width: '80%'})
                    .to('#green-long, #red-long', 1, {width: '10%'}, 0)
                    .to("#white-scene", 2.5, {opacity: 1}, 0)
                    .to("#green-scene, #red-scene, #nature-title, #sacrifice-title", 1, {opacity: 0}, 0)

            });

            $('#greenCircle, #nature-title').on('click', function () {
                tlCircle.play();
                $('#green-scene').css("zIndex", 0);
                new TimelineMax()
                    .to('#green-long', 1, {width: '76%'})
                    .to('#white-long', 1, {width: '14%'}, 0)
                    .to('#red-long', 1, {width: '10%'}, 0)
                    .to("#green-scene", 1, {opacity: 1}, 0)
                    .to("#white-scene, #red-scene, #spirit-title, #nature-title, #sacrifice-title", 1, {opacity: 0}, 0);

                tlLeaf.restart(false);
                tlCirclesBotLeft.play();
            });

            $('#redCircle, #sacrifice-title').on('click', function (e) {
                tlCircle.play();
                $('#red-scene').css("zIndex", 0);
                new TimelineMax()
                    .set("#red-scene", {perspective: 200}, 0)
                    .set("#sacrifice-text", {left: "46.2%", x: "-50%"})
                    .set("#red-short", {backgroundColor: "red"})
                    .to('#red-long', 1, {width: '76%'})
                    .to('#white-long', 1, {width: '14%'}, 0)
                    .to('#green-long', 1, {width: '10%'}, 0)
                    .to("#red-scene", 1, {opacity: 1}, 0)
                    .to("#white-scene, #green-scene, #spirit-title, #nature-title, #sacrifice-title", 1, {opacity: 0}, 0);

                tlSword.restart()
            })
        }

        function flagOff(event) {
            if (event.scrollDirection === "FORWARD") {
                $('#third-page').velocity("scroll", {duration: 1200, easing: "ease-out"});
                tlFlag.reverse().timeScale(4)
            } else {
                tlFlag.reverse().timeScale(80);
            }
            tlCircle.reverse();
            new TimelineMax()
                .set(spiritPath, {strokeDashoffset: spiritPath[0].getTotalLength() + 2})
                .set("#green-scene, #red-scene", {zIndex: -1})
                .set("#red-short", {backgroundColor: "initial"})
                .to("#white-scene, #green-scene, #red-scene, #nature-title, #sacrifice-title", 2, {opacity: 0})
        }

    }

    return init
})();

export {sceneTwo}

//************https://codepen.io/GreenSock/pen/ecdfb83c70724638f83376a0cfad6b26************
//convert svg paths to bezier plugin(gsap)
//require: Snap lib
//uncomment the paths at html too see it

// let SVGPaths = [
//     ["m0 0s159.59 180.84 222.57 121.36"],
//     ["m222.57 121.36s-157.1 179.25-220.08 119.77"],
//     ["m2.4898 241.12s159.9 160.61 222.88 101.13"],
//     ["m225.37 342.25s-24.195 42.427-66.207 58.071"],
//     ["m159.16 400.33-96.016 25.648"],
//     ["m63.144 425.97c4.2296 84.477 93.134 245.29 251.75 225.85"],
//     ["m314.89 651.83s-89.858 170.06-198.41 151.89"],
//     ["m116.48 803.72s120.67 169.33 211.52 160.01"],
//     ["m328 963.73 53.2-28.573"],
//     ["m381.2 935.16-9.1293 4.4178"]
// ];
// let currentPath = [];
// let path = []; //use this in the plugin
//
// function SVGpathToBezierPlugin() {
//     SVGPaths.forEach(function (el) {
//         let newPath = Snap.path.toCubic(el[0]);
//
//         function setUpPoint(segment) {
//             for (let i = 0; i < segment.length; i += 2) {
//                 let point = {};
//                 point.x = segment[i];
//                 point.y = segment[i + 1];
//                 currentPath.push(point);
//                 // $("#logDiv").append("{x: " + point.x + ", y: " + point.y + "}, ")
//             }
//         }
//
//         // $("#logDiv").append("$")
//
//         for (let i = 0; i < newPath.length; i++) {
//             let segment = newPath[i],
//                 point;
//             segment.shift();
//             point = setUpPoint(segment);
//         }
//         path.push(currentPath);
//         currentPath = [];
//     });
// }
