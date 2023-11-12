class Goose {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    render() {
        fill(this.color);
        ellipse(this.x, this.y, 80, 80);
    }
}
