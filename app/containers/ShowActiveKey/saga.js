import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { errorToastHandling } from 'containers/Toast/saga';

import { SHOW_ACTIVE_KEY, SHOW_ACTIVE_KEY_ERROR } from './constants';

import { showActiveKeySuccess, showActiveKeyErr } from './actions';

export function* showActiveKeyWorker({ resetForm, password }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const loginData = JSON.parse(localStorage.getItem(AUTOLOGIN_DATA));

    const autoLogin = Boolean(loginData && loginData.authToken);

    const response = yield call(() =>
      login(loginData.email, password, autoLogin),
    );

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { activeKey } = response.body;

    yield put(showActiveKeySuccess(activeKey.private));
    yield call(resetForm);
  } catch (err) {
    yield put(showActiveKeyErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_ACTIVE_KEY, showActiveKeyWorker);
  yield takeLatest([SHOW_ACTIVE_KEY_ERROR], errorToastHandling);
}
