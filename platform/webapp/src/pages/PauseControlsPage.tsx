import { FormEvent, useState } from 'react';
import { distributorsApi, skusApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function PauseControlsPage() {
  const distributors = useListLoader(distributorsApi.list);
  const skus = useListLoader(skusApi.list);
  const [targetType, setTargetType] = useState<'distributor' | 'sku'>('distributor');
  const [targetId, setTargetId] = useState('');
  const [reason, setReason] = useState('fraud');
  const [message, setMessage] = useState<string | null>(null);

  async function onPause(e: FormEvent) {
    e.preventDefault();
    if (targetType === 'distributor') {
      await distributorsApi.pause(targetId, reason);
    } else {
      await skusApi.pause(targetId, reason);
    }
    setMessage(`Paused ${targetType} ${targetId} — logged with SLA timer.`);
    await Promise.all([distributors.reload(), skus.reload()]);
  }

  return (
    <section className="page">
      <header className="page__header">
        <h1>Pause controls</h1>
        <p className="page__lede">
          Pause distributor or SKU within SLA without a code deploy on
          conduct/fraud/liquidity trips.
        </p>
      </header>
      <form className="form-grid" onSubmit={onPause}>
        <label>
          Target
          <select
            value={targetType}
            onChange={(e) =>
              setTargetType(e.target.value as 'distributor' | 'sku')
            }
          >
            <option value="distributor">Distributor</option>
            <option value="sku">SKU</option>
          </select>
        </label>
        <label>
          Id
          <input
            className="mono"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            required
          />
        </label>
        <label>
          Reason code
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="fraud">Fraud</option>
            <option value="liquidity">Liquidity</option>
            <option value="conduct">Conduct</option>
            <option value="shadowPricing">Shadow pricing</option>
          </select>
        </label>
        <button className="btn btn--danger" type="submit">
          PauseDistributorControl — engage
        </button>
      </form>
      {message && (
        <p className="badge badge--paused" role="status">
          {message}
        </p>
      )}
    </section>
  );
}
