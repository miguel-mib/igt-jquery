$(document).ready(function () {
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

      const $input = integranteWrapper.find("input");
      $input.on("blur", nomeOnBlurHandle);

      const $botaoDelete = integranteWrapper.find(".buttons__wrapper .delete-btn");
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

  function nomeOnBlurHandle(event) {
    const $input = $(event.target);
    const value = $input.val();
    $input.toggleClass("input-error", value.length < 3);
  }

  function telOnBlurHandle(event) {
    const $input = $(event.target);
    const value = $input.val();
    $input.toggleClass("input-error", value.length < 9);
  }

  function appendIntegrante() {
    const $nomeInput = $("<input>", {
      type: "text",
      placeholder: "Nome completo",
      name: "integrante-nome",
      class: "form-input",
    }).on("blur", nomeOnBlurHandle);

    const $turmaSelect = $("<select>", {
      title: "turma",
      class: "form-input",
    });

    $("<option>", {
      value: "",
      disabled: "disabled",
      hidden: "hidden",
      selected: "selected",
      text: "Turma",
    }).appendTo($turmaSelect);

    const turmaOptions = [
      "M01",
      "M02",
      "M03",
      "M05",
      "M06",
      "M07",
      "M08",
      "M09",
      "M10",
      "M11",
      "M12",
      "M13",
      "M14",
      "M15",
      "M16",
      "M17",
    ];

    $.each(turmaOptions, function (index, value) {
      $("<option>", {
        value: value,
        text: value,
      }).appendTo($turmaSelect);
    });

    const $fotoLabel = $("<label>", {
      for: "foto",
      class: "label__foto",
      text: "Foto - Preferencialmente 3x4",
    });

    const $fotoInput = $("<input>", {
      type: "file",
      placeholder: "Foto",
      id: "foto",
      class: "input__foto form-input",
      accept: "image/*",
    });

    const $botaoDelete = $("<button>")
      .attr("type", "button")
      .addClass("delete-btn");

    const $buttonsWrapper = $("<div>", {
      class: "buttons__wrapper",
    })
    $buttonsWrapper.append($botaoDelete)

    $.ajax({
      url: "../assets/delete-icon.svg",
      dataType: "text",
      success(svgContent) {
        $botaoDelete.html(svgContent);
      },
    });

    const $integranteWrapper = $("<div></div>")
      .addClass("integrantes-wrapper")
      .append(
        $nomeInput,
        $turmaSelect,
        $fotoLabel,
        $fotoInput,
        $buttonsWrapper
      );

    integrantes.push($integranteWrapper);
    renderIntegrantes();
  }
});
