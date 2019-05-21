

processList=[];
pidValues=[];
executed=false;
timeQ = 4;


// UI Class : handles UI tasks

class UI {
    
    static addProcessToList(process) {
        const list = document.querySelector('#process-list');

        const row = document.createElement('tr');

        row.id = `P${process.pid}`;
        row.innerHTML = `
        <td> ${process.pid} </td>
        <td> ${process.name}</td>
        <td> ${process.arrivalTime} </td>
        <td> ${process.burstTime} </td>
        <td><div class="dot" style="background-color:${process.color};"></div></td>
        <td ><a href="#" class = "btn btn-danger delete hide-delete">X</a></td>
        `;


        list.appendChild(row);
    }

    static clearTable(){
        const list = document.querySelector('#process-list');
        list.innerHTML = "";
    }

    static showAlert(message){
        
        document.querySelector('#popup').innerHTML = message;
        $('#overlay').fadeIn(500);
        $('#overlay').fadeOut(500); 
    }

    static clearFields() {
        document.querySelector("#pid").value = nextPid();
        document.querySelector("#process-name").value = '';
        document.querySelector("#arrival-time").value = '';
        document.querySelector("#burst-time").value = '';
    }

    static deleteProcess(element) {
        if (element.classList.contains('delete')) {
            var pid = element.parentElement.parentElement.id.substring(1);
            pid = parseInt(pid,10);
            removeProcess(pid);
            element.parentElement.parentElement.remove();
            //show message
            UI.showAlert('Process removed');
        }
    }

    static hideDeleteColumn(){
        $('#process-table tr > *:nth-child(6)').hide();
        
    }

    static unhideDeleteColumn(){
        $('#process-table tr > *:nth-child(6)').show();
    }

    static animateOne(id,delay,size){
        var segment = $(id);
        segment.delay(delay).animate({width:`${size*2}rem`,opacity:1},"slow");
        

    }

    static animateQ(){
        for(var i=0;i<Process.allProcessTimes.length;i++){
            var id = "#s".concat(i);
            UI.animateOne(id,i*1500,Process.allProcessTimes[i][0])
        }

    }

    static animateRunning(){
        for(var i=0;i<=Process.allProcessTimes.length;i++){
            var id = "#run".concat(i);
            var segment = $(id);
            segment.delay(i*1500).animate({opacity:0.99},1);
        }
    }

    static showStatistics(waitingTime,turnAroundTime){
        $('#waitingTime').html(waitingTime);
        $('#turnATime').html(turnAroundTime);
    }

    static clearStatistics(){
        $('#waitingTime').html("");
        $('#turnATime').html("");
    }

    static updateGanttChart(){
        var htmlStr=""
        var time=0;
        for(var i=0;i<Process.allProcessTimes.length;i++){
            var tempStr = "";
            
            tempStr = tempStr.concat(`<li id=s${i} style="background:${Process.allProcessTimes[i][1]};height:3rem;width:0rem;opacity:0;" class="segment">`);
            tempStr = tempStr.concat(`<ul class="sub-segment-wrapper">`)

            for(var j=0;j<Process.allProcessTimes[i][0];j++){
                time= time+1;

                tempStr = tempStr.concat(`<li style="background:${Process.allProcessTimes[i][1]};color:${invertHex(Process.allProcessTimes[i][1])};height:3rem;width:2rem;opacity:1;" class="sub-segment">${Process.allProcessTimes[i][2]} (${time})</li>`);
            }
            tempStr = tempStr.concat("</ul>")
            tempStr = tempStr.concat("</li>");
            htmlStr = htmlStr.concat(tempStr);
        }
        
       
        
        $("#list").html(htmlStr);
        UI.animateQ();
    }


    static updateCurrentRunning(){
        var htmlStr='';
        for(var i=0;i<Process.allProcessTimes.length;i++){
            if(Process.allProcessTimes[i][2]=="Idle"){
                htmlStr = htmlStr.concat(`<span id=run${i} style="background:${Process.allProcessTimes[i][1]};color:${invertHex(Process.allProcessTimes[i][1])};opacity:0;z-index:${(i+10)*10};"> Processor ${Process.allProcessTimes[i][2]} ...</span>`)
            }
            else{
            htmlStr = htmlStr.concat(`<span id=run${i} style="background:${Process.allProcessTimes[i][1]};color:${invertHex(Process.allProcessTimes[i][1])};opacity:0;z-index:${(i+10)*10};"> Running Process: ${Process.allProcessTimes[i][2]}</span>`)
            }
        }
        var i = Process.allProcessTimes.length;
        htmlStr = htmlStr.concat(`<span id=run${i} style="background:black;color:white;opacity:0;z-index:${(i+10)*10};"> Finished...</span>`)


        $('#current-running').html(htmlStr);
        UI.animateRunning();
    }

    static clearCurrentRunning(){
        $('#current-running').html("");
    }

    static clearGanttChart(){
        $("#list").html("");
    }
}

//Event: clear inputs

document.addEventListener('DOMContentLoaded', UI.clearFields());


//Event: Add a process
document.querySelector('#add').addEventListener('click', (e) => {

    if(executed){
        UI.clearTable();
        processList = [];
        pidValues = [];
        executed = false;
        makeChart([]);
        UI.unhideDeleteColumn();
        UI.clearStatistics();
        
        
    }    

    //get form values
    const pid = document.querySelector("#pid").value.trim();
    const processName = document.querySelector("#process-name").value.trim();
    const arrivalTime = document.querySelector("#arrival-time").value.trim();
    const burstTime = document.querySelector("#burst-time").value.trim();

    //validation
    if (pid == "" || processName == "" || arrivalTime == "" || burstTime == "") {
        // alert("Please fill all the fields!!!");
        UI.showAlert("Please fill all");

    }
    else if(! /^\d+$/.test(pid)){
        UI.showAlert("PID should be a positive integer!");
    }
    else if(pidValues.includes( parseInt(pid,10))){
        UI.showAlert("Duplicate PID value!!!");
    }
    else if(! /^\d+$/.test(arrivalTime)){
        UI.showAlert("invalid arrival time!!!");
    }else if(! /^\d+$/.test(burstTime) || ! /^(?!0*$).*$/.test(burstTime)){
        UI.showAlert("invalid burst time!!!");
    }
    else {

        //instantiate a process
        const process = new Process(parseInt(pid,10),processName, arrivalTime, burstTime);
        // console.log(process);
        processList.push(process);
        pidValues.push(parseInt(pid,10));
        
        UI.addProcessToList(process);
        
        // //show success
        // UI.showAlert('Item Added','success')
        UI.clearFields();
    }
});

//Event remove a process
document.querySelector('#process-list').addEventListener('click', (e) => {
    // console.log(e.target)
    UI.deleteProcess(e.target)

    
});

//run simulation
document.querySelector('#execute').addEventListener('click', (e) => {
    console.log("execute!!!");
    
    runSimulation(processList);
});

//reset process list
document.querySelector('#reset').addEventListener('click', (e) => {
    console.log("reset!!!");
    executed = false;
    makeChart([]);
    processList=[];
    pidValues=[];
    UI.clearFields();
    UI.clearTable();
    UI.unhideDeleteColumn();
    UI.clearGanttChart();
    UI.clearCurrentRunning();
    UI.clearStatistics();
    Process.n =0;
    Process.totalTurnAround = 0;
    Process.totalWaiting = 0;

    
});

document.querySelector('#preset').addEventListener('click', (e) => {
    console.log("loading preset data!!!");
    executed = false;
    makeChart([]);
    processList=[];
    pidValues=[];
    UI.clearTable();
    loadPresetData();
    // console.log(pidValues);
    UI.clearFields();
    UI.unhideDeleteColumn();
    UI.clearGanttChart();
    UI.clearCurrentRunning();
    UI.clearStatistics();
    Process.n =0;
    Process.totalTurnAround = 0;
    Process.totalWaiting = 0;
});

function loadPresetData(){
    process1 = new Process(1,"A",0,8)
    process2 = new Process(2,"B",1,4)
    process3 = new Process(3,"C",4,2)
    process4 = new Process(4,"D",6,2)
    process5 = new Process(5,"E",20,6)
    process6 = new Process(6,"F",30,7)

    processList = [process1,process2,process3,process4,process5,process6];
    
    // console.log(processList);
    for(var i=0;i<processList.length;i++){
        pidValues.push(parseInt(processList[i].pid));
        UI.addProcessToList(processList[i]);
    }

}

//display amChart
function makeChart(finalGraphData,show=false,delayTime=0){
    var chart = $("#chartdiv");
    var chartHelp = $("#chart-help");
    if(show){
        chart.delay(delayTime).animate({opacity:0.99},'slow');
        chartHelp.delay(delayTime).animate({opacity:0.99},'slow');
    }else{
        chartHelp.css('opacity','0');
        chart.css('opacity','0');
    }
    console.log("making chart");
    var chart = AmCharts.makeChart( "chartdiv", {
        "type": "gantt",
        "theme": "dark",
        "marginRight": 70,
        "period": "hh:mm:ss",
        "dataDateFormat":"YYYY-MM-DD",
        "balloonDateFormat": "JJ:NN",
        "columnWidth": 0.5,
        "valueAxis": {
            "type": "timecode"
        },
        "brightnessStep": 10,
        "graph": {
            "fillAlphas": 1,
            "balloonText": "<b>[[task]]</b>: [[open]] [[value]]"
        },
        "rotate": true,
        "categoryField": "category",
        "segmentsField": "segments",
        "colorField": "color",
        "startDate": "00:00:00:00",
        "startField": "start",
        "endField": "end",
        "durationField": "duration",
        "dataProvider": finalGraphData,
        
        "valueScrollbar": {
            "autoGridCount":true
        },
        "chartCursor": {
            "cursorColor":"#55bb76",
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0,
            "valueLineAlpha":0.5,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "zoomable":false,
            "valueZoomable":true
        },
        "export": {
            "enabled": true
         }
    } );
}


function runSimulation(processList){
    console.log("running simulation");

    var userTimeQ =  document.querySelector("#time-quantum").value;


    if (processList.length>0 && !executed){

        if(! /^\d+$/.test(userTimeQ) || ! /^(?!0*$).*$/.test(userTimeQ)){
            UI.showAlert("Time Quantum should be a positive integer!");
            return;
        }
        timeQ = parseInt(userTimeQ,10);
        Process.n =processList.length;
        Process.totalTurnAround = 0;
        Process.totalWaiting = 0;

        $("#current-running").get(0).scrollIntoView();

        myScheduler = new Scheduler(processList,timeQ);
        finalGraphData = myScheduler.processAll();
        UI.updateGanttChart();
        UI.updateCurrentRunning();
        makeChart(finalGraphData,true,1500*(Process.allProcessTimes.length));
        executed = true;
        processList = [];
        pidValues=[];
        UI.clearFields();
        UI.hideDeleteColumn();
        console.log(Process.n);
        console.log(Process.totalTurnAround/Process.n);
        console.log(Process.totalWaiting/Process.n);

        UI.showStatistics(parseFloat(Process.totalWaiting/Process.n).toFixed(3),parseFloat(Process.totalTurnAround/Process.n).toFixed(3));

        Process.allProcessTimes=[];
        Process.allProcessBar= new TimeLineBar("All Processes");
        Process.n =0;
        Process.totalTurnAround = 0;
        Process.totalWaiting = 0;
    }else if(!executed){
        UI.showAlert("No processes added!!");
    }
}

//PID auto increment
function nextPid(){
    if (pidValues.length>0){
        return Math.max(...pidValues)+1;
    }
    return 1;
}

//remove a previously added process
function removeProcess(pid){

    pidValues.splice( $.inArray(pid, pidValues), 1 );
    for(var i=0;i<processList.length;i++){
        if(pid== processList[i].pid){
            processList.splice(i,1)
        }
        
    }
    

}



