$(document).ready(function () {
    
    loadDetail();
    kendo.bind($("#form"), viewModel);

})

$("#DATE_BOOKING").width(300).kendoDatePicker({
    value: "",
    format: "yyyy-MM-dd",
    parseFormats: "yyyy-MM-dd"
})

//$("#FINISH_BOOKING").width(300).kendoDatePicker({
//    value: "",
//    format: "yyyy-MM-dd",
//    parseFormats: "yyyy-MM-dd"
//})


$("#btn_kembali").click(function () {
    location.href = "../ActivityBarging/Index"
})


function loadDetail() {
    $.ajax({
        type: "GET",
        url: $("#web_link").val() + "/api/ActivityBarging/DetailActivityBarging?id=" + getParameterByName("id"),
        dataType: "json",
        success: function (response) {
            if (response.Remarks) {
                viewModel.set("JETTY", response.Data.jetty);
                viewModel.set("CUSTOMER", response.Data.customer);
                viewModel.set("TUG_BOAT", response.Data.tug_boat);
                viewModel.set("BARGE", response.Data.barge);
                viewModel.set("CAPACITY", response.Data.capacity);
                viewModel.set("BUYER", response.Data.buyer);
                viewModel.set("DATE_BOOKING", response.Data.date_booking);
                viewModel.set("START_TIME", response.Data.start_time);
                viewModel.set("CONTRACTOR", response.Data.contractor);
                viewModel.set("MATERIAL_TYPE", response.Data.material_type);
                viewModel.set("SEAM", response.Data.seam);
                viewModel.set("STATUS", response.Data.status);

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
    CUSTOMER: "",
    TUG_BOAT: "",
    BARGE: "",
    CAPACITY: "",
    BUYER: "",
    DATE_BOOKING: "",
    START_TIME: "",
    CONTRACTOR: "",
    SEAM: "",
    MATERIAL_TYPE: "",
    STATUS: "",
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

