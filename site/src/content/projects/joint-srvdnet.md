---
title: Joint Super-Resolution & Vehicle Detection Network
category: research
filed: 2023-08-01
stack: [PyTorch, GANs, Super Resolution, Object Detection, Computer Vision]
outcome: GAN that jointly trains super-resolution and vehicle detection with dual discriminators.
repo: https://github.com/AyushGupta235/Joint-Super-Resolution-Object-Detection-Network
order: 2
---

Implemented **Joint-SRVDNet** — a GAN-based architecture that jointly trains a super-resolution generator and a vehicle detection network. The generator upscales low-resolution input while the dual discriminators enforce photorealism and detection accuracy. Supports both disjoint pretraining and end-to-end joint fine-tuning with a combined loss weighted by α, β, and γ hyperparameters. Built during an ML research internship at CWNU, South Korea.
