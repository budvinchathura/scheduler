class Scheduler{
    constructor(processList,q){
        this.processMap = new Object();
        this.processQueue = new Array();
        this.q=q;
        this.tempProcess=null;
        this.tempTime=0;
        this.graphData=[];
        this.currentIdlePeriod = 0;

        for(var i in processList){
            
            this.tempProcess=processList[i];
            this.tempTime ="t" +this.tempProcess.getArrivalTime().toString();
            if(this.processMap.hasOwnProperty(this.tempTime)){
                this.processMap[this.tempTime].push(this.tempProcess);
            }else{
                this.processMap[this.tempTime] = new Array();
                this.processMap[this.tempTime].push(this.tempProcess);
            }
        }
    }

    waitOthers(time){
        if (this.processQueue.length==0){
            return
        }else{
            for(var i=0;i<this.processQueue.length;i++){
                this.processQueue[i].waitOne();
            }
        }
    }

    processAll(){
        var rem = this.q;
        var current = null;
        var i=0;
        while(true){
            // console.log(i);

            //check for incoming processes on current clock cycle
            var stri = "t"+i.toString();
            if(this.processMap.hasOwnProperty(stri)){
                var tempList = this.processMap[stri];
                
                delete this.processMap[stri];

                while(tempList.length>0){
                    this.processQueue.push(tempList.shift())
                }
                
            }
            if(current != null){
                if(rem !=0){
                    this.waitOthers();
                    current.execute(i);

                    //end of a process
                    if(current.getRemainingTime() ==0){
                        current.endSegment(i+1);
                        // console.log(JSON.stringify(current.getTimeLineBar()));
                        this.graphData.push(current.getTimeLineBar());
                        rem=this.q;
                        current=null;
                    }else{
                        rem--;
                    }
                }else{
                    
                    rem=this.q;
                    if(this.processQueue.length>0){
                        //process preempting
                        current.endSegment(i)
                        this.processQueue.push(current);
                        current = this.processQueue.shift();
                        current.startSegment(i);
                    }
                    
                    
                    this.waitOthers();
                    current.execute(i);

                    //end of a process
                    if(current.getRemainingTime() ==0){
                        current.endSegment(i+1);
                        // console.log(JSON.stringify(current.getTimeLineBar()));
                        this.graphData.push(current.getTimeLineBar());
                        rem=this.q;
                        current=null;
                    }else{
                        rem--;
                    }
                }
            }else{
                if(this.processQueue.length>0){
                    if(this.currentIdlePeriod>0){
                        Process.allProcessTimes.push([this.currentIdlePeriod,"#000000","Idle"]);
                        this.currentIdlePeriod = 0;
                    }
                    current = this.processQueue.shift();
                    this.waitOthers();
                    current.execute(i);
                    current.startSegment(i);

                    //end of a process
                    if(current.getRemainingTime() ==0){
                        current.endSegment(i+1);
                        this.graphData.push(current.getTimeLineBar());
                        rem=this.q;
                        current=null;
                    }else{
                        rem--;
                    }
                }else{
                    if(Object.keys(this.processMap).length>0){
                        console.log("Idle...");
                        this.currentIdlePeriod++;
                    }else{
                        console.log("Finished !");
                        // console.log(this.processMap);
                        // this.graphData.push(Process.allProcessBar);
                        this.currentIdlePeriod =0;
                        return this.graphData;
                    }
                }
            }
            i++;
        }
    }
}