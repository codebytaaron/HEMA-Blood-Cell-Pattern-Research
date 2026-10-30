// HEMA homepage: renders the cell cards. The tool itself lives in tool.html / tool.js.
// Each description cites the numbered sources in the page's Sources section.
const CELLS = {
  Neutrophil: { text: "The most abundant white blood cell and the body's main defense against infection. Mature cells have a segmented nucleus; younger \"band\" forms have a curved, unsegmented one.", refs: [3, 4] },
  Lymphocyte: { text: "A small cell with a round nucleus and little cytoplasm. Includes B cells and T cells, which fight germs and target abnormal cells.", refs: [3, 4] },
  Monocyte: { text: "The largest circulating white blood cell, with an irregular, often folded nucleus. Kills germs and clears away dead cell debris.", refs: [3, 4] },
  Eosinophil: { text: "Usually a two-lobed nucleus with orange-red granules. Defends against parasites and is involved in allergic reactions.", refs: [3] }
};
const ORDER = ["Neutrophil", "Lymphocyte", "Monocyte", "Eosinophil"];
const $ = id => document.getElementById(id);
const img = name => `samples/${name.toLowerCase()}.jpg`;
const cite = refs => refs.map(r => `<a class="ref" href="#src${r}">[${r}]</a>`).join("");

$("cellGrid").innerHTML = ORDER.map(n => `
  <div class="cell"><img src="${img(n)}" alt="${n} under a microscope" loading="lazy"><strong>${n}</strong><p>${CELLS[n].text} ${cite(CELLS[n].refs)}</p></div>`).join("");

