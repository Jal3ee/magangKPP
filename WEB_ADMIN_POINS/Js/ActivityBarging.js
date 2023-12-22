
$(document).ready(function () {
    loadData();
    /*loadDetail();*/
    /*kendo.bind($("#form"), viewModel);*/

})
function GetDataActivityBarging() {
    //var obj = {
    //    startDate: start,
    //    endDate: end
    //}

    $.ajax({
        type: "post",
        url: $("#web_link").val() + "/api/ActivityBarging/GetDataActivityBarging",
        //data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            //console.log(result.Data);

            if (result.Remarks == true) {
                //ADMINISTRATIONViewModel.ADMINISTRATIONDataSource.read();

                //start barging detail
                var total1 = 0;
                //var totalBreakdown = 0;

                var panel1 = $("#grid-BargingDetail");
                var html1 = "";

                panel1.empty();

                var openingTable1 = '<table class="table table-striped table-condensed table-bordered table-sm">' +
                    '<tr>' +
                    '<th colspan="2">BARGING DETAIL - ' + result.Data.bargingDetail.Jetty + '</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Customer</td> <td><span>' + result.Data.bargingDetail.Customer + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Buyer</td> <td><span></span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Jetty</td> <td><span>' + result.Data.bargingDetail.Jetty + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Barge</td> <td><span>' + result.Data.bargingDetail.Barge + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Tugboat</td> <td><span>' + result.Data.bargingDetail.TugBoat + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Target Barging</td> <td><span>' + result.Data.bargingDetail.Target_Barging + ' TON</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Progress</td><td><span>' + result.Data.bargingDetail.Progress + ' TON (%)</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Progress By Beltscale</td><td><span>' + result.Data.bargingDetail.Progress + ' TON</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Productivity</td><td><span>' + result.Data.bargingDetail.TPH +'  TPH</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Status</td> <td><span>' + result.Data.bargingDetail.KodeStatus + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Description</td> <td><span>' + result.Data.bargingDetail.Status + '</span></td>' +
                    '</tr>';

                var closingTable1 = '</table>';

                html1 += openingTable1;

                html1 += closingTable1;
                panel1.append(html1);
                //end barging detail

                //start barging progress
                var total2_targetBarging = 0;
                var total2_volumeProgress = 0;
                var total2_persentaseVolBarging = 0;
                var total2_volumeDraught = 0;
                var total2_persentaseVolDraught = 0;
                //var totalBreakdown = 0;

                var panel2 = $("#grid-BargingProgress");
                var html2 = "";

                panel2.empty();

                var openingTable2 = '<table class="table table-striped table-condensed table-bordered table-sm">' +
                    '<tr>' +
                    '<th colspan="4">BARGING PROGRESS - ' + result.Data.bargingDetail.Jetty + '</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<th rowspan="2" class="text-center" style="vertical-align: middle;">CONTRACTOR</th>' +
                    '<th rowspan="2" class="text-center" style="vertical-align: middle;">MATERIAL TYPE</th>' +
                    '<th rowspan="2" class="text-center" style="vertical-align: middle;">SEAM</th>' +
                    '<th rowspan="2" class="text-center" style="vertical-align: middle;">TARGET BARGING (TON)</th>' +
                    '<th colspan="2" class="text-center">PROGRESS</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<th class="text-center">VOLUME (TON)</th>' +
                    '<th class="text-center">%</th>' +
                    '</tr>';

                var closingTable2 = '</table>';

                html2 += openingTable2;

                //generate data
                $.each(result.Data.bargingProgress,
                    function (key, item) {
                        var childMenu = 
                            '<td class="text-center"><span>' + item.Customer + '</span></td>' +
                            '<td class="text-center"><span> </span></td>' +
                            '<td class="text-center"><span></span></td>' +
                            '<td class="text-center"><span>' + item.Target_Barging + '</span></td>' +
                            '<td class="text-center"><span>' + item.Progress + '</span></td>' +
                            '<td class="text-center"><span>' + item.WeightPercentage + '%</span></td>' +
                            '</tr>';
                        html2 += childMenu;

                        total2_targetBarging += item.Target_Barging;
                        total2_volumeProgress = item.Progress;
                        total2_persentaseVolBarging = item.WeightPercentage;

                        //totalBreakdown += item.breakdown;
                    });

                var totalTable2 = '<tr>' +
                    '<td colspan="3" class="text-center"><span><b>TOTAL</b></span></td>' +
                    '<td class="text-center"><span>' + total2_targetBarging + '</span></td>' +
                    '<td class="text-center"><span>' + total2_volumeProgress + '</span></td>' +
                    '<td class="text-center"><span>' + total2_persentaseVolBarging + '</span></td>' +
                    '</tr>';

                html2 += totalTable2;

                html2 += closingTable2;
                panel2.append(html2);
                //end barging progress

            }
            else {
                alert(data.Message);
                //console.log(data.Message);
            }

        },
        error: function (xhr) {
            alert("Error...");
        }
    });
}

var html = "";
function loadData() {
    //debugger;
    //var html = "";
    $.ajax({
        type: "post",
        url: $("#web_link").val() + "/api/ActivityBarging/GetDataActivityBarging",
        //data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.Remarks == true) {
                //alert("Masuk Sini berhasil!!!");
                console.log(response.Data);

                var photo = "";
                var titleApp = "";


                $.each(response.Data, function (keyitem, item) {

                    //var childMenu = '';
                    //var childMenu2 = '';
                    //var test = '';
                    //var targetBarging = item.volume / 1000;
                    //var progressBarging = item.volumeProgress / 1000;
                    //var persenProgress = (progressBarging / targetBarging) * 100;
                    //var persenProgress_ = (Math.round(persenProgress * 100) / 100).toFixed(2);
                    //var persenProgress_S = persenProgress_.toString();
                    //persenProgress_S = persenProgress_S.replace(/\.00$/, '');
                    //var total2_targetBarging = 0;
                    //var total2_volumeProgress = 0;
                    //var total2_persentaseVolBarging = 0;
                    //var total2_volumeDraught = 0;
                    //var total2_persentaseVolDraught = 0;
                    //var persenVolBarging = '';
                    //var persenVolDraught = '';


                    var childMenu = '';
                    var childMenu2 = '';
                    var test = '';
                    var targetBarging = Number((item.Target_Barging / 1000).toFixed(2));

                    var progressBarging = item.Progress / 1000;
                    var persenProgress = (progressBarging / targetBarging) * 100;
                    //var persenProgress_ = (Math.round(persenProgress * 100) / 100).toFixed(2);
                    // var persenProgress_S = persenProgress_.toString();
                    // persenProgress_S = persenProgress_S.replace(/\.00$/, '');
                    var total2_targetBarging = 0;
                    var total2_volumeProgress = 0;
                    var total2_persentaseVolBarging = 0;
                    var total2_volumeDraught = 0;
                    var total2_persentaseVolDraught = 0;
                    var persenVolBarging = '';
                    var persenVolDraught = '';

                   

                    html += '<div class="card-body">' +
                                '<div class="row">' +
                                    '<div class="col-md-4">' +
                                        '<div>' +
                                           '<table class="table table-striped table-condensed table-bordered table-sm" style="border:1px solid #00b8ce;">' +
                                              '<tr>' +
                                                 '<th colspan="2" style="background-color: #00b8ce; color: #fff;">BARGING DETAIL - ' + item.Jetty + '</th>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Customer</td> <td><span>' + item.Customer + '</span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Buyer</td> <td><span></span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Jetty</td> <td><span>' + item.Jetty + '</span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Barge</td> <td><span>' + item.Barge + '</span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Tugboat</td> <td><span>' + item.TugBoat + '</span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Target Barging</td> <td><span>' + item.Target_Barging + ' TON</span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                        '<td>Progress</td><td><span>' + item.Progress + ' TON ' + item.WeightPercentage + '(%)</span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Progress By Beltscale</td><td><span>' + item.Progress+ ' TON</span></td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                  '<td>Productivity</td><td><span>' + item.TPH + ' TPH</span></td>' +
                                              '</tr>' +
                                              '<tr>';
                                                     if (item.KodeStatus == 0) {
                                                        html += '<td>Status</td> <td><span class="btn btn-info btn-xs"> Initiate </span></td>';
                                                     }
                                                     else if (item.KodeStatus == 1) {
                                                        html += '<td>Status</td> <td><span class="btn btn-success btn-xs"> Loading </span></td>';
                                                     }
                                                     else if (item.KodeStatus == 2) {
                                                        html += '<td>Status</td> <td><span class="btn btn-danger btn-xs"> Breakdown </span></td>';
                                                     }
                                                     else if (item.KodeStatus == 3) {
                                                        html += '<td>Status</td> <td><span class="btn btn-warning btn-xs"> Delay </span></td>';
                                                     }
                                                     else if (item.KodeStatus == 4) {
                                                        html += '<td>Status</td> <td><span class="btn btn-default btn-xs"> Idle </span></td>';
                                                     }
                                                     else if (item.KodeStatus == 5) {
                                                        html += '<td>Status</td> <td><span class="btn btn-primary btn-xs"> Complete </span></td>';
                                                     }
                                                     else {
                                                        html += '<td>Status</td> <td><span> </span></td>';
                                                     }
                                                html += '</tr>' +
                                                    '<tr>' +
                                                    '<td>Description</td> <td><span>' + item.Status + '</span></td>' +
                                               '</tr>' +
                                            '</table>' +
                                         '</div>' +
                                      '</div>'+
                                 '<div class="col-md-8">' +
                                      '<div class="row">' +
                                         '<div class="col">' +
                                            '<div>';
                                        html += '<table class="table table-striped table-condensed table-bordered table-sm">' +
                                                    '<tr>' +
                                                        '<th colspan="8" style="background-color: #00b8ce; color: #fff;">BARGING PROGRESS - ' + item.Jetty + '</th>' +
                                                    '</tr>' +
                                                    '<tr>' +
                                                        '<th rowspan="2" class="text-center" style="vertical-align: middle;">CONTRACTOR</th>' +
                                                        '<th rowspan="2" class="text-center" style="vertical-align: middle;">MATERIAL TYPE</th>' +
                                                        '<th rowspan="2" class="text-center" style="vertical-align: middle;">SEAM</th>' +
                                                        '<th rowspan="2" class="text-center" style="vertical-align: middle;">TARGET BARGING (TON)</th>' +
                                                        '<th colspan="2" class="text-center">PROGRESS</th>' +
                                                        '<th colspan="2" class="text-center">DRAUGHT SURVEY</th>' +
                                                    '</tr>' +
                                                    '<tr>' +
                                                        '<th class="text-center">VOLUME (TON)</th>' +
                                                        '<th class="text-center">%</th>' +
                                                        '<th class="text-center">VOLUME (TON)</th>' +
                                                        '<th class="text-center">%</th>' +
                                                    '</tr>';
                                        //console.log(response.dataMaterial);
                                        
                                                    childMenu = '<tr>' +
                                                        '<td class="text-center"><span>' + item.Customer + '</span></td>' +
                                                        '<td class="text-center"><span> </span></td>' +
                                                        '<td class="text-center"><span> </span></td>' +
                                                        '<td class="text-center"><span>' + item.Target_Barging + '</span></td>' +
                                                        '<td class="text-center"><span>' + item.Progress + '</span></td>' +
                                                        '<td class="text-center"><span>' + item.WeightPercentage + '%</span></td>' +
                                                        '</tr>';
                                                        html += childMenu;
                                                    total2_targetBarging += item.Target_Barging;
                                                    total2_volumeProgress += item.Progress;
                                                        total2_persentaseVolBarging = (total2_volumeProgress / total2_targetBarging) * 100;
                                                        total2_persentaseVolBarging = (Math.round(total2_persentaseVolBarging * 100) / 100).toFixed(2);
                                                        persenVolBarging = total2_persentaseVolBarging.toString();
                                                        persenVolBarging = persenVolBarging.replace(/\.00$/, '');

                                        //barging progress from barging material

                                            html += '<tr>' +
                                                        '<td colspan="3" class="text-center"><span><b>TOTAL</b></span></td>' +
                                                        '<td class="text-center"><span>' + total2_targetBarging + '</span></td>' +
                                                        '<td class="text-center"><span>' + total2_volumeProgress + '</span></td>' +
                                                        '<td class="text-center"><span>' + persenVolBarging + '%</span></td>' +
                                                        '<td class="text-center"><span>' + total2_volumeDraught + '</span></td>' +
                                                        '<td class="text-center"><span>' + persenVolDraught + '%</span></td>' +
                                                    '</tr>' +
                                                '</table>';
                                       html += '</div>' +
                                           '</div>' +
                                          '</div>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>'
                                ;
                                            
                    
                        

                    
                });

                $("#activityBargingData").append(html);

            }
            else {
                alert(response.Error);
            }
        },
        error: function (xhr, status, error) {
            // Handle any errors that occur during the AJAX request
            console.log(error);
        }
    });
}
function loadData_Material(id) {
    var childMenu;

    $.ajax({
        type: "POST",
        url: $("#hd_apiLINK").val() + "/api/OPERATION/GetActiveBargingMaterialByBargingID?id=" + id,
        //data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.Remarks == true) {

                //generate data
                $.each(result.Data,
                    function (key, item) {
                        //console.log(item.contractor);
                        childMenu = '<tr>' +
                            '<td class="text-center"><span>' + item.contractor + '</span></td>' +
                            '<td class="text-center"><span>' + item.material_type + '</span></td>' +
                            '<td class="text-center"><span>' + item.seam + '</span></td>' +
                            '<td class="text-center"><span>' + item.volume + '</span></td>' +
                            '<td class="text-center"><span>' + item.volume_progress + '</span></td>' +
                            '<td class="text-center"><span>' + item.persentaseVolumeProgress + '%</span></td>' +
                            '</tr>';
                        html += childMenu;
                        console.log(childMenu);
                        //test = item.id;

                        //total2_targetBarging += item.volume;
                        //total2_volumeProgress = item.volume_progress;
                        //total2_persentaseVolBarging = item.persentaseVolumeProgress;
                        //total2_volumeDraught = item.volume_by_draught_survey;
                        //total2_persentaseVolDraught = item.persentaseVolumeByDraughtSurvey;

                        //totalBreakdown += item.breakdown;
                    });

            }
            else {
                alert(result.Message);
                //console.log(data.Message);
            }
            //console.log(childMenu);
        },
        error: function (xhr) {
            alert("Error...");
        }

    });
}


//function loadGrid() {
//    $("#grid").empty();
//    var grid = $("#grid").kendoGrid({
//        dataSource: {
//            type: "json",
//            transport: {
//                read: {
//                    url: $("#web_link").val() + "/api/ActivityBarging/GetDataActivityBarging",
//                    contentType: "application/json",
//                    type: "GET",
//                    cache: false,
//                },

//                parameterMap: function (data, operation) {

//                    return kendo.stringify(data)

//                }
//            },
//            pageSize: 10,
//            schema: {
//                data: "Data",
//                total: "Total",
//                model: {
//                    id: "ID",
//                    fields: {
//                        JETTY: { type: "string", filterable: true, sortable: true, editable: true },
//                        BARGE: { type: "string", filterable: true, sortable: true, editable: true },
//                        NAMA: { type: "string", filterable: true, sortable: true, editable: true },
//                        //STATUS: { type: "string", filterable: true, sortable: true, editable: true },
//                    }

//                }
//            }
//        },
//        height: 400,
//        resizable: true,
//        scrollable: true,
//        sortable: true,
//        filterable: true,
//        pageable: {
//            refresh: true,
//            buttonCount: 10,
//            input: true,
//            pageSizes: [10, 100, 1000],
//            info: true,
//            messages: {
//            }
//        },

//        columns: [

//            {
//                title: "No",
//                width: 30,
//                template: "#= ++rowNo #",
//                filterable: false,

//            },
//            { field: "JETTY", title: "Jetty", width: 60 },
//            { field: "BARGE", title: "Barge", width: 65 },
//            { field: "NAMA", title: "Nama", width: 200 },
//            //{ field: "STATUS", title: "Status", width: 80 },

//            {
//                command:
//                    [
//                        { text: "Detail", click: detail },
//                        //{ text: "Approval", click: approval }
//                    ], title: "Action", width: 80,
//            },


//        ],
//        dataBinding: function () {
//            window.rowNo = (this.dataSource.page() - 1) * this.dataSource.pageSize();
//        }
//    });

//    function detail(e) {
//        e.preventDefault;
//        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

//        location.href = "../ActivityBarging/Detail?id=" + dataItem.id
//    }

//}

