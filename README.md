# Hemra · Blood Cell Pattern Research

**Live:** https://hemra-research.vercel.app/

A free, browser-based tool that scores a microscope image of a white blood cell against four learned types: **Eosinophil, Lymphocyte, Monocyte, Neutrophil**. Runs entirely in the browser; nothing is uploaded.

## Model
- MobileNetV2 feature extractor (frozen, from a Teachable Machine export) with a retrained two-layer classifier, in TensorFlow.js (`model/`).
- Data: 4,800 images (1,200 per class) from the Acevedo et al. dataset (see Credits). Every fifth image per class held out: 3,840 train / 960 test. The exact split is in `research/split.txt`.
- Test result: **936/960 (97.5%)**: Eosinophil 236, Lymphocyte 229, Monocyte 237, Neutrophil 234 (of 240 each). The first Teachable Machine model scored 670/960 (69.8%) on the same images.
- All images come from one hospital, one stain and one analyzer, from donors without infection, blood disease or cancer, and the split is by image, not by person. Expect lower accuracy elsewhere.
- Full write-up: [research page](https://hemra-research.vercel.app/research.html).

## Run
Static site: `index.html`, `style.css`, `app.js`. Serve with any static server, e.g. `python3 -m http.server`.

## Credits and sources
1. Acevedo A, Merino A, Alférez S, Molina Á, Boldú L, Rodellar J. A dataset of microscopic peripheral blood cell images for development of automatic recognition systems. *Data in Brief*. 2020;30:105474. https://doi.org/10.1016/j.dib.2020.105474
2. Dataset: Mendeley Data, https://doi.org/10.17632/snkd93bnjr.1, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: four-class subset of 4,800 images, centre-cropped and resized to 224 × 224. Sample images in `samples/` are unmodified files from this dataset. The authors have not endorsed this project.
3. MedlinePlus (U.S. National Library of Medicine), [Blood Differential](https://medlineplus.gov/lab-tests/blood-differential/).
4. [Haematologica Atlas of Hematologic Cytology](https://digital.haematologica.org/wp-content/uploads/flipbook/48/files/basic-html/page21.html), normal peripheral blood cells.

**For research and education only. Not a medical device; does not diagnose any condition.**
