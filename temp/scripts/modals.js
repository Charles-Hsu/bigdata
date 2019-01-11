$('#btnUpdate').click(function () {
  createUpdateModal();
});

$('#btnDelete').click(function () {
  createDeleteModal();
})

function createUpdateModal() {

  console.log(_g_currentRowIndex);

  var i = _g_currentRowIndex;
  var kpis = _g_currentKPIs[i];

  i = 0;
  var c = String.fromCharCode("a".charCodeAt(0) + i);

  var html = "";

  html += '<div class="modal-dialog">';
  html += '  <div class="modal-content">';
  html += '    <div class="modal-header">';
  html += '      <h5 class="modal-title" id="modalUpdateKpiTitle">更新監控數據</h5>';
  html += '      <button class="close" data-dismiss="modal">';
  html += '        <span>&times;</span>';
  html += '      </button>';
  html += '    </div>';
  html += '    <div class="modal-body">';
  html += '      <form>';
  html += '        <div class="form-group">';
  html += '          <label>類別</label>';
  html += '          <input type="text" id="catUpdate" class="form-control" readonly />';
  html += '        </div>';
  html += '        <div class="form-group">';
  html += '          <label>名稱</label>';
  html += '          <input id="nameUpdate" type="text" class="form-control" readonly />';
  html += '        </div>';
  html += '        <div class="form-group">';
  html += '          <label for="email">評量方法</label>';
  html += '          <input id="funcUpdate" type="email" class="form-control" placeholder="計算公式" />';
  html += '        </div>';
  html += '        <div class="form-group">';
  html += '          <label for="email">欄位</label>';

  // i = 0;
  // var c = String.fromCharCode("a".charCodeAt(0) + i);
  var c = String.fromCharCode("a".charCodeAt(0));

  for (var i = 0; i < 7; i++) {
    var c = String.fromCharCode("a".charCodeAt(0) + i);
    html += '          <div class="form-row form-group">';
    html += '            <div class="col-1 text-right">' + c + '</div>';
    html += '            <div class="col">';
    html += '              <input id="_' + c + 'Update" readonly class="form-control" />';
    html += '            </div>';
    html += '            <div class="col">';
    html += '              <input id="' + c + 'Update" class="form-control" />';
    html += '            </div>';
    html += '          </div>';
  }
  html += '        </div>';

  html += '        <div class="form-group">';
  html += '          <label>綠燈</label>';
  html += '          <input id="greenUpdate" class="form-control" placeholder="低於或高於的監控數值為安全狀態" />';
  html += '        </div>';

  html += '        <div class="form-group">';
  html += '          <label>紅燈</label>';
  html += '          <input id="redUpdate" class="form-control" placeholder="低於或高於的監控數值為安全狀態" />';
  html += '        </div>';

  html += '      </form>';
  html += '    </div>';

  html += '    <div class="modal-footer">';
  html += '      <button class="btn-secondary btn-block" data-dismiss="modal" id="updateModalConfirm">';
  html += '        確 認 修 改';
  html += '      </button>';
  html += '    </div>';

  html += '  </div>';
  html += '</div>';

  $('#updateModal').html(html)

  var C = c.toUpperCase();

  console.log(C);
  console.log(kpis[C]);
  console.log(kpis[C + '_']);
  console.log(kpis['Item']);
  // $('#funcUpdate').html(kpis['Func']);
  $('#catUpdate').val(kpis['Cat']);
  $('#nameUpdate').val(kpis['Item']);
  $('#funcUpdate').val(kpis['Func']);

  for (var i = 0; i < 7; i++) {
    c = String.fromCharCode("a".charCodeAt(0) + i);
    C = c.toUpperCase();
    $('#_' + c + 'Update').val(kpis[C + '_']);
    if (kpis[C + '_'].length != 0) {
      $('#' + c + 'Update').val(kpis[C]);
    }
  }

  $('#greenUpdate').val(kpis['Green']);
  $('#redUpdate').val(kpis['Red']);

  $('#updateModalConfirm').click(function () {

    var i = _g_currentRowIndex;
    var kpis = _g_currentKPIs[i];

    axios
      .post(host + '/kpi/update', {
        cat: kpis['Cat'],
        item: kpis['Item'],
        func: $('#funcUpdate').val(),
        a: $('#aUpdate').val(),
        b: $('#bUpdate').val(),
        c: $('#cUpdate').val(),
        d: $('#dUpdate').val(),
        e: $('#eUpdate').val(),
        f: $('#fUpdate').val(),
        g: $('#gUpdate').val(),
        green: $('#greenUpdate').val(),
        red: $('#redUpdate').val(),
      }).then(function (response) {
        refreshTodayKpis();
      }).catch(function (error) {
      });
  })

}


function createDeleteModal() {

  var html = "";

  html += '<div class="modal-dialog">';
  html += '  <div class="modal-content">';
  html += '    <div class="modal-header">';
  html += '      <h5 class="modal-title" id="modalDeleteKpiTitle">刪除監控數據</h5>';
  html += '      <button class="close" data-dismiss="modal">';
  html += '        <span>&times;</span>';
  html += '      </button>';
  html += '    </div>';
  html += '    <div class="modal-body">';
  html += '      <form>';
  html += '        <div class="form-group">';
  html += '          <label>類別</label>';
  html += '          <input type="text" id="catDelete" class="form-control" readonly />';
  html += '        </div>';
  html += '        <div class="form-group">';
  html += '          <label>名稱</label>';
  html += '          <input id="nameDelete" type="text" class="form-control" readonly />';
  html += '        </div>';
  html += '        <div class="form-group">';
  html += '          <label for="email">評量方法</label>';
  html += '          <input id="funcDelete" type="email" class="form-control" readonly placeholder="計算公式" />';
  html += '        </div>';
  html += '      </form>';
  html += '    </div>';
  html += '    <div class="modal-footer">';
  html += '      <button class="btn-secondary btn-block" data-dismiss="modal" id="deleteModalConfirm">';
  html += '        確 認 刪 除';
  html += '      </button>';
  html += '    </div>';
  html += '  </div>';
  html += '</div>';

  $('#deleteModal').html(html)

  var i = _g_currentRowIndex;
  var kpis = _g_currentKPIs[i];

  $('#catDelete').val(kpis['Cat']);
  $('#nameDelete').val(kpis['Item']);
  $('#funcDelete').val(kpis['Func']);

  $('#deleteModalConfirm').click(function () {
    var i = _g_currentRowIndex;
    var kpis = _g_currentKPIs[i];
    axios
      .post(host + '/kpi/delete', {
        cat: kpis['Cat'],
        item: kpis['Item']
      }).then(function (response) {
        refreshTodayKpis();
      }).catch(function (error) {
      });
  })


}


// $('#deleteModalConfirm').click(function () {
//   var i = _g_currentRowIndex;
//   var kpis = _g_currentKPIs[i];
//   // $('#catDelete').val(kpis['Cat']);
//   // $('#nameDelete').val(kpis['Item']);
//   // var cat = currentRow.cells[1].innerText;
//   // var item = currentRow.cells[2].innerText;
//   axios
//     .post(host + '/kpi/delete', {
//       cat: kpis['Cat'],
//       item: kpis['Item']
//     }).then(function (response) {
//       // alert(response.status + ' ' + response.statusText);
//       refreshTodayKpis();
//     }).catch(function (error) {
//       // alert(error.response.status + ' ' + error.message);
//     });
//   // alert('updateModalConfirm');
// })
