/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { postQuestion } from 'utils/questionsManagement';
import { getProfileInfo } from 'utils/profileManagement';

import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';

import defaultSaga, { postQuestionWorker } from '../saga';
import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from '../constants';

import { postQuestionValidator } from '../validate';

jest.mock('../validate', () => ({
  postQuestionValidator: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  postQuestion: jest.fn().mockImplementation(() => true),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('postQuestionWorker', () => {
  const props = {
    user: 'user1',
    questionData: {},
    postButtonId: 'postButtonId',
    translations: {},
  };

  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => props.user),
  };

  describe('profileInfo is true', () => {
    const generator = postQuestionWorker(props);
    const profileInfo = {};

    it('step1-1, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('step1-2, profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(eos);
      expect(step.value).toEqual(profileInfo);
    });

    it('step1-3, validation', () => {
      generator.next(profileInfo);
      expect(postQuestionValidator).toHaveBeenCalledWith(
        profileInfo,
        props.postButtonId,
        props.translations,
      );
    });

    it('step2, postQuestion', () => {
      postQuestion.mockImplementation(() => true);

      expect(postQuestion).toHaveBeenCalledTimes(0);
      generator.next(true);
      expect(postQuestion).toHaveBeenCalledTimes(1);
    });

    it('step3, askQuestionSuccess', () => {
      const step3 = generator.next();
      expect(step3.value.type).toBe(ASK_QUESTION_SUCCESS);
    });
  });

  describe('profileInfo false => showLoginModal', () => {
    const generator = postQuestionWorker(props);
    const profileInfo = null;

    getProfileInfo.mockImplementation(() => profileInfo);

    generator.next();
    generator.next();

    it('showLoginModal', () => {
      const showLoginModal = generator.next(profileInfo);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(ASK_QUESTION_ERROR);
    });
  });

  describe('validation is falsy', () => {
    const generator = postQuestionWorker(props);
    const profileInfo = {};
    const isValid = false;

    getProfileInfo.mockImplementation(() => profileInfo);
    postQuestionValidator.mockImplementation(() => isValid);

    generator.next();
    generator.next();
    generator.next(profileInfo);

    it('test', () => {
      const step = generator.next(isValid);
      expect(step.value.type).toBe(ASK_QUESTION_ERROR);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('ASK_QUESTION', () => {
    const step = generator.next();
    expect(step.value).toBe(ASK_QUESTION);
  });
});