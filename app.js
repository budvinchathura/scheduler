// FoodItem Class : Represents a food item
// class FoodItem {
//     constructor(name, restaurant, price) {
//         this.name = name;
//         this.restaurant = restaurant;
//         this.price = price;
//     }
// }

processList=[];
pidValues=[];
executed=false;
timeQ = 4;

// UI Class : handles UI tasks

class UI {
    static displayItems() {
        const storedItems = [
            {
                name: 'Item1',
                restaurant: 'rest1',
                price: '666'
            },
            {
                name: 'Item2',
                restaurant: 'rest1',
                price: '$$$'
            }
        ];

        const items = storedItems;
        items.forEach((item) => UI.addItemToList(item));
    }

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
        // const div = document.createElement('div');
        // div.className = `alert alert-${className}`;
        // div.appendChild(document.createTextNode(message));
        // const container = document.querySelector('.container');
        // const onlyrow = document.querySelector('.row');
        // container.insertBefore(div,onlyrow);

        // //vanish in 2 seconds
        // setTimeout(()=>document.querySelector('.alert').remove(),2000);

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
        // console.log(`${size}rem`);
        var segment = $(id);
        console.log(segment);
        segment.animate({width:'10px'},"slow");

    }

    static animateQ(){
        console.log("animatingq");
        for(var i=0;i<Process.allProcessTimes.length;i++){
            var id = "s".concat(i);
            UI.animateOne(id,i*1000,Process.allProcessTimes[i][0],)
        }

    }

    static updateChart(){
        var htmlStr=""
        for(var i=0;i<Process.allProcessTimes.length;i++){
            var tempStr = "";
            
            tempStr = tempStr.concat(`<li id=s${i} style="background:${Process.allProcessTimes[i][1]};height:2rem;width:1rem;" class="segment">`);
            tempStr = tempStr.concat(Process.allProcessTimes[i][2]);
            tempStr = tempStr.concat("</li>");
            htmlStr = htmlStr.concat(tempStr);
        }
        
        // htmlStr = htmlStr.slice(0,-5);
        // console.log(Process.allProcessTimes);
        
        $("#list").html(htmlStr);
        UI.animateQ();
    }
}

//Event: display food items

document.addEventListener('DOMContentLoaded', UI.clearFields());


//Event: Add an item
document.querySelector('#add').addEventListener('click', (e) => {

    if(executed){
        UI.clearTable();
        processList = [];
        pidValues = [];
        executed = false;
        makeChart([]);
        UI.unhideDeleteColumn();
        
        
    }
    

    //get form values
    const pid = document.querySelector("#pid").value;
    const processName = document.querySelector("#process-name").value;
    const arrivalTime = document.querySelector("#arrival-time").value;
    const burstTime = document.querySelector("#burst-time").value;

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

//Event remove an item
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
});

function loadPresetData(){
    process1 = new Process(1,"A",0,8)
    process2 = new Process(2,"B",1,10)
    process3 = new Process(3,"C",4,4)
    process4 = new Process(4,"D",6,2)
    process5 = new Process(5,"E",8,12)
    process6 = new Process(6,"F",12,6)

    processList = [process1,process2,process3,process4,process5,process6];
    
    // console.log(processList);
    for(var i=0;i<processList.length;i++){
        pidValues.push(parseInt(processList[i].pid));
        UI.addProcessToList(processList[i]);
    }

}


function makeChart(finalGraphData){
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
    console.log(processList);

    var userTimeQ =  document.querySelector("#time-quantum").value;

    // if(! /^\d+$/.test(userTimeQ)){
    //     UI.showAlert("Time Quantum should be a positive integer!");
    //     return;
    // }
    // timeQ = parseInt(userTimeQ,10);

    if (processList.length>0 && !executed){

        if(! /^\d+$/.test(userTimeQ) || ! /^(?!0*$).*$/.test(userTimeQ)){
            UI.showAlert("Time Quantum should be a positive integer!");
            return;
        }
        timeQ = parseInt(userTimeQ,10);

        myScheduler = new Scheduler(processList,timeQ);
        finalGraphData = myScheduler.processAll();
        makeChart(finalGraphData);
        UI.updateChart();
        executed = true;
        processList = [];
        pidValues=[];
        UI.clearFields();
        UI.hideDeleteColumn();

        console.log(Process.allProcessTimes);
        Process.allProcessTimes=[];
        Process.allProcessBar= new TimeLineBar("All Processes");
    }else if(!executed){
        UI.showAlert("No processes added!!");
    }
}

function nextPid(){
    if (pidValues.length>0){
        // console.log(Math.max(...pidValues));
        return Math.max(...pidValues)+1;
    }
    return 1;
}

function removeProcess(pid){

    pidValues.splice( $.inArray(pid, pidValues), 1 );
    for(var i=0;i<processList.length;i++){
        if(pid== processList[i].pid){
            processList.splice(i,1)
        }
        
    }
    console.log(processList);
    console.log(pidValues);

}



