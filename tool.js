// Hemra tool: Upload → Confirm → Results. Runs the model locally in the browser.
const ABOUT = {
  Neutrophil: "The most abundant white blood cell and the body's main defense against infection. Mature cells have a segmented nucleus; younger \"band\" forms have a curved, unsegmented one.",
  Lymphocyte: "A small cell with a round nucleus and little cytoplasm. Includes B cells and T cells, which fight germs and target abnormal cells.",
  Monocyte: "The largest circulating white blood cell, with an irregular, often folded nucleus. Kills germs and clears away dead cell debris.",
  Eosinophil: "Usually a two-lobed nucleus with orange-red granules. Defends against parasites and is involved in allergic reactions."
};
const ORDER = ["Neutrophil", "Lymphocyte", "Monocyte", "Eosinophil"];
const $ = id => document.getElementById(id);
const input = $("file"), drop = $("drop"), preview = $("preview");

$("samples").innerHTML = ORDER.map(n => `
  <button class="sample" type="button" data-src="samples/${n.toLowerCase()}.jpg" aria-describedby="tip-${n}">
    ${n}
    <span class="tip" role="tooltip" id="tip-${n}">
      <img src="samples/${n.toLowerCase()}.jpg" alt="" loading="lazy">
      <span><strong>${n}</strong>${ABOUT[n]}<em>Click to analyze this sample</em></span>
    </span>
  </button>`).join("");

let model;
const ready = tmImage.load("model/model.json", "model/metadata.json")
  .then(m => { model = m; $("status").textContent = "Model ready · runs on your device"; })
  .catch(e => { console.error(e); $("status").textContent = "The model couldn't load. Refresh to try again."; });

function go(step) {
  [1, 2, 3].forEach(n => $("v" + n).hidden = n !== step);
  document.querySelectorAll("#steps li").forEach((li, i) => li.classList.toggle("on", i < step));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function load(src) {
  $("err").hidden = true;
  preview.onload = () => go(2);
  preview.onerror = () => { $("err").textContent = "That image couldn't be read. Try a JPG or PNG."; $("err").hidden = false; };
  preview.src = src;
}

function handleFile(f) {
  input.value = ""; // so choosing the same file again still works
  if (!f) return;
  if (!f.type.startsWith("image/")) { $("err").textContent = "That file isn't an image. Use a JPG, PNG or WebP."; $("err").hidden = false; return; }
  load(URL.createObjectURL(f));
}

async function analyze() {
  const btn = $("analyze");
  btn.disabled = true; btn.textContent = "Analyzing…";
  await ready;
  btn.disabled = false; btn.textContent = "Analyze image";
  if (!model) return;
  // Score a full-resolution copy so results never depend on the on-screen image size.
  const canvas = document.createElement("canvas");
  canvas.width = preview.naturalWidth; canvas.height = preview.naturalHeight;
  canvas.getContext("2d").drawImage(preview, 0, 0);
  const preds = (await model.predict(canvas)).sort((a, b) => b.probability - a.probability);
  const best = preds[0], p = best.probability;
  const notCell = flat(canvas);
  $("topName").textContent = notCell ? "Not a cell image" : best.className;
  $("badge").textContent = notCell ? "No match" : p >= .8 ? "Strong match" : p >= .5 ? "Moderate match" : "Uncertain";
  $("thumb").src = preview.src;
  $("bars").innerHTML = preds.map((x, i) => `
    <div class="bar${i ? "" : " best"}"><span>${x.className}</span><div class="track"><div class="fill" data-w="${x.probability * 100}"></div></div><em>${Math.round(x.probability * 100)}%</em></div>`).join("");
  $("about").textContent = notCell
    ? "This doesn't look like a microscope image. Hemra always picks one of four cell types, so this result isn't meaningful."
    : p < .5
    ? "No cell type stands out. The image may be blurry, use a different stain, show several cells, or not be a white blood cell."
    : p < .8
    ? "Only a moderate match. Check the image shows a single stained white blood cell. " + ABOUT[best.className]
    : ABOUT[best.className];
  go(3);
  requestAnimationFrame(() => requestAnimationFrame(() => document.querySelectorAll(".fill").forEach(f => f.style.width = f.dataset.w + "%")));
}

// True when an image has almost no detail (e.g. a blank or single-colour picture).
function flat(canvas) {
  const s = document.createElement("canvas"); s.width = s.height = 64;
  const g = s.getContext("2d"); g.drawImage(canvas, 0, 0, 64, 64);
  const d = g.getImageData(0, 0, 64, 64).data;
  let sum = 0, sq = 0, n = d.length / 4;
  for (let i = 0; i < d.length; i += 4) { const v = (d[i] + d[i + 1] + d[i + 2]) / 3; sum += v; sq += v * v; }
  return Math.sqrt(sq / n - (sum / n) ** 2) < 6;
}

function reset() { input.value = ""; preview.removeAttribute("src"); go(1); }

input.addEventListener("change", e => handleFile(e.target.files[0]));
drop.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } });
["dragenter", "dragover"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", e => handleFile(e.dataTransfer.files[0]));
$("samples").addEventListener("click", e => { const b = e.target.closest(".sample"); if (b) load(b.dataset.src); });
$("analyze").addEventListener("click", analyze);
$("change").addEventListener("click", reset);
$("again").addEventListener("click", reset);
