import { combineReducers } from 'redux';

import blocks from '../services/blocks/reducer';
import contracts from '../services/contracts/reducer';
import tokens from './../services/tokens/reducer';
import miners from './../services/miners/reducer';
import vulnerabilities from './../services/vulnerabilities/reducer';
import analyses from '../services/analyses/reducer';
import stats from '../services/stats/reducer';
import publicKey from '../services/publicKeys/reducer';

export default combineReducers({
  blocks,
  contracts,
  tokens,
  miners,
  analyses,
  stats,
  vulnerabilities,
  publicKey
});