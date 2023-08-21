$(document).ready(function () {
  const turmas = [];
  renderTurmas();

  function renderTurmas() {
    const turmasParent = $(".turmas");
    turmasParent.empty();

    turmas.forEach(turmaWrapper => {
      turmaWrapper.find(".add-btn").remove();
    });
    

    turmas.forEach((turmaWrapper, index) => {
      const eUltimo = index === turmas.length - 1;

      const $input = turmaWrapper.find("input");
      $input.on("blur", onBlurHandle);
      $input.attr("name", `turma-input-[${index}]`);

      const $select = turmaWrapper.find("select");
      $select.attr("name", `categoria-select-[${index}]`);

      const $botaoDelete = turmaWrapper.find(".delete-btn");
      $botaoDelete.on("click", () => {
        turmas.splice(index, 1);
        renderTurmas();
      });

      if (eUltimo) {
        const $addButton = $("<button>")
          .attr("type", "button")
          .addClass("add-btn")
          .text("+")
          .on("click", appendTurma);

        turmaWrapper.append($addButton);
      }

      turmaWrapper.toggleClass("last", eUltimo);
      turmaWrapper.attr("id", index);
      turmasParent.append(turmaWrapper);
    });

    if (turmas.length === 0) {
      const $botaoAdd = $("<button>")
        .attr("type", "button")
        .on("click", appendTurma)
        .addClass("default-add-btn")
        .text("Adicionar turma");
      turmasParent.append($botaoAdd);
    }
  }

  function onBlurHandle(event) {
    const $input = $(event.target);
    const value = $input.val();
    $input.toggleClass("input-error", value.length === 0);
  }

  function appendTurma() {
    const $input = $("<input>")
      .attr("type", "text")
      .attr("placeholder", "Turma")
      .on("blur", onBlurHandle)
      .addClass("form-input");

    const $select = $("<select></select>");

    $("<option>", {
      value: "",
      disabled: "disabled",
      hidden: "hidden",
      selected: "selected",
      text: "Curso",
    }).appendTo($select);

    const cursos = ["TIPI", "ADM", "EDF", "MA"];

    $.each(cursos, function (index, value) {
      $("<option>", {
        value: index,
        text: value,
      }).appendTo($select);
    });

    const $botaoDelete = $("<button>")
      .attr("type", "button")
      .addClass("delete-btn");

    $.ajax({
      url: "../../assets/delete-icon.svg",
      dataType: "text",
      success(svgContent) {
        $botaoDelete.html(svgContent);
      },
    });

    const $turmaWrapper = $("<div></div>")
      .addClass("turma-wrapper")
      .append($input, $select, $botaoDelete);

    turmas.push($turmaWrapper);
    renderTurmas();
  }
});
