import { breachesApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function BreachesPage() {
  const { items, error, loading } = useListLoader(breachesApi.list);

  return (
    <section className="page">
      <header className="page__header">
        <h1>Breach desk</h1>
        <p className="page__lede">
          Shadow discounting outside bands and disclosure failures as breach
          events.
        </p>
      </header>
      {loading && <p className="empty">Loading breaches…</p>}
      {error && <p className="page__error">{error}</p>}
      {items.length === 0 && !loading && (
        <p className="empty">Empty queue — healthy rate-band presentation.</p>
      )}
      {items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Breach</th>
              <th>Distributor</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={String(b.id)}>
                <td className="mono">{String(b.id)}</td>
                <td className="mono">{String(b.distributorId ?? '—')}</td>
                <td>
                  <span className="badge badge--paused">
                    ShadowPricingBreachRow · {String(b.type)}
                  </span>
                </td>
                <td>{String(b.status ?? 'open')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export function FairnessPage() {
  const { items, error, loading } = useListLoader(breachesApi.listFairness);

  return (
    <section className="page">
      <header className="page__header">
        <h1>Parallel channel fairness</h1>
        <p className="page__lede">
          Bank direct listed alongside distributors without preferential data
          leakage.
        </p>
      </header>
      {loading && <p className="empty">Loading attestations…</p>}
      {error && <p className="page__error">{error}</p>}
      {items.length === 0 && !loading && (
        <p className="empty">
          No attestations yet — FairChannelMatrix awaits first audit export.
        </p>
      )}
      {items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Attestation</th>
              <th>By</th>
              <th>Leakage findings</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={String(a.id)}>
                <td className="mono">{String(a.id)}</td>
                <td>{String(a.attestedBy ?? '—')}</td>
                <td>{String(a.leakageFindings ?? 0)}</td>
                <td>{String(a.attestedAt ?? '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
