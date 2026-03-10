# Computer Graphics

A collection of graphics programming labs developed with Node.js and multiple web graphics standards.

## Overview
This repository presents projects that explore different web graphics approaches, from immediate-mode 2D rendering to declarative and programmable 3D pipelines.

## Repository Structure
- [**/3JS**](./3JS) - Three.js module with assets, source files, and library dependencies.
- [**/C2D**](./C2D) - Canvas 2D module with animation sources and related assets.
- [**/SVG**](./SVG) - SVG module with interactive animation sources and assets.
- [**/X3D**](./X3D) - X3DOM/X3D module with source files, textures, and libraries.

## Project Details

### **3JS - "Enfeitiço" (The Spell)**
An animated 3D text visualization of the word "Enfeitiço," with individually animated letters.

**Techniques Applied:**
- **Manual Letter Construction:** Each letter (E, N, F, I, T, Ç, O) was created manually using Three.js. `ExtrudeGeometry` with custom coordinates and bevel parameters.
- **Texture Mapping:** Applied procedural texture (MagicPattern.png) as background.
- **Material & Lighting:** Used Phong materials with shininess effects, ambient lighting, and multiple spot lights for dramatic shadows.
- **Animation Framework:** Integrated Tween.js for smooth letter animations and camera movement.
- **Camera Controls:** Implemented OrbitControls for interactive 3D exploration.

### **X3D - 3D Scene with Landscape**
A declarative 3D scene built with X3DOM, featuring a complete outdoor environment and an animated landscape.

**Techniques Applied:**
- **Hierarchical Structure:** Organized multiple scene members (house, roof, doors, windows, chimney, trees, stones) each with individual IDs.
- **Skeletal Animation:** Implemented member-based animation system where each component (roof left/right, walls, door, chimney) has independent translation and rotation properties.
- **Texture Mapping:** Applied PBR (Physically Based Rendering) textures including:

  - Diffuse maps (base colors).
  - Specular maps (shine/reflectivity).
  - Normal maps (surface detail without geometry).
- **Geometry Indexing:** Used IndexedFaceSet for complex shapes (rock geometry, roof structures) with texture coordination.
- **Lighting & Environment:** Added directional light (sun) with rotation animation and gradient background sky.

### **C2D - Endless Driving Chase**
A top-down 2D endless driving chase with a follower vehicle, demonstrating parallax scrolling and procedural rendering.

**Techniques Applied:**
- **Procedural Drawing:** Hand-coded all visual elements (grass, roads, lines, trees, car) using Canvas 2D API.
- **Parallax Animation:** Implemented depth-based scrolling where road lines and trees move at different velocities based on distance.
- **Compound Objects:**

  - Car with mirrors, lights, wheels, and windshield.
  - Trees with trunks (rectangles) and foliage (circles).
  - Multi-lane roads with continuous marking lines.
- **Collision Detection:** Implemented hit-detection system between car and tree elements.
- **Transform Matrices:** Applied rotation and translation transforms for vehicle components.

### **SVG - Battering Ram Gate Game**
An interactive game where the player controls a battering ram to break through moving gates.

**Techniques Applied:**
- **Interactive SVG Manipulation:** Dynamically transformed SVG components using translate/scale attributes.
- **Vector-Based Graphics:** Built all game elements as scalable vectors (battering ram, doors).
- **Physics Simulation:** Implemented movement system with velocity, acceleration, and boundary constraints.
- **Collision Detection:** Created hitbox-based collision between the battering ram and doors with game state management.
- **Game Logic:**

  - Multi-phase system (waiting → playing → game over).
  - Dynamic door spawning at random heights.
  - Points calculation based on time elapsed.
  - Keyboard input handling (W/S movement, R restart).
- **DOM Integration:** Used JavaScript to read/write SVG attributes dynamically for real-time updates.


## Important Notes
- **The `lib/` folders are required** - they contain the necessary libraries for the projects to work.
- Some project names, source comments, and coursework-related materials are in Portuguese, as provided in the original course context.
- The images below are placeholders. Run the corresponding HTML files in each project folder to view the actual animations and interactions.
- Documentation wording and repository-structure organization were refined with AI assistants (GitHub Copilot and Google Gemini). All AI-generated outputs were critically reviewed and validated to ensure technical accuracy and content integrity.

## Visual Results

| 3JS Demo | C2D Demo | SVG Demo | X3D Demo |
| :---: | :---: | :---: | :---: |
| ![3JS Demo](./3JS/assets/Image.png) | ![C2D Demo](./C2D/assets/Image.png) | ![SVG Demo](./SVG/assets/Image.png) | ![X3D Demo](./X3D/assets/Image.png) |

---
[⬅️ **Back to My Learning Journey**](https://github.com/BroteusSKTP/BroteusSKTP/blob/main/LearningLabs.md)
