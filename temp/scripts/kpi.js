function refreshTodayKpis() {

  axios
    .get(host + '/kpi/list')
    .then(function (response) {
      let _html = generateSuccessHTMLOutput(response);
      $('#kpiTableBody').html(_html);
    })
    .catch(function (error) {
      $('#getResult1').html(generateErrorHTMLOutput(error));
    });
}

function generateSuccessHTMLOutput(response) {

  _g_currentKPIs = response.data.result;

  let _html = drawKpiTable();

  console.log(_html);

  return _html;

}

function generateErrorHTMLOutput(error) {
  return (
    '<h4>Result</h4>' +
    '<h5>Message:</h5>' +
    '<pre>' +
    error.message +
    '</pre>' +
    '<h5>Status:</h5>' +
    '<pre>' +
    // error.response.status +
    ' ' +
    // error.response.statusText +
    '</pre>' +
    '<h5>Headers</h5>' +
    '<pre>' +
    // JSON.stringify(error.response.headers, null, '\t') +
    '</pre>' +
    '<h5>Data</h5>' +
    '<pre>' +
    // JSON.stringify(error.response.data, null, '\t') +
    '</pre>'
  );
}


function drawKpiTable() {

  // let kpis = _g_currentKPIs

  let _html = '';

  $.each(_g_currentKPIs, function (i, item) {

    let json = JSON.stringify(item, null, '\t');
    console.log('<' + i + '>' + json);

    // item.i = '<input type="radio" name="kpi" />';

    let a = parseFloat(item.A);
    let b = parseFloat(item.B);
    let c = parseFloat(item.C);
    let d = parseFloat(item.D);
    let e = parseFloat(item.E);
    let f = parseFloat(item.F);
    let g = parseFloat(item.G);
    let express = item.Func;
    let val = '?';

    try {
      val = eval(express);
    } catch (e) {
      console.log('err');
      if (e instanceof SyntaxError) {
        alert(e.message);
        val = NaN;
      }
    }

    if (isNaN(val)) {
      val = '?';
    }

    bg_class = bgClass(item.Green, item.Red, val);
    kpiRowTdHtml = genKpiRowTdHtml(item, val);

    // html = html +
    // '<tr onclick="enableUpdButtons(this)" class="' +
    // bg_class +
    //   ' kpi-item-row">' +
    //   kpiRowTdHtml
    //   +
    //   '</tr>';

    _html = _html +
      '<tr onclick="enableUpdButtons(this)" ' +
      ' class="' + bg_class +
      ' kpi-item-row">' +
      kpiRowTdHtml +
      '</tr>';


    // console.log(_html);
  });

  // console.log(_html);

  return _html;
}

function genKpiRowTdHtml(item, val) {
  // return '<td>' + item.i + '</td>';
  // item.i = '<input type="radio" name="kpi" />';
  return '<td>' +
    '<input type="radio" name="kpi" />' +
    '</td>' +
    '<td>' +
    item.Cat +
    '</td>' +
    '<td>' +
    item.Item +
    '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.Func + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.A + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.B + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.C + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.D + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.E + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.F + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.G + '</td>' +
    '<td class="d-none">' + item.A_ + '</td>' +
    '<td class="d-none">' + item.B_ + '</td>' +
    '<td class="d-none">' + item.C_ + '</td>' +
    '<td class="d-none">' + item.D_ + '</td>' +
    '<td class="d-none">' + item.E_ + '</td>' +
    '<td class="d-none">' + item.F_ + '</td>' +
    '<td class="d-none">' + item.G_ + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.Green + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.Red + '</td>' +
    '<td>' + val + '</td>';
}

function bgClass(green, red, val) {
  console.log(green);
  console.log(red);
  console.log(val);
  if (green < red) {
    // small is good
    if (val <= green) {
      return 'd-sm-table-row bg-success text-light';
    } else if (val < red) {
      return 'd-sm-table-row text-secondary';
    } else {
      return 'bg-danger text-light';
    }
  } else {
    // greater is good
    if (val >= green) {
      return 'd-none d-sm-table-row bg-success text-light';
    } else if (val > red) {
      return 'd-none d-sm-table-row text-secondary';
    } else {
      return 'bg-danger text-light';
    }
  }
  return 'bg-primary';
}


$('#newItem').click(function () {

  console.log($('#cat').val());
  console.log($('#item').val());
  console.log($('#func').val());
  console.log($('#green').val());
  console.log($('#red').val());
  console.log($('#val').val());

  // 欄位
  console.log(_g_kpiItemCounter);

  let a = $('#aPost').val();

  if (a == null) {
    alert('至少需要一個欄位');
    return;
  }

  if (a.lenght == 0) {
    alert('欄位名稱不可為空白');
    return;
  }

  let b = $('#bPost').val();
  let c = $('#cPost').val();
  let d = $('#dPost').val();
  let e = $('#ePost').val();
  let f = $('#fPost').val();
  let g = $('#gPost').val();

  if (b == null) {
    b = '?';
  } else if (b.length == 0) {
    alert('欄位名稱不可為空白');
    return;
  }

  if (c == null) {
    c = '?';
  } else if (c.length == 0) {
    alert('欄位名稱不可為空白');
    return;
  }

  if (d == null) {
    d = '?';
  } else if (d.length == 0) {
    alert('欄位名稱不可為空白');
    return;
  }

  if (e == null) {
    e = '?';
  } else if (e.length == 0) {
    alert('欄位名稱不可為空白');
    return;
  }

  if (f == null) {
    f = '?';
  } else if (f.length == 0) {
    alert('欄位名稱不可為空白');
    return;
  }

  if (g == null) {
    g = '?';
  } else if (g.length == 0) {
    alert('欄位名稱不可為空白');
    return;
  }

  calKpiVal();

  axios
    .post(host + '/kpi/post', {
      cat: $('#cat').val(),
      item: $('#item').val(),
      func: $('#func').val(),

      a: a,
      b: b,
      c: c,
      d: d,
      e: e,
      f: f,
      g: g,

      // a: $('#kpi-item-1').val(),
      // b: $('#kpi-item-2').val(),
      // c: $('#kpi-item-3').val(),
      // d: $('#kpi-item-4').val(),
      // e: $('#kpi-item-5').val(),
      // f: $('#kpi-item-6').val(),
      // g: $('#kpi-item-7').val(),

      green: $('#green').val(),
      red: $('#red').val(),
      val: $('#val').val(),
    })
    .then(function (response) {
      // alert(response)
      refreshTodayKpis();
    })
    .catch(function (error) {
      alert(error)
    })
});


function calKpiVal() {
  // console.log(kpiItemCounter);
  console.log($('#func').val());
  var func = $('#func').val().toLowerCase();
  var a = parseFloat($('#kpi-val-1').val());
  var b = parseFloat($('#kpi-val-2').val());
  var c = parseFloat($('#kpi-val-3').val());
  var d = parseFloat($('#kpi-val-4').val());
  var e = parseFloat($('#kpi-val-5').val());
  var f = parseFloat($('#kpi-val-6').val());
  var g = parseFloat($('#kpi-val-7').val());
  var kpiResult = eval(func);
  $('#kpiResult').val(kpiResult);
  console.log(kpiResult);
  return kpiResult;
}

function enableUpdButtons(x) {
  // var c = x.checked
  console.log("Row index is: " + x.rowIndex);
  // console.log(c)
  // var idx = x.rowIndex - 1;
  _g_currentRowIndex = x.rowIndex - 1;
  $('#btnUpdate').prop('disabled', false);
  $('#btnDelete').prop('disabled', false);

  // var rowCount = $('#kpiTableBody tr').length;
  // console.log('rowCount: ' + rowCount);

  // console.log("idx: " + idx);


  // currentRow = x;
  // console.log(currentRow.cells[1].innerText);

}