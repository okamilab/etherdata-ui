import { combineReducers } from 'redux';

import contracts from '../services/contracts/reducer';
import blocksStat from '../services/blocks/reducer';
import filter from './../services/filter/reducer';
import tokensUsage from './../services/tokens/reducer';

export default combineReducers({ filter, contracts, blocksStat, tokensUsage });