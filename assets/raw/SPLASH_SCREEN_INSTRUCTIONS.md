# Splash Screen Setup Instructions

## Overview
To complete the Native Splash Screen implementation and improve TTFF/TTFD KPIs, you need to create splash screen images.

## Required Structure

Create a zip file named `SplashScreenImages.zip` in this directory (`assets/raw/`) with the following structure:

```
SplashScreenImages.zip
├── _loop/
│   ├── loop00000.png
│   ├── loop00001.png (optional - for animated splash)
│   ├── loop00002.png (optional - for animated splash)
│   └── ... (more frames for animation)
└── desc.txt
```

## Image Requirements

### Resolution
- **TV Profile (Fire TV)**: 1920x1080 pixels
- **Multi-modal Profile**: 960x480 pixels
- **Note**: 4K resolution is NOT supported

### Format
- Use PNG format only
- Images must be named: `loopXXXXX.png` where XXXXX is a 5-digit zero-padded number
- Start from `loop00000.png`

### Examples
- ✅ Correct: `loop00000.png`, `loop00001.png`, `loop00002.png`
- ❌ Incorrect: `image0.png`, `loop1.png`, `loop_00001.png`, `LOOP00001.png`

## Static vs Animated Splash Screen

### Static Splash Screen
- Create a single image: `loop00000.png`
- This will display as a static splash screen

### Animated Splash Screen
- Create multiple images: `loop00000.png`, `loop00001.png`, `loop00002.png`, etc.
- The `desc.txt` file specifies 30 FPS, so:
  - 6 images = 0.2 seconds of animation
  - 30 images = 1 second of animation
  - 60 images = 2 seconds of animation

## desc.txt File

The `desc.txt` file is already created with the following content:
```
1920 1080 30
c 0 0 _loop
```

This sets:
- Width: 1920 pixels
- Height: 1080 pixels
- Frame rate: 30 FPS
- Loop directory: `_loop`

## Creating the Zip File

### Option 1: Using Command Line (macOS/Linux)
```bash
cd assets/raw
# Create _loop directory and add your images
mkdir _loop
# Copy your splash screen images to _loop/
# Then create the zip
zip -r SplashScreenImages.zip _loop desc.txt
```

### Option 2: Using Finder (macOS)
1. Create a folder named `SplashScreenImages`
2. Inside it, create a folder named `_loop`
3. Add your PNG images to the `_loop` folder
4. Copy the `desc.txt` file into the `SplashScreenImages` folder
5. Right-click the `SplashScreenImages` folder and select "Compress"
6. Rename the resulting zip to `SplashScreenImages.zip`
7. Move it to `assets/raw/`

## Quick Start - Simple Static Splash

For a quick test, you can create a simple solid color splash screen:

1. Create a 1920x1080 PNG image with your app branding or a solid color
2. Name it `loop00000.png`
3. Place it in `_loop/` directory
4. Create the zip file as described above

## Verification

After creating `SplashScreenImages.zip`:
1. Verify the zip contains `_loop/loop00000.png` and `desc.txt` at the root
2. Build and deploy your app
3. Run KPI Visualizer to measure the improvement in TTFF

## Expected Performance Improvement

With Native Splash Screen implemented:
- **TTFF**: Should see significant improvement as the splash screen displays immediately
- **TTFD**: Should remain similar or slightly improve
- **User Experience**: App appears to launch instantly with branded splash screen

## Resources

- [Vega Splash Screen Documentation](https://developer.amazon.com/docs/react-native-vega/0.72/splashscreenmanager.html)
