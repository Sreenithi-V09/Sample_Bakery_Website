# Sweet Crumbs Artisan Bakery & Patisserie

A complete, static **HTML5, CSS3, and Vanilla JavaScript (ES6+)** website for **Sweet Crumbs Artisan Bakery & Patisserie**. Designed to open directly in any web browser via `index.html` or deploy immediately to static hosting such as GitHub Pages—with zero frameworks, zero TypeScript, zero Node.js server, and zero build tools.

---

## 📁 Project Folder Structure

```text
.
├── index.html               # Semantic HTML5 markup & sections
├── css/
│   └── style.css            # Pure CSS3 stylesheet (typography, layout, responsive breakpoints, modals)
├── js/
│   └── main.js              # Vanilla ES6+ interactivity, datasets, search/filtering, coupons & enquiry log
├── assets/
│   ├── images/              # Local product, hero, and packaging photographs
│   └── icons/               # Local SVG favicon and brand icons
└── README.md                # Project overview, local usage & GitHub Pages deployment guide
```

---

## 🥖 Features

- **Best-Selling Products**: Cakes, artisan sourdoughs, butter croissants, cookies, and cupcakes with portion/size selectors, placeholder price notices, and instant enquiry prefill.
- **Special Pastries & New Creations**: Interactive category filter tabs (`All`, `Chocolate`, `Cream & Custard`, `Fresh Fruit Tarts`, `Croissants`, `Danish Pastries`, `Seasonal Specials`) with allergen and freshness previews.
- **Full Product Catalog Search & Filters**: Live keyword search (by product name or ingredient), category tabs, `Eggless Only` / `Vegetarian` dietary checkboxes, and price sorting.
- **Recipes & Ingredients**: Owner-approved community baking recipes with baker's percentages table and step-by-step preparation modal.
- **Product Care & Storage Guide**: Category-specific care tabs covering temperature, containers, ideal consumption window, best practices, common mistakes, and reheating tips.
- **Our Packaging & Food Safety**: Food-grade packaging details plus the Bakery Transit Checklist for transporting cakes and cream pastries.
- **Manufacturing & Shelf-Life Index**: Best-Before vs. Use-By guidance with searchable and filterable shelf-life table and product care cards.
- **12-Month Festival Collections & Offers**: Interactive January–December calendar bar with festival delicacies, coupon copy buttons, and direct festival enquiry prefill.
- **Coupons & Interactive Verification Engine**: Client-side voucher cards and real-time coupon validation engine (`WELCOME10`, `BAKERY20`, `FESTIVE15`, `CRUMBS5`, plus monthly festival codes).
- **Customer Bakery & Cake Enquiry Form**: Full field validation (name, phone, email, advance date), quantity stepper, preselection banner, confirmation slip modal with reference number (`SC-YYYY-XXXX`), `localStorage` persistence, and WhatsApp integration.
- **Bakery Owner Portal**: Live product price/stock/best-seller editor (persisted in browser `localStorage`), customer enquiries log viewer, and JSON export for catalog and enquiries.

---

## 🔄 Files Converted & Obsolete Files Removed

### Converted Files
- `index.html` → Updated to reference relative `css/style.css`, `js/main.js` (standard `defer` script), `assets/icons/favicon.svg`, and `assets/images/hero-bakery.jpg`.
- `src/style.css` + compiled utility styles → `css/style.css` (pure CSS3 with zero Tailwind/PostCSS build dependencies).
- `src/main.js`, `src/data/bakeryData.ts`, & `src/types/bakery.ts` → Consolidated into `js/main.js` as standard Vanilla ES6+ JavaScript with local relative image paths, client-side coupon validation, and `localStorage` enquiry persistence.
- External product/hero/packaging image URLs → Saved locally inside `assets/images/` with relative paths.
- Brand favicon & vector icons → Added inside `assets/icons/`.

### Files No Longer Required
The following framework, TypeScript, Vite, and Node.js server files were removed as they are unnecessary for a pure HTML/CSS/JS static site:
- `src/` (`src/main.js`, `src/style.css`, `src/data/bakeryData.ts`, `src/types/bakery.ts`)
- `server.ts`
- `vite.config.ts`
- `tsconfig.json`
- `.env.example`
- `bun.lock`

---

## 💻 How to Run Locally

### Option 1: Open Directly in Browser
1. Download or clone this repository.
2. Double-click `index.html` (or right-click → **Open With** → Chrome / Firefox / Edge / Safari).
3. All sections, images, filters, modals, coupon validation, and enquiry forms work immediately without a server.

### Option 2: Run with a Local Static Server (Optional)
Using Python:
```bash
python3 -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🚀 How to Deploy on GitHub Pages

1. Create a new repository on GitHub (e.g., `sweet-crumbs-bakery`).
2. Upload the project files (`index.html`, `css/`, `js/`, `assets/`, `README.md`) to the repository root:
   ```bash
   git init
   git add index.html css js assets README.md
   git commit -m "Deploy Sweet Crumbs static website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sweet-crumbs-bakery.git
   git push -u origin main
   ```
3. On GitHub, open your repository and go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
6. Wait 1–2 minutes and visit `https://<your-username>.github.io/sweet-crumbs-bakery/`. All relative paths (`css/style.css`, `js/main.js`, `assets/...`) will resolve automatically.
