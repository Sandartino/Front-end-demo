let sceneFive = (function () {

    function init(controller) {
        let tl = new TimelineMax()
            .to("#cave", 1, {scale: 1.3, opacity: 0})
            .to("#cave-t1", 1, {x: "50%"}, 0)
            .to("#cave-t2", 1, {x: "-175%"}, 0)
            .to("#cave-t1, #cave-t2", 1, {opacity: 0});

        let sceneFive = new ScrollMagic.Scene({
            triggerElement: '#fifth-page-cave',
            triggerHook: 0,
            duration: '100%'
        })
            .setPin('#fifth-page-cave', {pushFollowers: false})
            .setTween(tl)
            .on("progress", function (e) {
                if (e.progress >= .5) {
                    $("#and").fadeIn()
                } else {
                    $("#and").fadeOut()
                }
            })
            // .addIndicators({
            //     name: 'Cave Entrance',
            //     indent: 200,
            //     colorTrigger: 'lightBlue',
            //     colorStart: 'orange',
            //     colorEnd: 'red'
            // })
            .addTo(controller);

        //=========================TEXT=========================
        let sceneFiveText = new ScrollMagic.Scene({
            triggerElement: '#fifth-page-text',
            triggerHook: 0,
            duration: '600%'
        })
            .setPin('#fifth-page-text', {pushFollowers: false})
            .on('progress', caveTextInit)
            .on('leave', function () {
                TweenMax.to("#cave-particles, #cave-ray", 1, {opacity: 0});
                tlParticles.stop()
            })
            // .addIndicators({
            //     name: 'Cave Text',
            //     indent: 100,
            //     colorTrigger: 'bisque',
            //     colorStart: 'lightGreen',
            //     colorEnd: 'red'
            // })
            .addTo(controller);

        let tlParticles = new TimelineMax({paused: true})
            .to("#cave-particles", 350, {rotation: 360, repeat: -1, easy: Power0.easeNone});

        function caveTextInit(event) {
            let progress = event.progress.toFixed(2);

            if (progress >= .17) {
                $("#cave-text h1:nth-of-type(1)").css("opacity", 1);
            }
            if (progress < .17) {
                $("#cave-text h1:nth-of-type(1)").css("opacity", 0);
            }
            if (progress >= .34) {
                $("#cave-text h1:nth-of-type(2)").css("opacity", 1);
            }
            if (progress < .34) {
                $("#cave-text h1:nth-of-type(2)").css("opacity", 0);
            }
            if (progress >= .5) {
                $("#cave-text h1:nth-of-type(3)").css("opacity", 1);
            }
            if (progress < .5) {
                $("#cave-text h1:nth-of-type(3)").css("opacity", 0);
            }
            if (progress >= .6) {
                TweenMax.to("#cave-particles, #cave-ray", 1, {opacity: 1});
                tlParticles.play()
            }
            if (progress >= .8) {
                TweenMax.to("#end", 1, {x: "0%"})
            }
            if (progress < .8) {
                TweenMax.to("#end", 1, {x: "-100%"})
            }
        }

    }

    return init;
})();

export {sceneFive}