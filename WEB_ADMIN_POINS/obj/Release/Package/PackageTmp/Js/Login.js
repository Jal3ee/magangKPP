function runScript(e) {
    if (e.keyCode == 13) {

        Login();

    }
}

$(document).ready(function () {

    
});

function Login() {

    var clsFormInputLogin = {
        nrp: $("#nrp").val(),
        pass: $("#password").val(),
    };

    $.ajax({
        type: "POST",
        url: $("#web_link").val() + "/api/Login/GetLogin",
        contentType: "application/json",
        data: JSON.stringify(clsFormInputLogin),
        success: function (result) {

            if (result.Status == true) {
                alert("Login Berhasil");
                MakeSession(result.Data.nrp, result.Data.nama, result.Data.district);
            } 
            else {
                alert("Login Error, Reason : " + result.Message);
                console.log(result.Message);
            }
        }
    });

}

function MakeSession(nrp, nama, district) {
    //debugger
    console.log("masuk MakeSession");
    var obj = {
        NRP: nrp,
        NAMA: nama,
        DISTRICT: district,
    };

    $.ajax({
        type: "POST",
        url: "/Login/MakeSession", 
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            location.href = "../Dashboard/Dashboard"

        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });

}

