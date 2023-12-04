$(document).ready(function () {
    $(document).on("click", ".logoutLi", (e) => {
        logout();
    })

    $(".logoutLi").on("click", function (e) {
        logout();
    })


})
function logout() {
    event.preventDefault()
    $.ajax({
        url: endpoint.logout,
        async: false,
        cache: false,
        type: 'GET', // For jQuery < 1.9
        success: function (data) {
            var response = data;
            if (response && response.status == 200) {
                alert(response.message)
                window.location.href = pageWithUrl.login
            } else {
                alert(response.message);
            }
        },
        error: function (err) {
            if (err?.responseJSON?.status == 401) {
                alert(err?.responseJSON?.message);
                window.location.href = pageWithUrl.login;
                return;
            }
            alert(err?.responseJSON?.message ?? "Something went wrong.")
        }
    });
}