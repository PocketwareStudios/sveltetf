# SvelteTF

## this is a typescript version of the library built by John Kane: https://github.com/john--kane/svelteml

## :warning: W.I.P. not ready for production use :warning:

![sveltetf](https://raw.githubusercontent.com/eksohinc/sveltetf/main/static/sveltetf.png)

## Overview 🤖 📖

The purpose of SvelteTF is to offer simple Components that can make ML more accessible. It leverages TensorflowJS to offer Svelte apps ML features out-of-the-box. It relies heavily on Svelte's reactivity feature and event hooks can be used to extend out the ML flow. e.g. on:poses in the Pose Estimator will give you the raw poses directfrom TensorflowJS.

## Quick Start

    npm install sveltetf --save

## What's inside?

### Classification / Segmentation

- [x] Image Classification
- [x] Body Segmentation
- [x] Basic Multi-Pose Estimation
- [x] Object Detection

### Text-based inference

- [x] Sentence Encoding
- [x] Text Toxicity
- [x] Question and Answers

### Image Effects

- [x] Blur Body Parts
- [x] Bokeh Effect
- [x] Face Landmarks Detection
- [x] Hand Pose Detection

## Experiments

- [ ] Switching to Lerna for multiple repos so the lib can expand in the different areas. Also helpful for tfjs3 when it will have code-splitting 😃
  - [ ] @sveltetf/ui
  - [ ] @sveltetf/classification
  - [ ] @sveltetf/segmentation
  - [ ] @sveltetf/automl
  - [ ] @sveltetf/text
  - [ ] @sveltetf/audio
- [ ] Unlock slots with Facial recognition, maybe use faceapi.js
- [ ] Demo site for more details
- [ ] Audio and speech recognition features
- [ ] Additional models using the lower level tfjs apis
- [ ] .... and a few other top secret ideas 🤭

## Note

> All Components try to be reactive so although it feels very declarative, it is also reacting to your input.
> Add an issue in Github if you need a specific behaviour or if there is a bug or would like to recommend something. You know the drill.
