import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

export function MainLayout() {
    return (
        <div className="relative min-h-screen font-sans bg-background transition-colors duration-300">
            <div className="fixed inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none mix-blend-multiply dark:mix-blend-soft-light bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/background.jpg')` }}
            />
            <div className="relative z-10 container max-w-4xl mx-auto py-8 px-4">
                <Header />
                <main className="animate-in fade-in duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}