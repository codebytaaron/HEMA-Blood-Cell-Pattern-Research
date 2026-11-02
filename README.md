# Hemra · Blood Cell Pattern Research

**Live:** https://hemra-research.vercel.app/

A free, browser-based tool that scores a microscope image of a white blood cell against four learned types: **Eosinophil, Lymphocyte, Monocyte, Neutrophil**. Runs entirely in the browser; nothing is uploaded.

## About
- Classifies a single white blood cell image as eosinophil, lymphocyte, monocyte or neutrophil, entirely in the browser.
- Trained on pathologist-labelled images from the Acevedo et al. dataset (see Credits); 97.5% on 960 held-out test images from the same dataset.
- All images come from one hospital, one stain and one analyzer, from donors without infection, blood disease or cancer. Expect lower accuracy elsewhere.
- Details: [research page](https://hemra-research.vercel.app/research.html). Terms: [terms page](https://hemra-research.vercel.app/terms.html).

## Run
Static site: `index.html`, `style.css`, `app.js`. Serve with any static server, e.g. `python3 -m http.server`.

## Credits and sources
1. Acevedo A, Merino A, Alférez S, Molina Á, Boldú L, Rodellar J. A dataset of microscopic peripheral blood cell images for development of automatic recognition systems. *Data in Brief*. 2020;30:105474. https://doi.org/10.1016/j.dib.2020.105474
2. Dataset: Mendeley Data, https://doi.org/10.17632/snkd93bnjr.1, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: four-class subset, cropped and resized. Sample images in `samples/` are unmodified files from this dataset. The authors have not endorsed this project.
3. MedlinePlus (U.S. National Library of Medicine), [Blood Differential](https://medlineplus.gov/lab-tests/blood-differential/).
4. [Haematologica Atlas of Hematologic Cytology](https://digital.haematologica.org/wp-content/uploads/flipbook/48/files/basic-html/page21.html), normal peripheral blood cells.

**For research and education only. Not a medical device; does not diagnose any condition.**
