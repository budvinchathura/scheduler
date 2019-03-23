// import Process from './Process.js';
// import Scheduler from './Scheduler.js';
var process1 = new Process('A',0,7);
var process2 = new Process('B',5,5);
var process3 = new Process('C',7,10);

processList = [process1,process2,process3];
myScheduler = new Scheduler(processList,4);
myScheduler.processAll();
