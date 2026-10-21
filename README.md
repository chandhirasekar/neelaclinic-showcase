# Nila Clinic – Skin & Hair Care (Tablet Showcase & Admin Portal)

A clinical treatment showcase application engineered specifically for **Tablet / iPad View** during doctor-patient consultations, with full desktop responsiveness, dynamic admin CMS backend, and future-aligned **Mongoose / MongoDB** integration.

Built strictly according to the **Nila Clinic Business Requirements Document (BRD v1.1)** and the interactive vehicle showroom design paradigm.

---

## 🌟 Key Features

### 1. Tablet-First Doctor Consultation UI (Showroom Mode)
- **Primary Design Focus: Tablet (iPad 10-12", Surface, Android Tablets)** with touch targets (48px+), zero double-tap delays, and smooth hardware-accelerated animations.
- **Side-by-Side Showroom Layout** (inspired by vehicle showroom UX):
  - Left procedures drawer/ribbon with fast search & filter.
  - Center-stage interactive before-and-after comparison canvas.
  - Instant concern indicator chips (switch concerns without going back).
  - Doctor recommended treatment badges (e.g. for Acne & Scar Guide: PRP, Exo-Skin, PRF, CO2, Peel).
  - Doctor Consultation Pad for recording patient notes and interest directly on the tablet screen.
- **Dual Comparison Modes**:
  - **Interactive Split Slider**: Draggable handle (`#8CC43A` Fresh green), arrow keys navigation, and smooth animated "Show Before" / "Show After" sweep buttons.
  - **Side-by-Side Mode**: View both before and after outcomes simultaneously across wide tablet screens.
  - **Clinical Zoom Tool**: Magnify skin pores, blemishes, and hairline density for patient demonstration.
  - **Presentation Mode**: Fullscreen distraction-free showcase.

### 2. Dual Viewing Experiences
- **Tablet Showroom Mode**: Designed for doctors to present procedures, switch variants, and compare results in real-time with clients.
- **4-Level Catalog Flow**:
  - **Level 1**: Home (Skin Treatments vs Hair Treatments large choice cards + 3-step guide).
  - **Level 2**: Category Page (grid of all treatments with notes and concern counts).
  - **Level 3**: Treatment Page (every concern listed as an inspection card).
  - **Level 4**: Concern Comparison Result Page with breadcrumbs and direct concern switching.

### 3. Medical Integrity & Business Rules
- **Rule BR-01 Compliant**: No session counts, durations, or weeks-to-results shown anywhere.
- **Rule BR-05 & FR-14**: Standard medical disclaimer displayed on every comparison screen.
- **Rule FR-21**: Double Chin Reduction completely removed as instructed by the doctor.
- **Rule FR-22 & FR-23**: Unwanted Hair Reduction (LHR Therapy) placed under Skin; Oxygen Laser Therapy (OLT) placed under Hair.
- **Rule FR-24**: Complete Acne and Scar Guide with Doctor's recommended treatments pathway.
- **Rule FR-25 & BR-08**: Illustrated clinical placeholder clearly labeled with *"Illustration – replace with real clinic photo"*.

### 4. Dynamic Admin Panel Backend (`/admin`)
- Accessible directly at `/admin` or via the top navigation.
- **Dashboard Metrics**: Real-time counts of Skin treatments, Hair treatments, total concerns, and captured patient consultation notes.
- **Treatment CMS**: Add new treatments, edit notes, categories, and badges, or delete treatments.
- **Concern & Photo Manager**: Upload real clinical Before/After photos (via local file or URL) or toggle vector illustration mode.
- **Tablet Consultation Inquiries**: View, filter, and export patient notes to CSV.
- **One-Click Re-Seed**: Restore the official 22 treatments and 75 concerns from the BRD at any time.

### 5. Future-Aligned Mongoose & MongoDB Integration
- Built with standard Mongoose connection pooling and caching (`src/lib/db.ts`).
- **Immediate Zero-Config Mode**: Uses an auto-persisting local storage engine so everything works out of the box immediately.
- **Future Live Mongo Cluster**: To connect MongoDB, simply add `MONGODB_URI` to `.env.local`:
  ```bash
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/neelaclinic?retryWrites=true&w=majority
  ```
  The app will automatically detect it and synchronize seamlessly!

---

## 📊 Content Completeness (BRD Appendix A)

- **Skin Treatments (15 total, 54 concerns)**:
  1. PRP Skin Treatment (4 concerns)
  2. Glutathione IV (4 concerns)
  3. Oxygeno Facial (3 concerns)
  4. Botox and Fillers (3 concerns)
  5. Microdermabrasion (5 concerns)
  6. Anti Acne Treatments (2 concerns)
  7. MNRF & Meso Glow (4 concerns)
  8. Melasma Treatment (3 concerns)
  9. MNRF (4 concerns)
  10. Mesoglow (4 concerns)
  11. Q Switch Laser (6 concerns)
  12. Unwanted Hair Reduction - LHR Therapy (1 concern)
  13. PRF – Plasma Rich Fibrin (5 concerns)
  14. Exo-Skin PRP (3 concerns)
  15. Acne and Scar Guide (3 concerns with Doctor recommended treatments)

- **Hair Treatments (7 total, 21 concerns)**:
  1. Hairfall Control & Regrowth (3 concerns)
  2. PRP Hair Treatment (3 concerns)
  3. Excell GFC (3 concerns)
  4. Scalp Rejuvenation (3 concerns)
  5. Oxygen Laser Therapy - OLT (3 concerns)
  6. Dandruff Treatment (3 concerns)
  7. Hair Transplantation (3 concerns)

- **Grand Total**: 22 Treatments, 75 Concerns.

---

## 🚀 Running the Project

```bash
# Navigate to project folder
cd C:\mern\neelaclinic-tablet

# Install dependencies (already installed)
npm install

# Run local development server
npm run dev

# Open in browser / tablet:
# Main Showcase: http://localhost:3000
# Admin CMS:     http://localhost:3000/admin
```
