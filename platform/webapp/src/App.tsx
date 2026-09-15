import { Navigate, Route, Routes } from 'react-router-dom';
import { Shell } from './shell/Shell';
import { LoginPage } from './pages/LoginPage';
import { BankHomePage } from './pages/BankHomePage';
import { SkusPage } from './pages/SkusPage';
import { DistributorsPage } from './pages/DistributorsPage';
import { OriginationsPage } from './pages/OriginationsPage';
import { ThrottlesPage } from './pages/ThrottlesPage';
import { PauseControlsPage } from './pages/PauseControlsPage';
import { TelemetryPage } from './pages/TelemetryPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { BreachesPage, FairnessPage } from './pages/BreachesPage';
import { CatalogPage } from './pages/CatalogPage';

function RequireRole({
  role,
  children,
}: {
  role: 'bank' | 'distributor';
  children: React.ReactNode;
}) {
  const current = sessionStorage.getItem('shelfline.role');
  if (current !== role) return <Navigate to="/" replace />;
  return children;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/bank"
        element={
          <RequireRole role="bank">
            <Shell mode="bank" />
          </RequireRole>
        }
      >
        <Route index element={<BankHomePage />} />
        <Route path="skus" element={<SkusPage />} />
        <Route path="distributors" element={<DistributorsPage />} />
        <Route path="originations" element={<OriginationsPage />} />
        <Route path="throttles" element={<ThrottlesPage />} />
        <Route path="pause" element={<PauseControlsPage />} />
        <Route path="telemetry" element={<TelemetryPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="breaches" element={<BreachesPage />} />
        <Route path="fairness" element={<FairnessPage />} />
      </Route>
      <Route
        path="/distributor"
        element={
          <RequireRole role="distributor">
            <Shell mode="distributor" />
          </RequireRole>
        }
      >
        <Route index element={<CatalogPage />} />
        <Route
          path="originations"
          element={<OriginationsPage portal />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
