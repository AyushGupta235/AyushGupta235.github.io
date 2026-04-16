---
layout: default
title: Projects
---

### Research

---

**[Planning as Denoising](https://github.com/AyushGupta235/planning-as-denoising)** · Python · IIT (BHU) Thesis, 2025

Proposed the **Symbolic Decision Diffuser (SDD)** — a neuro-symbolic architecture that reframes planning as a denoising problem. A diffusion model iteratively refines a noisy action trajectory into a coherent plan, conditioned on symbolic object-centric scene representations and a return-to-go signal. Built a custom 3D drone navigation environment with energy constraints, no-fly zones, and dynamic weather. Trained via a three-stage curriculum from basic goal-reaching to full stochastic complexity. SDD matches or outperforms Behavior Cloning, Decision Transformer, and PPO baselines while offering interpretability through symbolic attention visualization and FOL rule induction.

`PyTorch` `Diffusion Models` `Offline RL` `Neuro-Symbolic AI` `Gymnasium`

---

**[Joint Super-Resolution & Vehicle Detection Network](https://github.com/AyushGupta235/Joint-Super-Resolution-Object-Detection-Network)** · Python · ML Research Internship, CWNU South Korea

Implemented **Joint-SRVDNet** — a GAN-based architecture that jointly trains a super-resolution generator and a vehicle detection network. The generator upscales low-resolution input while the dual discriminators enforce photorealism and detection accuracy. Supports both disjoint pretraining and end-to-end joint fine-tuning with a combined loss weighted by α, β, and γ hyperparameters.

`PyTorch` `GANs` `Super Resolution` `Object Detection` `Computer Vision`

---

**[Radiology Machine Learning](https://github.com/AyushGupta235/Radiology-Machine-Learning)** · Python

Pipeline for medical image segmentation using **TransUNet** — a hybrid CNN-Transformer architecture that combines the local feature extraction of ResNet encoders with the global context modeling of Vision Transformers. Structured with DVC-tracked stages for reproducible training and evaluation.

`PyTorch` `TransUNet` `Medical Imaging` `Segmentation` `DVC`

---

### Applied ML

---

**[LoopGuard](https://github.com/AyushGupta235/loopguard)** · Python

Monitoring framework for agentic fine-tuning pipelines that catches model collapse before it reaches production. When agents generate training data that fine-tunes models that power those same agents, the feedback loop can amplify initialization biases while masking drift — including in the evaluation models. LoopGuard instruments this loop with four detectors: **contamination drift** (rising self-generation ratio across generations), **distributional collapse** (synthetic data converging toward high-probability outputs, tail coverage lost), **reward hacking** (quality scorer inflating while external task metrics flatline), and **evaluation circularity** (eval model correlated with the data it is scoring). Lineage is stored in SQLite or Postgres; the API returns a structured integrity report with actionable flags.

`Python` `Agentic AI` `ML Safety` `Pipeline Monitoring` `Fine-tuning`

---

**[Continuously Learning News Agent](https://github.com/AyushGupta235/Continuously-Learning-News-Agent)** · Python

A self-improving daily news digest that emails a personalized briefing every morning. Ingests from RSS feeds, NewsAPI, Reddit, and Hacker News. Uses Llama 3.3 70B (via Groq) to score, summarize, and compose the digest. Tracks click signals ("Useful" / "Skip") and runs a weekly profile rewrite to evolve the interest model over time. Fully automated via GitHub Actions — no server required for the main pipeline.

`LLMs` `Agentic AI` `Groq` `GitHub Actions` `Feedback Loops`

---

**[Facial Keypoints Detection](https://github.com/AyushGupta235/facial-keypoints-detection)** · Python

Fine-tuned **EfficientNet** for facial keypoint regression. A custom `FacialKeyPointDataset` handles sparse labels (keypoints marked −1 for missing annotations) and the loss masks those entries out during training, so the model is only penalized on visible keypoints. Mixed-precision training with gradient scaling; evaluated with RMSE on a held-out validation split.

`PyTorch` `EfficientNet` `Computer Vision` `Keypoint Detection`

---

**[Football Match Predictor](https://github.com/AyushGupta235/football-predictor)** · Python · [Live Demo](https://football-predictor-i4h7nq5rwlg.streamlit.app)

Predicts Premier League match outcomes using five seasons of historical data scraped from FBRef. Built and serialized a classification model, exposed via a Streamlit web app. Also incorporates FIFA 21 team ratings as features.

`Scikit-learn` `Streamlit` `Web Scraping` `Sports Analytics`

---

**[Object Detection with YOLOv3](https://github.com/AyushGupta235/Object-Detection)** · Python

Real-time object detection script using **YOLOv3** weights loaded through OpenCV's DNN module. Preprocesses frames into 320×320 blobs, runs forward inference, applies confidence thresholding and non-maximum suppression, and draws labelled bounding boxes. CUDA-accelerated via Numba for GPU inference.

`Python` `YOLOv3` `OpenCV` `CUDA` `Object Detection`

---

**[Modern Portfolio Theory](https://github.com/AyushGupta235/modern-portfolio-theory)** · Jupyter

Analysed market efficiency using **Mantegna Asset Trees** — minimum spanning trees built from stock return correlations. Visualizes how asset clusters form and shift, and tests whether observed structure is consistent with an efficient market hypothesis.

`NumPy` `NetworkX` `Financial Modelling` `Econometrics`

---

**[AISafetyGPT](https://github.com/AyushGupta235/AISafetyGPT)** · Python · Streamlit / HuggingFace Spaces

A Streamlit application for exploring AI safety concepts using GPT. Deployed on HuggingFace Spaces.

`Streamlit` `OpenAI` `AI Safety`

---

### From Scratch

---

**[SP-GPT](https://github.com/AyushGupta235/SP-GPT)** · Python

Built and trained a ~1M parameter GPT from scratch on Shakespeare texts using a character-level tokenizer. Implemented the full transformer architecture — self-attention, residual blocks, layer norm — in raw PyTorch. Trained locally on an M1 MacBook Air. A BiGram baseline is included for comparison.

`PyTorch` `Transformers` `Language Modelling` `From Scratch`

---

**[Mini-AlexNet](https://github.com/AyushGupta235/Mini-AlexNet)** · Jupyter

A miniature reimplementation of AlexNet adapted for 32×32 RGB inputs. Built in TensorFlow for experimentation and learning — not optimized for production use.

`TensorFlow` `CNNs` `Computer Vision` `From Scratch`
