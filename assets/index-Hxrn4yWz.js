(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const i of t.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && o(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function o(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = s(e);
    fetch(e.href, t);
  }
})();
function d(r) {
  return [...r].map((n, s) => r.charCodeAt(s)).join("-");
}
function a(r, n, s = !1) {
  const o = s ? (26 - n) % 26 : n,
    e = o > 0 ? o : 26 + (o % 26);
  return [...r]
    .map((t, i) => {
      const c = r.charCodeAt(i);
      return c >= 65 && c <= 90
        ? String.fromCharCode(((c - 65 + e) % 26) + 65)
        : c >= 97 && c <= 122
        ? String.fromCharCode(((c - 97 + e) % 26) + 97)
        : t;
    })
    .join("");
}
function m(r) {
  return r
    .split("-")
    .map((s) => String.fromCharCode(s))
    .join("");
}
function y(r) {
  return r.split("-").length > 1 || parseInt(r) === !0;
}
async function p(r) {
  try {
    await navigator.clipboard.writeText(r);
  } catch (n) {
    console.error("Failed to copy: ", n);
  }
}
$(document).ready(() => {
  const r = $(".example-test"),
    n = $("#copy-tooltip");
  r.on("click", () => {
    p(r.text()),
      n.removeClass("tooltip-hide"),
      n.fadeIn(),
      setTimeout(function () {
        n.fadeOut();
      }, 2e3);
  }),
    $("#output-type-section").hide();
  const s = $(".result-container").hide(),
    o = $(".result-text");
  o.on("click", () => {
    p(o.text()), o.addClass("copied");
  }),
    $("#encrypt-select").change(() => {
      $("#encrypt-select").val() === "encrypt"
        ? $("#output-type-section").fadeIn()
        : $("#output-type-section").fadeOut();
    }),
    $("#cipher-form").on("submit", (e) => {
      e.preventDefault(), s.hide(), o.removeClass("copied"), o.text("");
      const t = $("#text-input").val(),
        i = $("#shift").val(),
        c = parseInt(i);
      if ($("#encrypt-select").val() === "decrypt")
        if (y(t)) {
          const u = m(t),
            l = a(u, c, !0);
          o.text(l);
        } else {
          const u = a(t, c, !0);
          o.text(u);
        }
      else {
        const u = $("#output-type").val(),
          l = a(t, c);
        if (u === "numbers") {
          const f = d(l);
          o.text(f);
        } else o.text(l);
      }
      s.show();
    });
});
