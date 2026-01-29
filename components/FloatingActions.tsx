'use client';

import React from 'react';
import WhatsAppButton from './WhatsAppButton';
import ScrollToTop from './ScrollToTop';

const FloatingActions: React.FC = () => {
    return (
        <div className="fixed bottom-6 right-6 z-[50] flex items-center gap-3">
            <ScrollToTop />
            <WhatsAppButton />
        </div>
    );
};

export default FloatingActions;
