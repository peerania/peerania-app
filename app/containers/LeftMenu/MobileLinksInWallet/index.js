import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import * as routes from 'routes-config';
import messages from 'common-messages';

import arrowDownIcon from 'images/arrowDown.svg?external';

import { selectRewardsWeeksNumber } from 'containers/Wallet/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import WalletButton from 'containers/Header/WalletDropdown/WalletButton';
import NotificationIcon from 'containers/Header/WalletDropdown/NotificationIcon';

import A from 'components/A';
import Icon from 'components/Icon';

import SendTokens from 'containers/SendTokens';

const MobileLinksInWallet = ({
  profile,
  isMenuVisible,
  balance,
  rewardsWeeksNumber,
  locale,
}) => {
  const [visibleWalletLinks, setVisibilityWalletLinks] = useState(false);

  const isPositiveNumber = number => Number.isFinite(number) && number > 0;

  if (!profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="lightbg use-default-links">
      <button
        className="d-flex align-items-center justify-content-between w-100"
        onClick={() => setVisibilityWalletLinks(!visibleWalletLinks)}
      >
        <WalletButton
          balance={balance}
          number={rewardsWeeksNumber}
          locale={locale}
          mobile
        />
        <Icon
          className="mr-3"
          icon={arrowDownIcon}
          width="16"
          rotate={visibleWalletLinks}
        />
      </button>

      {visibleWalletLinks && (
        <div className="pb-2">
          <A to={routes.userWallet(profile.user)}>
            <FormattedMessage {...messages.wallet} />
            {isPositiveNumber(rewardsWeeksNumber) && (
              <NotificationIcon
                inline
                mobile
                number={rewardsWeeksNumber}
                id="MobileLinksInWallet"
                locale={locale}
              />
            )}
          </A>

          <SendTokens>
            <FormattedMessage {...messages.sendTokens} />
          </SendTokens>
        </div>
      )}
    </div>
  );
};

MobileLinksInWallet.propTypes = {
  balance: PropTypes.number,
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  rewardsWeeksNumber: PropTypes.number,
  locale: PropTypes.string,
};

export default memo(
  connect(
    createStructuredSelector({
      rewardsWeeksNumber: selectRewardsWeeksNumber(),
      locale: makeSelectLocale(),
    }),
  )(MobileLinksInWallet),
);