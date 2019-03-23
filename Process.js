
class Process {
    constructor(name, arrivalTime, burstTime) {
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingTime = burstTime;
        this.waitingTime = 0;
        this.turnATime = 0;
        this.started=false;
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
}
