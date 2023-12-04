$(document).ready(function () {

  navigationItems.forEach((e) => {
      if(e.enable){
        $("#topNavList").append(`<li class="nav-item topNavItem"><a href="${pageWithUrl[e.name]}">${e.title}</a></li>`);
      }
  })
  $("#topNavList").append(`<li class="nav-item topNavItem"><a class="logoutLi" onclick="logout()" href="logout.html">Logout</a></li>`);

  $("#topNavBars").on("click", function (e) {
    e.stopPropagation();
    $(this).toggleClass("is-active");
    $(".topNavRight").toggleClass("topNavWidth");
    $(".adminDashboard").toggleClass("adminDashboardLeft");
    $(".topNavImgContainer").fadeToggle();
  });

  $(".adminDashboard").on("click", function () {
    $(".topNavRight").removeClass("topNavWidth");
    $(".adminDashboard").removeClass("adminDashboardLeft");
    $("#topNavBars").removeClass("is-active");
    $(".topNavImgContainer").fadeIn();
  });

  $(".topNavRight").on("click", function (e) {
    e.stopPropagation();
  });

  $(window).on("resize", function () {
    $(".topNavRight").removeClass("topNavWidth");
    $(".adminDashboard").removeClass("adminDashboardLeft");
    $("#topNavBars").removeClass("is-active");
    $(".topNavImgContainer").fadeIn();
  });

});
