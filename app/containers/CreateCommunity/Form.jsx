import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import { appLocales } from 'i18n';
import { TEXT_SECONDARY_LIGHT } from 'style-constants';

import icoTag from 'images/icoTag.svg?inline';
import closeIcon from 'images/close.svg?external';

import { formatStringToHtmlId, scrollToErrorField } from 'utils/animation';

import Wrapper from 'components/FormFields/Wrapper';
import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';

import SelectField, {
  getSelectOptions,
} from 'components/FormFields/SelectField';

import Icon from 'components/Icon';
import LargeButton from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';

import FormStyled from 'containers/EditProfilePage/FormStyled';
import AvatarStyled from 'containers/EditProfilePage/AvatarStyled';

import {
  AVATAR_FIELD_WIDTH,
  AVATAR_FIELD_MARGIN,
} from 'containers/EditProfilePage/ProfileEditForm';

import {
  strLength3x20,
  required,
  strLength20x1000,
  strLength15x100,
  imageValidation,
  valueHasNotBeInListMoreThanOneTime,
} from 'components/FormFields/validate';

import messages from './messages';

import {
  FORM_NAME,
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  TAG_NAME_FIELD,
  TAG_DESCRIPTION_FIELD,
  TAG_SECTION,
  LANGUAGE_FIELD,
  CREATE_COMMUNITY_BUTTON,
} from './constants';

const MIN_TAGS_NUMBER = 5;
const MAX_TAGS_NUMBER = 25;
const DEFAULT_TAGS_ARRAY = [];

/* eslint no-plusplus: 0 */
for (let i = 0; i < MIN_TAGS_NUMBER; i++) {
  DEFAULT_TAGS_ARRAY.push(i);
}

/* eslint react/jsx-no-bind: 0 */
/* eslint-disable-next-line */
const CreateCommunityForm = ({
  handleSubmit,
  createCommunity,
  createCommunityLoading,
  translations,
  change,
}) => {
  const [tags, changeTags] = useState(DEFAULT_TAGS_ARRAY);

  const removeTag = e => {
    const { key } = e.currentTarget.dataset;
    const index = tags.findIndex(x => x === +key);

    // clear tag in redux-form
    change(`tags.${TAG_SECTION}_${key}`, null);

    // clear array
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);

    changeTags(tagsCopy);
  };

  const addTag = () => {
    changeTags([...tags, tags[tags.length - 1] + 1]);
  };

  return (
    <FormStyled
      size={AVATAR_FIELD_WIDTH + AVATAR_FIELD_MARGIN}
      onSubmit={handleSubmit(createCommunity)}
    >
      <div className="position-static">
        <AvatarStyled>
          <Field
            name={COMM_AVATAR_FIELD}
            component={AvatarField}
            size={AVATAR_FIELD_WIDTH}
            validate={[imageValidation, required]}
            warn={[imageValidation, required]}
            disabled={createCommunityLoading}
          />
        </AvatarStyled>

        <Field
          disabled={createCommunityLoading}
          name={COMM_NAME_FIELD}
          component={TextInputField}
          label={translations[messages.communityTitle.id]}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
          tip={translations[messages.communityTitleTip.id]}
          splitInHalf
        />

        <Field
          name={LANGUAGE_FIELD}
          placeholder=""
          options={getSelectOptions(appLocales)}
          label={translations[messages.communityLanguage.id]}
          tip={translations[messages.communityLanguageTip.id]}
          disabled={createCommunityLoading}
          component={SelectField}
          validate={[required]}
          warn={[required]}
          splitInHalf
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_SHORT_DESCRIPTION_FIELD}
          component={TextInputField}
          label={translations[messages.shortDescription.id]}
          validate={[strLength15x100, required]}
          warn={[strLength15x100, required]}
          tip={translations[messages.shortDescriptionTip.id]}
          splitInHalf
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_MAIN_DESCRIPTION_FIELD}
          component={TextareaField}
          label={translations[messages.whyWeNeedIt.id]}
          validate={[strLength20x1000, required]}
          warn={[strLength20x1000, required]}
          tip={translations[messages.whyWeNeedItTip.id]}
          splitInHalf
        />

        <div>
          <Wrapper label={translations[messages.tags.id]} splitInHalf>
            <FormattedMessage
              {...messages.tagsAreNeeded}
              values={{ max: MAX_TAGS_NUMBER, min: MIN_TAGS_NUMBER }}
            />
          </Wrapper>

          <FormSection name="tags" className="mt-3">
            {tags.map((x, index) => (
              <FormSection
                key={x}
                name={`${TAG_SECTION}_${x}`}
                id={formatStringToHtmlId(`${TAG_SECTION}_${x}`)}
              >
                {index >= MIN_TAGS_NUMBER && (
                  <button type="button" data-key={x} onClick={removeTag}>
                    <Icon
                      width="14"
                      icon={closeIcon}
                      color={TEXT_SECONDARY_LIGHT}
                    />
                  </button>
                )}

                <Field
                  disabled={createCommunityLoading}
                  name={TAG_NAME_FIELD}
                  component={TextInputField}
                  placeholder={translations[messages.tagTitle.id]}
                  validate={[
                    strLength3x20,
                    required,
                    valueHasNotBeInListMoreThanOneTime,
                  ]}
                  warn={[
                    strLength3x20,
                    required,
                    valueHasNotBeInListMoreThanOneTime,
                  ]}
                  tip={translations[messages.tagTitleTip.id]}
                  splitInHalf
                />

                <Field
                  disabled={createCommunityLoading}
                  name={TAG_DESCRIPTION_FIELD}
                  component={TextareaField}
                  placeholder={translations[messages.tagDescription.id]}
                  validate={[strLength20x1000, required]}
                  warn={[strLength20x1000, required]}
                  tip={translations[messages.tagDescriptionTip.id]}
                  splitInHalf
                />
              </FormSection>
            ))}
          </FormSection>
        </div>

        <div>
          <TransparentButton
            className="d-flex align-items-center"
            type="button"
            onClick={addTag}
            disabled={tags.length === MAX_TAGS_NUMBER}
          >
            <img className="mr-2" src={icoTag} alt="icoTag" />
            <FormattedMessage {...messages.oneMoreTag} />
          </TransparentButton>
        </div>

        <div>
          <LargeButton
            className="my-3"
            disabled={createCommunityLoading}
            type="submit"
            id={CREATE_COMMUNITY_BUTTON}
          >
            {translations[messages.createCommunity.id]}
          </LargeButton>
        </div>
      </div>
    </FormStyled>
  );
};

CreateCommunityForm.propTypes = {
  handleSubmit: PropTypes.func,
  createCommunity: PropTypes.func,
  createCommunityLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  change: PropTypes.func,
};

/* eslint import/no-mutable-exports: 0, consistent-return: 0 */
let FormClone = reduxForm({
  form: FORM_NAME,
  onSubmitFail: err => {
    const errors = {
      ...err,
      ...err.tags,
    };

    delete errors.tags;

    scrollToErrorField(errors);
  },
})(CreateCommunityForm);

FormClone = connect(state => {
  const form = state.toJS().form[FORM_NAME] || { values: {} };

  if (form.values && form.values.tags) {
    const { tags } = form.values;
    const tagNames = Object.keys(tags)
      .filter(x => tags[x])
      .map(x => tags[x][TAG_NAME_FIELD]);

    return {
      valueHasNotBeInListValidate: tagNames,
    };
  }
})(FormClone);

export default FormClone;