# Loader Components Documentation

This document provides comprehensive information about the custom loader components, grid layout, and brutalist button included in this project. These components are designed to be highly customizable, performant, and accessible.

## Table of Contents
- [Components](#components)
  - [FirstLoader](#firstloader)
  - [SecondLoader](#secondloader)
  - [ThirdLoader](#thirdloader)
  - [GridLayout](#gridlayout)
  - [BrutalistButton](#brutalistbutton)
- [Usage](#usage)
- [Demo Page](#demo-page)
- [Styling](#styling)
- [Accessibility](#accessibility)
- [Browser Compatibility](#browser-compatibility)
- [Performance Considerations](#performance-considerations)
- [Advanced Customization](#advanced-customization)

## Components

### FirstLoader

A complex SVG-based loader with animated elements and interactive hover effects. This loader uses multiple SVG paths with different animation timings to create a mesmerizing loading experience.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | "" | Additional CSS classes to apply to the loader container |

**Usage:**
```jsx
import { FirstLoader } from "@/components/global/loaders";

const MyComponent = () => {
  return <FirstLoader className="custom-class" />;
};
```

**Technical Specifications:**
- SVG dimensions: 344px × 344px (scalable)
- Animation types: rotate16 (keyframe-based)
- Animation durations: varying from 2s to 7s
- Transform origin: center
- Z-index layering for 3D effect

**Animation Details:**
- Outer rings rotate at different speeds (7s and 3s respectively)
- Inner elements rotate at 4s intervals
- Center element rotates every 2s
- All animations use the ease-in-out timing function
- Hover state triggers -80deg rotation and 30deg skew transforms

**Features:**
- SVG-based animation with unique design
- Smooth transitions between states
- Interactive hover effects that transform the loader
- Hardware-accelerated animations
- Fully responsive and accessible

### SecondLoader

A ripple animation loader with a customizable logo color. Features concentric circles that expand and contract to create a ripple effect.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logoColor | string | "grey" | Color of the logo in the center of the loader |
| className | string | "" | Additional CSS classes to apply to the loader container |
| size | string | "250px" | Size of the loader (width and height) |
| duration | string | "2s" | Duration of the animation cycle |

**CSS Variables:**
```css
.loader {
  --size: 250px;
  --duration: 2s;
  --logo-color: grey;
  --background: linear-gradient(...);
}
```

**Usage:**
```jsx
import { SecondLoader } from "@/components/global/loaders";

const MyComponent = () => {
  return (
    <SecondLoader 
      logoColor="#3b82f6" 
      className="my-loader" 
      size="300px"
      duration="1.5s"
    />
  );
};
```

**Animation Details:**
- Ripple effect created through scale transforms (1 → 1.3 → 1)
- Box shadow adjustments for depth perception
- Logo color changes from custom color to white and back
- Staggered animations with delays (0s, 0.2s, 0.4s, 0.6s, 0.8s)
- Backdrop filter for frosted glass effect

**Features:**
- Ripple animation effect with centered logo
- Five concentric circles with staggered animations
- Customizable logo color, size, and animation speed
- Smooth animation transitions with ease-in-out timing

### ThirdLoader

A server-themed loader with floating animation effects, perfect for data processing or backend operation indicators.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | "" | Additional CSS classes to apply to the loader container |

**Usage:**
```jsx
import { ThirdLoader } from "@/components/global/loaders";

const MyComponent = () => {
  return <ThirdLoader className="server-loader" />;
};
```

**Technical Specifications:**
- SVG with complex path definitions
- Animation timing: 4s for float, 0.8s for strobe effects
- Zoom factor: 0.3 (configurable via CSS)
- CSS filters applied to SVG elements

**Animation Details:**
- Main floating animation: `floatAndBounce` keyframes (translateY 0px → -20px → 0px)
- Strobe effect: alternating opacity and filter changes
- Two animation types: `.estrobo_animation` and `.estrobo_animationV2`
- Server component floats independently from flashing elements

**Features:**
- Server rack visualization with animated elements
- Floating animation effect combined with flashing/strobing
- Detailed SVG implementation with filter effects
- Support for reduced motion preferences

**Advanced Usage:**
```jsx
// With custom wrapper and controlled visibility
import { ThirdLoader } from "@/components/global/loaders";

const LoadingState = ({ isLoading }) => {
  return (
    <div className="server-process-indicator">
      {isLoading && (
        <div className="overlay">
          <ThirdLoader className="large-server" />
          <p>Processing your data...</p>
        </div>
      )}
    </div>
  );
};
```

### GridLayout

An interactive grid layout with hover effects for each grid box. Features a custom grid arrangement with 14 uniquely positioned boxes.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | "" | Additional CSS classes to apply to the grid container |

**Usage:**
```jsx
import { GridLayout } from "@/components/global/loaders";

const MyComponent = () => {
  return <GridLayout className="my-grid" />;
};
```

**Grid Structure:**
- CSS Grid: 5 columns × 4 rows (50px each)
- 14 grid boxes with unique positioning
- Grid gap: 2px with 4px container padding
- Special layouts for boxes 3 and 8 (span multiple grid cells)

**CSS Specifications:**
- Background: Linear gradient (black → red → yellow)
- Box styling: backdrop-filter blur(3px) with semi-transparent background
- Transition: all 0.2s ease
- Box shadows with inset effect
- Border: 1px solid rgba(255, 255, 255, 0.18)

**Hover Effects:**
- Standard boxes: scale(1.04) with shadow intensification
- Box 3 and 8: scale(1.02) with font-size increase to 60px

**Advanced Usage:**
```jsx
// Using Grid Layout as navigation
import { GridLayout } from "@/components/global/loaders";
import { useRouter } from 'next/router';

const NavigationGrid = () => {
  const router = useRouter();
  
  // Override default grid box click behavior
  const handleBoxClick = (boxNumber) => {
    switch(boxNumber) {
      case 1: router.push('/dashboard'); break;
      case 2: router.push('/profile'); break;
      case 3: router.push('/settings'); break;
      // etc.
      default: break;
    }
  };
  
  return (
    <div className="navigation-wrapper">
      <GridLayout className="interactive-nav" onClick={handleBoxClick} />
      <div className="nav-labels">
        <span>Dashboard</span>
        <span>Profile</span>
        <span>Settings</span>
        {/* etc. */}
      </div>
    </div>
  );
};
```

### BrutalistButton

A button styled in the brutalist design language with animation effects. Features bold borders, strong shadows, and interactive animations.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onClick | function | undefined | Function to call when the button is clicked |
| buttonText | string | "Powered By" | Primary text displayed on the button |
| subtitle | string | "GPT-Omni" | Secondary text displayed on the button |
| className | string | "" | Additional CSS classes to apply to the button |

**Usage:**
```jsx
import { BrutalistButton } from "@/components/global/loaders";

const MyComponent = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <BrutalistButton
      onClick={handleClick}
      buttonText="Custom Text"
      subtitle="Subtitle"
      className="my-button"
    />
  );
};
```

**Design Specifications:**
- Background: #4e4e4e
- Border: 2px solid #000
- Box Shadow: 5px 5px 0px #000
- Max width: 240px
- Padding: 1em 1.8em
- Text colors: White

**Animation Details:**
- Hover state:
  - Transform: translateY(3px)
  - Box shadow reduces to 2px 2px
  - Text elements appear with opacity 1
  - Icon spins and zooms with cubic-bezier timing
- Active state:
  - All elements scale to 0.95
- Text reveal animation:
  - Opacity: 0 → 1
  - Max height: 0 → 60px
  - Margin top: 0 → 8px

**Accessibility Features:**
- Keyboard navigable (tabIndex={0})
- ARIA label combining buttonText and subtitle
- Enter key handler for keyboard activation
- High contrast text (passes WCAG AA)
- Focus states preserved

**Advanced Usage with Custom Icon:**
```jsx
import { BrutalistButton } from "@/components/global/loaders";

const CustomButton = ({ icon, ...props }) => {
  return (
    <BrutalistButton {...props}>
      {icon && (
        <div className="custom-icon" slot="icon">
          {icon}
        </div>
      )}
    </BrutalistButton>
  );
};

// Usage
const MyComponent = () => {
  return (
    <CustomButton
      icon={<svg>...</svg>}
      buttonText="Firebase"
      subtitle="Powered"
      onClick={() => console.log('Custom icon button clicked')}
    />
  );
};
```

## Usage

All components are exported from a single file for easy importing:

```jsx
import { 
  FirstLoader, 
  SecondLoader, 
  ThirdLoader, 
  GridLayout,
  BrutalistButton 
} from "@/components/global/loaders";
```

Make sure to also import the required styles:

```jsx
import "@/styles"; // This imports all styles including loaders.css
```

## Demo Page

All components can be viewed on the demo page located at:
```
/demo/loaders
```

The demo page showcases each component with usage examples and interactive elements. Visit the demo page to see the components in action and understand their behavior.

## Styling

The components use CSS classes defined in `src/styles/loaders.css`. Key classes include:

- `.svg-frame`: Container for the FirstLoader
- `.loader`: Container for the SecondLoader
- `.estrobo_animation`: Animation class for ThirdLoader
- `.grid-wrapper`: Container for the GridLayout
- `.grid-box`: Base class for grid boxes
- `.grid-box1` through `.grid-box14`: Individual grid box styles
- `.brutalist-button`: Styles for the BrutalistButton

To extend or modify the styles, you can:

1. Add custom classes via the `className` prop
2. Use CSS variables to customize specific properties
3. Create derived components with additional styling
4. Apply global theme overrides

Example of extending with custom classes:

```jsx
<FirstLoader className="my-custom-loader large-size" />
```

Example of modifying CSS variables:

```css
/* In your custom CSS */
.my-theme .loader {
  --logo-color: #ff5500;
  --duration: 3s;
}

.my-theme .brutalist-button {
  --button-bg: #222;
  --button-border: #fff;
}
```

## Accessibility

All components are designed with accessibility in mind:

- **Animation Control**: Animations respect the `prefers-reduced-motion` media query
- **Keyboard Navigation**: Interactive elements are keyboard accessible
- **Screen Readers**: Appropriate ARIA attributes are used
- **Focus States**: Visible focus indicators for keyboard users
- **Color Contrast**: Text meets WCAG AA standards for contrast

For users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .svg-frame svg,
  .loader .box,
  .estrobo_animation,
  .brutalist-button {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Browser Compatibility

Components are tested and compatible with:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

**Fallbacks:**
- For browsers that don't support backdrop-filter, a semi-transparent background is used instead
- SVG animations gracefully degrade in older browsers
- CSS Grid fallbacks to flexbox for very old browsers

## Performance Considerations

- **Animation Performance**: All animations use transform and opacity for optimal performance
- **Hardware Acceleration**: Transform animations use will-change and transform-origin properties
- **SVG Optimization**: SVG paths are optimized for file size and rendering performance
- **Reduced Motion**: Animations can be disabled via media queries
- **Lazy Loading**: Consider lazy loading these components if they appear below the fold

## Advanced Customization

### Creating Themed Variations

```jsx
import { BrutalistButton } from "@/components/global/loaders";
import { twMerge } from "tailwind-merge";

const ThemeVariants = {
  primary: "bg-blue-500 border-blue-700 hover:bg-blue-600",
  success: "bg-green-500 border-green-700 hover:bg-green-600",
  danger: "bg-red-500 border-red-700 hover:bg-red-600",
};

const ThemedButton = ({ variant = "primary", ...props }) => {
  return (
    <BrutalistButton
      {...props}
      className={twMerge(ThemeVariants[variant], props.className)}
    />
  );
};

// Usage
<ThemedButton variant="success" onClick={handleClick} />
```

### Creating Composite Components

```jsx
import { FirstLoader, BrutalistButton } from "@/components/global/loaders";

const LoadingButton = ({ isLoading, onClick, text, ...props }) => {
  return (
    <div className="loading-button-container">
      {isLoading ? (
        <FirstLoader className="button-loader" />
      ) : (
        <BrutalistButton
          onClick={onClick}
          buttonText={text}
          {...props}
        />
      )}
    </div>
  );
};

// Usage
<LoadingButton
  isLoading={loading}
  onClick={handleSubmit}
  text="Submit Form"
/>
```

### Animation Timing Integration with React

```jsx
import { useEffect, useState } from "react";
import { ThirdLoader } from "@/components/global/loaders";

const AnimatedServerProcess = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Match this timeout to your animation duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 4000); // 4s matches the floatAndBounce animation
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return isVisible ? <ThirdLoader className="process-indicator" /> : null;
};
``` 