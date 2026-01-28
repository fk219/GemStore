import React from 'react';
import { notFound } from 'next/navigation';
import { origins } from '@/lib/data';
import OriginDetailClient from '@/components/Origins/OriginDetailClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function OriginPage({ params }: PageProps) {
    const { slug } = await params;
    const origin = origins.find(o => o.slug === slug);

    if (!origin) {
        notFound();
    }

    return <OriginDetailClient origin={origin} />;
}
