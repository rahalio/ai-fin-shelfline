import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { breachesApi, skusApi, throttlesApi } from '../services/api-clients';
import './pages.css';

export function BankHomePage() {
  const [skuCount, setSkuCount] = useState(0);
  const [throttleEvents, setThrottleEvents] = useState(0);
  const [breaches, setBreaches] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [skus, events, breachList] = await Promise.all([
          skusApi.list(),
          throttlesApi.listEvents(),
          breachesApi.list(),
        ]);
        if (cancelled) return;
        setSkuCount(skus.data.items.length);
        setThrottleEvents(events.data.items.length);
        setBreaches(breachList.data.items.length);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Load failed');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="page">
      <header className="page__header">
        <p className="page__eyebrow">Manufacturer stamp</p>
        <h1>Bank shelf home</h1>
        <p className="page__lede">
          Which SKUs are live, throttled, or paused — and is partner volume
          earning its capital?
        </p>
      </header>
      {error && (
        <p className="page__error" role="alert">
          {error}
        </p>
      )}
      <div className="status-strip" aria-live="polite">
        <div className="status-strip__item status-strip__item--clear">
          <span>SKUs</span>
          <strong>{skuCount}</strong>
        </div>
        <div className="status-strip__item status-strip__item--safety">
          <span>Throttle events</span>
          <strong>{throttleEvents}</strong>
        </div>
        <div className="status-strip__item status-strip__item--breach">
          <span>Open breaches</span>
          <strong>{breaches}</strong>
        </div>
      </div>
      <div className="page__actions">
        <Link className="btn btn--primary" to="/bank/skus">
          Publish SKU
        </Link>
        <Link className="btn" to="/bank/pause">
          Pause distributor
        </Link>
        <Link className="btn" to="/bank/telemetry">
          Open telemetry
        </Link>
        <Link className="btn" to="/bank/breaches">
          Open breach desk
        </Link>
      </div>
    </section>
  );
}

export function useListLoader(
  loader: () => Promise<{ data: { items: Record<string, unknown>[] } }>
) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const res = await loader();
      setItems(res.data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  return { items, error, loading, reload };
}
