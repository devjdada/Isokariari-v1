import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from '@/components/ui/sonner';

export default function WebLayout({ children }: PropsWithChildren) {
    return (
        <motion.div
            className="flex min-h-screen flex-col bg-white text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {/* <Toaster /> */}
            <Sonner />
            <Header />
            <motion.main className="flex-grow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                {children}
            </motion.main>
            <Footer />
        </motion.div>
    );
}
