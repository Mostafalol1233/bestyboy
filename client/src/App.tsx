import { GameSection } from "./components/GameSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main className="flex-1">
        <GameSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}