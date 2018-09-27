import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import validate from './validate';
import renderField from './renderField';
import messages from './messages';

import { EOS_ACC, DISPLAY_NAME } from './constants';

const SignUpForm = props => {
  const eosAccoutLabel = <FormattedMessage {...messages.eosAccount} />;
  const displayNameLabel = <FormattedMessage {...messages.displayName} />;
  const { handleSubmit, submitting, invalid, registrUser, signup } = props;

  return (
    <form onSubmit={handleSubmit(registrUser)}>
      <div>
        <Field
          name={EOS_ACC}
          component={renderField}
          type="text"
          label={eosAccoutLabel.props.defaultMessage}
          readOnly={false}
        />
        <Field
          name={DISPLAY_NAME}
          component={renderField}
          type="text"
          label={displayNameLabel.props.defaultMessage}
          readOnly={false}
        />
      </div>
      <div>
        <button
          className="btn btn-success form-control"
          disabled={invalid || submitting || signup.loading}
          type="submit"
        >
          <FormattedMessage {...messages.signUp} />
        </button>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  registrUser: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  signup: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'SignUpForm',
  validate,
  warn: validate,
})(SignUpForm);
