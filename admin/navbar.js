$(document).ready(function () {
  const toggleNav = () => {
    $(".hamb").toggleClass("ativo");
    $(".nav").toggleClass("ativo");
    $(".main").attr("tabindex", (_, tabindex) => (tabindex == 0 ? null : 0));
  };

  $(".hamb-bg").click(toggleNav);
  $(".main").focus(toggleNav);
});
