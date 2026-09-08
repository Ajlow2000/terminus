---
title: Picking a VPN for Homelab Remote Access
date: 2026-03-26
description: A brief exploration of available options
draft: true
tags: ["netbird", "networking", "homelab"]
series:
  name: "Homelab Remote Access"
  part: 1
---

I have a lot of computers. 
At the time of writing this, I have five discrete PC's or laptops + one digital ocean VPS.
I sometimes do cool things with these computers, but for the last eight years or so any cool thing I do with them is access limited to the local network they're on (with the VPS being an exception).
Inevitably this means I play around with some self hosted service or capability for a bit before dropping it entirely.
Best case scenario, I use it until I move and my LAN configuration changes and I get too lazy to set it all back up.
This is the problem I am setting out to solve.

## What's out there

There are a lot of overlay network and VPN tools out there.
I narrowed it down to three that kept coming up: WireGuard, Tailscale, and NetBird.
They're all built on the same underlying tech, but they sit at very different points on the ease of use vs capabilities spectrum.

### WireGuard

WireGuard is the foundation everything else in this list is built on.
It lives in the kernel, the crypto is modern, and the throughput is excellent.
But out of the box, it's raw.
You generate keys, hand-edit config files, and keep a mental map of which peer talks to which.
There's no discovery, no NAT traversal helper, no UI, no concept of identity.
I was very drawn to this solution at first because it synergizes very well with my strategy of managing the majority of my computing infrastructure via a shared NixOS flake.
On top of that, I generally find myself drawn to simpler solutions that allow me to more directly interact with the fundamentals of the system.
WireGuard very much satisfies this.

### Tailscale

Tailscale is marketed as what WireGuard feels like once someone has done all the annoying parts for you.
You sign in with an existing identity provider, the client picks up your "tailnet" and every device is suddenly addressable by name.
NAT traversal is supposed to "just work"-- exit nodes and subnet routers configurable options.
The catch, for me, is the coordination server.
The data plane is open WireGuard, but the control plane is a closed-source SaaS that I'd be permanently routing my homelab's auth decisions through.
There's Headscale, an open-source reimplementation of the coordination server, but at that point I'm self-hosting an unofficial reimplementation of someone else's product.

### NetBird

NetBird sits in roughly the same shape as Tailscale, but the whole thing is open source — control plane included.
Same WireGuard data plane.
Same identity-based addressing, ACLs, and routing peers.
There's a hosted free tier if I want to skip the setup, and a documented path to self-hosting the control plane if I ever change my mind.
The community is smaller than Tailscale's and the polish shows it in a few corners of the UI, but nothing I ran into felt like a dealbreaker.

## Why NetBird

Honestly, any of these three would have solved the problem in front of me.
What pushed me to NetBird was the exit ramp.
If the hosted offering gets worse, gets bought, or just stops being free, I can stand up the same control plane on my VPS and keep going without rebuilding my mental model.
That's a property I care about for homelab infrastructure specifically — the whole point of this exercise is that I keep losing access to my own stuff every time something upstream changes.
Picking the option I can fully own if I need to felt like the move.

I'll write up how the actual rollout went, and what I like (and don't) after living with it, in the next post in this series.
