import { combineReducers } from 'redux';

import contracts from '../services/contracts/reducer';
import blocksStat from '../services/blocks/reducer';
import filter from './../services/filter/reducer';
import tokens from './../services/tokens/reducer';
import miners from './../services/miners/reducer';

export default combineReducers({ filter, contracts, blocksStat, tokens, miners });