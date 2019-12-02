import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_PRIMARY, TEXT_WARNING } from 'style-constants';

import { svgDraw } from 'components/Icon/IconStyled';
import TransparentButton from 'components/Button/Contained/Transparent';

import Span from 'components/Span';

/* eslint no-nested-ternary: 0, indent: 0 */
export const SpanStyled = Span.extend`
  ${x => svgDraw({ color: x.isVotedToDelete ? TEXT_WARNING : TEXT_PRIMARY })};
`;

export const Button = ({
  className,
  id,
  onClick,
  params,
  show,
  children,
  disabled,
}) =>
  show ? (
    <TransparentButton
      id={id}
      disabled={disabled}
      className={`d-inline-flex align-items-center pl-3 ${className}`}
      data-questionid={params.questionId}
      data-answerid={params.answerId}
      data-commentid={params.commentId}
      data-whowasvoted={params.whowasvoted}
      onClick={onClick}
    >
      {children}
    </TransparentButton>
  ) : null;

export const BlockButton = ({
  className,
  id,
  onClick,
  params,
  isVotedToDelete,
  children,
  disabled,
}) => (
  <Button
    show
    params={params}
    onClick={onClick}
    id={id}
    className={className}
    disabled={disabled}
  >
    <SpanStyled
      className="d-flex align-items-center"
      isVotedToDelete={isVotedToDelete}
    >
      {children}
    </SpanStyled>
  </Button>
);

Button.propTypes = {
  params: PropTypes.object,
  children: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  disabled: PropTypes.bool,
};

BlockButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  params: PropTypes.object,
  isVotedToDelete: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.object,
};

export default React.memo(Button);