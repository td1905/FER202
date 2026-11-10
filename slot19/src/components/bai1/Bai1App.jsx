import Counter from '../Counter';
import CounterDisplay from '../CounterDisplay';

export default function Bai1App() {
  return (
    <div>
      <h3 className="mb-4 text-center">Bài 1: Counter với Redux thuần</h3>
      <Counter />
      <CounterDisplay />
    </div>
  );
}
