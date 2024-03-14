import { useLoadingStore } from '@/store/loading';

function Loading() {
  const { loading, setLoading } = useLoadingStore();
  return (
    <div>
      <p>Loading: {loading ? "Yes" : "No"}</p>
      <button onClick={() => setLoading(!loading)}>Toggle Loading</button>
    </div>
  );
}

export default Loading;
