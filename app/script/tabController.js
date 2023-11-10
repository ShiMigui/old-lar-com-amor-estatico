const param = new URLSearchParams(window.location.search);
let tab;

if (!param.has("tab")) tab = document.querySelector("tab");
else tab = document.querySelector(`[tab="${param.get("tab")}"]`);

if (tab != null) tab.setAttribute("selected", "true");
document.querySelectorAll(".data-tab").forEach(el => el.textContent = tab.getAttribute("tab"));