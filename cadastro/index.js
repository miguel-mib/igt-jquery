$(document).ready(function () {
  $(".form-input").each((index, input) => {
    $(input).on("blur", (event) => {
      const value = $(event.target).val()
      $(input).toggleClass("input-error", value.length <= 0);
    })
  })
});
