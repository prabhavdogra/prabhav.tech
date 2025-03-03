---
slug: diy_goroutines
title: Writing your own Goroutines
authors: [prabhavdogra]
tags: [go]
---

This all started when someone asked me how goroutines work internally and all I could respond with was:

> "Goroutines are lightweight threads managed by the Go runtime instead of the operating system. Go runtime automatically multiplexes—mapping multiple goroutines onto a smaller number of OS threads. And that somehow makes them fast?? 👉👈"

If anyone asked me any in-depth questions about how this multiplexing worked I was blank. So I decided to gain a deeper understanding by implementing goroutines myself. Cloned the [Go Github repo](https://github.com/golang/go)

## To be continued...