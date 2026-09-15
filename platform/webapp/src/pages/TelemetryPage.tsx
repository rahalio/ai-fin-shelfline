import { telemetryApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function TelemetryPage() {
  const margin = useListLoader(telemetryApi.margin);
  const cac = useListLoader(telemetryApi.cac);

  return (
    <section className="page">
      <header className="page__header">
        <h1>Margin & CAC telemetry</h1>
        <p className="page__lede">
          Contribution margin and CAC by distributor/segment for kill-or-scale.
        </p>
      </header>
      <div className="status-strip">
        <div className="status-strip__item status-strip__item--clear">
          <span>MarginCacScorecard</span>
          <strong>{margin.items.length} snapshots</strong>
        </div>
        <div className="status-strip__item">
          <span>CAC reports</span>
          <strong>{cac.items.length}</strong>
        </div>
        <div className="status-strip__item status-strip__item--safety">
          <span>Kill / scale</span>
          <strong>review</strong>
        </div>
      </div>
      {margin.items.length === 0 && cac.items.length === 0 && (
        <p className="empty">Insufficient month — empty chart until partner volume books.</p>
      )}
      {(margin.error || cac.error) && (
        <p className="page__error">{margin.error || cac.error}</p>
      )}
    </section>
  );
}
