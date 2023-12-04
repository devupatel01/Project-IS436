checkUserloginPageDashboardAndOthres()

populateDashboard();

function populateDashboard() {
    let dashboardData;
    $.ajax({
        url: endpoint.dashboard,
        async: false,
        cache: false,
        type: 'GET', // For jQuery < 1.9
        success: function (data) {
            var response = data;
            if (response && response.status == 200) {
                dashboardData = response.data;
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

    if(dashboardData){
        $("#card-total-patient").text(dashboardData?.total_patients ?? 0)
        $("#card-total-today-appointment").text(dashboardData?.total_appointments ?? 0)
    }
}

$(".healthCheckRefresh").on("click", function() {
    populateDashboard();
})