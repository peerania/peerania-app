import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';
import { MODERATOR_KEY } from 'utils/constants';

import arrowDownIcon from 'images/arrowDown.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';
import { Button as ProfileButton } from 'containers/Header/ProfileDropdown';

import Logout from 'containers/Logout';

export default React.memo(({ profile, isMenuVisible }) => {
  const [visibleProfileLinks, setVisibilityProfileLinks] = useState(false);

  if (!profile || !isMenuVisible) {
    return null;
  }

  const isGlobalModerator = profile.integer_properties.find(
    x => x.key === MODERATOR_KEY,
  );

  const isModerator =
    isGlobalModerator || (profile.permissions && !!profile.permissions.length);

  return (
    <div className="lightbg use-default-links">
      <button
        className="d-flex align-items-center justify-content-between w-100"
        onClick={() => setVisibilityProfileLinks(!visibleProfileLinks)}
      >
        <ProfileButton profileInfo={profile} isMobileVersion />
        <Icon
          className="mr-3"
          icon={arrowDownIcon}
          width="16"
          rotate={visibleProfileLinks}
        />
      </button>

      {visibleProfileLinks && (
        <div className="pb-2">
          <A to={routes.profileView(profile.user)}>
            <FormattedMessage {...messages.profile} />
          </A>

          <A to={routes.userCommunities(profile.user)}>
            <FormattedMessage {...messages.myCommunities} />
          </A>

          <A to={routes.userQuestions(profile.user)}>
            <FormattedMessage {...messages.questions} />
          </A>

          <A to={routes.userAnswers(profile.user)}>
            <FormattedMessage {...messages.answers} />
          </A>

          <A to={routes.userSettings(profile.user)}>
            <FormattedMessage {...messages.settings} />
          </A>

          <A to={routes.userNotifications(profile.user)}>
            <FormattedMessage {...messages.notifications} />
          </A>

          <A to={routes.userAchievements(profile.user)}>
            <FormattedMessage {...messages.achievements} />
          </A>

          {isModerator && (
            <A to={routes.userModeration(profile.user)}>
              <FormattedMessage {...messages.moderation} />
            </A>
          )}

          <Logout>
            <FormattedMessage {...messages.logout} />
          </Logout>
        </div>
      )}
    </div>
  );
});
