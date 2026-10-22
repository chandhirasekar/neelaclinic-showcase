import React from 'react';
import { notFound } from 'next/navigation';
import { CategoryType } from '@/types';
import { INITIAL_TREATMENTS, getTreatmentById } from '@/data/treatmentsData';
import { TreatmentConsultationClient } from '@/components/TreatmentConsultationClient';

interface TreatmentDetailPageProps {
  params: Promise<{
    category: string;
    treatmentId: string;
  }>;
}

export function generateStaticParams() {
  return INITIAL_TREATMENTS.map((t) => ({
    category: t.category,
    treatmentId: t.id,
  }));
}

export default async function TreatmentDetailPage({ params }: TreatmentDetailPageProps) {
  const { category, treatmentId } = await params;

  if (category !== 'hair' && category !== 'skin') {
    notFound();
  }

  const treatment = getTreatmentById(treatmentId);

  if (!treatment || treatment.category !== category) {
    notFound();
  }

  return (
    <TreatmentConsultationClient
      category={category as CategoryType}
      treatment={treatment}
    />
  );
}
