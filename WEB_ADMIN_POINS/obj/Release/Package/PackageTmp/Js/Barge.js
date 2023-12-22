var MasterDataViewModel;

$(document).ready(function () {

    //$body = $("body");

    //$(document).on({
    //    ajaxStart: function () { $body.addClass("loading"); },
    //    ajaxStop: function () { $body.removeClass("loading"); }
    //});



});

MasterDataViewModel = kendo.observable({

    MasterBargeDataSource: new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                //data: [
                //            { district: $("#hd_district").val() }
                //],
                cache: false,
                //url: $("#web_link").val() + "/api/Cuti/GetDataCuti?dept=" + $("#hd_department").val() + "&role=" + $("#hd_id_role").val() + "&nrp=" + $("#hd_nrp").val(),
                url: $("#web_link").val() + "/api/MasterData/GetMasterBarge"
                //,
                //data: { keyword: $("#keyword").val() }
            }
        },
        schema: {
            data: "Data",
            total: "Total",
            model: {
                id: "ID",
                field: {
                    ID: { type: "int", editable: false, sortable: true },
                    BARGE: { type: "string", editable: false, sortable: true },
                    
                }
            }
        },
        pageSize: 10

    })

});

$("#grid").kendoGrid({
    dataSource: MasterDataViewModel.MasterBargeDataSource,
    selectable: true,
    resizable: true,
    editable: false,
    scrollable: true,
    cache: false,
    sortable: true,
    //detailTemplate: kendo.template($("#template").html()),
    //detailInit: detailInit,
    pageable: {
        refresh: true,
        pageSizes: [10, 20, 50, 100],
    },
    filterable: true,
    height: '450px',
    //detailTemplate: kendo.template($("#template").html()),
    //detailInit: detailInit,
    //dataBound: function () {
    //    this.expandRow(this.tbody.find("tr.k-master-row").first());
    //},
    columns: [
        {
            title: 'Action',
            width: '120px',
            attributes: { style: "text-align:center;" },
            template: '<button class="btn btn-primary" onclick="Edit(\'#=id#\');"><i class="fa fa-edit" aria-hidden="true"></i> </button> <button class="btn btn-danger" onclick="Delete(\'#=id#\');"><i class="fa fa-trash" aria-hidden="true"></i> </button>'
        },
        { field: 'ID', title: 'ID', width: '80px', attributes: { style: "text-align:center;" } },
        { field: 'BARGE', title: 'BARGE', width: '150px', attributes: { style: "text-align:center;" } }
    ]

}).data("kendoGrid");

function Edit(id1) {
    $('#lblTitle').text("Edit Barge");

    //field2nya nanti taruh disini
    $.ajax({
        type: "POST",
        url: $("#web_link").val() + "/api/MasterData/GetMasterBargeByID?ID=" + id1,
        //data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.Remarks == true) {
                $("#hd_id").val(id1);
                $("#txtName").val(result.Data.BARGE);
                //$("#txtDescEN").val(result.Data.description_en);
                //console.log(data.Data.user);
                //console.log(data.Data.authorization);
                //$('#hd_id').val(id1);
                //ADMINISTRATIONViewModel.ADMINISTRATIONDataSource.read();
            }
            else {
                alert(result.Message);
                //console.log(data.Message);
            }

        },
        error: function (xhr) {
            alert("Error...");
        }
    });


    $('#modal-form').modal('show');
}

function Save() {

    if ($("#txtName").val() != "") {
        var stat = false;


        var obj = {
            id: $("#hd_id").val(),
            name: $("#txtName").val()
        }

        //console.log(obj);

        $.ajax({
            type: "POST",
            url: $("#web_link").val() + "/api/MasterData/SaveMasterBarge",
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.Remarks == true) {
                    MasterDataViewModel.MasterBargeDataSource.read();
                    alert(data.Message);
                    $('#modal-form').modal('hide');
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
    } else {
        alert("Pastikan Username, Email, dan Password Telah Diisi!");
    }

}

function Delete(id1) {
    var ans = confirm("Are you sure to want delete this ?");

    var obj = {
        id: id1
    }

    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#web_link").val() + "/api/MasterData/SaveMasterBarge",
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.Remarks == true) {
                    MasterDataViewModel.MasterBargeDataSource.read();
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
}

function AddNew() {
    $("#hd_id").val("0");
    $("#txtCode").val("");
    $("#txtDesc").val("");
    $("#chkStatus").prop("checked", false);
    $('#lblTitle').text("Add New");
    $('#modal-form').modal('show');
}