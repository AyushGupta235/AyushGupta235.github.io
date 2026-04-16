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

**[Continuously Learning News Agent](https://github.com/AyushGupta235/Continuously-Learning-News-Agent)** · Python

A self-improving daily news digest that emails a personalized briefing every morning. Ingests from RSS feeds, NewsAPI, Reddit, and Hacker News. Uses Llama 3.3 70B (via Groq) to score, summarize, and compose the digest. Tracks click signals ("Useful" / "Skip") and runs a weekly profile rewrite to evolve the interest model over time. Fully automated via GitHub Actions — no server required for the main pipeline.

`LLMs` `Agentic AI` `Groq` `GitHub Actions` `Feedback Loops`

---

**[Football Match Predictor](https://github.com/AyushGupta235/football-predictor)** · Python · [Live Demo](https://football-predictor-i4h7nq5rwlg.streamlit.app)

Predicts Premier League match outcomes using five seasons of historical data scraped from FBRef. Built and serialized a classification model, exposed via a Streamlit web app. Also incorporates FIFA 21 team ratings as features.

`Scikit-learn` `Streamlit` `Web Scraping` `Sports Analytics`

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
