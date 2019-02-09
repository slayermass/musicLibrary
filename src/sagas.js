import { all } from 'redux-saga/effects';
import { reviewsSagas } from './containers/Reviews/sagas';

export default function* sagas() {
  yield all([
    reviewsSagas(),
  ]);
}
