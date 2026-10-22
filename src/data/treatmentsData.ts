import { Treatment, ClinicSettings, CategoryType } from '@/types';

export const CLINIC_SETTINGS: ClinicSettings = {
  name: 'Nila Clinic',
  tagline: 'Skin & Hair Care',
  disclaimer: 'Results vary from person to person. Every person’s skin and hair is different, so your doctor will plan your treatment and timeline after a consultation.',
  phone: '+91 81222 64556'
};

export const INITIAL_TREATMENTS: Treatment[] = [
  // HAIR TREATMENTS (7 items - 21 concerns)
  {
    id: 'hairfall-control',
    name: 'Hairfall Control & Regrowth',
    category: 'hair',
    order: 1,
    concerns: [
      { id: 'hair-fall', name: 'Hair fall', useIllustration: true },
      { id: 'dull-hair-1', name: 'Dull hair', useIllustration: true },
      { id: 'rough-hair-appearance', name: 'Rough hair appearance', useIllustration: true }
    ]
  },
  {
    id: 'prp-hair',
    name: 'PRP Hair Treatment',
    category: 'hair',
    order: 2,
    concerns: [
      { id: 'hair-loss-1', name: 'Hair loss', useIllustration: true },
      { id: 'thinning-hair-1', name: 'Thinning hair', useIllustration: true },
      { id: 'dull-hair-2', name: 'Dull hair appearance', useIllustration: true }
    ]
  },
  {
    id: 'excell-gfc',
    name: 'Excell GFC',
    category: 'hair',
    doctorNote: 'Reduces hair fall, increases hair thickness. Non-surgical and safe.',
    badge: 'Popular',
    order: 3,
    concerns: [
      { id: 'reduces-hair-fall', name: 'Reduces hair fall', useIllustration: true },
      { id: 'increases-hair-thickness', name: 'Increases hair thickness', useIllustration: true },
      { id: 'non-surgical-safe', name: 'Non-surgical & safe', useIllustration: true }
    ]
  },
  {
    id: 'scalp-rejuvenation',
    name: 'Scalp Rejuvenation',
    category: 'hair',
    order: 4,
    concerns: [
      { id: 'dry-scalp', name: 'Dry scalp', useIllustration: true },
      { id: 'hair-loss-2', name: 'Hair loss', useIllustration: true },
      { id: 'low-blood-flow', name: 'Low blood flow', useIllustration: true }
    ]
  },
  {
    id: 'oxygen-laser-therapy',
    name: 'Oxygen Laser Therapy (OLT)',
    category: 'hair',
    order: 5,
    concerns: [
      { id: 'lesser-hair', name: 'Lesser hair', useIllustration: true },
      { id: 'breakage-follicles', name: 'Breakage of hair follicles', useIllustration: true },
      { id: 'dull-hair-3', name: 'Dull hair appearance', useIllustration: true }
    ]
  },
  {
    id: 'dandruff-treatment',
    name: 'Dandruff Treatment',
    category: 'hair',
    order: 6,
    concerns: [
      { id: 'protein-damage', name: 'Protein damage', useIllustration: true },
      { id: 'harmless-white-flakes', name: 'Harmless white flakes', useIllustration: true },
      { id: 'weak-hair', name: 'Weak hair', useIllustration: true }
    ]
  },
  {
    id: 'hair-transplantation',
    name: 'Hair Transplantation',
    category: 'hair',
    doctorNote: 'Methods: Simultaneous Hair Transplant, Sapphire Hair Transplant and BIOFUE Hair Transplant.',
    order: 7,
    concerns: [
      { id: 'transplant-hair-loss', name: 'Hair loss', useIllustration: true },
      { id: 'transplant-thinning', name: 'Thinning hair', useIllustration: true },
      { id: 'transplant-dull-hair', name: 'Dull hair appearance', useIllustration: true }
    ]
  },

  // SKIN TREATMENTS (15 items - 54 concerns)
  {
    id: 'prp-skin',
    name: 'PRP Skin Treatment',
    category: 'skin',
    order: 1,
    concerns: [
      { id: 'skin-wrinkles', name: 'Wrinkles', useIllustration: true },
      { id: 'skin-acne-scar', name: 'Acne scar', useIllustration: true },
      { id: 'skin-dull', name: 'Dull skin', useIllustration: true },
      { id: 'skin-exfoliation', name: 'Skin exfoliation', useIllustration: true }
    ]
  },
  {
    id: 'glutathione-iv',
    name: 'Glutathione IV',
    category: 'skin',
    order: 2,
    concerns: [
      { id: 'gluta-hyperpigmentation', name: 'Hyper pigmentation', useIllustration: true },
      { id: 'gluta-radiance', name: 'Boosting skin radiance', useIllustration: true },
      { id: 'gluta-immunity', name: 'Enhance immunity and detoxification', useIllustration: true },
      { id: 'gluta-lightening', name: 'Skin lightening', useIllustration: true }
    ]
  },
  {
    id: 'oxygeno-facial',
    name: 'Oxygeno Facial',
    category: 'skin',
    doctorNote: 'Nourishes the complexion giving a balanced healthy glow.',
    order: 3,
    concerns: [
      { id: 'oxy-tone', name: 'Skin tone', useIllustration: true },
      { id: 'oxy-texture', name: 'Evens texture', useIllustration: true },
      { id: 'oxy-nourish', name: 'Nourishes the complexion giving a balanced healthy glow', useIllustration: true }
    ]
  },
  {
    id: 'botox-and-fillers',
    name: 'Botox and Fillers',
    category: 'skin',
    doctorNote: 'Non-surgical treatments.',
    order: 4,
    concerns: [
      { id: 'botox-nonsurgical', name: 'Non-surgical treatments', useIllustration: true },
      { id: 'botox-lines', name: 'Long-lasting results for fine lines and wrinkles', useIllustration: true },
      { id: 'botox-collagen', name: 'Boosts collagen production', useIllustration: true }
    ]
  },
  {
    id: 'microdermabrasion',
    name: 'Microdermabrasion',
    category: 'skin',
    order: 5,
    concerns: [
      { id: 'micro-resurfacing', name: 'Epidermal resurfacing procedure', useIllustration: true },
      { id: 'micro-exfoliation', name: 'Skin exfoliation', useIllustration: true },
      { id: 'micro-scars', name: 'Reduces acne scars', useIllustration: true },
      { id: 'micro-aging', name: 'Photo ageing', useIllustration: true },
      { id: 'micro-uneven', name: 'Treats uneven skin', useIllustration: true }
    ]
  },
  {
    id: 'anti-acne-treatments',
    name: 'Anti Acne Treatments',
    category: 'skin',
    order: 6,
    badge: 'Popular',
    concerns: [
      { id: 'acne-reduces-scar', name: 'Reduces the acne scar', useIllustration: true },
      { id: 'acne-open-pores', name: 'Open pores', useIllustration: true }
    ]
  },
  {
    id: 'mnrf-meso-glow',
    name: 'MNRF & Meso Glow',
    category: 'skin',
    order: 7,
    concerns: [
      { id: 'mnrf-meso-lines', name: 'Reduces fine lines and wrinkles', useIllustration: true },
      { id: 'mnrf-meso-texture', name: 'Improves skin texture', useIllustration: true },
      { id: 'mnrf-meso-youthful', name: 'Youthful-looking skin', useIllustration: true },
      { id: 'mnrf-meso-scars', name: 'Reduces acne scars', useIllustration: true }
    ]
  },
  {
    id: 'melasma-treatment',
    name: 'Melasma Treatment',
    category: 'skin',
    order: 8,
    concerns: [
      { id: 'melasma-dull', name: 'Dull skin', useIllustration: true },
      { id: 'melasma-patches', name: 'Dark patches', useIllustration: true },
      { id: 'melasma-anti-ageing', name: 'Anti-ageing', useIllustration: true }
    ]
  },
  {
    id: 'mnrf',
    name: 'MNRF',
    category: 'skin',
    order: 9,
    concerns: [
      { id: 'mnrf-lines', name: 'Reduces fine lines and wrinkles', useIllustration: true },
      { id: 'mnrf-texture', name: 'Improves skin texture', useIllustration: true },
      { id: 'mnrf-youthful', name: 'Youthful-looking skin', useIllustration: true },
      { id: 'mnrf-scars', name: 'Reduces acne scars', useIllustration: true }
    ]
  },
  {
    id: 'mesoglow',
    name: 'Mesoglow',
    category: 'skin',
    order: 10,
    concerns: [
      { id: 'meso-rejuvenation', name: 'Rejuvenation', useIllustration: true },
      { id: 'meso-hydration', name: 'Hydration', useIllustration: true },
      { id: 'meso-brightening', name: 'Skin brightening', useIllustration: true },
      { id: 'meso-glow', name: 'Skin radiance and youthful glow', useIllustration: true }
    ]
  },
  {
    id: 'q-switch-laser',
    name: 'Q Switch Laser',
    category: 'skin',
    order: 11,
    badge: 'Clinical Laser',
    concerns: [
      { id: 'qs-hyperpigmentation', name: 'Hyper pigmentation', useIllustration: true },
      { id: 'qs-rejuvenation', name: 'Skin rejuvenation', useIllustration: true },
      { id: 'qs-freckles', name: 'Freckles', useIllustration: true },
      { id: 'qs-melasma', name: 'Melasma', useIllustration: true },
      { id: 'qs-tone', name: 'Uneven skin tone', useIllustration: true },
      { id: 'qs-pores', name: 'Shrink pores', useIllustration: true }
    ]
  },
  {
    id: 'unwanted-hair-reduction',
    name: 'Unwanted Hair Reduction (LHR Therapy)',
    category: 'skin',
    doctorNote: 'Laser Hair Reduction procedure.',
    order: 12,
    concerns: [
      { id: 'lhr-growth', name: 'Unwanted hair growth', useIllustration: true }
    ]
  },
  {
    id: 'prf-plasma-rich-fibrin',
    name: 'PRF – Plasma Rich Fibrin',
    category: 'skin',
    order: 13,
    concerns: [
      { id: 'prf-biofillers', name: 'Biofillers for anti-ageing', useIllustration: true },
      { id: 'prf-gel', name: 'Gel-form filler', useIllustration: true },
      { id: 'prf-scars', name: 'Extensive scars', useIllustration: true },
      { id: 'prf-hollow-eye', name: 'Hollow under the eye', useIllustration: true },
      { id: 'prf-collagen', name: 'Collagen loss', useIllustration: true }
    ]
  },
  {
    id: 'exo-skin-prp',
    name: 'Exo-Skin PRP',
    category: 'skin',
    doctorNote: 'Exosome combined growth-factor concentrate.',
    order: 14,
    concerns: [
      { id: 'exo-severe-scars', name: 'Medium to severe scars', useIllustration: true },
      { id: 'exo-persistent-acne', name: 'Persistent acne', useIllustration: true },
      { id: 'exo-collagen-loss', name: 'Collagen loss', useIllustration: true }
    ]
  },
  {
    id: 'acne-and-scar-guide',
    name: 'Acne and Scar Guide',
    category: 'skin',
    doctorNote: 'Doctor recommended treatment pathways for specialized acne & scar conditions.',
    isGuide: true,
    badge: 'Doctor Guide',
    order: 15,
    concerns: [
      {
        id: 'guide-scar',
        name: 'Scar',
        recommendedTreatments: ['PRP', 'Exo-Skin', 'PRF', 'CO2', 'Peel'],
        useIllustration: true
      },
      {
        id: 'guide-acne-mark',
        name: 'Acne mark',
        recommendedTreatments: ['Q Switch Laser', 'PRP', 'Exo-Skin PRP', 'Peel', 'Glutathione IV'],
        useIllustration: true
      },
      {
        id: 'guide-active-acne',
        name: 'Active acne',
        recommendedTreatments: ['HFT', 'Peel'],
        useIllustration: true
      }
    ]
  }
];

export function getTreatmentsByCategory(category: CategoryType): Treatment[] {
  return INITIAL_TREATMENTS.filter(t => t.category === category);
}

export function getTreatmentById(id: string): Treatment | undefined {
  return INITIAL_TREATMENTS.find(t => t.id === id);
}

