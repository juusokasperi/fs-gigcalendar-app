import { FilterDropDownProps } from '../types';
import { Dropdown, Select } from '../utils/styledComponents';

const FilterDropDown: React.FC<FilterDropDownProps> = ({ dispatch }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  dispatch({ type: 'SET_FILTER', payload: event.target.value });
	};

	return (
	  <Dropdown>
		<Select onChange={handleChange}>
		  <option value='Today'>Today</option>
		  <option value='Tomorrow'>Tomorrow</option>
		  <option value='Week'>Week</option>
		  <option value='Month'>28 days</option>
		</Select>
	  </Dropdown>
	);
  };

export default FilterDropDown;
