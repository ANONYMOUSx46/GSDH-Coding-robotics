
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import logUserVisit from "./utils/userTracking";

// Lazy-load pages for better performance
const SignUp = lazy(() => import("./pages/SignUp"));
const Quiz = lazy(() => import("./pages/Quiz"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

const queryClient = new QueryClient();

const App = () => {
  // Log user visit when the app loads
  useEffect(() => {
    logUserVisit();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-retro-accent font-code text-xl animate-pulse">LOADING...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
              <Route path="/quiz" element={<PageTransition><Quiz /></PageTransition>} />
              <Route path="/thankyou" element={<PageTransition><ThankYou /></PageTransition>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
