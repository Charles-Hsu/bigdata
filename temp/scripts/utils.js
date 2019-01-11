
function setupDateTime() {
  // Get the current year for the copyright
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  // var today = dd + '/' + mm + '/' + yyyy;

  $('#year').text(yyyy);
  $('#today').text(yyyy + '/' + mm + '/' + dd);
}

$('#btnAddItem').click(function () {

  if (_g_kpiItemCounter > 7) {
    alert("只能有 7 個欄位");
    return false;
  }

  $('#TextBoxGroup').append(generateHtmlforItemAndVal(_g_kpiItemCounter));
  _g_kpiItemCounter++;
});

$("#btnRemoveItem").click(function () {
  if (_g_kpiItemCounter == 1) {
    alert("至少需要一個欄位");
    return false;
  }

  _g_kpiItemCounter--;

  $("#TextBoxDiv" + _g_kpiItemCounter).remove();

});

function generateHtmlforItemAndVal(i) {
  var htmlForKpiItem = '<div class="row" id="TextBoxDiv' + i + '">' +
    '<div class="form-group col-1 float-right"/>' +
    '<div class="form-group col-1 float-right align-self-center">' +
    '&#' + (97 + i - 1) + ';&nbsp&nbsp=' +
    '</div>' +
    '<div class="form-group col-6">' +
    ' <input id="kpi-item-' + i + '" class="form-control input-group-lg reg_name" type="text" placeholder="名稱 ' + i + '" /> ' +
    '</div>';
  return htmlForKpiItem;
}

