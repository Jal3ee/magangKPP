
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
                    url: $("#web_link").val() + "/api/UserVerification/GetDataUnverifiedUser",
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
                        NAMA: { type: "string", filterable: true, sortable: true, editable: true },
                        EMAIL: { type: "string", filterable: true, sortable: true, editable: true },
                        TELEPON: { type: "string", filterable: true, sortable: true, editable: true },
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
            { field: "NAMA", title: "Nama", width: 200 },
            { field: "EMAIL", title: "Email", width: 200 },
            { field: "TELEPON", title: "Telepon", width: 100 },

            {
                command:
                    [
                        { text: "Reject", click: reject },
                        { text: "Approve", click: approve }
                    ], title: "Action", width: 80,
            },


        ],
        dataBinding: function () {
            window.rowNo = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        }
    });

    function reject(e) {
        e.preventDefault;
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        var dataID = dataItem.ID;

        if (confirm("Are you sure to reject this request?") == true) {
            $.ajax({
                type: "POST",
                url: $("#web_link").val() + "/api/UserVerification/UpdateVerificationStatus?id=" + dataID + "&option=" + false,
                contentType: "application/json",
                success: function (response) {
                    if (response.Remarks) {
                        alert(response.Message)
                        location.href = "../UserVerification/Index"
                    } else {
                        alert(response.Message)
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                }

            });
        } else {
            console.log("n");
        }
    }

    function approve(e) {
        e.preventDefault;
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        var dataID = dataItem.ID;

        if (confirm("Are you sure to approve this request?") == true) {
            $.ajax({
                type: "POST",
                url: $("#web_link").val() + "/api/UserVerification/UpdateVerificationStatus?id=" + dataID + "&option=" + true,
                contentType: "application/json",
                success: function (response) {
                    if (response.Remarks) {
                        alert(response.Message)
                        location.href = "../UserVerification/Index"
                    } else {
                        alert(response.Message)
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                }

            });
        } else {
            console.log("n");
        }
    }

}
