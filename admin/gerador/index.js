$(document).ready(function () {
  $(".voucher-form").on("submit", function (event) {
    event.preventDefault();
    const qnt = $("#qnt").val();
    const $vouchersUl = $("ul");
    $vouchersUl.empty();
    const vouchers = voucher_codes.generate({
      length: 8,
      count: qnt,
    });

    vouchers.forEach((voucher, index) => {
      const $voucherLi = $("<li>", {
        text: voucher,
        id: index,
      });

      $vouchersUl.append($voucherLi);
    });

    const blobContent = vouchers.join(" | ")
    const blob = new Blob([blobContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const $fileLink = $("<a>", {
      href: url,
      download: "vouchers.txt",
      class: "file-link",
    });

    $("body").append($fileLink);
    document.querySelector(".file-link").click();
    $($fileLink).remove();
    URL.revokeObjectURL(url);
  });
});
