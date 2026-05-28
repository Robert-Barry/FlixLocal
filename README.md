# FlixLocal

# FlixLocal - Next-Gen CTV News Streamer

A proof-of-concept, enterprise-grade Connected TV (CTV) application built with React 18, TypeScript, and Zustand, optimized for low-memory, remote-control-driven environments (Samsung Tizen, LG webOS, Vizio SmartCast).

## 🚀 Architectural Pillars

- **Centralized Focus Engine:** Decoupled from React's render cycle using Zustand to prevent UI lag on low-CPU hardware.
- **Strict Spatial Clamping:** Bound control vectors protect navigation loops from running off-screen.

## 🎟️ Completed Tickets

### 🟩 SPRINT 1: Core Navigation & Layout Engine

- **FLIX-101: Implement Core Focus Management System & D-Pad Navigation Engine**
    - Implemented 2D grid matrix indexing (`activeRow`, `activeColumn`).
    - Added centralized keyboard event interception with `event.preventDefault()` to bypass default browser layouts.
    - Secured memory lifecycle by adding hook unmount cleanups (`removeEventListener`).
- **FLIX-102: Build Dynamic Streaming Lanes (Rows) with Visual Focus Highlights**
    - Constructed semantic, accessible `<ul>`/`<li>` component hierarchies for Lanes and Cards matching Fox TV a11y specifications.
    - Mitigated CSS transformation clipping bugs via parent vertical padding layout buffers.
    - Leveraged high-performance, atomic Zustand selectors to isolate component renders, ensuring stable 60fps interaction profiles.
