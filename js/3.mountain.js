let sceneThree = (function () {
    function init(controller) {
        TweenMax.set('#third-page, #scroll-text', {perspective: 200});
        let tlLine = new TimelineMax()
                .to("#rock", 1, {z: 25})
                .to("#mountain", 1, {z: 4}, 0)
                .to("#scroll-line line", 1, {attr: {y2: 0}}, 0),
            tlText = new TimelineMax({paused: true, repeat: -1, repeatDelay: 2})
                .staggerTo("#scroll-text li", .4, {rotationY: 360}, .3),
            tlTitle = new TimelineMax({paused: true})
                .to("#third-page-title", 2, {opacity: 1, bottom: "29vw"});

        let sceneThree = new ScrollMagic.Scene({
            triggerElement: '#third-page-scroll',
            triggerHook: 1,
            duration: '300%'
        })
            .setPin('#third-page', {pushFollowers: false})
            .on('enter', mountainInit)
            .on('leave', mountainOff)
            .setTween(tlLine)
            // .addIndicators({
            //     name: 'Third Page',
            //     indent: 200,
            //     colorTrigger: 'lightGreen',
            //     colorStart: 'blue',
            //     colorEnd: 'red'
            // })
            .addTo(controller);

        function mountainInit() {
            //COMPASS
            let arrow = $("#arrow");
            let offset = arrow.offset();
            sceneThree.on("progress", function () {
                offset = $("#arrow").offset()
            });

            function mouse(evt) {
                let center_x = (offset.left) + (arrow.width() / 2);
                let center_y = (offset.top) + (arrow.height() / 2);
                let mouse_x = evt.pageX;
                let mouse_y = evt.pageY;
                let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
                let degree = (radians * (180 / Math.PI) * -1) + 165;
                arrow.css('-moz-transform', 'rotate(' + degree + 'deg)');
                arrow.css('-webkit-transform', 'rotate(' + degree + 'deg)');
                arrow.css('-o-transform', 'rotate(' + degree + 'deg)');
                arrow.css('-ms-transform', 'rotate(' + degree + 'deg)');
            }

            $('#third-page').mousemove(mouse);

            tlTitle.play();
            tlText.play();
        }

        function mountainOff(event) {
            if (event.scrollDirection === "FORWARD") {
                $('#fourth-page').velocity("scroll", {duration: 1200, easing: "ease-out"})
            }
            else if (event.scrollDirection === "REVERSE") {
                $('#second-page').velocity("scroll", {duration: 1200, easing: "ease-out"});
                tlTitle.reverse()
            }
            tlText.stop()
        }

    }

    return init
})();

export {sceneThree}