import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { EN_PREFIX } from "@/i18n/locale-path";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import RouteTracker from "@/components/RouteTracker";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import RecipesPage from "@/pages/RecipesPage";
import RecipePage from "@/pages/RecipePage";
import VideosPage from "@/pages/VideosPage";
import VideoPage from "@/pages/VideoPage";
import ProductPage from "@/pages/ProductPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import FaqPage from "@/pages/FaqPage";
import PolicyPage from "@/pages/PolicyPage";
import NotFoundPage from "@/pages/NotFoundPage";
import CheckoutCompletePage from "@/pages/CheckoutCompletePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <RouteTracker />
            <div className="flex min-h-screen flex-col">
              <AnnouncementBar />
              <Navbar />
              <main id="main" tabIndex={-1} className="flex-1 outline-none">
                <Routes>
                  {/* Every page twice: Arabic at the root, English under /en.
                      كل صفحة مرتين: العربية في الجذر والإنجليزية تحت /en. */}
                  {["", EN_PREFIX].map((prefix) => (
                    <Fragment key={prefix || "ar"}>
                      <Route path={`${prefix}/`} element={<HomePage />} />
                      <Route path={`${prefix}/shop`} element={<ShopPage />} />
                      <Route path={`${prefix}/shop/:slug`} element={<ProductPage />} />
                      {/* Keep the older /product/:slug shape working */}
                      <Route path={`${prefix}/product/:slug`} element={<ProductPage />} />
                      <Route path={`${prefix}/recipes`} element={<RecipesPage />} />
                      <Route path={`${prefix}/recipes/:slug`} element={<RecipePage />} />
                      <Route path={`${prefix}/videos`} element={<VideosPage />} />
                      <Route path={`${prefix}/videos/:slug`} element={<VideoPage />} />
                      <Route path={`${prefix}/about`} element={<AboutPage />} />
                      <Route path={`${prefix}/faq`} element={<FaqPage />} />
                      <Route path={`${prefix}/contact`} element={<ContactPage />} />
                      <Route path={`${prefix}/policies/:slug`} element={<PolicyPage />} />
                      <Route path={`${prefix}/checkout/complete`} element={<CheckoutCompletePage />} />
                    </Fragment>
                  ))}
                  <Route path="/index" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
