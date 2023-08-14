$(document).ready(function () {
  let inputHasTouched = false;
  $("#voucher").on("blur", function () {
    inputHasTouched = true;
    const value = $(this).val();
    if (value.length < 8) {
      $(this).addClass("error");
    } else {
      $(this).removeClass("error");
    }
  });

  $("#voucher").on("input", function () {
    const value = $(this).val();
    if (value.length >= 8) {
      $(this).removeClass("error");
    }
  });
});
