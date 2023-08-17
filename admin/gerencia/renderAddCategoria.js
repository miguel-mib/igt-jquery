$(document).ready(function () {
  const categorias = [];
  renderCategorias();

  function renderCategorias() {
    const categoriasParent = $(".categorias");
    categoriasParent.empty();

    categorias.forEach((categoriaWrapper) => {
      categoriaWrapper.find(".add-btn").remove();
    });

    categorias.forEach((categoriaWrapper, index) => {
      const eUltimo = index === categorias.length - 1;

      const $input = categoriaWrapper.find("input");
      $input.on("blur", onBlurHandle);

      const $botaoDelete = categoriaWrapper.find(".delete-btn");
      $botaoDelete.on("click", () => {
        categorias.splice(index, 1);
        renderCategorias();
      });

      if (eUltimo) {
        const $addButton = $("<button>")
          .attr("type", "button")
          .addClass("add-btn")
          .text("+")
          .on("click", appendCategoria);

        categoriaWrapper.append($addButton);
      }

      categoriaWrapper.toggleClass("last", eUltimo);
      categoriaWrapper.attr("id", index);
      categoriasParent.append(categoriaWrapper);
    });

    if (categorias.length === 0) {
      const $botaoAdd = $("<button>")
        .attr("type", "button")
        .on("click", appendCategoria)
        .addClass("default-add-btn")
        .text("Adicionar categoria");
      categoriasParent.append($botaoAdd);
    }
  }

  function onBlurHandle(event) {
    const $input = $(event.target);
    const value = $input.val();
    $input.toggleClass("input-error", value.length === 0);
  }

  function appendCategoria() {
    const $input = $("<input>")
      .attr("type", "text")
      .attr("placeholder", "Categoria")
      .attr("name", "categoria-input")
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
      .addClass("categoria-wrapper")
      .append($input, $botaoDelete);

    categorias.push($turmaWrapper);
    renderCategorias();
  }
});
