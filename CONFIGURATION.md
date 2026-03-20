<!-- InfinityHook Website - Configuration Guide -->
<!-- Copy this file for reference or paste customizations here -->

# InfinityHook Website - Configuration Reference

## CSS Variables Quick Reference

All customizable colors, spacing, and timing variables are defined in `styles.css` under `:root`.

### Color Variables

```css
:root {
    /* Primary Colors - Main branding colors */
    --color-primary: #00d4ff;           /* Cyan/bright blue - primary CTA */
    --color-primary-dark: #0099ff;      /* Darker blue - gradients */
    
    /* Background Colors */
    --color-bg-dark: #0a0e27;          /* Main dark background */
    --color-bg-darker: #05070f;        /* Darker background variant */
    --color-bg-card: #151b2e;          /* Card backgrounds */
    --color-bg-card-light: #1a2237;    /* Lighter card variant */
    
    /* Text Colors */
    --color-text-white: #ffffff;       /* Main text color */
    --color-text-light: #b0b8c8;       /* Secondary text */
    --color-text-muted: #6b7280;       /* Disabled/muted text */
    
    /* Border Colors */
    --color-border: rgba(0, 212, 255, 0.1);      /* Subtle cyan border */
    --color-border-accent: rgba(0, 212, 255, 0.3);  /* Prominent cyan border */
}
```

### Spacing Variables

```css
:root {
    --spacing-xs: 0.5rem;     /* 8px */
    --spacing-sm: 1rem;       /* 16px */
    --spacing-md: 1.5rem;     /* 24px */
    --spacing-lg: 2rem;       /* 32px */
    --spacing-xl: 3rem;       /* 48px */
    --spacing-2xl: 4rem;      /* 64px */
}
```

### Typography Variables

```css
:root {
    /* Font Family */
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    
    /* Font Sizes */
    --font-size-xs: 0.75rem;      /* 12px */
    --font-size-sm: 0.875rem;     /* 14px */
    --font-size-base: 1rem;       /* 16px */
    --font-size-lg: 1.125rem;     /* 18px */
    --font-size-xl: 1.5rem;       /* 24px */
    --font-size-2xl: 2rem;        /* 32px */
    --font-size-3xl: 2.5rem;      /* 40px */
    --font-size-4xl: 3rem;        /* 48px */
}
```

### Border Radius Variables

```css
:root {
    --radius-sm: 0.5rem;     /* 8px */
    --radius-md: 0.875rem;   /* 14px */
    --radius-lg: 1rem;       /* 16px */
    --radius-xl: 1.5rem;     /* 24px */
}
```

### Animation Variables

```css
:root {
    /* Duration */
    --duration-fast: 150ms;
    --duration-base: 300ms;
    --duration-slow: 500ms;
    
    /* Easing Functions */
    --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

## Common Customization Tasks

### Change Primary Color Theme

Find and replace in `styles.css`:

**Old:**
```css
--color-primary: #00d4ff;
--color-primary-dark: #0099ff;
```

**New (Purple Theme Example):**
```css
--color-primary: #a78bfa;        /* Purple */
--color-primary-dark: #8b5cf6;   /* Dark purple */
```

### Change Background Color

```css
--color-bg-dark: #0f1419;     /* Even darker */
--color-bg-darker: #0a0d11;   /* Darkest */
```

### Adjust Spacing Throughout Site

Multiply all spacing by a factor:

```css
/* Increase all spacing by 25% */
--spacing-xs: 0.625rem;   /* was 0.5rem */
--spacing-sm: 1.25rem;    /* was 1rem */
--spacing-md: 1.875rem;   /* was 1.5rem */
--spacing-lg: 2.5rem;     /* was 2rem */
--spacing-xl: 3.75rem;    /* was 3rem */
--spacing-2xl: 5rem;      /* was 4rem */
```

### Modify Font Stack

```css
--font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
```

Then add to `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
```

### Change Animation Speed

```css
/* Make all animations faster */
--duration-fast: 100ms;      /* was 150ms */
--duration-base: 200ms;      /* was 300ms */
--duration-slow: 350ms;      /* was 500ms */
```

## JavaScript Configuration

### AOS Configuration

Edit in `script.js`:

```javascript
AOS.init({
    duration: 800,              /* Animation duration (ms) */
    easing: 'ease-in-out-cubic',/* Easing function */
    once: true,                 /* Animate only once */
    offset: 100,                /* Trigger offset from bottom (px) */
    disable: false,             /* Disable on specific devices */
    startEvent: 'DOMContentLoaded',
    throttleDelay: 99,
    debounceDelay: 50
});
```

### Counter Animation Speed

Edit in `script.js` line ~50:

```javascript
const duration = 2000;  // Change 2000 to desired milliseconds
```

### Parallax Speed

Edit in `script.js` line ~120:

```javascript
const parallaxSpeed = 0.5;  /* Range: 0-1, lower = slower */
```

## Adding New Features

### Add New Feature Section

1. Add section in `index.html`:
```html
<section class="my-section" id="my-section">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <h2>My New Section</h2>
            <p>Description</p>
            <div class="accent-line"></div>
        </div>
        <!-- Content here -->
    </div>
</section>
```

2. Add CSS in `styles.css`:
```css
.my-section {
    border-bottom: 1px solid var(--color-border);
}
```

3. Update navigation:
```html
<li class="nav-item"><a href="#my-section" class="nav-link">My Section</a></li>
```

### Add Custom Animation

In `styles.css`:

```css
@keyframes myCustomAnimation {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
```

Apply to element:
```css
.my-element {
    animation: myCustomAnimation 0.8s var(--easing-ease-out);
}
```

### Add Custom Button Style

```css
.btn-custom {
    background: var(--color-primary);
    color: var(--color-bg-dark);
    border: 2px solid var(--color-primary);
    /* Additional styles */
}

.btn-custom:hover {
    background: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
}
```

## Responsive Design Customization

### Add New Breakpoint

Edit in `styles.css` at the end:

```css
/* Extra Large Screens */
@media (min-width: 1600px) {
    :root {
        --font-size-4xl: 3.5rem;
        --spacing-2xl: 5rem;
    }
}
```

### Adjust Mobile Menu

In JavaScript (~line 30):

```javascript
// Mobile menu threshold
if (window.innerWidth < 768) {
    // Mobile-specific code
}
```

## Color Palette Presets

### Dark Ocean Theme (Current)
```css
--color-primary: #00d4ff;
--color-primary-dark: #0099ff;
--color-bg-dark: #0a0e27;
```

### Purple Galaxy Theme
```css
--color-primary: #a78bfa;
--color-primary-dark: #8b5cf6;
--color-bg-dark: #1e1b4b;
```

### Neon Green Matrix Theme
```css
--color-primary: #00ff41;
--color-primary-dark: #00cc33;
--color-bg-dark: #0a0a0a;
```

### Red Energy Theme
```css
--color-primary: #ff006e;
--color-primary-dark: #c2185b;
--color-bg-dark: #1a0a10;
```

## Performance Tuning

### Reduce Animation Load

Comment out in `styles.css`:

```css
/* Disable parallax for slower browsers */
/* 
@keyframes float {
    0%, 100% { transform: translate(0, 0); }
    ...
}
*/
```

### Optimize for Mobile

Add to `styles.css`:

```css
@media (max-width: 768px) {
    /* Reduce animations */
    * {
        animation-duration: 300ms !important;
    }
}
```

## SEO Customization

### Update Metadata

In `index.html` `<head>`:

```html
<meta name="title" content="InfinityHook - Your Custom Tagline">
<meta name="description" content="Your custom description for search engines">
<meta name="keywords" content="optimization, windows, performance, gaming">
<meta property="og:title" content="InfinityHook">
<meta property="og:description" content="Your social media description">
```

## Analytics Setup

### Add Tracking Script

In `index.html` before `</body>`:

```html
<script>
// Your analytics code
</script>
```

### Track Custom Events

In `script.js`, modify event handlers:

```javascript
button.addEventListener('click', function() {
    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'button_click', {
            'button_name': this.getAttribute('data-name')
        });
    }
});
```

## Common Issues & Solutions

### Animations Feel Choppy
- Increase `--duration-base` value
- Check GPU acceleration is enabled
- Reduce number of simultaneous animations

### Colors Don't Look Right in Production
- Use CSS custom properties correctly
- Check for CSS minification issues
- Verify browser color profile

### Mobile Menu Not Working
- Check JavaScript console for errors
- Verify hamburger element exists
- Clear browser cache

### Parallax Not Working
- Check `window.scrollY` support
- Verify JavaScript is enabled
- Test in different browsers

## Advanced Customization

### Create Dark/Light Theme Toggle

```javascript
function toggleTheme() {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
}
```

CSS:
```css
[data-theme="light"] {
    --color-bg-dark: #ffffff;
    --color-text-light: #333333;
}
```

### Add Page Transitions

```javascript
document.documentElement.style.opacity = '0';
setTimeout(() => {
    document.documentElement.style.opacity = '1';
}, 100);
```

CSS:
```css
html {
    transition: opacity 0.3s ease-in-out;
}
```

---

**Configuration Guide Version**: 1.0
**Last Updated**: March 2026

All CSS variables, JavaScript configurations, and customization options are documented here for quick reference and easy modification.
