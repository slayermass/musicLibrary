// @flow
import {
  put, takeEvery, call
} from 'redux-saga/effects';
import {
  LOAD_USERS,
  BLOCK_USER,
  DELETE_USER,
  CREATE_USER,
  LOAD_USER_DATA,
  UPDATE_USER,
  RESET_PASSWORD,
  USERS_LOAD_ROLES,
} from './constants';
import { Firebase } from '../../components/Firebase';
import {
  usersLoaded, userDataLoaded, usersRolesLoaded,
} from './actions';
import { pushAlert } from '../HOC/Alerts/actions';
import { history } from '../../history';
import type { CreateUserType, UpdateUserType } from '../../models/users.flowtypes';

// настройки для отправки писем (сброс пароля)
const actionCodeSettings = {
  url: process.env.REACT_APP_FIREBASE_DOMAIN_URL,
  handleCodeInApp: true,
};

function* loadRolesSaga(justReturn = false) {
  try {
    const roles = yield Firebase()
      .dictionary()
      .doc('roles')
      .get()
      .then((d) => {
        return d.data().map;
      });
    
    // роли стоит переделать в массив
    
    // убрать ненужные роли
    delete roles.app;
    delete roles.demoApp;
    delete roles.admin; // админ только из консоли
    
    if (justReturn) {
      return roles;
    }
    yield put(usersRolesLoaded(roles));
  } catch (e) {
    console.error(e);
  }
}

function* loadUsersSaga(payload = { search: {} }) {
  const { search } = payload;

  try {
    let users = [];
    
    // пользователи
    if (search.id) {
      users = yield Firebase()
        .users()
        .doc(search.id)
        .get()
        .then((d) => {
          return [{ id: search.id, ...d.data() }];
        });
    } else {
      let tmp = Firebase()
        .users()
        .where('isDeleted', '==', false);
      
      ['name', 'email', 'phone', 'role'].forEach((attr) => {
        if (search[attr]) {
          tmp = tmp.where(attr, '==', search[attr]);
        }
      });
      
      users = yield tmp
        .get()
        .then((d) => {
          return d.docs.map(i => ({ id: i.id, ...i.data() }));
        });
    }
  
    const roles = yield loadRolesSaga(true);
    
    // поиск проектов
    const projects = yield Firebase()
      .projects()
      .get()
      .then(snapshot => snapshot.docs.map(doc => (
        {
          id: doc.id,
          users: doc.data().users,
          name: doc.data().baseInfo.name,
        }
      )));
    
    // поиск проектов пользователя
    users.map(user => user.projects = projects
      .filter(i => i.users.includes(user.id))
      .map(i => ({ id: i.id, name: i.name }))
    );
    
    yield put(usersLoaded({
      users, roles
    }));
  } catch (e) {
    console.error(e);
  }
}

function* blockUserSaga({ id, isBlock }) {
  try {
    const userRef = Firebase()
      .users()
      .doc(id);

    const user = yield userRef
      .get()
      .then(d => d.data());

    yield userRef
      .update({ ...user, isBlocked: isBlock });
  } catch (e) {
    console.error(e);
  }
}

function* deleteUserSaga({ id }) {
  try {
    const userRef = Firebase()
      .users()
      .doc(id);
    
    const user = yield userRef
      .get()
      .then(d => d.data());
    
    yield userRef
      .update({ ...user, isDeleted: true });
  } catch (e) {
    console.error(e);
  }
}

function* createUserSaga({ data, backUrl }: { data: CreateUserType, backUrl: string}) {
  try {
    const isCreated = yield Firebase().functions.call('createUser', {
      email: data.email,
      password: 'passwordToBeChangedFurther',
      name: data.name,
      phone: data.phone,
      role: data.role,
    });
  
    if (isCreated.data.status) {
      yield Firebase()
        .auth
        .sendPasswordResetEmail(data.email, actionCodeSettings);
      
      yield put(pushAlert({
        message: 'Пользователь успешно создан',
        variant: 'success',
      }));
    } else {
      yield put(pushAlert({
        message: isCreated.data.error.message,
        variant: 'error',
      }));
    }
  
    if (backUrl) {
      yield call(history.push, backUrl);
    }
  } catch (e) {
    yield put(pushAlert({
      message: e.message,
      variant: 'error',
    }));
  }
}

function* updateUserSaga({ data, backUrl }: { data: UpdateUserType, backUrl: string }) {
  const { id, ...dataToUpdate } = data;

  try {
    const isUpdated = yield Firebase().functions.call('updateUser', {
      uid: id,
      email: dataToUpdate.email,
      name: dataToUpdate.name,
      phone: dataToUpdate.phone,
    });
    
    if (isUpdated.data.status) {
      yield put(pushAlert({
        message: 'Пользователь успешно редактирован',
        variant: 'success',
      }));
    } else {
      yield put(pushAlert({
        message: isUpdated.data.error.message,
        variant: 'error',
      }));
    }

    if (backUrl) {
      yield call(history.push, backUrl);
    }
  } catch (e) {
    console.error(e);
  }
}

function* loadUserDataSaga({ id }: { id: string }) {
  try {
    const userData = yield Firebase()
      .users()
      .doc(id)
      .get()
      .then(d => d.data());
  
    yield put(userDataLoaded({ ...userData, id }));
  } catch (e) {
    console.error(e);
  }
}

function* resetPasswordSaga({ email }: { email: string }) {
  try {
    const { success, ...rest } = yield Firebase()
      .auth
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => {
        return {
          success: true,
          message: 'Сброс пароля успешно отправлен',
          variant: 'success'
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          variant: 'error'
        };
      });
  
    yield put(pushAlert(rest));
  } catch (e) {
    console.error(e);
  }
}

export function* usersSagas(): Generator<*, *, *> {
  yield takeEvery(LOAD_USERS, loadUsersSaga);
  yield takeEvery(BLOCK_USER, blockUserSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(LOAD_USER_DATA, loadUserDataSaga);
  yield takeEvery(RESET_PASSWORD, resetPasswordSaga);
  yield takeEvery(USERS_LOAD_ROLES, loadRolesSaga);
}
