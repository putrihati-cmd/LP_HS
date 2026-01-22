# YOUWARE.md - KK Printing Website

## Project Overview
This is a professional website for KK Printing, a printing services company in Kota Kinabalu, Sabah. The website showcases their printing services, portfolio, and contact information with a modern, engaging design.

## Architecture & Structure

### Technology Stack
- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (Vanilla ES6)
- **Fonts**: Inter font family from Google Fonts
- **Icons**: Font Awesome 6.4.0
- **CSS Framework**: Tailwind CSS 2.2.19 via CDN

### Key Design System Components

#### Color Scheme
- Primary: Blue gradient (`#3b82f6` to `#1d4ed8`)
- Secondary: Purple gradient (`#9333ea` to `#7c3aed`)
- Background: Gray-blue gradients for sections
- Text: Gray scale from `#374151` to `#1f2937`

#### Typography
- Primary font: Inter (weights: 300-900)
- Hero titles: Font weight 900 (black)
- Section headings: Font weight 800-900
- Body text: Font weight 400-500

#### Layout Patterns
- **Hero Section**: Full viewport height with gradient background and floating elements
- **Services Section**: 3-column grid (responsive to 2-column on tablet, 1-column on mobile)
- **Portfolio Section**: 3-column masonry-style grid with hover overlays
- **Testimonials**: 3-column card layout with star ratings
- **Contact**: 2-column layout (info + form)

### Component Architecture

#### Interactive Elements
- **Service Cards**: Hover animations with transform and glow effects
- **Portfolio Items**: Overlay effects on hover with project details
- **Navigation**: Sticky navbar with backdrop blur effect
- **Buttons**: Gradient backgrounds with hover animations and shine effects
- **Stats Counters**: Animated counting effect triggered by scroll

#### Animation System
- **Fade-in animations**: Triggered by Intersection Observer API
- **Scroll-triggered effects**: Stats counters, service cards, fade-in-up elements
- **CSS Animations**: Floating elements, typing effect, pulse animations
- **Hover interactions**: Transform, scale, and shadow effects

### Section Structure
1. **Navigation**: Fixed header with logo, menu, and CTA
2. **Hero**: Full-screen intro with stats, CTAs, and contact info
3. **Services**: 6 service cards with pricing and features
4. **Portfolio**: 6 project showcases with hover overlays
5. **Testimonials**: 3 customer reviews with ratings
6. **About**: 2-column layout with company info and benefits
7. **Contact**: Contact info, form, and location map placeholder
8. **Footer**: Company info, links, newsletter signup

### JavaScript Functionality

#### Core Features
- Mobile menu toggle
- Smooth scrolling navigation
- Sticky navbar on scroll
- Stats counter animation (Intersection Observer)
- Fade-in animations (Intersection Observer)
- Service card staggered animations
- Hero typing effect
- Form submission simulation
- Newsletter subscription

#### Performance Optimizations
- Intersection Observer for scroll-triggered animations
- CSS transitions instead of JavaScript animations where possible
- Lazy loading approach for animations
- Efficient event listeners with proper cleanup

### Responsive Design
- **Desktop**: Full 3-column layouts, large typography
- **Tablet (768px)**: 2-column service grid, adjusted spacing
- **Mobile (640px)**: Single column layouts, compressed navigation

### Content Strategy
- **Services**: 6 main printing services with pricing
- **Portfolio**: 6 project categories with placeholder content
- **Testimonials**: 3 customer reviews with names and companies
- **Contact**: Complete business information including address and hours

## Development Guidelines

### File Organization
- Single HTML file with embedded CSS and JavaScript
- External dependencies loaded via CDN
- All styles contained in `<style>` block in `<head>`
- All JavaScript contained in `<script>` block before `</body>`

### CSS Architecture
- Utility-first approach with Tailwind CSS
- Custom CSS for complex animations and gradients
- Modular component classes (`.service-card`, `.btn-primary`, etc.)
- Responsive design using Tailwind breakpoints

### JavaScript Patterns
- Modern ES6+ syntax
- Event-driven architecture
- Intersection Observer API for performance
- Graceful fallbacks for older browsers
- Clean event listener management

## Key Features to Maintain
- Smooth scroll behavior throughout the site
- Professional gradient color schemes
- Interactive hover effects on all clickable elements
- Mobile-responsive navigation
- Animated statistics counters
- Form validation and feedback
- Social media integration placeholders
- Newsletter subscription functionality

## Content Requirements
- All text content is in English
- Pricing information included for services
- Complete business contact information
- Professional testimonials with customer names
- Service descriptions with feature lists
- Call-to-action buttons throughout the site

## Performance Considerations
- CSS animations over JavaScript where possible
- Intersection Observer for scroll-triggered effects
- Optimized hover states with hardware acceleration
- Minimal external dependencies
- Fast loading with CDN resources