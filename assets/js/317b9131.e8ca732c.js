"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8206],{9775:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"diy_goroutines","metadata":{"permalink":"/prabhav.tech/blog/diy_goroutines","editUrl":"https://github.com/dograprabhav/prabhav.tech/tree/master/blog/2025-03-01-goroutines/index.md","source":"@site/blog/2025-03-01-goroutines/index.md","title":"Writing your own Goroutines","description":"This all started when someone asked me how goroutines work internally and all I could respond with was:","date":"2025-03-01T00:00:00.000Z","tags":[{"inline":false,"label":"Go","permalink":"/prabhav.tech/blog/tags/go","description":"Golang exploration projects"}],"readingTime":0.445,"hasTruncateMarker":false,"authors":[{"name":"Prabhav Dogra","title":"Software Engineer II @ Blinkit","url":"https://github.com/prabhavdogra","page":{"permalink":"/prabhav.tech/blog/authors/prabhavdogra"},"socials":{"github":"https://github.com/prabhavdogra","linkedin":"https://www.linkedin.com/in/prabhav-dogra/"},"imageURL":"https://media.licdn.com/dms/image/v2/D5603AQGHJzJ1YVb_og/profile-displayphoto-shrink_800_800/B56ZS6fOAFHEAc-/0/1738295534859?e=1746057600&v=beta&t=wTqgffLNqUVaz0xEk2OUDSEvKATaSevxvWuI99mG9XY","key":"prabhavdogra"}],"frontMatter":{"slug":"diy_goroutines","title":"Writing your own Goroutines","authors":["prabhavdogra"],"tags":["go"]},"unlisted":false,"nextItem":{"title":"How Go atomic operations avoid race conditions?","permalink":"/prabhav.tech/blog/atomic_operations"}},"content":"This all started when someone asked me how goroutines work internally and all I could respond with was:\\n\\n> \\"Goroutines are lightweight threads managed by the Go runtime instead of the operating system. Go runtime automatically multiplexes\u2014mapping multiple goroutines onto a smaller number of OS threads. And that somehow makes them fast?? \ud83d\udc49\ud83d\udc48\\"\\n\\nIf anyone asked me any in-depth questions about how this multiplexing worked I was blank. So I decided to gain a deeper understanding by implementing goroutines myself. Cloned the [Go Github repo](https://github.com/golang/go)\\n\\n## To be continued..."},{"id":"atomic_operations","metadata":{"permalink":"/prabhav.tech/blog/atomic_operations","editUrl":"https://github.com/dograprabhav/prabhav.tech/tree/master/blog/2025-02-28-atomic-operations/index.md","source":"@site/blog/2025-02-28-atomic-operations/index.md","title":"How Go atomic operations avoid race conditions?","description":"Introduction","date":"2025-02-28T00:00:00.000Z","tags":[{"inline":false,"label":"Go","permalink":"/prabhav.tech/blog/tags/go","description":"Golang exploration projects"}],"readingTime":4.29,"hasTruncateMarker":false,"authors":[{"name":"Prabhav Dogra","title":"Software Engineer II @ Blinkit","url":"https://github.com/prabhavdogra","page":{"permalink":"/prabhav.tech/blog/authors/prabhavdogra"},"socials":{"github":"https://github.com/prabhavdogra","linkedin":"https://www.linkedin.com/in/prabhav-dogra/"},"imageURL":"https://media.licdn.com/dms/image/v2/D5603AQGHJzJ1YVb_og/profile-displayphoto-shrink_800_800/B56ZS6fOAFHEAc-/0/1738295534859?e=1746057600&v=beta&t=wTqgffLNqUVaz0xEk2OUDSEvKATaSevxvWuI99mG9XY","key":"prabhavdogra"}],"frontMatter":{"slug":"atomic_operations","title":"How Go atomic operations avoid race conditions?","authors":["prabhavdogra"],"tags":["go"]},"unlisted":false,"prevItem":{"title":"Writing your own Goroutines","permalink":"/prabhav.tech/blog/diy_goroutines"},"nextItem":{"title":"Building a Ray Tracer in C++","permalink":"/prabhav.tech/blog/ray_tracer"}},"content":"### Introduction\\nThis question popped up in my head, _\\"How Go atomic operations avoid race conditions?\\"_\\n\\nI finally gathered the courage to open the cloned [Go Github repo](https://github.com/golang/go) and scan through it.\\n\\n\\n### Go Code Structure \\n![Go code structure](go_structure.png)\\n\\n_Source: ChatGPT_\\n\\nI went inside the implementation of `CompareAndSwapInt32` and found this:\\n\\n```go title=\\"src/sync/atomic/doc.go\\"\\n// CompareAndSwapInt32 executes the compare-and-swap operation for an int32 value.\\n// Consider using the more ergonomic and less error-prone [Int32.CompareAndSwap] instead.\\n//\\n//go:noescape\\nfunc CompareAndSwapInt32(addr *int32, old, new int32) (swapped bool)\\n```\\n\\nFinding the implementation of this was not straightforward, because this method is implemented in Go Assembly:\\n```go title=\\"src/sync/atomic/asm.s\\"\\nTEXT \xb7CompareAndSwapInt32(SB),NOSPLIT,$0\\n\\tJMP\\tinternal\u2215runtime\u2215atomic\xb7Cas(SB)\\n```\\n\\n### What\'s Go Assembly?\\nSimply put, **Go Assembly** is the low-level language used to write performance-critical functions in Go.\\n**Go Assembler** (Code directory path: cmd/asm) is the tool that compiles **Go assembly (.s) files** into machine code.\\nThe Go assembler was heavily inspired by the [Plan 9 C compilers](https://9p.io/sys/doc/compiler.html).\\n\\n:::note Plan 9 C compilers\\n**Plan 9 C compilers (6c, 8c, 5c, etc.)** were architecture-specific compilers designed to generate optimized code for different CPU architectures. Unlike GCC or LLVM, which support multiple architectures within a single compiler framework, Plan 9 used separate compilers for different instruction sets. These compilers were originally developed for the Plan 9 operating system, an experimental OS designed as a potential successor to Unix-based systems.\\n\\nYou can read more about it here: [https://9p.io/sys/doc/compiler.html](https://9p.io/sys/doc/compiler.html)\\n:::\\n\\nGo drew inspiration from 9 C Compiler:\\n- Just like **Plan 9** had **separate compilers** for **different architectures** (e.g., 6c for x86-64, 8c for ARM, etc.).\\n- Go\u2019s assembler follows a similar architecture-based approach, instead of a universal assembler Go has different assemblers for x86, ARM, RISC-V, etc.\\n\\nYou can watch this, an interesting talk about [Go Assembler](https://www.youtube.com/watch?v=KINIAgRpkDA) presented by Rob Pike himself.\\n\\n[Go Assembler Documentation](https://go.dev/doc/asm)\\n\\nGo Assembler streamlined a lot of things:\\n- **Portability:** It abstracts CPU architecture details better.\\n- **Simpler syntax:** No need for % prefixes, brackets, or complex addressing.\\n- **Unified across architectures:** ARM, AMD64, RISC-V, etc., use the same structure.\\n- **Designed for the Go runtime:** Helps implement Go features like garbage collection, goroutines, and stack growth efficiently.\\n\\n\\nGo Assembler has 4 architecture-specific implementations of `atomic.CompareAndSwapInt32()`:\\n- **amd64.s**: For AMD64 (x86-64) architecture (Intel, AMD CPUs).\\n- **arm64.s:** For ARM64 (AArch64) processors (used in Apple M1/M2, mobile devices, servers).\\n- **ppc64le.s:** For PowerPC 64-bit, Little Endian (used in IBM systems).\\n- **s390x.s:** For IBM Z-series mainframes (used in enterprise computing).\\n\\nGo runs on multiple architectures, and low-level atomic operations must be natively implemented for each to ensure compatibility.\\n\\nAdded the implementations for one architecture (other 3 are similar) in Go Assembly:\\n\\n\\n```go title=\\"src/internal/runtime/atomic/atomic_amd64.s\\"\\n// bool Cas(int32 *val, int32 old, int32 new)\\n// Atomically:\\n//\\tif(*val == old){\\n//\\t\\t*val = new;\\n//\\t\\treturn 1;\\n//\\t} else\\n//\\t\\treturn 0;\\n//  }\\nTEXT \xb7Cas(SB),NOSPLIT,$0-17\\n\\tMOVQ\\tptr+0(FP), BX\\n\\tMOVL\\told+8(FP), AX\\n\\tMOVL\\tnew+12(FP), CX\\n\\tLOCK\\n\\tCMPXCHGL\\tCX, 0(BX)\\n\\tSETEQ\\tret+16(FP)\\n\\tRET\\n```\\nExplaining this line by line how this maintains atomicity.\\n\\n```go\\nTEXT \xb7Cas(SB),NOSPLIT,$0-17\\n```\\n- `TEXT \xb7Cas(SB)`: Declares the function Cas(CompareAndSwap) in Go assembly.\\n- `NOSPLIT`: Instructs the runtime not to perform stack splitting, ensuring that the function runs without interruption. It tells the Go runtime not to perform stack splitting for that function. \\n- `$0-17:` Specifies the stack frame size for the function (0 bytes for local variables and 17 bytes for arguments/return values).\\n\\n\\n```go\\nMOVQ ptr+0(FP), BX:\\n```\\n- Moves the pointer `ptr` (the address of val) from the function\'s frame pointer (FP) into the `BX` register.\\n```go\\nMOVL old+8(FP), AX:\\n```\\n- Moves the old value from the frame pointer into the `AX` register.\\n```go\\nMOVL new+12(FP), CX:\\n```\\n- Moves the new value from the frame pointer into the `CX` register.\\n```go\\nLOCK:\\n```\\n- This is a crucial instruction. It prefixes the next instruction (CMPXCHGL) with a lock, ensuring that the memory operation is atomic. This lock ensures that no other process or thread can modify the memory location while the compare and exchange instruction is running.\\n```go\\nCMPXCHGL CX, 0(BX):\\n```\\n- This is the Compare and Exchange instruction. It performs the following:\\n\\t- Compares the value in AX (the old value) with the value at the memory location pointed to by BX (the val value).\\n\\t- If the values are equal, it replaces the value at 0(BX) with the value in CX (the new value).\\n\\t- The original value at 0(BX) is loaded into the AX register.\\n```go\\nSETEQ ret+16(FP):\\n```\\n- SETEQ sets the byte at the destination to 1 if the zero flag is set, and to 0 otherwise. In this case, it sets the return value to 1 if the comparison was equal (meaning the swap was successful), and to 0 otherwise.\\n```go\\nRET:\\n```\\n- Returns from the function\\n\\n\\n### Conclusion\\n\\nAt the register level, atomicity is achieved because:\\n- The LOCK prefix serializes access across CPU cores.\\n- CMPXCHGL ensures all three steps (compare, swap, write-back) happen as one unit.\\n- The CPU guarantees atomicity, eliminating race conditions without software locks.\\n\\nFeel free to be curious and figure out the answers to your questions on your own."},{"id":"ray_tracer","metadata":{"permalink":"/prabhav.tech/blog/ray_tracer","editUrl":"https://github.com/dograprabhav/prabhav.tech/tree/master/blog/2025-02-27-ray-tracer/index.md","source":"@site/blog/2025-02-27-ray-tracer/index.md","title":"Building a Ray Tracer in C++","description":"This blog is just a quick summary of the book Ray Tracing in One Weekend","date":"2025-02-27T00:00:00.000Z","tags":[{"inline":false,"label":"C++","permalink":"/prabhav.tech/blog/tags/c++","description":"C++ Projects"}],"readingTime":9.165,"hasTruncateMarker":false,"authors":[{"name":"Prabhav Dogra","title":"Software Engineer II @ Blinkit","url":"https://github.com/prabhavdogra","page":{"permalink":"/prabhav.tech/blog/authors/prabhavdogra"},"socials":{"github":"https://github.com/prabhavdogra","linkedin":"https://www.linkedin.com/in/prabhav-dogra/"},"imageURL":"https://media.licdn.com/dms/image/v2/D5603AQGHJzJ1YVb_og/profile-displayphoto-shrink_800_800/B56ZS6fOAFHEAc-/0/1738295534859?e=1746057600&v=beta&t=wTqgffLNqUVaz0xEk2OUDSEvKATaSevxvWuI99mG9XY","key":"prabhavdogra"}],"frontMatter":{"slug":"ray_tracer","title":"Building a Ray Tracer in C++","authors":["prabhavdogra"],"tags":["c++"]},"unlisted":false,"prevItem":{"title":"How Go atomic operations avoid race conditions?","permalink":"/prabhav.tech/blog/atomic_operations"}},"content":"This blog is just a quick summary of the book [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.htmlRay)\\n\\nGithub Source Code: [dograprabhav/ray_tracer](https://github.com/dograprabhav/ray_tracer)\\n\\n## What\'re we gonna make?\\n\\n![Final](image-2.png)\\n\\n## Milestone 1:\\nBefore starting anything, in this milestone we just create a sample image. To do that we use one of the simplest formats **P3**. **P3** is a plain text format for **Portable Pixmap (PPM)** image files. It is one of the simplest image formats, where pixel data is represented in plain text.\\n\\n### P3 Image Format\\nIn P3, each pixel is defined by three integers corresponding to the red, green, and blue color channels. The first line of the output is \\"P3\\", identifying the file format. The second line contains the width and height of the image. The third line specifies the maximum color value (typically 255, representing the maximum intensity for each color channel).\\nEach subsequent line contains three integers (r, g, b) for each pixel\'s color in the image.\\n\\n```text title=\\"Sample P3 image of width 2 pixels and height 3 pixels\\"\\nP3           // Defining format\\n2 3          // Width and Height\\n255          // Maximum color value\\n2 5 15       // (r, g, b) color intensity triplets\\n0 255 255    // (r, g, b) color intensity triplets\\n255 0 255    // (r, g, b) color intensity triplets\\n255 255 0    // (r, g, b) color intensity triplets\\n0 0 0        // (r, g, b) color intensity triplets\\n255 255 255  // (r, g, b) color intensity triplets\\n```\\nThis image looks like: &nbsp; &nbsp; &nbsp; ![P3](image-3.png)\\n\\n### Milestone 1 Results\\nWe write a simple loop to render this:\\n\\n![P3](image-4.png)\\n\\n\\n## Milestone 2:\\nIn this milestone we setup a basic ray tracing setup. \\n- We setup a sphere in the scene.\\n- We setup light rays that detects object in the scene.\\n- On the basis of intersection of light rays and objects in the scene it detects what each pixel in the image should look like.\\n- Set up vector ray header files\\n\\n### How it works?\\n![How it works?](image-5.png)\\nThis image represents the basic concept of a ray-tracing camera model used in computer graphics and rendering. Let\u2019s break it down step by step:\\n\\n* **Camera and Viewport Setup**: The camera center is the origin of the coordinate system. A viewport (camera screen/a plane) is placed in front of the camera at a certain focal length. The viewport is divided into a grid of pixels (X \xd7 Y), where each cell represents a pixel in the final rendered image.\\n\\n* **Ray Tracing Process:** For each pixel in the viewport grid\\n    - A ray of light is cast from the camera center through the center of the pixel.\\n    - The ray travels in the scene and intersects with objects (like the blue sphere in the diagram).\\n    - If a ray hits an object, the rendering algorithm calculates the color of that pixel based on:\\n        - The material properties (color, reflectivity, transparency).\\n        - Lighting conditions (shadows, reflections, refractions).\\n        - Camera perspective.\\n    - The computed color is assigned to the corresponding pixel in the final image.\\n\\n### Sphere-Ray Intersection\\nThis section explains the mathematical derivation for determining the intersection points between a ray and a sphere.\\n\\n**Sphere Equations**\\n\\n* **Sphere centered at (0, 0, 0):**\\n    * `x\xb2 + y\xb2 + z\xb2 = r\xb2`\\n* **Sphere centered at (Cx, Cy, Cz):**\\n    * `(Cx - x)\xb2 + (Cy - y)\xb2 + (Cz - z)\xb2 = r\xb2`\\n\\n**Vector and Distance**\\n\\n* **Vector from point A(x1, y1, z1) to B(x2, y2, z2):**\\n    * `(B - A) = (x2 - x1, y2 - y1, z2 - z1)`\\n* **Distance between points A and B:**\\n    * `d = \u221a[(x2 - x1)\xb2 + (y2 - y1)\xb2 + (z2 - z1)\xb2]`\\n* **Vector from point P(x, y, z) to center C(Cx, Cy, Cz):**\\n    * `(C - P) = (Cx - x, Cy - y, Cz - z)`\\n\\n**Point on Sphere Condition**\\n\\nFor point P to lie on the sphere, it must be \'r\' (radius) distance from the center:\\n\\n* `(C - P) \u22c5 (C - P) = (Cx - x)\xb2 + (Cy - y)\xb2 + (Cz - z)\xb2`\\n* `(Cx - x)\xb2 + (Cy - y)\xb2 + (Cz - z)\xb2 = r\xb2` (Distance from center)\\n* Therefore: `(C - P) \u22c5 (C - P) = r\xb2`\\n\\n**Ray Equation**\\n\\n* **General ray equation:** `RAY(t) = M * t + N`\\n    * `M` is the ray\'s direction vector.\\n    * `N` is the ray\'s origin point.\\n\\n**Ray-Sphere Intersection**\\n\\nA ray hits the sphere when it\'s \'r\' distance from the center:\\n\\n* `(C - RAY(t)) \u22c5 (C - RAY(t)) = r\xb2`\\n* `(C - (M * t + N)) \u22c5 (C - (M * t + N)) = r\xb2`\\n* Expanding the equation:\\n    * `t\xb2 * M \u22c5 M - 2 * t * M \u22c5 (C - N) + (C - N) \u22c5 (C - N) - r\xb2 = 0`\\n\\n**Quadratic Formula**\\n\\nUsing the quadratic formula (`roots = -b \xb1 \u221a(b\xb2 - 4ac) / 2a`), we get:\\n\\n* `a = M \u22c5 M`\\n* `b = -2 * M \u22c5 (C - N)`\\n* `c = (C - N) \u22c5 (C - N) - r\xb2`\\n\\nBy solving this quadratic equation for \'t\', we can find the intersection points (if any) between the ray and the sphere.\\n\\n### Milestone 2 Results\\n![Milestone 2 results](image-6.png)\\n\\n## Milestone 3:\\n- Scene Abstraction:\\n    - Introduced a Scene structure to manage all objects, lights, and properties in the environment.\\n    - Simplifies the rendering process by treating the scene as a collection of objects instead of handling each separately.\\n\\n**Result:** The code is cleaner, modular, and easier to extend in the future (e.g., adding reflections, refractions, and different shapes).\\n\\n### Milestone 3 Results\\n![Milestone 3 results](image-7.png)\\n\\n## Milestone 4:\\n**Rendering Improvements**  \\n- **Added Anti-Aliasing**  \\n  - Reduced jagged edges in the final image by averaging multiple rays per pixel.\\n- **Added Camera Class**  \\n  - Abstracted camera logic for better scene control.\\n- **Started Considering Reflected Rays**  \\n  - Introduced initial logic for reflection to create mirror-like surfaces.  \\n  - Prepares the system for handling realistic light behavior.\\n\\n**Material System Enhancements**  \\n- **Added Material Class for Diffuse Material**  \\n  - Defined a reusable `Material` class to manage object properties.  \\n  - Simplified code structure by encapsulating material behavior.  \\n- **Added Material Class with Diffuse Material**  \\n  - Implemented Lambertian reflection for diffuse surfaces.  \\n  - Ensures objects interact naturally with light sources.  \\n- **Added True Lambertian Reflection**  \\n  - Improved light scattering on rough surfaces.  \\n  - Used a more accurate random sampling technique for diffuse reflections.\\n- **Gamma Correction**\\n  - Gamma Correction for More Realistic Colors\\n\\n\\n### Anti-aliasing\\n- Reduced jagged edges in the final image by averaging multiple rays per pixel.\\n![Anti-Aliasing](image-8.png)\\n\\n### A Simple Diffuse Material\\n\\nA diffuse surface is a surface that scatters light in many directions instead of reflecting it in a single, well-defined direction (like a mirror). This happens because the surface is rough at a microscopic level.\\n\\n* Some observations:\\n  * A light ray that bounces of a diffuse surface has equal probability of bouncing in all directions\\n  * They might also be absorbed rather than reflected. The darker the surface, the more likely the ray is absorbed (that\u2019s why it\'s dark!). \\n\\n\\n- How we will do it:\\n  - Generate a random vector inside the unit sphere\\n  - Normalize this vector to extend it to the sphere surface\\n  - Invert the normalized vector if it falls onto the wrong hemisphere\\n\\n![Generating randomised reflected rays](image.png)\\n\\n### True Lambertian Reflection\\n\\nA more accurate representation of real diffuse objects is the Lambertian distribution. This distribution scatters reflected rays in a manner that is proportional to cos(\ud835\udf19), where \ud835\udf19 is the angle between the reflected ray and the surface normal.\\n\\nThis means that a reflected ray is most likely to scatter in a direction near the surface normal, and less likely to scatter in directions away from the normal.\\nWe do this by\\n\\n```c title=\\"src/v4/camera.h\\"\\n    // rec.normal is the normal to the hemisphere\\n    vec3 direction = rec.normal + random_unit_vector();\\n```\\n### Gamma Correction\\n* Gamma Correction for More Realistic Colors\\n  * Raw pixel values in the renderer are stored in linear color space.\\n  * Most displays, however, interpret color values in a non-linear way, requiring gamma correction.\\n  * Gamma correction is applied using the equation:\\n  ```\\n  corrected color = raw color ^ (\xb9\u2044\u1d67)\\n  ```\\n  where **\u03b3** (gamma) is typically **2.2**.  \\n\\n## Milestone 5:\\n**Metal**\\n- Add a new class to **Material class** for **Metal object**\\n- Modelled light scatter and **reflectance**, enabling realistic surfaces.\\n- Added **mirrored light reflection** for metallic objects.\\n- Implemented **fuzzy reflection**, simulating rough metallic finishes.\\n\\n**Dielectrics**\\n* Explored refraction and how light bends through transparent materials.\\n* Used **Snell\u2019s Law** to determine how rays change direction at surfaces.\\n* Introduced **total internal reflection**, where light stays within the medium.\\n* Implemented the **Schlick Approximation** for **realistic reflection intensity**.\\n\\n**Positionable Camera**\\n- Defines camera viewing geometry for perspective accuracy.\\n- Introduces controls for positioning and orienting the camera, improving scene setup.\\n\\n### Metallic Surfaces and Reflective Rays\\nIntroduces metallic materials by modifying how rays bounce off surfaces.\\nReflection is modeled using the equation:\\n```\\n\ud835\udc45 = \ud835\udc49 \u2212 2 (\ud835\udc49 \u22c5 \ud835\udc41) \ud835\udc41 \\n```\\n\\n![Mirrored reflection](image-9.png)\\n* Where,\\n    * **\ud835\udc45** is the reflected ray,\\n    * **\ud835\udc49** is the incoming ray, and \\n    * **\ud835\udc41** is the surface normal.\\nThe reflected ray is traced to determine the color contribution from the metal.\\n\\n- Fuzziness in Reflection:\\n  - To simulate rough metal, a fuzziness parameter is introduced.\\n  - Instead of perfect reflection, a small random offset is added to the reflected ray direction.\\n  - The amount of fuzziness controls how polished or rough the surface appears.\\n\\n### Dielectrics\\n\\nClear materials such as water, glass, and diamond are dielectrics. When a light ray hits them, it splits into a reflected ray and a refracted (transmitted) ray. We\u2019ll handle that by randomly choosing between reflection and refraction, only generating one scattered ray per interaction.\\n\\n### Snell\'s Law\\nWhere \ud835\udf03 and \ud835\udf03\u2032 are the angles from the normal, and \ud835\udf02 and \ud835\udf02\u2032 are the refractive indices. The geometry is:\\n```\\n\u21d2 \ud835\udf02 \u22c5 sin\ud835\udf03 = \ud835\udf02\u2032 \u22c5 sin\ud835\udf03\u2032\\n```\\nwhere:  \\n- **\ud835\udf02** \u2014 Refractive index of the first medium  \\n- **\ud835\udf02\u2032** \u2014 Refractive index of the second medium  \\n- **\ud835\udf03** \u2014 Incident angle (angle between the incoming ray and the normal)  \\n- **\ud835\udf03\u2032** \u2014 Refracted angle (angle between the refracted ray and the normal)  \\n\\n![Snell\'s Law](image-1.png)\\n\\n### Total Internal Reflection\\n\\nTotal Internal Reflection (TIR) occurs when light traveling from a **denser medium** to a **less dense medium** is **completely reflected** rather than refracted. This happens when the **angle of incidence** exceeds the **critical angle**, given by:\\n\\n```\\ntheta = sin\u207b\xb9(n\u2082 / n\u2081)\\n```\\n\\n![TIR](image-11.png)\\n\\n### Schlick\'s Approximation\\n\\nSchlick\'s Approximation provides an efficient way to estimate **reflectance** at the interface of two materials based on the **angle of incidence**. \\n\\n![schlicks](image-12.png)\\n\\n```\\nR\u2080 = ((n\u2081 - n\u2082) / (n\u2081 + n\u2082))\xb2\\n```\\nThis approximation avoids expensive computations while providing visually accurate reflections.\\n\\n### Final Render\\n\\n![Final](image-2.png)"}]}}')}}]);