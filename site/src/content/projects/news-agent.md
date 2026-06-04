---
title: Continuously Learning News Agent
category: applied
filed: 2025-11-01
stack: [LLMs, Agentic AI, Groq, GitHub Actions, Feedback Loops]
outcome: Self-improving daily news digest that learns from your clicks via a weekly profile rewrite.
repo: https://github.com/AyushGupta235/Continuously-Learning-News-Agent
featured: true
order: 2
---

A self-improving daily news digest that emails a personalized briefing every morning. Ingests from RSS feeds, NewsAPI, Reddit, and Hacker News. Uses Llama 3.3 70B (via Groq) to score, summarize, and compose the digest. Tracks click signals ("Useful" / "Skip") and runs a weekly profile rewrite to evolve the interest model over time. Fully automated via GitHub Actions — no server required for the main pipeline.
