import { FilterDropDownProps } from '../types';

const FilterDropDown: React.FC<FilterDropDownProps> = ({ dispatch }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  dispatch({ type: 'SET_FILTER', payload: event.target.value });
	};

	return (
	  <div>
		<select id='filter' onChange={handleChange}>
		  <option value='Today'>Today</option>
		  <option value='Tomorrow'>Tomorrow</option>
		  <option value='Next 7 days'>7 days</option>
		  <option value='28 days'>28 Days</option>
		</select>
	  </div>
	);
  };

export default FilterDropDown;
