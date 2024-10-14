import { FilterDropDownProps } from '../types';
import '../App.css';

const FilterDropDown: React.FC<FilterDropDownProps> = ({ dispatch }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  dispatch({ type: 'SET_FILTER', payload: event.target.value });
	};

	return (
	  <div className='filterDropDown'>
		<select id='filter' onChange={handleChange}>
		  <option value='Today'>Today</option>
		  <option value='Tomorrow'>Tomorrow</option>
		  <option value='Week'>Week</option>
		  <option value='month'>28 days</option>
		</select>
	  </div>
	);
  };

export default FilterDropDown;
