$(document).ready(function () {
  const turmas = [];
  renderTurmas();

  function renderTurmas() {
    const turmasParent = $(".turmas");
    turmasParent.empty();

    turmas.forEach((turmaWrapper) => {
      turmaWrapper.find(".add-btn").remove();
    });

    turmas.forEach((turmaWrapper, index) => {
      const eUltimo = index === turmas.length - 1;

      const $input = turmaWrapper.find("input");
      $input.on("blur", onBlurHandle);

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
      .attr("name", "turma-input")
      .on("blur", onBlurHandle)
      .addClass("form-input");

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
      .append($input, $botaoDelete);

    turmas.push($turmaWrapper);
    renderTurmas();
  }
});
