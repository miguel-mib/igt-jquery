$(document).ready(function () {
  const nomePattern = /^.{4,}$/;
  const telPattern = /^\d{10,}$/;
  const turmaPattern = (value) =>
    [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].includes(
      parseInt(value)
    );

  const integrantes = [];
  renderIntegrantes();

  function renderIntegrantes() {
    const integrantesParent = $(".integrantes");
    integrantesParent.empty();

    integrantes.forEach((integranteWrapper) => {
      integranteWrapper.find(".buttons__wrapper .add-btn").remove();
    });

    integrantes.forEach((integranteWrapper, index) => {
      const eUltimo = index === integrantes.length - 1;

      integranteWrapper
        .find('input[name="integrante-nome-input"]')
        .on("blur", nomeOnBlurHandle)
        .on("input", nomeOnInputHandle);

      integranteWrapper
        .find('input[name="integrante-tel-input"]')
        .on("blur", telOnBlurHandle)
        .on("input", telOnInputHandle);

      integranteWrapper
        .find('select[name="integrante-turma"]')
        .on("blur", turmaOnBlurHadle)
        .on("change", turmaOnChangeHadle);

      const $input = integranteWrapper.find("input");
      $input.on("blur", nomeOnBlurHandle);

      const $botaoDelete = integranteWrapper.find(
        ".buttons__wrapper .delete-btn"
      );
      $botaoDelete.on("click", () => {
        integrantes.splice(index, 1);
        renderIntegrantes();
      });

      if (eUltimo) {
        const $addButton = $("<button>")
          .attr("type", "button")
          .addClass("add-btn")
          .text("+")
          .on("click", appendIntegrante);

        integranteWrapper.find(".buttons__wrapper").append($addButton);
      }

      integranteWrapper.toggleClass("last", eUltimo);
      integranteWrapper.attr("id", index);
      integrantesParent.append(integranteWrapper);
    });

    if (integrantes.length === 0) {
      const $botaoAdd = $("<button>")
        .attr("type", "button")
        .on("click", appendIntegrante)
        .addClass("default-add-btn")
        .text("Adicionar integrante");
      integrantesParent.append($botaoAdd);
    }
  }

  function nomeOnBlurHandle() {
    const value = $(this).val();
    $(this).toggleClass("input-error", !nomePattern.test(value));
  }

  function nomeOnInputHandle() {
    const value = $(this).val();
    if (nomePattern.test(value)) {
      $(this).removeClass("input-error");
    }
  }

  function telOnBlurHandle() {
    const value = $(this).val();
    $(this).toggleClass("input-error", !telPattern.test(value));
  }

  function telOnInputHandle() {
    const value = $(this).val();
    if (telPattern.test(value)) {
      $(this).removeClass("input-error");
    }
  }

  function turmaOnBlurHadle() {
    const value = $(this).val();
    $(this).toggleClass("input-error", !turmaPattern(value));
  }

  function turmaOnChangeHadle() {
    $(this).css("color", "#000");
    $(this).css("font-weight", "500");
    const value = $(this).val();
    $(this).toggleClass("input-error", !turmaPattern(value));
  }

  function appendIntegrante() {
    const $nomeInput = $("<input>", {
      type: "text",
      placeholder: "Nome completo",
      name: "integrante-nome-input",
      class: "form-input",
    });

    const $telInput = $("<input>", {
      type: "tel",
      placeholder: "Telefone",
      name: "integrante-tel-input",
      class: "form-input",
    });

    const $turmaSelect = $("<select>", {
      title: "turma",
      class: "form-input",
      name: "integrante-turma",
    });

    $("<option>", {
      value: "",
      disabled: "disabled",
      hidden: "hidden",
      selected: "selected",
      text: "Turma",
    }).appendTo($turmaSelect);

    const turmaOptions = [
      "01",
      "02",
      "03",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
    ];

    $.each(turmaOptions, function (index, value) {
      $("<option>", {
        value: value,
        text: `M${value}`,
      }).appendTo($turmaSelect);
    });

    const $botaoDelete = $("<button>")
      .attr("type", "button")
      .addClass("delete-btn");

    const $buttonsWrapper = $("<div>", {
      class: "buttons__wrapper",
    });
    $buttonsWrapper.append($botaoDelete);

    $.ajax({
      url: "../assets/delete-icon.svg",
      dataType: "text",
      success(svgContent) {
        $botaoDelete.html(svgContent);
      },
    });

    const $integranteWrapper = $("<div></div>")
      .addClass("integrantes-wrapper")
      .append($nomeInput, $telInput, $turmaSelect, $buttonsWrapper);

    integrantes.push($integranteWrapper);
    renderIntegrantes();
  }
});
