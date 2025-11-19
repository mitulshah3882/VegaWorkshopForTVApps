#react_native_for_vega_get_started.md

# React Native for Vega Projects - Architectural Implementation Guide for AI Agents

## Tools Information

-   **CRITICAL**: For ANY question, request, or task related to Vega app development (including architecture questions, code generation, debugging, app performance, crash debugging, or general inquiries), you MUST read the relevant linked documents FIRST before answering
-   When answering questions related to sections that have linked documents, you MUST read the linked document first before answering
-   You MUST use the `read_document` tool from `@amazon-devices/vega-devtools-mcp` MCP server to read markdown documents linked in this document
-   If unsure which document to read, start with the architecture document to understand the context

## Document Information

## Critical Implementation Notes for AI Agents

**IMPORTANT**: This guide provides exact implementation patterns. Follow these patterns precisely to avoid common failures:

1. **Never bundle React or React Native** - These are system-provided
2. **Implement headless services** - Recommended for media playback
3. **Use exact dependency versions** - Vega has strict compatibility requirements
4. **Follow the manifest.toml structure exactly** - Deviations will cause deployment failures
5. **Test on Vega Virtual Device** - Standard React Native testing is insufficient

---

## 1. Project Setup with Vega Templates

Using Vega CLI to generate projects from official templates (hello-world, live-tv-sample, turbo modules) with proper validation steps

To learn more, read 'react_native_for_vega_template_app.md'

---

## 2. React Native for Vega High-Level Architecture

System-bundled runtime architecture with split bundles, process pre-warming, and native service integration for optimized TV app performance

To learn more, read 'react_native_for_vega_architecture.md'

---

## 3. Technology Stack

Core dependencies with exact versions (React 18.2.0, React Native 0.72.0) and essential Vega libraries for TV-optimized development

To learn more, read 'react_native_for_vega_dependencies.md'

---

## 4. Vega-Specific Dependencies

### 4.1 User Interaction - D-Pad Navigation and Focus Management

Cartesian focus management for D-Pad navigation with TVFocusGuideView, focus indicators, and imperative focus control via FocusManager

To learn more, read 'react_native_for_vega_tv_app_focus_management.md'

### 4.2 Media and Playback

W3C MSE/EME standard media playback with DRM support, adaptive streaming, and VideoPlayer component for URL and MSE modes

To learn more, read 'react_native_for_vega_media_player.md'

### 4.3 Content Personalization

Integration with Amazon's content recommendation and user activity tracking via kepler-content-personalization package

To learn more, read 'react_native_for_vega_content_personalization.md'

### 4.4 Account and Authentication

Login with Amazon and account management using kepler-media-account-login and security-manager-lib packages

To learn more, read 'react_native_for_vega_account_authentication.md'

### 4.7 Navigation

Stack, tab, and drawer navigation using Amazon-specific @amazon-devices/react-navigation packages with TV-optimized focus management

To learn more, read 'react_native_for_vega_navigation.md'

### 4.8 Vega UI Components

High performance Vega UI Components with native bindings such as 'Carousel' from "amazon-devices/kepler-ui-components" library

To learn more, read 'react_native_for_vega_ui_components.md'

### 4.9 Vega Webview

Implementing a web view interface in React Native for Vega App.

To learn more, read 'react_native_for_vega_webview.md'

---

## 5. Application Components

Component types in manifest.toml including interactive (UI), service (headless), and task components with proper runtime-module configuration

To learn more, read 'vega_application_components.md'

---

## 6. App Manifest (manifest.toml) Details

Required configuration file for every Vega app, including package identifiers, system capabilities, privileges, and interface declarations used by Vega OS

To learn more, read 'vega_app_manifest.md'

---

## 7. React Native for Vega App Build & Deploy Steps

Complete build process, Fast Refresh setup, device management, architecture-specific installation, and deployment troubleshooting workflows

To learn more, read 'react_native_for_vega_app_build_and_install.md'

---

## 8. Headless Service Pattern

Singleton pattern implementation for background services (media playback, content personalization) with proper onStart/onStop lifecycle management

To learn more, read 'react_native_for_vega_headless_service_pattern.md'

---

## 9. Best Practices and Guidelines

Performance guidelines, development workflow, architecture recommendations, and critical pitfalls to avoid (bundling React, TV UX patterns, error handling)

To learn more, read 'react_native_for_vega_development_best_practices.md'

---

## 10. Migration Guide

Steps to migrate from standard React Native to Vega: updating dependencies, creating manifest.toml, implementing headless services, and adding TV navigation

To learn more, read 'react_native_for_vega_migration_guide.md'

---

## 11. Resources and References

### Official Documentation

-   Vega Developer Portal
-   React Native for Vega Architecture Guide
-   Vega API Reference

### Sample Projects

-   Vega Video App (reference implementation)
-   Vega Sample Apps Repository: https://github.com/AmazonAppDev/vega*

### Development Tools

-   Vega Studio (VSCode Extension)
-   Vega CLI (`kepler` command)
-   Vega Virtual Device

---

## 12. Complete Project Structure and Validation Checklist for AI Agents

Exact directory structure, critical file contents (index.js, service.js, manifest.toml), and comprehensive validation checklist before deployment

To learn more, read 'react_native_for_vega_project_structure.md'

---

**Document Version**: 2.0  
**Last Updated**: October 20, 2025  
**Purpose**: AI Agent Implementation Guide for React Native for Vega App development
