import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';
import { LINK_COLOR } from 'style-constants';

import peeranhaLogo from 'images/LogoBlack.svg?inline';

import commonMessages from 'common-messages';
import messages from 'containers/SignUp/messages';

import {
  singleCommunityStyles,
} from 'utils/communityManagement';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import H3 from 'components/H3';
import Span from 'components/Span';
import TransparentButton from 'components/Button/Contained/Transparent';
import { Div } from 'containers/SignUp/IHaveEOSAccountForm';
import { LoginViaWallet } from 'containers/Login/Footer';
import SignUpWrapper from './index';

import {
  HOW_STORE_MY_KEYS_QUESTION,
  CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
  CAN_I_DELETE_ACCOUNT_QUESTION,
} from 'containers/Faq/constants';
import styled from 'styled-components';

export const P = Span.extend`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 30px;
`.withComponent('p');

export const Li = P.extend`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;

  a {
    color: ${LINK_COLOR};
  }

  @media only screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 18px;
  }
`.withComponent('li');

export const CommunityLogoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CommunityLogoDescr = styled.div`
  display: flex;
  align-items: start;
  padding-top: 4px;

  span {
    margin-right: 6px;

    font-size: 14px;
    font-weight: 600;

    opacity: 0.4;
  }

  img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }
`;

export const Logo = styled.span`
  display: block;
  width: 180px;
  height: 56px;

  background-position: bottom left;
  background-image: url(${({ src }) => src});
`;

const styles = singleCommunityStyles();

const LeftMenu = ({ faqQuestions }) => (
  <React.Fragment>
    <div className="mb-4">
      {styles.withoutSubHeader ? (
        <CommunityLogoWrapper>
          <Link to={routes.questions()} href={routes.questions()}>
            <Logo src={styles.signUpPageLogo} />
          </Link>
          <CommunityLogoDescr>
            <span>{'Q&A on'}</span>
            <Link to={routes.questions()} href={routes.questions()}>
              <img src={peeranhaLogo} width="90px" alt="Peeranha logo" />
            </Link>
          </CommunityLogoDescr>
        </CommunityLogoWrapper>
      ) : (
        <Link to={routes.questions()} href={routes.questions()}>
          <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
        </Link>
      )}
    </div>

    <H3 className="mb-4">
      <FormattedMessage {...messages.signUpOptions} />
    </H3>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.peeranhaIsNotTypical} />
      </P>
      <P>
        <FormattedMessage {...messages.ifYouLikeToSkip} />
      </P>
      <P>
        <FormattedMessage {...messages.weAreHappyToCover} />
      </P>
    </div>

    {faqQuestions && (
      <ul className="mb-4">
        {faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}
      </ul>
    )}
  </React.Fragment>
);

/* eslint react/no-children-prop: 0 */
const RightMenuWithoutScatter = ({
  children,
  showLoginModal,
  showScatterSignUpForm,
  showScatterSignUpProcessing,
}) => (
  <div className="py-5">
    {children}
    <Div className="py-5">
      <LoginViaWallet
        action={showScatterSignUpForm}
        processing={showScatterSignUpProcessing}
        text={<FormattedMessage {...commonMessages.signUpViaWallet} />}
      />

      <div className="text-center mt-3">
        <FormattedMessage {...messages.doYouHaveAlreadyAccount} />{' '}
        <TransparentButton
          className="py-1"
          onClick={showLoginModal}
          disabled={showScatterSignUpProcessing}
        >
          <FormattedMessage {...commonMessages.login} />
        </TransparentButton>
      </div>
    </Div>
  </div>
);

export const SignUpOptions = ({
  children,
  showLoginModal,
  showScatterSignUpForm,
  showScatterSignUpProcessing,
  withScatter,
  faqQuestions,
}) => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu faqQuestions={faqQuestions} />}
    RightMenuChildren={
      !withScatter ? (
        <RightMenuWithoutScatter
          children={children}
          showLoginModal={showLoginModal}
          showScatterSignUpForm={showScatterSignUpForm}
          showScatterSignUpProcessing={showScatterSignUpProcessing}
        />
      ) : (
        children
      )
    }
  />
);

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
};

RightMenuWithoutScatter.propTypes = {
  children: PropTypes.any,
  showLoginModal: PropTypes.func,
  showScatterSignUpForm: PropTypes.func,
  showScatterSignUpProcessing: PropTypes.bool,
};

SignUpOptions.propTypes = {
  children: PropTypes.any,
  showLoginModal: PropTypes.func,
  showScatterSignUpForm: PropTypes.func,
  showScatterSignUpProcessing: PropTypes.bool,
  withScatter: PropTypes.bool,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    HOW_STORE_MY_KEYS_QUESTION,
    CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
    CAN_I_DELETE_ACCOUNT_QUESTION,
  ]),
});

export default connect(
  mapStateToProps,
  null,
)(SignUpOptions);
