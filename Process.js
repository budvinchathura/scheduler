class Process {
    constructor(pid,name, arrivalTime, burstTime) {
        this.pid = pid;
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingTime = burstTime;
        this.waitingTime = 0;
        this.responseTime = 0;
        this.started=false;
        this.timeLineBar = new TimeLineBar(this.name);
        this.currentSegment = null;
        this.color = getRandomColor();
        this.addArrivalIndication();
    }

    execute(time){
        if(!this.started){
            this.responseTime=time;
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

    getWaitingTime(){
        return this.waitingTime;
    }

    responseTime(){
        return this.responseTime;
    }

    burstTime(){
        return this.burstTime;
    }

    getTurnATime(){
        return parseInt(this.burstTime,10) + parseInt(this.waitingTime,10) ;
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
        Process.allProcessBar.segments.push(this.currentSegment);
        Process.allProcessTimes.push([parseInt(endTime,10) - parseInt(this.currentSegment.start,10),this.color,this.name]);
        this.currentSegment = null;
    }

    addArrivalIndication(){
        this.currentSegment = new Segment(this.name,this.arrivalTime,this.color);
        this.currentSegment.duration = 0.2;
        this.timeLineBar.segments.push(this.currentSegment);
        this.currentSegment = null;
    }
}

Process.allProcessTimes=[];
Process.allProcessBar= new TimeLineBar("All Processes");

Process.n = 0;
Process.totalWaiting = 0;
Process.totalTurnAround = 0;

