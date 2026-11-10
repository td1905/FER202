import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { setFilter } from '../../redux/bai2/actions';
import { selectFilter } from '../../redux/bai2/selectors';

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Chưa xong' },
  { key: 'done', label: 'Đã xong' },
];

export default function FilterBar() {
  const current = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="d-flex justify-content-center mb-3">
      <ButtonGroup>
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant={current === f.key ? 'primary' : 'outline-primary'}
            onClick={() => dispatch(setFilter(f.key))}
          >
            {f.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
