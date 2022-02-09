import { getReasonPhrase } from 'http-status-codes';
import { useState } from 'react';
import { BiError } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
interface Props {
  code?: number | null;
  retry?: boolean;
  to?: string;
  error?: string;
  btn?: string;
  msg?: string;
}
export const Error: React.FC<Props> = ({
  code,
  retry,
  to,
  msg,
  btn,
  error,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  msg = msg || 'An Unknown Exception Occurred';
  const nav = useNavigate();
  if (code) {
    const reason = getReasonPhrase(code);
    msg = `Error (${code}) - ${reason}`;
  }
  let link = '/';
  if (to) link = to;
  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <BiError className="text-red-600 dark:text-red-500 w-1/4 h-1/4" />
        <div className="flex flex-col gap-1">
          <h1 className="text-primary dark:text-d-primary">{msg}</h1>
          {error && (
            <button onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
              {isDetailsOpen ? 'Hide' : 'Show'}{' '}
            </button>
          )}
          {error && isDetailsOpen && (
            <div className="text-gray-600 dark:text-gray-400 bg-primary_variant dark:bg-d-primary_variant">
              {error}
            </div>
          )}
        </div>

        {retry && (
          <button
            className="btn px-4 py-2 text-lg w-40"
            style={{ height: '2rem' }}
            onClick={() => nav(link, { replace: true })}
          >
            {btn || 'Retry'}
          </button>
        )}
      </div>
    </main>
  );
};
