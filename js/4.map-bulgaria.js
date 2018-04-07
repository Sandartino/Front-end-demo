import MapBulgaria from './4.MapBulgaria.js';
import Masonry from 'masonry-layout';
import ImagesLoaded from 'imagesloaded'

let imgPaths = require.context('../assets/img/towns', true);

let sceneFour = (function () {
    function init(controller) {
        let sceneFour = new ScrollMagic.Scene({
            triggerElement: '#fourth-page-scroll',
            triggerHook: 1,
            duration: "1000%",
        })
            .setPin('#fourth-page', {pushFollowers: false})
            .on('enter', mapBulgariaInit)
            .on('end', mapBulgariaOff)
            .on('leave', resetContent)
            .setTween(TweenMax.to("#pathWay", 1, {strokeDashoffset: 0}))
            // .addIndicators({
            //     name: 'Fourth Page',
            //     colorTrigger: 'green',
            //     colorStart: 'yellow',
            //     colorEnd: 'red'
            //
            // })
            .addTo(controller);

        const SCROLL_OFFSET = 18;

        let gridImages = document.querySelector('.grid'),
            imgNodes = $(".grid .grid-item img").get(),
            fourthPage = $("#fourth-page"),
            pathWay = $("#pathWay"),
            msnry;

        let townsCoordinates = new Map([
            ["sofia", 425],
            ["plovdiv", 358],
            ["burgas", 242],
            ["varna", 197],
            ["tarnovo", 107]
        ]);

        let mapBulgaria = new MapBulgaria(townsCoordinates, SCROLL_OFFSET);

        ImagesLoaded(gridImages, function () {
            msnry = new Masonry(gridImages, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                gutter: 3,
                percentPosition: true
            });
        });

        gridImages.addEventListener('click', function (event) {
            event.target.parentNode.classList.toggle('grid-item--clicked');
            msnry.layout();
        });

        let tlArrows = new TimelineMax({paused: true, repeat: -1, repeatDelay: 4})
            .staggerTo(".up", .3, {attr: {fill: "black"}}, .5)
            .staggerTo(".down", .3, {attr: {fill: "black"}}, .5, 0)
            .set(".up, .down", {attr: {fill: "white"}}, 1.6);

        function mapBulgariaInit() {
            $(window).on("wheel scroll", function () {
                mapBulgaria.townName = pathWay.css("stroke-dashoffset");
                mapBulgaria.changeContent(imgNodes, imgPaths);
                ImagesLoaded(gridImages).on('progress', function (_, img) {
                    $(img.img).css("opacity", 1);
                    msnry.layout()
                });
                //town coordinates
                // console.log(pathWay.css("stroke-dashoffset"));
            });

            $("#up").on('click', function () {
                $('#third-page').velocity("scroll")
            });
            $("#down").on('click', function () {
                $('#fifth-page-cave').velocity("scroll")
            });

            tlArrows.play();
        }

        function mapBulgariaOff(event) {
            if (event.scrollDirection === "REVERSE") {
                $('#fourth-page-helper').velocity("scroll", {offset: fourthPage.height() * -1});
                $('#fourth-page-scroll').velocity("scroll", {offset: fourthPage.height() * -1});
            }
        }

        function resetContent() {
            pathWay.css("stroke-dashoffset", townsCoordinates.get("sofia"));
            mapBulgaria.town = "sofia";
            mapBulgaria.changeContent(imgNodes, imgPaths);
            ImagesLoaded(gridImages).on('progress', function (_, img) {
                $(img.img).css("opacity", 1);
                msnry.layout()
            });
            $(window).off('wheel scroll');
            tlArrows.stop()
        }

        (function pathPrepareDraw(el) {
            let lineLength = el[0].getTotalLength();
            el.css('stroke-dasharray', lineLength);
            el.css('stroke-dashoffset', lineLength)
        })(pathWay);

    }

    return init;
})();

export {sceneFour}