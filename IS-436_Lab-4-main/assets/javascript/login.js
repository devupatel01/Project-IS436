checkUserloginPageLogin()

console.log(location)

const loginForm = document.querySelector("#frmAdminLogin");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var data = {};
    $.each($("#frmAdminLogin").serializeArray(), function () {
        data[this.name] = this.value;
    });

    const { username, password } = data

    if (!checkInputText(username)) {
        $("#loginFormInvalid").html("Username can't be blank").show();
        return false;
    }

    if (!checkInputText(password)) {
        alert("Password can't be blank")
        $("#loginFormInvalid").html("Password can't be blank").show();
        return false;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    performPost(endpoint.login, formData,
        function (resp, status, xhr) {
            if (resp.status == 200) {
                const localstorage = window.localStorage
                localstorage.setItem("user", JSON.stringify(resp?.data?.user));
                window.location.href = pageWithUrl.dashboard;
            } else {
                $("#loginFormInvalid").html(resp?.message).show();
            }
        },
        function (jqXHR, error, errorThrown) {
            $("#loginFormInvalid").html(jqXHR?.responseJSON?.message ?? "Something went wrong.").show();
        });


})