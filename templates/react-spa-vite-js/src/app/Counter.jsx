import { useCounterStore } from '@/store/counter';

function Counter() {
  const { count, increaseCount, decreaseCount } = useCounterStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increaseCount}>Increase Count</button>
      <button onClick={decreaseCount}>Decrease Count</button>
    </div>
  );
}

export default Counter;
