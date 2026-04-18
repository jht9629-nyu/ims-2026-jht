# [ims-2026-jht](https://github.com/jht9629-nyu/ims-2026-jht.git)

## Week01

- [basic](ims01/basic/index.html)

## Week02

- [shader-trail](ims02/shader-trail/index.html)
- [get_url_params](ims02/get_url_params/index.html)
- [localStorage](ims02/localStorage/index.html)

## Week03

- [Marching-Ripples](ims03/Marching-Ripples/index.html)
  - from Daniel Shiffman's Marching Squares Coding Challenge OpenSimplex

## Week04

- [heavy_RAM_webcam](ims04/heavy_RAM_webcam/index.html)

### particles evolution

- [sketch2911242-particles](ims04/sketch2911242-particles/index.html)
  - starting sketch from openprocessing
- [image-particle](ims04/image-particle/index.html)
  - using my photo
  - no meta viewport
- [video-particle](ims04/video-particle/index.html)
  - image replaced by video
- [media-particle](ims04/media-particle/index.html)
  - combo of image and video and variety of shapes

- [ims03-Arial](ims04/ims03-Arial/index.html)

## Week05

- [sliding_window](ims05/sliding_window/index.html)
  - // sliding window v1 responsive horizontal two hands copy
- [video_shader](ims05/video_shader/index.html)
  - // shader effect with sliding window
  - // converted to use createShader vs. loadShader
  - // removed handPose, prep for p5video plugin

## Notes

```
2026-04-17 13:16:44
Claude prompt:
  adjust ims04/media-particle/TriangleShape to tile
  >> fails.
  fails. triangles overlap -- provied screen shot
  >> success after a minutes
  >> my tiled triangle algorithm, simpler:
  https://github.com/jht1493-gmail/p5VideoKit/blob/main/src/videoKit/effects/bset/eff_triangle.js

2026-04-xx
https://openprocessing.org/sketch/2682081
Marching Ripples by Kathy McGuiness
--> ims04/sketch2911242-particles/mySketch.js
// https://m.youtube.com/watch?v=qm5cDNbtGig
// Fixing The Coding Train’s Code (Water Ripple Shader)

media-particles DiamondShape and HexShape from Claude AI
```

## Plan

- media-particles smoother transition

## Changes

- 2026-04-17 03:57:52
- added sliding_window
- 2026-04-10 08:03:44
- media-particles start with CircleShape
