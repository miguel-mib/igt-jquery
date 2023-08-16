$(document).ready(function () {
  $("#voucher").on("blur", function () {
    const value = $(this).val();
    if (value.length < 8) {
      $(this).addClass("error");
    }
  });

  $("#voucher").on("input", function () {
    const value = $(this).val();
    if (value.length >= 8) {
      $(this).removeClass("error");
    }
  });

  //REMOVER TUDO QUE TA AQUI
  $("form").submit(function (e) {
    e.preventDefault();
    $(location).attr("href", "admin/index.html");
  });
  //ATE AQUI
});
