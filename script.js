// Theme toggle (remembered between visits)
const toggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light", light);
  toggle.textContent = light ? "🌞" : "🌙";
  toggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
applyTheme(saved === "light" ? "light" : "dark");

toggle.addEventListener("click", () => {
  const next = document.body.classList.contains("light") ? "dark" : "light";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Live date and time in the footer
const dt = document.getElementById("datetime");
function tick() {
  dt.textContent = new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "medium" });
}
tick();
setInterval(tick, 1000);

// Show initials if the profile photo is missing
const avatar = document.querySelector("img.avatar");
function showInitials() {
  const box = document.createElement("div");
  box.className = "avatar";
  box.textContent = "PS";
  box.setAttribute("role", "img");
  box.setAttribute("aria-label", "Priyanshu Sharma");
  avatar.replaceWith(box);
}
if (avatar.complete && avatar.naturalWidth === 0) showInitials();
else avatar.addEventListener("error", showInitials);
