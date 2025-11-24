Defly Sprite Addon

Custom sprite replacement addon for Defly.io
.
Enhance visuals, gameplay clarity, and strategy with fully customizable sprites, sprite packs, and more.

Table of Contents

Intro – Why Use the Addon

Installation & Setup

Everyday Usage

Sprite Creation Guide

Changelog & Known Bugs

Upcoming Features / Limitations

Download / Sprite Packs

Intro – Why Use the Addon <a name="intro"></a>

The Defly Sprite Addon allows players to customize nearly every visual element in Defly.io while maintaining smooth gameplay. It works exclusively on the ?skin-editor version of the game.

1. Visual Enhancements

Make the game feel entirely new with custom bombs, towers, walls, bullets, teleporters, player skins, confetti, and grid overlays.

Create a unique visual style for every game.

Highlight or clarify important elements like the map grid or win effects.

2. Strategic Advantages

Highlight enemy towers and bullets for faster reaction times.

Customize teleporters so they stand out from the standard colors.

Make tower shields more obvious for better timing.

Make bombs and objectives instantly recognizable.

Essentially, visuals can become a subtle tactical tool.

3. Utility & Convenience

Switch sprite packs instantly without re-uploading.

Download and share sprite sets via .jpeg files.

Minimal impact on FPS / lag — sprites replace existing game images.

Integrates seamlessly with the game’s built-in dropdown and “Replace Game Sprite” functionality.

Installation & Setup <a name="installation--setup"></a>

Open https://defly.io/?skin-editor
.

Install the addon script via Tampermonkey / Userscript manager.

Once loaded, a small tab appears on the right. Hover to expand the popup.

The popup has two main sections:

Sprites: Shows all currently used sprites.

Packs: Shows all downloaded sprite packs.

Buttons in the popup:

Download Sprites: Saves current sprites to a .jpeg.

Upload Sprites: Imports a saved .jpeg.

None: Resets all sprites to the default game images.

To replace a sprite:

Use the built-in sprite dropdown at the bottom of the skin editor.

Select the sprite → click “Replace Game Sprite” → upload your image.

The addon automatically saves it under the Custom tab.

Tip: Uploaded packs appear under None for easy switching.

Everyday Usage <a name="everyday-usage"></a>

Switch between sprite packs instantly.

Backup your sets with Download Sprites.

Upload saved sets to quickly restore your favorites.

Minimal lag — the addon replaces images instead of adding new ones.

Hover the tab on the right to access the popup; it may take a few tries to notice it at first.

Sprite Creation Guide <a name="sprite-creation-guide"></a>
1. Recommended Sizes
Sprite Type	Recommended Size	Notes
EMPS / Powers	64×64 px	EMP, flashbang, grenade effects
Grid Overlay	1×1 px	Repeats across map
Debris	38×30 px	Single image repeated on tower break
Bomb capture A/B	256×256 px	Must be clearly visible
Portals, Dots, Shields, Walls, Marker, Marker2, Most Other Sprites	128×128 px	Standard objects
Skins / Player Sprites	256×256 px	Copters / player characters

Notes:

marker2 points to teammates. Keep it clear and simple.

Stick to these sizes to ensure correct display and scaling.

2. Rotation & Symmetry

Most sprites do not rotate.

Symmetrical or circular designs work best.

Copters are the only moving elements; directional details are acceptable for them.

3. Scaling Behavior

Sprites scale dynamically:

dot1 / dot1-enemy → towers zoom in/out

shoot / shoot-enemy → bullets scale for explosions

line1 → stretches horizontally

Avoid excessive detail; small details may disappear when scaled.

4. Tinting

Some sprites are automatically tinted by the game.

-notint versions skip tinting.

5. Walls & Line Sprites

line1 stretches horizontally only.

Use seamless textures for clean visuals.

6. Debris

Single image used repeatedly.

Size: 38×30 px.

7. Explosions / Bullets

Uses shoot / shoot-enemy.

Sprite scales up, is tinted orange, then fades (~1s).

Circular/symmetrical designs scale best.

8. Copters & Rotors
Copter	Body Sprite	Rotors
Mini Sniper	player1 / player1-notint	rotor1
Default	player3 / player3-notint	rotor1
Shotgun	player5 / player5-notint	rotor1
Drone	player7 / player7-notint	rotor2 + rotor3
Sniper	player8 / player8-notint	rotor1
Minigun / Waffle	player12 / player12-notint	rotor2 + rotor3
9. Markers & Grid Overlay

marker → points to location

marker2 → points to teammates (128×128 px)

gridpixel → 1×1 px, repeated across the map

10. Confetti & Win Effects

Uses confetti sprites; multiple copies spawn on win.

Simple shapes are best.

11. Common Mistakes

Oversized / undersized sprites

Directional details on static sprites

Ignoring tinting

Walls that do not tile horizontally

Overly complex debris or explosions

12. Upcoming / Not Possible

Animated sprites / GIFs

Custom backgrounds

Custom health bars

Animated portals or confetti

Changelog & Known Bugs <a name="changelog--known-bugs"></a>
Current Version – 5.6

Final visual updates

Major overhaul of saving system

Reduced lag

Stable; supports packs and sprite replacement

Previous Versions
Version	Notes
5.0 – 5.5	Visual improvements, minor bug fixes, optimized sprite loading
4.0 – 4.3	Added buttons (download/upload/none), visual popup improvements
3.0 – 3.6	Introduced sprite packs, minor fixes
2.0 – 2.8	Core sprite saving functionality
1.0 – 1.4	Initial working version, basic sprite replacement
Unreleased / WIP

5.7a – Animated sprites (buggy, laggy)

5.7b – Custom backgrounds (laggy)

5.7c – Combines 5.7a+b (extreme lag)

Known Bugs

Entering a game without using “Play” (e.g., “Play Tournament”) does not hide the side panel automatically.

Upcoming Features / Limitations

Animated sprites / GIF support

Custom backgrounds

Custom health bars

Animated portals or confetti

Download / Sprite Packs

Preview images can be embedded in the doc or guide for reference.

Full sprite packs are best hosted externally, e.g.:

GitHub Releases

Google Drive / Dropbox

Provide clickable download links in your README:

“Download the full sprite pack here
”
