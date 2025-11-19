# Vega Workshop TV App

A React Native for Vega application showcasing movie catalog browsing for Amazon Fire TV devices.

## Overview

This app demonstrates building TV-optimized experiences using React Native for Vega, featuring D-pad navigation, focus management, and content display optimized for 10-foot viewing.

## Features

- **Movie Catalog Display**: Horizontal scrollable list of movie content with thumbnail images
- **D-Pad Navigation**: Full remote control support with visual focus indicators
- **TV-Optimized UI**: 16:9 thumbnails sized for comfortable viewing from 10 feet away
- **Focus Management**: White border indicators on focused items with proper spacing to prevent clipping

## Tech Stack

- **React Native for Vega**: System-bundled runtime for Fire TV
- **React 18.2.0**: UI framework
- **TypeScript**: Type-safe development
- **Vega Focus Manager**: Imperative focus control for TV navigation

## Project Structure

```
src/
├── App.tsx                    # Main app entry point
└── components/
    ├── HomeScreen.tsx         # Movie catalog screen with FlatList
    └── Link.tsx              # Reusable link component
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
kepler build

# Install on device
kepler install
```

## Development

The app fetches movie data from a public catalog API and displays it in a horizontally scrollable list. Each item is focusable via D-pad with visual feedback.

### Key Components

- **HomeScreen**: Main screen displaying "Latest Releases" with movie thumbnails
- **MovieCard**: Individual focusable movie item with 400×225px dimensions
- **Focus Management**: Automatic focus on first item, white 4px border on active element

## Resources

- [Vega Developer Portal](https://developer.amazon.com/docs/vega/0.21/vega.html)
- [Vega Sample Apps](https://github.com/AmazonAppDev)
- [React Native Documentation](https://reactnative.dev)

## License

Copyright (c) 2022 Amazon.com, Inc. or its affiliates. All rights reserved.
