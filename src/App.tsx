import React from 'react';
import { useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage, ContactPage } from './pages/AboutContactPages';

export const MainLayout: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0D0D0D] text-[#1E1C1A] dark:text-[#F3EFEA] transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-details' && <ProductDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'account' && <AccountPage />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      <Footer />
      <MobileBottomBar />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return <MainLayout />;
}

export default App;
