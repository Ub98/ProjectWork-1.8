import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import Production from "./pages/Production/Production";
import Resource from "./pages/Resource/Resource";
import Sustainability from "./pages/Sustainability/Sustainability";
import Weather from "./pages/Weather/Weather";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route index path="/production" element={<Production />} />
            <Route index path="/resource" element={<Resource />} />
            <Route index path="/sustainability" element={<Sustainability />} />
            <Route index path="/weather" element={<Weather />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
