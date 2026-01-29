import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ... other imports

export default function OriginDetailClient({ origin }: { origin: typeof origins[0] }) {
    // ... hook logic

    return (
        <main ref={containerRef} className="bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] min-h-screen">
            <Navbar />

            {/* HER - The Hook */}
            {/* ... rest of the content ... */}

            {/* CTA */}
            <CTA
                title={origin.cta.text}
                subtitle="The Collection"
                href={origin.cta.href}
                buttonText="View Collection"
            />

            <Footer />
        </main>
    );
}
