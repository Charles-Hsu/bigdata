function renderChart() {
  var chart = new CanvasJS.Chart('chartContainer', {
    toolTip: {
      enabled: false //enable here
    },
    title: {
      text: 'Date Time Formatting'
    },
    axisX: {
      valueFormatString: 'MM-DD'
    },
    axisY: {
      valueFormatString: '#,###'
    },

    data: [
      {
        type: 'column',
        color: 'rgba(0,75,141,0.7)',
        dataPoints: [
          { x: new Date(2012, 10, 6), y: 10 },
          { x: new Date(2012, 10, 13), y: 20 },
          { x: new Date(2012, 10, 20), y: 30 },
          { x: new Date(2012, 10, 27), y: 10 },
          { x: new Date(2012, 11, 3), y: 21 },
          { x: new Date(2012, 11, 10), y: 50 },
          { x: new Date(2012, 11, 17), y: 75 },
          { x: new Date(2012, 11, 24), y: 10 },
          { x: new Date(2012, 12, 1), y: 12 },
          { x: new Date(2012, 12, 8), y: 15 },
          { x: new Date(2012, 12, 15), y: 17 },
          { x: new Date(2012, 12, 22), y: 20 },
          { x: new Date(2012, 12, 29), y: 22 },
          { x: new Date(2013, 1, 5), y: 25 },
          { x: new Date(2013, 1, 12), y: 27 },
          { x: new Date(2013, 1, 19), y: 30 }
        ]
      }
    ]
  });
  chart.render();
}



function barColor(green, red, val) {
  if (green < red) {
    // small is good
    if (val <= green) {
      return '#b3ffcc'; // green
    } else if (val < red) {
      return '#ceebfd'; // blue
    } else {
      return '#FF69B4'; // red
    }
  } else {
    // greater is good
    if (val >= green) {
      return '#b3ffcc';
    } else if (val > red) {
      return '#ceebfd';
    } else {
      return '#FF69B4';
    }
  }
  return 'bg-primary';
}

function renderChart1() {

  var dataPoints = [];
  var indexLabels = ['High', 'Low', 'Medium'];
  var colors = ['red', 'green', 'orange'];
  var labels = ['Jan', ' ', ' ', 'Feb', ' ', ' ', 'March', ' ', ' ', ' '];

  var jsonData = [
    { green: 35, red: 80, y: 90 },
    { green: 35, red: 80, y: 40 },
    { green: 35, red: 80, y: 70 },
    { green: 35, red: 80, y: 70 },
    { green: 35, red: 80, y: 50 },
    { green: 35, red: 80, y: 30 },
    { green: 35, red: 80, y: 60 },
    { green: 35, red: 80, y: 50 },
    { green: 35, red: 80, y: 88 }
  ];

  for (var i = 0; i < jsonData.length; i++) {
    dataPoints.push({
      y: jsonData[i].y,
      // label: labels[i],
      label: labels[i],
      // indexLabel: indexLabels[i % indexLabels.length],
      indexLabel: '' + jsonData[i].y,
      color: barColor(jsonData[i].green, jsonData[i].red, jsonData[i].y)
    });
  }

  CanvasJS.addColorSet('customColorSet', colors);

  var chart1 = new CanvasJS.Chart('chartContainer1', {
    animationEnabled: true,
    // colorSet: 'customColorSet',
    theme: 'light2',
    title: {
      text: '當月的支出金額',
      fontColor: "gray",
      // fontWeight: "light",
      // fontStyle: "italic",
    },

    axisY: {
      title: 'Total Count',
      lineThickness: 0,
      tickThickness: 0,
      gridThickness: 0,
      stripLines: [
        {
          value: 0,
          showOnTop: true,
          color: 'gray',
          thickness: 2
        }
      ]
    },
    axisX: {
      lineThickness: 0,
      tickThickness: 0,
      title: 'Months'
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries
    },
    toolTip: {
      shared: true,
      content: toolTipFormatter
    },

    toolTip: {
      enabled: false //enable here
    },

    data: [
      {
        type: 'stackedColumn',
        //indexLabel: "High",

        //indexLabel: "{y}",

        label: 'label',
        indexLabelPlacement: 'outside',
        indexLabelOrientation: 'horizontal',
        //showInLegend: true,
        //color: "gold",
        //name: "Male",
        //indexLabel: "{x}, {y}",
        //indexLabelPlacement: "outside",
        // indexLabelOrientation: "horizontal",
        dataPoints: dataPoints
      }
    ]
  });
  chart1.render();
}

function toolTipFormatter(e) {
  var str = '';
  var total = 0;
  var str3;
  var str2;
  for (var i = 0; i < e.entries.length; i++) {
    var str1 =
      '<span style= "color:' +
      e.entries[i].dataSeries.color +
      '">' +
      e.entries[i].dataSeries.name +
      '</span>: ' +
      e.entries[i].dataPoint.y +
      ' <br/>';
    total = e.entries[i].dataPoint.y + total;
    str = str.concat(str1);
  }
  str2 = '' + e.entries[0].dataPoint.label + ' <br/>';
  //str3 = "<span style = \"color:Tomato\">Total: </span>" + total + "<br/>";
  return str2.concat(str);
}

function toggleDataSeries(e) {
  if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  chart.render();
}
