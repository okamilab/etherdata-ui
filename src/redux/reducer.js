import { combineReducers } from 'redux';

import contracts from './../contracts/reduser';
import blocksStat from './../services/blocks/reduser';
import filter from './../services/filter/reducer';

export default combineReducers({ filter, contracts, blocksStat });