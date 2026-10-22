import React from 'react';
import { notFound } from 'next/navigation';
import { CategoryType } from '@/types';
import { getTreatmentById } from '@/lib/treatmentService';
import { TreatmentConsultationClient } from '@/components/TreatmentConsultationClient';

interface TreatmentDetailPageProps {
  params: Promise<{
    category: string;
    treatmentId: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function TreatmentDetailPage({ params }: TreatmentDetailPageProps) {
  const { category, treatmentId } = await params;

  if (category !== 'hair' && category !== 'skin') {
    notFound();
  }

  const treatment = await getTreatmentById(treatmentId);

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
