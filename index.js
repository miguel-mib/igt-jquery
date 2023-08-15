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
});
