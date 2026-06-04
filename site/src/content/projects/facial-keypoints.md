---
title: Facial Keypoints Detection
category: applied
filed: 2023-09-01
stack: [PyTorch, EfficientNet, Computer Vision, Keypoint Detection]
outcome: Fine-tuned EfficientNet that handles sparse labels via masked loss.
repo: https://github.com/AyushGupta235/facial-keypoints-detection
order: 5
---

Fine-tuned **EfficientNet** for facial keypoint regression. A custom `FacialKeyPointDataset` handles sparse labels (keypoints marked −1 for missing annotations) and the loss masks those entries out during training, so the model is only penalized on visible keypoints. Mixed-precision training with gradient scaling; evaluated with RMSE on a held-out validation split.
