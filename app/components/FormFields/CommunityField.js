import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowDownIcon from 'images/arrowDown.svg?inline';

import CommunitySelector from 'components/CommunitySelector';
import Img from 'components/Img';
import { Input } from 'components/Input/InputStyled';
import Span from 'components/Span';

import Wrapper from './Wrapper';

const Div = styled.div`
  position: relative;

  ${/* istanbul ignore next */ props => Input(props)};

  img {
    position: absolute;
    right: 0;
  }
`;

export const CommunityField = /* istanbul ignore next */ ({
  input,
  meta,
  label,
  tip,
  disabled,
}) => (
  <Wrapper label={label} tip={tip} meta={meta}>
    <CommunitySelector
      input={input}
      disabled={disabled}
      selectedCommunityId={input.value ? input.value.id : 0}
      Button={({ communityAvatar, communityLabel }) => (
        <Div
          className="d-flex align-items-center"
          error={meta.touched && (meta.error || meta.warning)}
          disabled={disabled}
        >
          {communityAvatar && (
            <React.Fragment>
              <Img className="mr-2" src={communityAvatar} alt="comm_img" />
              <Span>{communityLabel}</Span>
            </React.Fragment>
          )}

          <img className="mr-2" src={arrowDownIcon} alt="icon" />
        </Div>
      )}
    />
  </Wrapper>
);

CommunityField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  tip: PropTypes.string,
  disabled: PropTypes.bool,
};

export default React.memo(CommunityField);