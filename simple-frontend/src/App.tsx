import { useState } from 'react';
import './otel.ts';
import { api } from './services/api.ts';

interface Data {
  message: string;
}

function App() {
  const [data, setData] = useState<Data>({ message: '' });
  const [error, setError] = useState<string>('');

  async function fetchData() {
    // const singleSpan = webTracer.startSpan('dyna-react');

    // Garante que a requisição ocorra dentro do contexto do span
    // await context.with(trace.setSpan(context.active(), singleSpan), async () => {
      try {
        const response = await api.get<Data>('/context');

        // console.log(`trace: ${JSON.stringify(context.active())}`);
        // trace.getSpan(context.active())?.addEvent('fetching-single-span-completed');

        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError((err as Error).message);
      } finally {
        // singleSpan.end();
      }
    // });
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const singleSpan = webTracer.startSpan('dyna-react');

  //     // Garante que a requisição ocorra dentro do contexto do span
  //     await context.with(trace.setSpan(context.active(), singleSpan), async () => {
  //       try {
  //         const response = await api.get<Data>('/context');

  //         console.log(`trace: ${JSON.stringify(context.active())}`);
  //         trace.getSpan(context.active())?.addEvent('fetching-single-span-completed');

  //         setData(response.data);
  //       } catch (err) {
  //         console.error('Error fetching data:', err);
  //         setError((err as Error).message);
  //       } finally {
  //         singleSpan.end();
  //       }
  //     });
  //   };

  //   fetchData();
  // }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
      <button onClick={fetchData}>Click</button>
    </div>
  );
}

export default App;