import { throttlesApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function ThrottlesPage() {
  const caps = useListLoader(throttlesApi.listCaps);
  const events = useListLoader(throttlesApi.listEvents);

  return (
    <section className="page">
      <header className="page__header">
        <h1>Treasury throttles</h1>
        <p className="page__lede">
          Hard caps by tenure/band; early warning; auto-throttle before month-end
          surprise.
        </p>
      </header>
      <div className="status-strip">
        <div className="status-strip__item status-strip__item--safety">
          <span>DepositCapMeter</span>
          <strong>{caps.items.length} caps</strong>
        </div>
        <div className="status-strip__item">
          <span>Throttle events</span>
          <strong>{events.items.length}</strong>
        </div>
        <div className="status-strip__item status-strip__item--clear">
          <span>Release path</span>
          <strong>approval</strong>
        </div>
      </div>
      {(caps.error || events.error) && (
        <p className="page__error">{caps.error || events.error}</p>
      )}
      {caps.items.length === 0 && events.items.length === 0 && (
        <p className="empty">No caps yet — set tenure bands before partner volume scales.</p>
      )}
      {events.items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>SKU</th>
              <th>Reason</th>
              <th>Fired</th>
            </tr>
          </thead>
          <tbody>
            {events.items.map((ev) => (
              <tr key={String(ev.id)}>
                <td className="mono">{String(ev.id)}</td>
                <td className="mono">{String(ev.skuId ?? '—')}</td>
                <td>
                  <span className="badge badge--warn">{String(ev.reason)}</span>
                </td>
                <td>{String(ev.firedAt ?? '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
