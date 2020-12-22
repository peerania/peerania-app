import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import { BORDER_PRIMARY, LINK_COLOR_SECONDARY } from 'style-constants';

import icoTag from 'images/icoTag.svg?external';

import _uniqBy from 'lodash/uniqBy';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { scrollToErrorField } from 'utils/animation';

import { redirectToCreateTag } from 'containers/CreateTag/actions';

import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Tips from 'components/TextEditor/Tips';
import FormBox from 'components/Form';
import TipsBase from 'components/Base/TipsBase';
import { IconMd } from 'components/Icon/IconWithSizes';

import {
  FORM_TITLE,
  FORM_TYPE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
  FORM_BOUNTY,
  FORM_BOUNTY_DAYS,
  FORM_BOUNTY_HOURS,
  DEFAULT_DOT_RESTRICTION,
} from './constants';

import Header from './Header';
import { QUESTION_TYPES } from './QuestionTypeField';
import CommunityForm from './CommunityForm';
import ExistingQuestions from './ExistingQuestions';
import TypeForm from './TypeForm';
import TitleForm from './TitleForm';
import ContentForm from './ContentForm';
import TagsForm from './TagsForm';
import BountyForm from './BountyForm';
import BountyDateForm from './BountyDateForm';

const single = isSingleCommunityWebsite();

const SuggestTag = memo(({ redirectToCreateTagDispatch, formValues }) => {
  const communityId = useMemo(() => formValues?.[FORM_COMMUNITY]?.value ?? 0, [
    formValues,
  ]);

  return (
    <TransparentButton
      onClick={redirectToCreateTagDispatch}
      data-communityid={communityId}
      id="question-form-suggest-tag"
      type="button"
      color={LINK_COLOR_SECONDARY}
    >
      <IconMd className="mr-2" icon={icoTag} fill={BORDER_PRIMARY} />
      <FormattedMessage {...commonMessages.suggestTag} />
    </TransparentButton>
  );
});

export const QuestionForm = ({
  locale,
  sendQuestion,
  formTitle,
  questionLoading,
  communities,
  submitButtonId,
  submitButtonName,
  handleSubmit,
  change,
  formValues,
  intl,
  questionid,
  redirectToCreateTagDispatch,
  getQuestions,
  existingQuestions,
  doSkipExistingQuestions,
  skipExistingQuestions,
}) => {
  useEffect(
    () => {
      if (formValues[FORM_TITLE] && getQuestions) {
        getQuestions(formValues[FORM_TITLE], true);
      }
    },
    [formValues[FORM_TITLE]],
  );

  return (
    <div>
      <Header formTitle={formTitle} questionId={questionid} intl={intl} />

      <TipsBase>
        <BaseSpecialOne>
          <FormBox onSubmit={handleSubmit(sendQuestion)}>
            <CommunityForm
              intl={intl}
              communities={communities}
              change={change}
              questionLoading={questionLoading}
            />

            {!questionid && (
              <TypeForm
                intl={intl}
                change={change}
                questionLoading={questionLoading}
                locale={locale}
                formValues={formValues}
              />
            )}

            <TitleForm intl={intl} questionLoading={questionLoading} />

            {formValues[FORM_TITLE] &&
              (existingQuestions?.length ?? 0) > 0 &&
              !doSkipExistingQuestions && (
                <ExistingQuestions
                  questions={existingQuestions}
                  skip={skipExistingQuestions}
                  intl={intl}
                />
              )}

            <ContentForm
              intl={intl}
              questionLoading={questionLoading}
              formValues={formValues}
            />

            <TagsForm
              intl={intl}
              questionLoading={questionLoading}
              formValues={formValues}
              change={change}
            />

            <SuggestTag
              formValues={formValues}
              redirectToCreateTagDispatch={redirectToCreateTagDispatch}
            />

            <BountyForm
              intl={intl}
              questionLoading={questionLoading}
              formValues={formValues}
              change={change}
              dotRestriction={DEFAULT_DOT_RESTRICTION}
            />

            <BountyDateForm
              intl={intl}
              questionLoading={questionLoading}
              formValues={formValues}
              change={change}
              show={!!formValues[FORM_BOUNTY]}
            />

            <Button
              disabled={questionLoading}
              id={submitButtonId}
              type="submit"
            >
              {submitButtonName}
            </Button>
          </FormBox>
        </BaseSpecialOne>

        <Tips />
      </TipsBase>
    </div>
  );
};

SuggestTag.propTypes = {
  formValues: PropTypes.object,
  redirectToCreateTagDispatch: PropTypes.func,
};

QuestionForm.propTypes = {
  locale: PropTypes.string,
  formTitle: PropTypes.string,
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendQuestion: PropTypes.func,
  redirectToCreateTagDispatch: PropTypes.func,
  change: PropTypes.func,
  questionLoading: PropTypes.bool,
  questionid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  formValues: PropTypes.object,
  communities: PropTypes.array,
  intl: intlShape.isRequired,
  getQuestions: PropTypes.func,
  existingQuestions: PropTypes.array,
  doSkipExistingQuestions: PropTypes.bool,
  skipExistingQuestions: PropTypes.func,
};

const FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
})(QuestionForm);

export default memo(
  injectIntl(
    connect(
      (state, { question, form: formName, communities }) => ({
        formValues: state.toJS().form[formName]?.values ?? {},
        initialValues: {
          [FORM_TYPE]: QUESTION_TYPES.GENERAL.value,
          ...(question
            ? {
                [FORM_TITLE]: question?.title,
                [FORM_CONTENT]: question?.content,
                [FORM_COMMUNITY]: {
                  ...question?.community,
                  tags: _uniqBy(
                    question?.community?.tags?.concat(
                      communities.find(
                        ({ id }) => id === question?.community?.id,
                      )?.tags,
                    ),
                    'id',
                  ),
                },
                [FORM_TAGS]: question?.chosenTags,
                [FORM_BOUNTY]: question?.bounty,
                [FORM_BOUNTY_DAYS]: question?.bountyDays,
                [FORM_BOUNTY_HOURS]: question?.bountyHours,
              }
            : {}),
          ...(single
            ? {
                [FORM_COMMUNITY]: {
                  ...communities?.find(({ id }) => id === single),
                  tags: _uniqBy(
                    communities
                      .find(({ id }) => id === single)
                      ?.tags?.concat(
                        communities.find(
                          ({ id }) => id === question?.community?.id,
                        )?.tags,
                      )
                      .filter(x => x),
                    'id',
                  ),
                },
              }
            : {}),
        },
        enableReinitialize: true,
      }),
      dispatch => ({
        redirectToCreateTagDispatch: bindActionCreators(
          redirectToCreateTag,
          dispatch,
        ),
      }),
    )(FormClone),
  ),
);
