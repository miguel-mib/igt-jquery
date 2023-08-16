$(document).ready(function () {
  $(".hamburguer").on("click", function () {
    $(this).toggleClass("ativo");
  });

  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();
    const pendentesPosition = $(".pedidos-pendentes").height();
    const estaEmPendentes = scrollPosition < pendentesPosition - 200;

    $('.pedidos-atalho a[href*="pendentes"]').toggleClass("ativo", estaEmPendentes);
    $('.pedidos-atalho a[href*="aceitos"]').toggleClass("ativo", !estaEmPendentes);
  });
});
