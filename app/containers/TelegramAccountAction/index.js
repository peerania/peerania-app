/**
 *
 * DeleteAccount
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { confirmTelegramAccount, unlinkTelegramAccount } from './actions';

import {
  CONFIRM_TG_ACCOUNT_ID,
  UNLINK_TG_ACCOUNT_ID,
  CONFIRM_TG_ACCOUNT,
  UNLINK_TG_ACCOUNT,
  TG_ACCOUNT_KEY,
} from './constants';

/* eslint-disable react/prefer-stateless-function */
export class TelegramAccountAction extends React.PureComponent {
  render() /* istanbul ignore next */ {
    const {
      actionType,
      confirmTelegramAccountDispatch,
      unlinkTelegramAccountDispatch,
    } = this.props;

    return (
      <React.Fragment>
        {actionType === CONFIRM_TG_ACCOUNT && (
          <button
            id={CONFIRM_TG_ACCOUNT_ID}
            className="mr-3"
            onClick={confirmTelegramAccountDispatch}
          >
            <FormattedMessage {...messages.confirm} />
          </button>
        )}

        {actionType === UNLINK_TG_ACCOUNT && (
          <button
            id={UNLINK_TG_ACCOUNT_ID}
            onClick={unlinkTelegramAccountDispatch}
          >
            <FormattedMessage {...messages.unlink} />
          </button>
        )}
      </React.Fragment>
    );
  }
}

TelegramAccountAction.propTypes = {
  actionType: PropTypes.string,
  confirmTelegramAccountDispatch: PropTypes.func,
  unlinkTelegramAccountDispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    confirmTelegramAccountDispatch: bindActionCreators(
      confirmTelegramAccount,
      dispatch,
    ),
    unlinkTelegramAccountDispatch: bindActionCreators(
      unlinkTelegramAccount,
      dispatch,
    ),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: TG_ACCOUNT_KEY, reducer });
const withSaga = injectSaga({
  key: TG_ACCOUNT_KEY,
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TelegramAccountAction);
