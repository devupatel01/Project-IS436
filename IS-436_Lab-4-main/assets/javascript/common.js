var navigationItems = [
    {
        id: "menuDashboard",
        name: "dashboard",
        title: "Dashboard",
        link: "dashboard.html",
        enable: true
    },
    {
        id: "menuPatients",
        name: "patients",
        title: "Patients",
        link: "patients.html",
        enable: true
    }
];

const pageWithUrl = {
    "index": "index.html",
    "login": "login.html",
    "logout": "logout.html",
    "dashboard": "dashboard.html",
    "patients": "patients.html",
}

const endpoint = {
    login: "backend/login.php",
    logout: "backend/logout.php",
    authorization: "backend/authorization.php",
    addPatient: "backend/addPatient.php",
    patients: "backend/patients.php",
    addAppointment: "backend/addAppointment.php",
    patientDetails: "backend/getPatientDetails.php",
    dashboard: "backend/dashboard.php"
}

function checkUserloginPageIndex() {
    performGet(endpoint.authorization,
        function (resp, status, xhr) {
            if (resp.status == 200) {
                if (resp?.data?.logged_in == true) {
                    const localstorage = window.localStorage
                    localstorage.setItem("user", JSON.stringify(resp?.data?.user));

                    window.location.href = pageWithUrl.dashboard;
                } else {
                    window.location.href = pageWithUrl.login;
                }
                return true;
            } else {
                window.location.href = pageWithUrl.login;
            }
        },
        function (jqXHR, error, errorThrown) {
            alert(jqXHR?.responseJSON?.message ?? "Something went wrong.");
            window.location.href = pageWithUrl.login;
        });
        return true
}

function checkUserloginPageLogin() {
    performGet(endpoint.authorization,
        function (resp, status, xhr) {
            if (resp.status == 200) {
                if (resp?.data?.logged_in == true) {
                    const localstorage = window.localStorage
                    localstorage.setItem("user", JSON.stringify(resp?.data?.user));
                    window.location.href = pageWithUrl.dashboard;
                }
            }
        },
        function (jqXHR, error, errorThrown) {
            alert(jqXHR?.responseJSON?.message ?? "Something went wrong.");
        });
        return true

}

function checkUserloginPageDashboardAndOthres() {
    performGet(endpoint.authorization,
        function (resp, status, xhr) {
            if (resp.status == 200) {
                if (resp?.data?.logged_in == true) {
                    const localstorage = window.localStorage
                    localstorage.setItem("user", JSON.stringify(resp?.data?.user));
                } else {
                    window.location.href = pageWithUrl.login;
                }
            } else {
                window.location.href = pageWithUrl.login;
            }
        },
        function (jqXHR, error, errorThrown) {
            alert(jqXHR?.responseJSON?.message ?? "Something went wrong.");
            window.location.href = pageWithUrl.login;
        });
        return true
}