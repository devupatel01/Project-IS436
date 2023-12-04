$(document).ready(function () {
    navigationItems.forEach((e) => {
        if (e.enable) {
            $("#sideNavList").append(`<a id="${e.id}" class="sideNavListItems" href="${pageWithUrl[e.name]}">${e.title}</a>`);
        }
    })

    $("#sideNavList").append(`<a class="sideNavListItems logoutLi" href="logout.html">Logout</a>`);

});
