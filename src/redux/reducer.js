import { combineReducers } from 'redux';

import blocks from '../services/blocks/reducer';
import contracts from '../services/contracts/reducer';
import tokens from './../services/tokens/reducer';
import miners from './../services/miners/reducer';

export default combineReducers({ blocks, contracts, tokens, miners });