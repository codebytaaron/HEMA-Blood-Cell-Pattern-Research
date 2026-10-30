# HEMA · Blood Cell Pattern Research

**Live:** https://codebytaaron.github.io/HEMA-Blood-Cell-Pattern-Research/

A free, browser-based tool that scores a microscope image of a white blood cell against four learned types: **Eosinophil, Lymphocyte, Monocyte, Neutrophil**. Runs entirely in the browser; nothing is uploaded.

## Model (v2)
- MobileNet feature extractor (from the original Teachable Machine export) with a retrained classification head, in TensorFlow.js (`model/`).
- Data: 4,784 images (≈1,200 per class; neutrophils are about half band, half segmented) from the Acevedo et al. dataset (see Credits), via the copy at [Bbennett21/White-Blood-Cell-Classification](https://github.com/Bbennett21/White-Blood-Cell-Classification). 3,827 train (with horizontal-flip augmentation), 957 held out.
- Held-out test (957 images): **97.8% overall**: Eosinophil 233/238, Lymphocyte 235/239, Monocyte 231/240, Neutrophil 237/240.
- v1 (Teachable Machine, 200/class) scored 69% on the same test set, with monocytes at 7.9%.
- The split is random by image, not by patient. All images come from one hospital, one stain (May Grünwald-Giemsa) and one analyzer (CellaVision DM96), and only from people without infection, blood disease or cancer, so accuracy on other images will be lower.

## Run
Static site: `index.html`, `style.css`, `app.js`. Serve with any static server, e.g. `python3 -m http.server`.

## Credits and sources
1. Acevedo A, Merino A, Alférez S, Molina Á, Boldú L, Rodellar J. A dataset of microscopic peripheral blood cell images for development of automatic recognition systems. *Data in Brief*. 2020;30:105474. https://doi.org/10.1016/j.dib.2020.105474
2. Dataset: Mendeley Data, https://doi.org/10.17632/snkd93bnjr.1, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: four-class subset of 4,800 images, centre-cropped and resized to 224 × 224. Sample images in `samples/` are unmodified files from this dataset. The authors have not endorsed this project.
3. MedlinePlus (U.S. National Library of Medicine), [Blood Differential](https://medlineplus.gov/lab-tests/blood-differential/).
4. [Haematologica Atlas of Hematologic Cytology](https://digital.haematologica.org/wp-content/uploads/flipbook/48/files/basic-html/page21.html), normal peripheral blood cells.

**For research and education only. Not a medical device; does not diagnose any condition.**
