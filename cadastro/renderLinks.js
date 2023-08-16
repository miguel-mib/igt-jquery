$(document).ready(function () {
  const links = [];
  renderLinks();

  function renderLinks() {
    const linksParent = $(".links");
    linksParent.empty();

    links.forEach((linkWrapper) => {
      linkWrapper.find(".add-btn").remove();
    });

    links.forEach((linkWrapper, index) => {
      const eUltimo = index === links.length - 1;

      const $input = linkWrapper.find("input");
      $input.on("blur", onBlurHandle);

      const $botaoDelete = linkWrapper.find(".delete-btn");
      $botaoDelete.on("click", () => {
        links.splice(index, 1);
        renderLinks();
      });

      if (eUltimo) {
        const $addButton = $("<button>")
          .attr("type", "button")
          .addClass("add-btn")
          .text("+")
          .on("click", appendLink);

        linkWrapper.append($addButton);
      }

      linkWrapper.toggleClass("last", eUltimo);
      linkWrapper.attr("id", index);
      linksParent.append(linkWrapper);
    });

    if (links.length === 0) {
      const $botaoAdd = $("<button>")
        .attr("type", "button")
        .on("click", appendLink)
        .addClass("default-add-btn")
        .text("Adicionar link");
      linksParent.append($botaoAdd);
    }
  }

  function onBlurHandle(event) {
    const validarLink = (link) => {
      try {
        const url = new URL(link);
        return url.hostname !== "";
      } catch (error) {
        return false;
      }
    };

    const $input = $(event.target);
    const value = $input.val();
    $input.toggleClass("input-error", !validarLink(value));
  }

  function appendLink() {
    const $input = $("<input>")
      .attr("type", "url")
      .attr("placeholder", "Link")
      .attr("name", "link-input")
      .on("blur", onBlurHandle)
      .addClass("form-input");

    const $botaoDelete = $("<button>")
      .attr("type", "button")
      .addClass("delete-btn");

    $.ajax({
      url: "/assets/delete-icon.svg",
      dataType: "text",
      success(svgContent) {
        $botaoDelete.html(svgContent);
      },
    });

    const $linksWrapper = $("<div></div>")
      .addClass("links-wrapper")
      .append($input, $botaoDelete);

    links.push($linksWrapper);
    renderLinks();
  }
});
