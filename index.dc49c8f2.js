function t(t, e, o = !1) {
  let n = o ? (26 - e) % 26 : e,
    r = n > 0 ? n : 26 + (n % 26);
  return [...t]
    .map((e, o) => {
      let n = t.charCodeAt(o);
      return n >= 65 && n <= 90
        ? String.fromCharCode(((n - 65 + r) % 26) + 65)
        : n >= 97 && n <= 122
        ? String.fromCharCode(((n - 97 + r) % 26) + 97)
        : e;
    })
    .join("");
}
async function e(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch (t) {
    console.error("Failed to copy: ", t);
  }
}
$(document).ready(() => {
  let o = $("#copy-tooltip").hide(),
    n = $(".example-test");
  n.on("click", () => {
    e(n.text()),
      o.fadeIn(),
      setTimeout(function () {
        o.fadeOut();
      }, 2e3);
  }),
    $("#output-type-section").hide();
  let r = $(".result-container").hide(),
    i = $(".result-text");
  i.on("click", () => {
    e(i.text()), i.addClass("copied");
  }),
    $("#encrypt-select").change(() => {
      "encrypt" === $("#encrypt-select").val()
        ? $("#output-type-section").fadeIn()
        : $("#output-type-section").fadeOut();
    }),
    $("#cipher-form").on("submit", (e) => {
      e.preventDefault(), r.hide(), i.removeClass("copied"), i.text("");
      let o = $("#text-input").val(),
        n = parseInt($("#shift").val());
      if ("decrypt" === $("#encrypt-select").val()) {
        if (o.split("-").length > 1 || !0 === parseInt(o) ? 0 : 1) {
          let e = t(o, n, !0);
          i.text(e);
        } else {
          let e = t(
            o
              .split("-")
              .map((t) => String.fromCharCode(t))
              .join(""),
            n,
            !0
          );
          i.text(e);
        }
      } else {
        let e = $("#output-type").val(),
          r = t(o, n);
        if ("numbers" === e) {
          let t = [...r].map((t, e) => r.charCodeAt(e)).join("-");
          i.text(t);
        } else i.text(r);
      }
      r.show();
    });
});
//# sourceMappingURL=index.dc49c8f2.js.map
