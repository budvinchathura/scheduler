
class Process {
    constructor(pid,name, arrivalTime, burstTime) {
        this.pid = pid;
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingTime = burstTime;
        this.waitingTime = 0;
        this.turnATime = 0;
        this.started=false;
        this.timeLineBar = new TimeLineBar(this.name);
        this.currentSegment = null;
        this.color = getRandomColor();
        this.addArrivalIndication();
    }

    execute(time){
        if(!this.started){
            this.turnATime=time;
            this.started=true;
        }
        console.log(this.name);
        this.remainingTime--;
    }

    waitOne(){
        this.waitingTime++;
    }

    getArrivalTime(){
        return this.arrivalTime;
    }

    getRemainingTime(){
        return this.remainingTime;
    }

    waitingTime(){
        return this.waitingTime;
    }

    turnATime(){
        return this.turnATime;
    }

    burstTime(){
        return this.burstTime;
    }

    getTimeLineBar(){
        return this.timeLineBar;
    }

    startSegment(startTime){
        this.currentSegment = new Segment(this.name,startTime,this.color);
    }

    endSegment(endTime){
        this.currentSegment.end = endTime;
        this.timeLineBar.segments.push(this.currentSegment);
        this.currentSegment = null;
    }

    addArrivalIndication(){
        this.currentSegment = new Segment(this.name,this.arrivalTime,this.color);
        this.currentSegment.duration = 0.2;
        this.timeLineBar.segments.push(this.currentSegment);
        this.currentSegment = null;
    }
}
