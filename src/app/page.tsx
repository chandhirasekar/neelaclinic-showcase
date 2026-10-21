'use client';

import React, { useState, useEffect } from 'react';
import { Treatment, CategoryType, ConcernItem } from '@/types';
import { INITIAL_TREATMENTS } from '@/data/treatmentsData';
import { Header } from '@/components/Header';
import { Breadcrumbs, BreadcrumbItem } from '@/components/Breadcrumbs';
import { TabletShowroom } from '@/components/TabletShowroom';
import {
  HomeChoiceView,
  CategoryPageView,
  TreatmentPageView,
  ConcernResultView,
} from '@/components/CatalogViews';
import { ConsultationModal } from '@/components/ConsultationModal';

export default function HomePage() {
  const [treatments, setTreatments] = useState<Treatment[]>(INITIAL_TREATMENTS);
  const [, setLoading] = useState<boolean>(true);
  const [isDarkMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'showroom' | 'catalog'>('showroom');

  // Active Category (skin | hair)
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('skin');

  // Active context for Showroom breadcrumbs
  const [showroomTreatmentName, setShowroomTreatmentName] = useState<string>('');
  const [showroomConcernName, setShowroomConcernName] = useState<string>('');

  // Catalog Navigation Level
  const [navLevel, setNavLevel] = useState<'home' | 'category' | 'treatment' | 'concern'>('home');
  const [activeCatalogTreatment, setActiveCatalogTreatment] = useState<Treatment | null>(null);
  const [activeCatalogConcern, setActiveCatalogConcern] = useState<ConcernItem | null>(null);
  const [activeCatalogConcernIndex, setActiveCatalogConcernIndex] = useState<number>(0);

  // Doctor Consultation Modal state
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationContext, setConsultationContext] = useState({
    treatment: '',
    concern: '',
  });

  // Fetch treatments from dynamic API
  useEffect(() => {
    async function loadTreatments() {
      try {
        const res = await fetch('/api/treatments');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setTreatments(data.data);
        }
      } catch (err) {
        console.warn('Using local treatments data fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTreatments();
  }, []);

  const handleSelectCategory = (category: CategoryType) => {
    setCurrentCategory(category);
    if (viewMode === 'catalog') {
      setNavLevel('category');
    }
  };

  const handleOpenConsultation = (treatmentName?: string, concernName?: string) => {
    const tName =
      treatmentName ||
      showroomTreatmentName ||
      activeCatalogTreatment?.name ||
      treatments.find((t) => t.category === currentCategory)?.name ||
      'General Consultation';
    const cName =
      concernName ||
      showroomConcernName ||
      activeCatalogConcern?.name ||
      'Skin & Hair Assessment';
    setConsultationContext({
      treatment: tName,
      concern: cName,
    });
    setIsConsultationOpen(true);
  };

  // Breadcrumbs items completely separated from Header
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const categoryLabel = currentCategory === 'skin' ? 'Skin Treatments' : 'Hair Treatments';

    if (viewMode === 'showroom') {
      const items: BreadcrumbItem[] = [
        {
          label: categoryLabel,
        },
      ];
      if (showroomTreatmentName) {
        items.push({ label: showroomTreatmentName });
      }
      if (showroomConcernName) {
        items.push({ label: showroomConcernName });
      }
      return items;
    }

    const items: BreadcrumbItem[] = [];
    if (navLevel === 'category') {
      items.push({ label: categoryLabel });
    } else if (navLevel === 'treatment' && activeCatalogTreatment) {
      items.push({
        label: categoryLabel,
        onClick: () => setNavLevel('category'),
      });
      items.push({ label: activeCatalogTreatment.name });
    } else if (navLevel === 'concern' && activeCatalogTreatment && activeCatalogConcern) {
      items.push({
        label: categoryLabel,
        onClick: () => setNavLevel('category'),
      });
      items.push({
        label: activeCatalogTreatment.name,
        onClick: () => setNavLevel('treatment'),
      });
      items.push({ label: activeCatalogConcern.name });
    }
    return items;
  };

  const skinCount = treatments.filter((t) => t.category === 'skin').length;
  const hairCount = treatments.filter((t) => t.category === 'hair').length;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDarkMode ? 'dark bg-[#08192B] text-slate-100' : 'bg-[#F3F8FC] text-[#0B2545]'
      }`}
    >
      {/* Clean Top Header (Branding, Category Switcher & Actions only) */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Standalone Breadcrumbs Bar completely separated from Header */}
      <Breadcrumbs items={getBreadcrumbs()} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full">
        {viewMode === 'showroom' ? (
          <TabletShowroom
            treatments={treatments}
            selectedCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            onOpenConsultation={(treatment, concern) =>
              handleOpenConsultation(treatment, concern)
            }
            onActiveContextChange={(tName, cName) => {
              setShowroomTreatmentName(tName);
              setShowroomConcernName(cName);
            }}
            isDarkMode={isDarkMode}
          />
        ) : (
          <>
            {navLevel === 'home' && (
              <HomeChoiceView
                skinCount={skinCount}
                hairCount={hairCount}
                onSelectCategory={(cat) => {
                  setCurrentCategory(cat);
                  setNavLevel('category');
                }}
                onEnterShowroom={() => setViewMode('showroom')}
              />
            )}

            {navLevel === 'category' && (
              <CategoryPageView
                category={currentCategory}
                treatments={treatments.filter((t) => t.category === currentCategory)}
                onBackToHome={() => setNavLevel('home')}
                onSelectTreatment={(t) => {
                  setActiveCatalogTreatment(t);
                  setNavLevel('treatment');
                }}
              />
            )}

            {navLevel === 'treatment' && activeCatalogTreatment && (
              <TreatmentPageView
                treatment={activeCatalogTreatment}
                onBackToCategory={() => setNavLevel('category')}
                onSelectConcern={(c, idx) => {
                  setActiveCatalogConcern(c);
                  setActiveCatalogConcernIndex(idx);
                  setNavLevel('concern');
                }}
              />
            )}

            {navLevel === 'concern' && activeCatalogTreatment && activeCatalogConcern && (
              <ConcernResultView
                treatment={activeCatalogTreatment}
                concern={activeCatalogConcern}
                concernIndex={activeCatalogConcernIndex}
                onBackToTreatment={() => setNavLevel('treatment')}
                onSelectOtherConcern={(newIdx) => {
                  const newConcern = activeCatalogTreatment.concerns[newIdx];
                  if (newConcern) {
                    setActiveCatalogConcern(newConcern);
                    setActiveCatalogConcernIndex(newIdx);
                  }
                }}
                onOpenConsultation={() =>
                  handleOpenConsultation(
                    activeCatalogTreatment.name,
                    activeCatalogConcern.name
                  )
                }
              />
            )}
          </>
        )}
      </main>

      {/* Doctor Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        category={currentCategory}
        treatmentName={consultationContext.treatment}
        concernName={consultationContext.concern}
      />
    </div>
  );
}
