---
title: Planning as Denoising
category: research
filed: 2025-05-01
stack: [PyTorch, Diffusion Models, Offline RL, Neuro-Symbolic AI, Gymnasium]
outcome: Diffusion-based neuro-symbolic planner that matches or beats BC, DT, and PPO on a custom drone-navigation benchmark.
repo: https://github.com/AyushGupta235/planning-as-denoising
featured: true
order: 1
---

Proposed the **Symbolic Decision Diffuser (SDD)** — a neuro-symbolic architecture that reframes planning as a denoising problem. A diffusion model iteratively refines a noisy action trajectory into a coherent plan, conditioned on symbolic object-centric scene representations and a return-to-go signal. Built a custom 3D drone navigation environment with energy constraints, no-fly zones, and dynamic weather. Trained via a three-stage curriculum from basic goal-reaching to full stochastic complexity. SDD matches or outperforms Behavior Cloning, Decision Transformer, and PPO baselines while offering interpretability through symbolic attention visualization and FOL rule induction.
