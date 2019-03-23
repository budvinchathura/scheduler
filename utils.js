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
    "dataProvider": [
        
    //     {
    //     "category": "Sadness",
    //     "segments": [ {
    //         "start": 0,
    //         "duration": 10,
    //         "color": "#727d6f",
            
    //     }, ]
    // },
    
    
    {
        "category": "Menacing",
        "segments": [ {
            "start": 10,
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 1,
            "color": "#8dc49f",
            "task": "Task #3"
        }, {
            "duration": 4,
            "color": "#46615e",
            "task": "Task #1"
        } ]
    }, {
        "category": "Ben",
        "segments": [ {
            "start": 12,
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "start": 16,
            "duration": 2,
            "color": "#FFE4C4",
            "task": "Task #4"
        } ]
    }, {
        "category": "Mike",
        "segments": [ {
            "start": 9,
            "duration": 6,
            "color": "#46615e",
            "task": "Task #1"
        }, {
            "duration": 4,
            "color": "#727d6f",
            "task": "Task #2"
        } ]
    }, {
        "category": "Lenny",
        "segments": [ {
            "start": 8,
            "duration": 1,
            "color": "#8dc49f",
            "task": "Task #3"
        }, {
            "duration": 4,
            "color": "#46615e",
            "task": "Task #1"
        } ]
    }, {
        "category": "Scott",
        "segments": [ {
            "start": 15,
            "duration": 3,
            "color": "#727d6f",
            "task": "Task #2"
        } ]
    }, {
        "category": "Julia",
        "segments": [ {
            "start": 9,
            "duration": 2,
            "color": "#46615e",
            "task": "Task #1"
        }, {
            "duration": 1,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 8,
            "color": "#8dc49f",
            "task": "Task #3"
        } ]
    }, {
        "category": "Bob",
        "segments": [ {
            "start": 9,
            "duration": 8,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 7,
            "color": "#8dc49f",
            "task": "Task #3"
        } ]
    }, {
        "category": "Kendra",
        "segments": [ {
            "start": 11,
            "duration": 8,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "start": 16,
            "duration": 2,
            "color": "#FFE4C4",
            "task": "Task #4"
        } ]
    }, {
        "category": "Tom",
        "segments": [ {
            "start": 9,
            "duration": 4,
            "color": "#46615e",
            "task": "Task #1"
        }, {
            "duration": 3,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 5,
            "color": "#8dc49f",
            "task": "Task #3"
        } ]
    }, {
        "category": "Kyle",
        "segments": [ {
            "start": 6,
            "duration": 3,
            "color": "#727d6f",
            "task": "Task #2"
        } ]
    }, {
        "category": "Anita",
        "segments": [ {
            "start": 12,
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "start": 16,
            "duration": 2,
            "color": "#FFE4C4",
            "task": "Task #4"
        } ]
    }, {
        "category": "Jack",
        "segments": [ {
            "start": 8,
            "duration": 10,
            "color": "#46615e",
            "task": "Task #1"
        }, {
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        } ]
    }, {
        "category": "Kim",
        "segments": [ {
            "start": 12,
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 3,
            "color": "#8dc49f",
            "task": "Task #3"
        } ]
    }, {
        "category": "Aaron",
        "segments": [ {
            "start": 18,
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 2,
            "color": "#FFE4C4",
            "task": "Task #4"
        } ]
    }, {
        "category": "Alan",
        "segments": [ {
            "start": 17,
            "duration": 2,
            "color": "#46615e",
            "task": "Task #1"
        }, {
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 2,
            "color": "#8dc49f",
            "task": "Task #3"
        } ]
    }, {
        "category": "Ruth",
        "segments": [ {
            "start": 13,
            "duration": 2,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "duration": 1,
            "color": "#8dc49f",
            "task": "Task #3"
        }, {
            "duration": 4,
            "color": "#46615e",
            "task": "Task #1"
        } ]
    }, {
        "category": "Simon",
        "segments": [ {
            "start": 10,
            "duration": 3,
            "color": "#727d6f",
            "task": "Task #2"
        }, {
            "start": 17,
            "duration": 4,
            "color": "#FFE4C4",
            "task": "Task #4"
        } ]
    } ],
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