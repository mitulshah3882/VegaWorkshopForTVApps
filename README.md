# Vega Workshop TV App

A comprehensive React Native for Vega application showcasing movie catalog browsing, video playback, and performance optimization for Amazon Fire TV devices.

## Overview

This app demonstrates building production-ready TV-optimized experiences using React Native for Vega, featuring advanced navigation, video playback, performance tracking, and native splash screens optimized for 10-foot viewing.

## Features

### Content Discovery
- **Multiple Content Rows**: Organized by categories (Trending Now, Feline-Friendly, General, etc.)
- **Vega Carousel Component**: High-performance, TV-optimized horizontal scrolling with fixed focus indicator
- **Dynamic Content Loading**: Fetches movie catalog from remote API
- **Category Organization**: Automatic grouping of content by category and trending status

### Navigation & UX
- **Stack Navigation**: Seamless navigation between Home, Details, and Video Player screens
- **D-Pad Navigation**: Full remote control support with visual focus indicators
- **Focus Management**: Built-in Carousel focus handling with white border indicators
- **TV-Optimized UI**: 16:9 thumbnails (400×225px) sized for comfortable viewing from 10 feet away

### Video Playback
- **Native Video Player**: W3C MSE/EME standard media playback using Vega VideoPlayer
- **Auto-Navigation**: Automatically returns to Details screen when video ends
- **Full-Screen Playback**: Immersive video viewing experience

### Performance Optimization
- **Native Splash Screen**: Instant app launch feedback with branded splash screen
- **Performance Tracking**: TTFF and TTFD KPI measurement with `useReportFullyDrawn()` API
- **Optimized Loading**: Network calls deferred until after app is fully drawn
- **Current Performance**: 
  - TTFF: ~543ms (36% of 1500ms threshold) ✅
  - TTFD: ~543ms (6.8% of 8000ms threshold) ✅

## Tech Stack

- **React Native for Vega**: System-bundled runtime for Fire TV
- **React 18.2.0**: UI framework
- **TypeScript**: Type-safe development
- **Vega Carousel**: High-performance list component from `@amazon-devices/kepler-ui-components`
- **Vega Navigation**: Stack navigator from `@amazon-devices/react-navigation__native-stack`
- **Vega Video Player**: W3C media playback from `@amazon-devices/react-native-w3cmedia`
- **Vega Performance API**: KPI tracking from `@amazon-devices/kepler-performance-api`

## Project Structure

```
src/
├── App.tsx                           # Main app with navigation & performance tracking
├── screens/
│   ├── HomeScreen.tsx               # Movie catalog with Carousel rows
│   ├── DetailsScreen.tsx            # Movie details with Play/Watchlist buttons
│   └── VideoPlayerScreen.tsx        # Full-screen video playback
└── components/
    └── Link.tsx                     # Reusable link component

assets/
└── raw/
    ├── SplashScreenImages.zip       # Native splash screen assets
    ├── desc.txt                     # Splash screen configuration
    └── SPLASH_SCREEN_INSTRUCTIONS.md # Setup guide
```

## Getting Started

### Prerequisites

- Vega CLI (`kepler` command)
- Vega Virtual Device or Fire TV device
- Node.js and npm

### Installation

```bash
npm install
```

### Build & Deploy

```bash
# Build the app
npm run build

# Install on device
kepler install
```

## Key Features Implementation

### 1. Multiple Content Rows with Carousel

The HomeScreen organizes content into multiple rows using the Vega Carousel component:
- **Trending Now**: First row showing trending content
- **Category Rows**: Dynamically generated rows based on content categories
- **Fixed Focus Indicator**: Focus indicator stays in place while items scroll
- **Optimized Performance**: TV-specific rendering and virtualization

### 2. Stack Navigation

Three-screen navigation flow:
- **Home → Details**: Browse and select content
- **Details → VideoPlayer**: Play selected content
- **Auto-return**: VideoPlayer navigates back when playback ends

### 3. Native Splash Screen

Improves perceived launch time:
- Displays branded background image immediately on launch
- Hides automatically when app is fully drawn
- Supports both cold start and warm start scenarios

### 4. Performance Tracking

Integrated KPI measurement:
- `useReportFullyDrawn()` API for TTFD tracking
- `usePreventHideSplashScreen()` and `useHideSplashScreenCallback()` for splash management
- App state management for warm start tracking
- Ready for KPI Visualizer testing

## Performance Optimizations

### Implemented Optimizations

1. **Native Splash Screen**
   - Instant visual feedback on app launch
   - Branded user experience during loading
   - Automatic hiding when app is ready

2. **Performance API Integration**
   - Accurate TTFF/TTFD measurement
   - Cold start and warm start tracking
   - KPI Visualizer compatible

3. **Optimized Network Calls**
   - Content fetching happens after app is fully drawn
   - Minimal impact on launch performance

4. **Vega Carousel Component**
   - TV-optimized rendering and virtualization
   - Built-in focus management
   - Better performance than standard FlatList

### Performance Results

From KPI report (Cool Start):
- **TTFF**: ~543ms (Threshold: 1500ms) - **Excellent** ✅
- **TTFD**: ~543ms (Threshold: 8000ms) - **Excellent** ✅
- **Network calls**: ~60-117ms
- **JS bundle load**: ~48-52ms

## Development

### Running the App

```bash
# Start Metro bundler
npm start

# Build and install
npm run build
kepler install
```

### Testing Performance

Use Vega Studio's KPI Visualizer to measure:
- Time To First Frame (TTFF)
- Time To Fully Drawn (TTFD)
- Network call timing
- JavaScript bundle load time

### Key Components

- **App.tsx**: Navigation container, performance tracking, splash screen management
- **HomeScreen**: Multiple Carousel rows with category-based content organization
- **DetailsScreen**: Movie details with Play, Add to Watchlist, and Back buttons
- **VideoPlayerScreen**: Full-screen video playback with auto-navigation on end
- **MovieCard**: Individual focusable movie item with focus indicators

## Configuration Files

### manifest.toml
Includes required media services:
- Media server and playback services
- Audio services
- Accessibility privileges
- GIPC services

### babel.config.js
Configured for video player support:
- JSX transform settings
- React automatic runtime

## Resources

- [Vega Developer Portal](https://developer.amazon.com/docs/vega/0.21/vega.html)
- [Vega Sample Apps](https://github.com/AmazonAppDev)
- [React Native Documentation](https://reactnative.dev)
- [Vega Performance API](https://developer.amazon.com/docs/vega/0.21/measure-app-kpis.html)
- [Vega Splash Screen](https://developer.amazon.com/docs/react-native-vega/0.72/splashscreenmanager.html)

## License

Copyright (c) 2022 Amazon.com, Inc. or its affiliates. All rights reserved.
