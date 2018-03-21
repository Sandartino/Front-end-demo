export default class MapBulgaria {
    constructor(towns, offset) {
        this.towns = towns;
        this.offset = offset;
        this.town = "sofia";
        this.currentTown = this.town;
    }

    get townName() {
        return this.town
    }

    set townName(coordinates) {
        coordinates = parseInt(coordinates.split('.')[0]);
        let minCoordinates = coordinates - this.offset,
            maxCoordinates = coordinates + this.offset;

        for (let [name, townCoordinates] of this.towns) {
            if (townCoordinates >= minCoordinates && townCoordinates <= maxCoordinates) {
                this.town = name;
            }
        }
    }

    changeContent(imgNodes, imgPaths) {
        if (this.currentTown !== this.town) {
            $(imgNodes).css("opacity", "0.7");
            for (let i = 0; i < imgNodes.length; i++) {
                $(imgNodes[i]).attr("src", imgPaths(`./${this.town + i}.jpg`))
            }
            $("#" + this.town).toggle();
            $("#" + this.currentTown).toggle();
            this.currentTown = this.town;
        }
    }

}
