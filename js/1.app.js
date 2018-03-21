import '../css/style.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js';
import '../node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js';

import {sceneTwo} from './2.flag.js';
import {sceneThree} from './3.mountain.js';
import {sceneFour} from './4.map-bulgaria.js';
import {sceneFive} from "./5.cave.js";

(function () {

    $(window).on('load', function () {
        $("#loader").fadeOut("fast");
        $("body").css("backgroundColor", "initial")
    });

    let SMController = new ScrollMagic.Controller();

    let scenePageOne = new ScrollMagic.Scene({
        triggerElement: '#first-page',
        triggerHook: .4,
        duration: '100%',
    })
        .on('end', function (event) {
            if (event.scrollDirection === "REVERSE") {
                $('#first-page').velocity("scroll", {duration: 1200, easing: "ease-out"})
            }
        })
        // .addIndicators({
        //     name: 'First Page',
        //     indent: 10,
        //     colorStart: 'green',
        //     colorTrigger: 'white',
        //     colorEnd: 'red'
        // })
        .addTo(SMController);

    sceneTwo(SMController);
    sceneThree(SMController);
    sceneFour(SMController);
    sceneFive(SMController);

    $("#top").on("click", function () {
        SMController.scrollTo("#first-page")
    })

})();
