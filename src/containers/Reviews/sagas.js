// @flow
import {
  call, fork, put, takeEvery, cancel,
} from 'redux-saga/effects';
import { history } from '../../history';
import { Firebase } from '../../components/Firebase';
import {
  DELETE_REVIEW, LOAD_REVIEW, SAVE_REVIEW
} from './constants';
import { reviewLoadedAction, reviewsLoadedAction } from './actions';
import { pushAlert } from '../HOC/Alerts/actions';
import { ROUTE_HOME } from '../../constants/routes';
import { createChannel } from '../../helpers/channel';

function* saveReviewsSaga({ payload: { reviewId, reviewData } }) {
  try {
    const reviewRef = (reviewId)
      ? Firebase().reviews().doc(reviewId)
      : Firebase().reviews().doc();
    
    if (!reviewId) {
      reviewData.date = new Date();
    }
    
    if (reviewData.isOld) {
      reviewData.date = new Date(2019, 1, 5);
    }
  
    yield reviewRef.set(reviewData);
  
    yield put(pushAlert({
      message: 'Успешно сохранено',
      variant: 'success',
    }));
  
    history.push(ROUTE_HOME);
  } catch (e) {
    console.error(e);
  
    yield put(pushAlert({
      message: e.message,
      variant: 'error',
    }));
  }
}

function* loadReviewSaga({ payload: { reviewId } }) {
  try {
    const review = yield Firebase().reviews()
      .doc(reviewId)
      .get()
      .then(d => d.data());
    
    yield put(reviewLoadedAction(review));
  } catch (e) {
    console.error(e);
  
    yield put(pushAlert({
      message: e.message,
      variant: 'error',
    }));
  }
}

function* deleteReviewSaga({ payload: { reviewId } }) {
  try {
    yield Firebase().reviews()
      .doc(reviewId)
      .delete();
  
    yield put(pushAlert({
      message: 'Обзор удален',
      variant: 'success',
    }));
  } catch (e) {
    console.error(e);
  
    yield put(pushAlert({
      message: e.message,
      variant: 'error',
    }));
  }
}

// REALTIME
function* monitorInsertEvents(channel) {
  while (true) {
    const reviews = yield call(channel.take);
  
    yield put(reviewsLoadedAction(reviews));
  }
}

let subscribeReviewsFork;
let unsubscribeReviews = false;
let channel: any;

function* startListenReviewsSaga() {
  try {
    channel = createChannel();

    unsubscribeReviews = Firebase().reviews()
      .orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs
          .map(i => ({ id: i.id, ...i.data() }));
      
        channel.put(data);
      });
  
    subscribeReviewsFork = yield fork(monitorInsertEvents, channel);
  } catch (e) {
    console.error(e);
  }
}

function* stopListenReviewsSaga() {
  if (unsubscribeReviews !== false) {
    // отписаться от получения данных firebase
    unsubscribeReviews();
    
    // канал важно удалить, иначе не будет получать данные в первый раз, только подпишется на обновления
    channel = undefined;
    
    // остановить сагу, перестать ожидать данные
    yield cancel(subscribeReviewsFork);
  }
}


export function* reviewsSagas(): Generator<*, *, *> {
  yield takeEvery(SAVE_REVIEW, saveReviewsSaga);
  yield takeEvery(LOAD_REVIEW, loadReviewSaga);
  yield takeEvery(DELETE_REVIEW, deleteReviewSaga);
  
  yield call(startListenReviewsSaga);
  yield takeEvery('STOP_LISTEN_REVIEWS', stopListenReviewsSaga);
}
