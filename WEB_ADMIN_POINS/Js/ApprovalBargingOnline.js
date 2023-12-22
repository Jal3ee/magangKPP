
$(document).ready(function () {
    loadGrid();
    /*loadDetail();*/
    /*kendo.bind($("#form"), viewModel);*/

})

function loadGrid() {
    $("#grid").empty();
    var grid = $("#grid").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#web_link").val() + "/api/ApprovalBargingOnline/GetDataBargingOnline",
                    contentType: "application/json",
                    type: "GET",
                    cache: false,
                },

                parameterMap: function (data, operation) {

                    return kendo.stringify(data)

                }
            },
            pageSize: 10,
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "ID",
                    fields: {
                        DATE_BOOKING: { type: "string", filterable: true, sortable: true, editable: true },
                        FINISH_BOOKING: { type: "string", filterable: true, sortable: true, editable: true },
                        NAMA: { type: "string", filterable: true, sortable: true, editable: true },
                        STATUS: { type: "string", filterable: true, sortable: true, editable: true },
                    }

                }
            }
        },
        height: 400,
        resizable: true,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            refresh: true,
            buttonCount: 10,
            input: true,
            pageSizes: [10, 100, 1000],
            info: true,
            messages: {
            }
        },

        columns: [

            {
                title: "No",
                width: 30,
                template: "#= ++rowNo #",
                filterable: false,

            },
            { field: "DATE_BOOKING", title: "Date Booking", template: '#=kendo.toString(kendo.parseDate(DATE_BOOKING, "yyyy-MM-dd"), "yyyy-MM-dd")#', width: 60 },
            { field: "FINISH_BOOKING", title: "Finish Booking", template: '#=kendo.toString(kendo.parseDate(FINISH_BOOKING, "yyyy-MM-dd"), "yyyy-MM-dd")#', width: 65 },
            { field: "NAMA", title: "Nama", width: 200 },
            { field: "STATUS", title: "Status", width: 80 },

            {
                command:
                    [
                        { text: "Edit", click: edit },
                        { text: "Approval", click: approval }
                    ], title: "Action", width: 80,
            },
            

        ],
        dataBinding: function () {
            window.rowNo = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        }
    });

    function edit(e) {
        e.preventDefault;
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

        location.href = "../ApprovalBargingOnline/Edit?id=" + dataItem.id 
    }

    function approval(e) {
        e.preventDefault;
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

        if (dataItem.STATUS == 'Diterima' || dataItem.STATUS == 'Ditolak') {
            alert("Data ini telah melalui proses approval");
        } else {
            location.href = "../ApprovalBargingOnline/Edit?id=" + dataItem.id + "&act=" + "approval"
        }
        /*location.href = "../ApprovalBargingOnline/Edit?id=" + dataItem.id + "&act=" + "approval"*/
    }

}
