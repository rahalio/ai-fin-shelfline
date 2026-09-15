import { FormEvent, useState } from 'react';
import { distributorsApi } from '../services/api-clients';
import { useListLoader } from './BankHomePage';
import './pages.css';

export function DistributorsPage() {
  const { items, error, loading, reload } = useListLoader(distributorsApi.list);
  const [legalName, setLegalName] = useState('');
  const [channelType, setChannelType] = useState('fintech');

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    await distributorsApi.register({ legalName, channelType });
    setLegalName('');
    await reload();
  }

  return (
    <section className="page">
      <header className="page__header">
        <h1>Distributor registry & contracts</h1>
        <p className="page__lede">
          Bind experience ownership — branding, recommendation bias, complaints —
          and revenue share before go-live.
        </p>
      </header>
      <form className="form-grid" onSubmit={onRegister}>
        <label>
          Legal name
          <input
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            required
          />
        </label>
        <label>
          Channel
          <select
            value={channelType}
            onChange={(e) => setChannelType(e.target.value)}
          >
            <option value="fintech">Fintech</option>
            <option value="bigtech">Bigtech</option>
            <option value="broker">Broker</option>
            <option value="bankDirect">Bank direct</option>
          </select>
        </label>
        <button className="btn btn--primary" type="submit">
          Register distributor
        </button>
      </form>
      {loading && <p className="empty">Loading…</p>}
      {error && <p className="page__error">{error}</p>}
      {items.length === 0 && !loading && (
        <p className="empty">No partners yet — incomplete ownership blocks go-live.</p>
      )}
      {items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Distributor</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Contract fields</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((d) => {
              const id = String(d.id ?? '');
              return (
                <tr key={id}>
                  <td>
                    {String(d.legalName ?? '—')}
                    <div className="mono">{id}</div>
                  </td>
                  <td>{String(d.channelType ?? '—')}</td>
                  <td>
                    <span
                      className={
                        d.status === 'paused' ? 'badge badge--paused' : 'badge'
                      }
                    >
                      {String(d.status ?? 'pending')}
                    </span>
                  </td>
                  <td>
                    <span className="badge">ExperienceContractFields</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--danger"
                      onClick={async () => {
                        await distributorsApi.pause(id, 'Conduct pause');
                        await reload();
                      }}
                    >
                      Pause
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
