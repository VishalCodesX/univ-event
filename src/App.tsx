import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<DashboardLayout userRole="student" />}>
            <Route index element={<Dashboard userRole="student" />} />
            <Route path="dashboard" element={<Dashboard userRole="student" />} />
            <Route path="events" element={<Dashboard userRole="student" />} />
            <Route path="my-events" element={<Dashboard userRole="student" />} />
            <Route path="notifications" element={<Dashboard userRole="student" />} />
          </Route>

          {/* Organizer Routes */}
          <Route path="/organizer" element={<DashboardLayout userRole="organizer" />}>
            <Route index element={<Dashboard userRole="organizer" />} />
            <Route path="dashboard" element={<Dashboard userRole="organizer" />} />
            <Route path="my-events" element={<Dashboard userRole="organizer" />} />
            <Route path="create-event" element={<Dashboard userRole="organizer" />} />
            <Route path="analytics" element={<Dashboard userRole="organizer" />} />
            <Route path="notifications" element={<Dashboard userRole="organizer" />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout userRole="admin" />}>
            <Route index element={<Dashboard userRole="admin" />} />
            <Route path="dashboard" element={<Dashboard userRole="admin" />} />
            <Route path="all-events" element={<Dashboard userRole="admin" />} />
            <Route path="users" element={<Dashboard userRole="admin" />} />
            <Route path="analytics" element={<Dashboard userRole="admin" />} />
            <Route path="settings" element={<Dashboard userRole="admin" />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
