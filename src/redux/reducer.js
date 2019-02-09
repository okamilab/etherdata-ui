import { combineReducers } from 'redux';

import contracts from './../contracts/reduser';
import filter from './../services/filter/reducer';

export default combineReducers({ contracts, filter });