import { Fragment, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { EN_PREFIX } from "@/i18n/locale-path";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageMotion from "@/components/layout/PageMotion";
import RouteTracker from "@/components/RouteTracker";
import HomePage from "@/pages/HomePage";
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const RecipesPage = lazy(() => import("@/pages/RecipesPage"));
const RecipePage = lazy(() => import("@/pages/RecipePage"));
const VideosPage = lazy(() => import("@/pages/VideosPage"));
const VideoPage = lazy(() => import("@/pages/VideoPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const PolicyPage = lazy(() => import("@/pages/PolicyPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const CheckoutCompletePage = lazy(() => import("@/pages/CheckoutCompletePage"));

const App = () => (
    <LanguageProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <PageMotion />
            <RouteTracker />
            <div className="flex min-h-screen flex-col">
              <div className="film-grain" aria-hidden="true" />
              <AnnouncementBar />
              <Navbar />
              <main id="main" tabIndex={-1} className="flex-1 outline-none">
                {/* Inner pages arrive as their own chunks; the dark stage holds
                    the space for the moment one is loading. */}
                <Suspense fallback={<div className="min-h-screen bg-ink" />}>
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
                </Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
      </LanguageProvider>
);

export default App;
