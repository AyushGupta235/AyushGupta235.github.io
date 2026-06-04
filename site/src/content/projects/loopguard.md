---
title: LoopGuard
category: applied
filed: 2026-02-01
stack: [Python, Agentic AI, ML Safety, Pipeline Monitoring, Fine-tuning]
outcome: Monitoring framework that catches model collapse in agentic fine-tuning loops before it reaches production.
repo: https://github.com/AyushGupta235/loopguard
featured: true
order: 1
---

Monitoring framework for agentic fine-tuning pipelines that catches model collapse before it reaches production. When agents generate training data that fine-tunes models that power those same agents, the feedback loop can amplify initialization biases while masking drift — including in the evaluation models. LoopGuard instruments this loop with four detectors: **contamination drift** (rising self-generation ratio across generations), **distributional collapse** (synthetic data converging toward high-probability outputs, tail coverage lost), **reward hacking** (quality scorer inflating while external task metrics flatline), and **evaluation circularity** (eval model correlated with the data it is scoring). Lineage is stored in SQLite or Postgres; the API returns a structured integrity report with actionable flags.
