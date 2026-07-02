import { useState } from 'react';

import viteLogo from '/vite.svg'; // public

import reactLogo from '@/assets/react.svg'; // assets
import { usePeople } from '@/queries/people';

import '@/styles/App.scss';

function App() {
  const [count, setCount] = useState(0);
  const { data: people, isError, isSuccess } = usePeople(1);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        {isSuccess && <p>May the force be with you, {people?.name} </p>}
        {isError && <p>The request failed, check the id and try again</p>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
