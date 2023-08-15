$(document).ready(function () {
  const nomePattern = /^.{4,}$/;
  const telPattern = /^\d{10,}$/;
  const fotoPattern = /\.(jpg|jpeg|png|gif|bmp)$/i;
  const turmaPattern = (value) =>
    [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].includes(
      parseInt(value)
    );
  const categoriaPattern = (value) =>
    [0, 1, 2, 3, 4, 5, 6].includes(parseInt(value));

  // Listeners "representante-nome-input"
  const $nomeRepresentante = $('input[name="representante-nome-input"]');
  $nomeRepresentante.on("blur", function () {
    const value = $(this).val();
    $(this).toggleClass("input-error", !nomePattern.test(value));
  });

  $nomeRepresentante.on("input", function () {
    const value = $(this).val();
    if (nomePattern.test(value)) {
      $(this).removeClass("input-error");
    }
  });

  // Listeners "representante-tel-input"
  const $telRepresentante = $('input[name="representante-tel-input"]');
  $telRepresentante.on("blur", function () {
    const value = $(this).val();
    $(this).toggleClass("input-error", !telPattern.test(value));
  });

  $telRepresentante.on("input", function () {
    const value = $(this).val();
    if (telPattern.test(value)) {
      $(this).removeClass("input-error");
    }
  });

  // Listeners "representante-turma-select"
  const $turmaRepresentante = $('select[name="representante-turma-select"]');
  $turmaRepresentante.on("blur", function () {
    const value = $(this).val();
    $(this).toggleClass("input-error", !turmaPattern(value));
  });

  $turmaRepresentante.on("change", function () {
    $(this).css("color", "#000");
    $(this).css("font-weight", "500");
    const value = $(this).val();
    $(this).toggleClass("input-error", !turmaPattern(value));
  });

  // Listeners "representante-foto-input"
  const $fotoRepresentante = $('input[name="representante-foto-input"]');
  const $labelFotoRepresentante = $(".label__foto");

  $fotoRepresentante.on("click", function () {
    const value = $(this).val();
    console.log(value);
    $($labelFotoRepresentante).toggleClass(
      "input-error",
      !fotoPattern.test(value)
    );

    const labelValue = fotoPattern.test(value) ? value : "Arquivo inválido.";
    $($labelFotoRepresentante).text(labelValue);
  });

  $fotoRepresentante.on("change", function () {
    const value = $(this).val();
    $($labelFotoRepresentante).toggleClass(
      "input-error",
      !fotoPattern.test(value)
    );

    const labelValue = fotoPattern.test(value) ? value : "Arquivo inválido.";
    $($labelFotoRepresentante).text(labelValue);
  });

  // Listeners "categoria-select"
  const $categoriaSelect = $('select[name="categoria-select"]');
  $categoriaSelect.on("blur", function () {
    const value = $(this).val();
    $(this).toggleClass("input-error", !categoriaPattern(value));
  });

  $categoriaSelect.on("change", function () {
    $(this).css("color", "#000");
    $(this).css("font-weight", "500");
    const value = $(this).val();
    $(this).toggleClass("input-error", !categoriaPattern(value));
  });

  // Listeners "resumo-textarea"
  const $resumoApresentacao = $('textarea[name="resumo-textarea"]');
  $resumoApresentacao.on("blur", function () {
    const value = $(this).val();
    $(this).toggleClass("input-error", value.length < 10);
  });

  $resumoApresentacao.on("input", function () {
    const value = $(this).val();
    console.log(value)
    if (value.length >= 10) {
      $(this).removeClass("input-error");
    }
  });
});
