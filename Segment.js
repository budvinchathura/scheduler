class Segment{
    constructor(name,startTime,color){
        this.task=name;
        this.start = parseInt( startTime,10);
        this.end = null;
        this.color = color;
    }
}