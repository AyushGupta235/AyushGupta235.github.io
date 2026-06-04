---
title: Object Detection with YOLOv3
category: applied
filed: 2022-10-01
stack: [Python, YOLOv3, OpenCV, CUDA, Object Detection]
outcome: Real-time CUDA-accelerated object detection via OpenCV's DNN module.
repo: https://github.com/AyushGupta235/Object-Detection
order: 7
---

Real-time object detection script using **YOLOv3** weights loaded through OpenCV's DNN module. Preprocesses frames into 320×320 blobs, runs forward inference, applies confidence thresholding and non-maximum suppression, and draws labelled bounding boxes. CUDA-accelerated via Numba for GPU inference.
