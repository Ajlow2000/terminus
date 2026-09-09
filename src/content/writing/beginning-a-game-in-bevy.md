---
title: Beginning a Game(?) in Bevy
date: 2026-09-08
description: How a failed interview turned into a passion project
draft: true
tags: ["rust", "gamedev", "bevy"]
series:
  name: "Fleetsim Devlog"
  part: 1
---

My first exposure to PC games was Star Wars: Empire at War.
My dad had the physical disc for our iMac that sat in the family library.
I forget what age I was, but I remember always being so excited to pull up a chair and play (watch) the conquest story mode with my Dad.
I was/am a huge Star Wars fan and for a kid like me, a game that requires memorizing the names of various ships, their roles in a fleet and what other ships they were strong and weak into was perfect.
Watching Imperial Star Destroyers maneuver around the map after being issued orders was the coolest thing ever.
Flash forward to college: I had my first PC capable of playing some games and I finally got the Steam edition of SW:EaW and was able to bask in mod support that continues to keep that game alive to this day.
To this day, it remains one of my favorite games to play.
But alas, as I've grown up I find myself a little less drawn to consumption and little more interested in production and thus don't play super often.

Now to address the article description: I did an interview with a company recently that asked me to complete a take home project.
I was given a choice between something I don't even remember and "build a basic fleet ops simulator capable of tracking vessel's position as they move cargo between ports".
I spent probably around 10-15 hours on my implementation for this (it was meh-- I had never built something like this before and made some regrettable architectural decisions), went and presented my work, and _wa wa_, didn't get the job.
But it was a cool project that got me thinking a lot about how to design a deterministic simulator/state machine thing with testing/visibility as a primary goal (in my job as a SWE I largely maintain existing projects).
A month or two later, I was having a slow weekend with a bit of a sickness afoot and I had the thought that what I built seemed to have some crossover with one of my favorite games SW:EaW.
The initial take-home project was interesting enough that I was curious about revisiting it and fixing some of the problems I created for myself with the first impl, but adding in the idea of using this base to explore a space naval RTS game inspired by SW:EaW, and I was hooked.

So I've now decided to start a slow burn passion project working on a little something to explore some of these ideas.
To set expectations:

- My goal is the process not the result. I frankly do not care if a complete or playable game ever comes of this.
- I currently am more motivated by building systems and lower level programming than I am with art and game design.
- The code will likely not be open sourced-- however, the point of this blog series is to provide some visibility into the process.

## So what is it

I want the core of what I'm building to be a headless simulator of an arena.
The simulator's arena will be a two-dimensional space that tracks units that are capable of moving around the arena and engaging with each other.
Two important guiding philosophies I have for this simulator:

1. It should be easy to test. 
2. It should be performant.
3. It should be multiplayer friendly.

As for the actual "game" itself-- let's just put a pin in that.
For now I'll just have a shitty test client that moves some basic polygons around so I can explore the simulator's behavior.

## What's the Name

ummmmmm......

I called the git repo `fleetsim` for now...so I guess that?
I'll probably reference this project with that name for a bit, but it will not be a permanent name.

## Tech Stack

I've chosen to use Rust + Bevy.

![I swear I'm unique](/assets/buzz-lightyear-meme.jpeg)

BUT- I don't have super technical reasons for this.
I write Rust in my day job, so ironically it's just the language I can probably get up to speed with the fastest.
I think Rust/Bevy is a good fit for me though because I want as much of this project to live in src code as possible.
I used Unity for a project in college once and boy do I hate navigating pointy-clicky UIs...

## Testing Plan

This is just the first thing I'm interested in.
My first objective with this codebase is to create some tooling to make generating unit tests a bit easier.
I've found that (while valuable) unit tests often act as "state capture" of developer intentions when they implement the code and it's not until that code gets deployed through an actual application that real bugs are found.
One thing I'm *not* excited about is spending lots of time reading through log files to deconstruct what led to a weird behavior.
My current plan for avoiding this is to record all calls the client application makes to my simulator during runtime and then save those inputs and their timings so that I can reconstruct the exact same scenario as a unit test.

I actually implemented a first pass at this tooling while writing this blog post and it looks like this:

```
test-client session
│
├─ Startup
│   └─ RecorderPlugin::capture_initial_state     (PostStartup)
│       ├─ query: all UnitBundle components
│       └─ SimRecorder.units = Vec<UnitBundle>    (tick-0 snapshot)
│
├─ ... user moves units ...
│
├─ Each frame where a destination is set
│   └─ RecorderPlugin::record_new_destinations   (PostUpdate)
│       ├─ query: Added<Destination>
│       ├─ reads: SimTick (current tick)
│       └─ SimRecorder.events.push(
│               SetDestination { tick, unit_id, destination })
│
├─ User presses F5
│   └─ RecorderDumpPlugin::dump_on_keypress      (Update)
│       └─ SimRecorder::dump("recording.ron", tick)
│           ├─ builds SimRecording { seed, units, events, final_tick }
│           └─ ron::to_string() → write file
│
└─ User runs gen-test
    └─ bin/gen_test.rs main()
        ├─ read "recording.ron"
        ├─ ron::from_str::<SimRecording>()
        └─ print! Rust test source
            ├─ let rec = SimRecording { ... };  // inlined literal
            ├─ let (app, ids) = build_replay_app(&rec)
            │       .replay_input_events()
            │       .advance_to_final_tick();
            └─ todo!("add assertions")
```

This generates a normal Rust unit test that I can manually add assertions to match the behavior I expected to see (but didn't).


In getting this project stood up I implemented a very basic movement system that tracks unit position (x,y coordinates) and accepts a move order with a destination coordinate.
The simulator then uses a static velocity vector to calculate the next coordinate in the direction of the destination that the unit should appear in.


_tada_:
<video autoplay loop muted playsinline width="100%">
  <source src="/assets/fleetsim-movement-v0.mp4" type="video/mp4" />
</video>

Now, this is a pretty simple feature that would have been easy to reason about potential bugs and write tests manually for, but let's pretend it was more complex and we didn't want to write the test by hand.
Using my gen-test tooling I can create the following test:

```rust
 #![allow(clippy::unwrap_used, clippy::expect_used)]
 
 mod common;
 
 use bevy::prelude::*;
 use simulation::faction::FactionId;
 use simulation::movement::{SimPosition, SimVelocity};
 use simulation::recording::{InputEvent, SimRecording};
 use simulation::replay::build_replay_app;
 use simulation::unit::{MaxSpeed, Unit, UnitBundle, UnitId};
 use simulation::{Fixed, FixedVec2};
 
 use crate::common::assert_unit_stays_in_position;
 
 #[test]
 fn three_dest() {
     let recording = SimRecording {
         seed: 42,
         units: vec![
             UnitBundle {
                 unit_id: UnitId(0),
                 marker: Unit,
                 position: SimPosition(FixedVec2::new(Fixed::lit("0"), Fixed::lit("0"))),
                 velocity: SimVelocity(FixedVec2::ZERO),
                 max_speed: MaxSpeed(Fixed::lit("15")),
                 faction: FactionId::new("player"),
             }
         ],
         events: vec![
             InputEvent::SetDestination { tick: 685, unit_id: 0, destination: FixedVec2::new(Fixed::lit("-38.993675232"), Fixed::lit("23.5008544922")) },
             InputEvent::SetDestination { tick: 788, unit_id: 0, destination: FixedVec2::new(Fixed::lit("-264.3365783691"), Fixed::lit("237.3283691406")) },
             InputEvent::SetDestination { tick: 957, unit_id: 0, destination: FixedVec2::new(Fixed::lit("-120.1299591064"), Fixed::lit("308.437866211")) }
         ],
         final_tick: 0,
     };
 
     let (mut app, id_map) = build_replay_app(&recording)
         .replay_input_events()
         .advance_to_final_tick();
 
-    todo!("Remove and add assertions matching your expectations");
+    // This is a basic assertion I manually added for this specific test
+    let final_dest = match recording.events.last().unwrap() {
+        InputEvent::SetDestination { destination, .. } => SimPosition(*destination),
+    };
+    assert_unit_stays_in_position(&mut app, id_map[&0], final_dest, 50);
 }
```

It will be interesting to see how valuable this is as the project evolves and grows in complexity.
For the time being-- I think it's pretty cool though.
