# Royal Taste Restaurant — Modern Luxury Fine Dining Website

An ultra-premium, modern, and fully responsive restaurant website crafted for **Royal Taste Restaurant**, featuring high-gastronomy culinary presentations, dark charcoal aesthetics, warm antique gold accents, and an interactive WhatsApp concierge ordering system.

> **Portfolio Demonstration Project**  
> Designed & Developed by **SAMAR WEB STUDIO**  
> *All restaurant details, menus, reviews, and bookings are fictional demonstration showcases.*

---

## 🌟 Key Features

1. **Cinematic Hero Section**:
   - Grand chandelier ambiance backdrop with measured contrast scrim for WCAG AA readability.
   - Elegant typography pairing: *Cormorant Garamond* serif display and *Plus Jakarta Sans* body.
   - Quick call-to-actions: *Explore Menu*, *Book Table*, and *WhatsApp Order*.

2. **Our Heritage & Culinary Philosophy**:
   - Spotlight on Executive Chef Alexandre Moreau (22 years international haute cuisine).
   - Three culinary pillars: *Artisanal Hearth*, *Noble Provenance*, and *Royal Service*.
   - Key operational milestones with tabular numeral typography.

3. **Haute Cuisine Menu & Category Filters**:
   - Instant reactive filtering across 7 categories: *All Creations*, *Chef's Signatures*, *Starters & Caviar*, *Royal Entrées*, *Charcoal & Josper*, *Decadent Desserts*, and *Artisanal Elixirs*.
   - Live dish search and dietary toggles (*Vegetarian*, *Gluten-Free*).
   - Detailed plating modal showing preparation time, calorie count, and sommelier pairing recommendations.
   - 1-click *"WhatsApp Order"* action and *"Add to Tray"* with visual feedback.

4. **Curated Experiences & Special Offers**:
   - Exclusive tasting journeys: *7-Course Degustation Journey*, *Weekend Twilight Feast*, and *Imperial High Tea*.
   - Experience inclusions, pricing, and 1-tap WhatsApp claiming.

5. **Visual Gastronomy Food Gallery**:
   - High-resolution photographic showcase across platings, wine cellars, and dining salons.
   - Touch-friendly category filters and full-screen lightbox modal with keyboard Escape support.

6. **Customer Reviews & Accolades (Demo Showcase)**:
   - Clearly marked as demonstration content.
   - Realistic culinary critic ratings and reviews with verified tasting indicators.
   - Interactive *"Write a Demo Review"* modal with live local submission.

7. **Table Reservation System (Validated)**:
   - Client-side field validation for Guest Name, Email, Phone, Reservation Date (prevents past dates), Time, Party Size ($1\text{--}16$), and Seating Salon.
   - Real-time error alerts and inline validation feedback.
   - Booking confirmation card with generated reference code (`RT-XXXX`) and direct WhatsApp forwarding.

8. **Contact Us & Concierge Inquiries (Validated)**:
   - Dedicated inquiry form for private dining, press, dietary requirements, and VIP celebrations.
   - Real-time field validation with inquiry reference code (`INQ-XXXX`).

9. **Location, Service Schedule & Etiquette**:
   - Lunch and dinner hours schedule for weekdays and weekends.
   - Stylized blueprint architectural map preview with one-tap address copying.
   - Guest etiquette guide (dress code and complimentary valet parking instructions).
   - Interactive FAQ accordion.

10. **WhatsApp Concierge Ordering System**:
    - Clearly marked demo concierge phone number placeholder: `+1 (555) 769-2582` (`+1 (555) ROYAL-TASTE`).
    - Order tray builder: adjust quantities, specify dining mode (*Dine-In, Curbside Pick-up, VIP Delivery*), and enter custom chef preparation notes.
    - Generates formatted, URL-encoded WhatsApp text ready for instant sending.
    - One-click *"Copy Message Text"* and *"Simulate Confirmation"* modes.
    - Floating action button on mobile and desktop with tray item counter.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: *Cormorant Garamond* (Google Fonts) & *Plus Jakarta Sans* (Google Fonts)
- **Deployment**: Zero-backend static build compatible with Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 📁 Project Structure

```
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules for node_modules, build artifacts
├── index.html                # HTML entry point with SEO meta & Google Fonts
├── metadata.json             # AI Studio app metadata
├── package.json              # Project dependencies and npm scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration with Tailwind CSS v4 & React
├── src/
│   ├── main.tsx              # Application mount point
│   ├── App.tsx               # Root component orchestrating sections & modal states
│   ├── index.css             # Tailwind v4 import, fonts & custom scrollbars
│   ├── types/
│   │   └── restaurant.ts     # TypeScript interfaces (MenuItem, SpecialOffer, Review, etc.)
│   ├── data/
│   │   └── restaurantData.ts # Menu items, offers, reviews, service hours & FAQs
│   ├── assets/
│   │   └── images/           # High-resolution culinary and ambiance photography
│   └── components/
│       ├── Navbar.tsx             # Sticky 3-zone header & mobile navigation drawer
│       ├── Hero.tsx               # Hero section with balanced typography & CTAs
│       ├── About.tsx              # Heritage, Chef spotlight & philosophy
│       ├── MenuSection.tsx        # Categorized menu with search & dietary filters
│       ├── DishDetailModal.tsx    # Plating inspection modal with sommelier pairings
│       ├── SpecialOffers.tsx      # Curated tasting journeys & booking actions
│       ├── GallerySection.tsx     # Photo gallery with interactive lightbox
│       ├── ReviewsSection.tsx     # Demonstration reviews & review creation modal
│       ├── ReservationSection.tsx # Table reservation form with validation & reference code
│       ├── LocationHours.tsx      # Service hours, map blueprint card & FAQ accordion
│       ├── ContactSection.tsx     # Dedicated inquiry form with validation
│       ├── WhatsAppOrderModal.tsx # Order tray builder & WhatsApp chat message compiler
│       ├── FloatingWhatsAppBtn.tsx# Floating action button with live tray badge
│       └── Footer.tsx             # Footer with navigation, hours & SAMAR WEB STUDIO credits
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (version 9.0.0 or higher) or `pnpm` / `yarn`

### 1. Installation

Clone or extract the repository, then install dependencies:

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).

### 3. Build for Production

```bash
npm run build
```

This compiles optimized, minified production assets into the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

### 5. Type-Check and Lint

```bash
npm run lint
```

---

## 📤 Step-by-Step Instructions to Export to GitHub

Follow these steps to push this project to your own GitHub account:

### Step 1: Create a New Repository on GitHub
1. Log in to [GitHub.com](https://github.com/).
2. Click the **`+`** icon in the top-right corner and choose **"New repository"**.
3. Set the repository name (e.g., `royal-taste-restaurant`).
4. Choose **Public** (or **Private**).
5. Leave "Add a README file", ".gitignore", and "license" **unchecked** (we already have these prepared).
6. Click **"Create repository"**.
7. Copy the repository URL (e.g., `https://github.com/your-username/royal-taste-restaurant.git`).

### Step 2: Initialize and Commit Locally
Open your terminal in this project directory:

```bash
# Initialize git (if not already done)
git init -b main

# Stage all files
git add .

# Create the initial commit
git commit -m "Initial commit: Royal Taste Restaurant website by SAMAR WEB STUDIO"
```

### Step 3: Link Remote and Push
Replace the URL below with your actual GitHub repository URL:

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/your-username/royal-taste-restaurant.git

# Push the main branch to GitHub
git push -u origin main
```

---

## 🌐 Free Static Hosting Options

Because this is a modern client-side React + Vite project with no server dependencies or secret API keys, you can host it for free on:

### Option A: Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **"Add New Project"** and import `royal-taste-restaurant`.
3. Framework Preset will automatically detect **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**. Your site will be live with a global CDN and automatic HTTPS!

### Option B: Netlify
1. Go to [netlify.com](https://www.netlify.com/) and connect your GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

### Option C: GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.ts`, add `base: '/royal-taste-restaurant/'` (your repository name).
3. In `package.json`, add:
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```
4. Run `npm run deploy`.

---

## 🔒 Security & Privacy

- **No Secrets Exposed**: This project contains no private API keys, credentials, or sensitive tokens.
- **Client-Side Form Simulation**: Form submissions and WhatsApp ordering are demonstration implementations that format text on the client without transmitting private data to unverified endpoints.

---

## 📄 Attribution & Credits

- **Design & Architecture**: Developed as a portfolio showcase by **SAMAR WEB STUDIO**.
- **Images**: High-resolution culinary presentations and ambiance photography generated and curated for the Royal Taste brand identity.
