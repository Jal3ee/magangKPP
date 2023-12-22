var MasterDataViewModel;

$(document).ready(function () {

    //$body = $("body");

    //$(document).on({
    //    ajaxStart: function () { $body.addClass("loading"); },
    //    ajaxStop: function () { $body.removeClass("loading"); }
    //});



});

MasterDataViewModel = kendo.observable({

    MasterTugBoatDataSource: new kendo.data.DataSource({

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
                url: $("#web_link").val() + "/api/MasterData/GetMasterTugBoat"
                //,
                //data: { keyword: $("#keyword").val() }
            }
        },
        schema: {
            data: "Data",
            total: "Total",
            model: {
                ID: "ID",
                field: {
                    ID: { type: "int", editable: true, sortable: true },
                    TUG_BOAT: { type: "string", editable: true, sortable: true },

                }
            }
        },
        pageSize: 10

    })

});

$("#grid").kendoGrid({
    dataSource: MasterDataViewModel.MasterTugBoatDataSource,
    selectable: true,
    resizable: true,
    editable: true,
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
        { field: 'TUG_BOAT', title: 'Nama TugBoat', width: '150px', attributes: { style: "text-align:center;" } },
        {
            title: 'Action',
            width: '120px',
            attributes: { style: "text-align:center;" },
            template: '<button class="btn btn-primary" onclick="Edit(\'#=ID#\');"><i class="fa fa-edit" aria-hidden="true"></i> </button> <button class="btn btn-danger" onclick="Delete(\'#=ID#\');"><i class="fa fa-trash" aria-hidden="true"></i> </button>'
        }
    ]

}).data("kendoGrid");

function Edit(id1) {
    $('#lblTitle').text("Edit TugBoat");

    //field2nya nanti taruh disini
    $.ajax({
        type: "POST",
        url: $("#web_link").val() + "/api/MasterData/GetMasterTugBoatByID?ID=" + id1,
        //data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.Remarks == true) {
                $("#hd_id").val(id1);
                $("#txtName").val(result.Data.TUG_BOAT);
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

    //$("#hd_id").val(id1);
    $('#modal-form').modal('show');
}



function Save() {

    if ($("#txtName").val() != "") {
        var stat = false;


        var obj = {
            ID: $("#hd_id").val(),
            TUG_BOAT: $("#txtName").val()
        }

        //console.log(obj);

        $.ajax({
            type: "POST",
            url: $("#web_link").val() + "/api/MasterData/SaveMasterTugBoat",
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.Remarks == true) {
                    MasterDataViewModel.MasterTugBoatDataSource.read();
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
        alert("Tidak Boleh Kosong");
    }

}

function Delete(id1) {
    var ans = confirm("Are you sure to want delete this ?");

    var obj = {
        ID: id1
    }

    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#web_link").val() + "/api/MasterData/DeleteMasterTugBoat",
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.Remarks == true) {
                    MasterDataViewModel.MasterTugBoatDataSource.read();
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