var myobj = new Object;
myobj.category = "Bucha";
myobj.segments = []

var seg1 = new Object;
seg1.start = 7;
seg1.end = 9;
seg1.color = "#ffffff";
seg1.task = "mytask1";

var seg2 = new Object;
seg2.start = 15;
seg2.duration = 9;
seg2.color = "#ffffff";
seg2.task = "mytask2";

myobj.segments.push(seg1);
myobj.segments.push(seg2);