$(document).ready(function () {
    if (getParameterByName("act") == "approval") {
        document.getElementById('card_title').innerHTML = "<b>Approval Barging Online<b>";
        $("#btn_update").hide();
    } else {
        $("#btn_approve").hide();
        $("#btn_reject").hide();
    }

    loadDetail();
    kendo.bind($("#form"), viewModel);

})

$("#DATE_BOOKING").width(300).kendoDatePicker({
    value: "",
    format: "yyyy-MM-dd",
    parseFormats: "yyyy-MM-dd"
})

$("#FINISH_BOOKING").width(300).kendoDatePicker({
    value: "",
    format: "yyyy-MM-dd",
    parseFormats: "yyyy-MM-dd"
})


$("#btn_kembali").click(function () {
    location.href = "../ApprovalBargingOnline/Index"
})

$("#btn_update").click(function () {
    Update();
})

$("#btn_approve").click(function () {
    Approve();
})

$("#btn_reject").click(function () {
    Reject();
})

function loadDetail() {
    $.ajax({
        type: "GET",
        url: $("#web_link").val() + "/api/ApprovalBargingOnline/DetailBargingOnline?id=" + getParameterByName("id"),
        dataType: "json",
        success: function (response) {
            if (response.Remarks) {
                viewModel.set("JETTY", response.Data.jetty);
                viewModel.set("COMPANY", response.Data.company);
                viewModel.set("TUG_BOAT", response.Data.tug_boat);
                viewModel.set("BARGE", response.Data.barge);
                viewModel.set("CAPACITY", response.Data.capacity);
                viewModel.set("PROCESS_TIME", response.Data.process_time);
                viewModel.set("DATE_BOOKING", response.Data.date_booking);
                viewModel.set("START_TIME", response.Data.start_time);
                viewModel.set("NAMA", response.Data.nama);
                viewModel.set("FINISH_TIME", response.Data.finish_time);
                viewModel.set("FINISH_BOOKING", response.Data.finish_booking);
                viewModel.set("STATUS", response.Data.status);
                viewModel.set("VESSEL", response.Data.vessel);

                GetCapacity(response.Data.jetty);

            } else {
                alert(response.Message)
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

function Update() {
    console.log("start_timenya " + $("#START_TIME").val());
    var clsFormInputDataBargingOnline = {
        id: getParameterByName("id"),
        jetty: $("#JETTY").val(),
        capacity: $("#CAPACITY").val(),
        process_time: $("#PROCESS_TIME").val(),
        date_booking: $("#DATE_BOOKING").val(),
        start_time: $("#START_TIME").val(),
        vessel: $("#VESSEL").val(),
    };

    $.ajax({
        type: "POST",
        url: $("#web_link").val() + "/api/ApprovalBargingOnline/UpdateBargingOnline",
        contentType: "application/json",
        data: JSON.stringify(clsFormInputDataBargingOnline),
        success: function (response) {
            if (response.Remarks) {
                alert(response.Message)
                location.href = "../ApprovalBargingOnline/Index"
            } else {
                alert(response.Message)
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

function Approve() {

    $.ajax({
        type: "POST",
        url: $("#web_link").val() + "/api/ApprovalBargingOnline/Approval?id=" + getParameterByName("id") + "&option=" + 0,
        contentType: "application/json",
        success: function (response) {
            if (response.Remarks) {
                alert(response.Message)
                location.href = "../ApprovalBargingOnline/Index"
            } else {
                alert(response.Message)
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

function Reject() {

    $.ajax({
        type: "POST",
        url: $("#web_link").val() + "/api/ApprovalBargingOnline/Approval?id=" + getParameterByName("id") + "&option=" + 1,
        contentType: "application/json",
        success: function (response) {
            if (response.Remarks) {
                alert(response.Message)
                location.href = "../ApprovalBargingOnline/Index"
            } else {
                alert(response.Message)
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

var viewModel = kendo.observable({
    JETTY: "",
    COMPANY: "",
    TUG_BOAT: "",
    BARGE: "",
    CAPACITY: "",
    PROCESS_TIME: "",
    DATE_BOOKING: "",
    START_TIME: "",
    NAMA: "",
    FINISH_TIME: "",
    FINISH_BOOKING: "",
    STATUS: "",
});

$("[name='JETTY']").width(300).kendoComboBox({
    dataTextField: "NAME",
    dataValueField: "NAME",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#web_link").val() + "/api/ApprovalBargingOnline/GetJetty",
                contentType: "application/json",
                type: "POST",
                cache: false,
                complete: function (data) {
                    console.log("test");
                }
            }
        },
        schema: {
            data: "Data"
        }
    },
    optionLabel: "Pilih",
    filter: "contains",
    suggest: true,
    select: function (e) {
        var dataItem = this.dataItem(e.item.index());
        console.log("selected jetty : " + dataItem.NAME);

        GetCapacity(dataItem.NAME);
    }
});

function GetCapacity(name) {
   
    var jetty = name;
    console.log("jettynya : " + jetty);

    $("[name='CAPACITY']").kendoComboBox({

        dataTextField: "CAPACITY",
        dataValueField: "CAPACITY",
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#web_link").val() + "/api/ApprovalBargingOnline/GetJettyCapacity?JETTY=" + jetty,
                    contentType: "application/json",
                    type: "POST",
                    cache: false,
                    complete: function (response) {
                        console.log("test");
                        
                    }
                }
            },
            schema: {
                data: "Data"
            }
        },
        optionLabel: "Pilih",
        filter: "contains",
        suggest: true,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            console.log("selected capacity : " + dataItem.CAPACITY);
            GetDuration(jetty, dataItem.CAPACITY);
        }
    });
}

function GetDuration(name, capacity) {
    console.log("aad");
        $.ajax({
            type: "GET",
            url: $("#web_link").val() + "/api/ApprovalBargingOnline/GetJettyDuration?JETTY=" + name + "&CAPACITY=" + capacity,
            dataType: "json",
            success: function (response) {
                if (response.Remarks) {

                    viewModel.set("PROCESS_TIME", response.Data);

                } 
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }

        });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

