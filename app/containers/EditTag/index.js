import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';

import { selectEditTagData } from 'containers/TagsOfCommunity/selectors';
import { resetEditTagData } from 'containers/TagsOfCommunity/actions';

import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  HOW_TO_USE_IT_QUESTION,
  WHAT_IS_TAG_QUESTION,
} from 'containers/Faq/constants';

import {
  DESCRIPTION_FIELD,
  FORM_COMMUNITY,
  NAME_FIELD,
} from 'containers/CreateTag/constants';

import {
  selectFaqQuestions,
  selectCommunities,
} from 'containers/DataCacheProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { Header } from 'containers/CreateTag/Header';
import { Tips } from 'containers/CreateCommunity/Tips';
import Form from 'containers/CreateTag/Form';

import messages from './messages';
import editTagSaga from './saga';
import { getEditTagForm, resetEditTagReducer, editTag } from './actions';
import { selectEditTagFormLoading, selectEditTagProcessing } from './selectors';

const EditTag = ({
  communities,
  getEditTagFormDispatch,
  resetEditTagDataDispatch,
  resetEditTagReducerDispatch,
  editTagFormLoading,
  editTagProcessing,
  editTagDispatch,
  editTagData,
  faqQuestions,
  locale,
}) => {
  const { communityId, tagId } = editTagData;

  // component did mount
  useEffect(() => {
    getEditTagFormDispatch(communityId);
  }, []);

  // component will unmount
  useEffect(() => () => resetEditTagReducerDispatch(), []);

  const editTagArgs = useCallback(
    (...args) => {
      const values = args[0].toJS();

      editTagDispatch(
        {
          name: values[NAME_FIELD],
          description: values[DESCRIPTION_FIELD],
          communityId: +values[FORM_COMMUNITY].id,
          tagId,
        },
        args[2].reset,
      );
    },
    [editTagDispatch],
  );

  const title = <FormattedMessage {...messages.title} />;

  if (editTagFormLoading) return <LoadingIndicator />;

  return (
    <>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />
      <Header
        title={title}
        closeRedirectPage={
          communityId ? routes.communityTags(communityId) : routes.tags()
        }
        closeButtonAction={resetEditTagDataDispatch}
      />
      <TipsBase>
        <BaseSpecialOne>
          <Form
            communities={communities}
            editTagData={editTagData}
            submitAction={editTagArgs}
            translations={translationMessages[locale]}
            tagFormLoading={editTagProcessing}
            isEditTagForm
          />
        </BaseSpecialOne>

        <Tips faqQuestions={faqQuestions} />
      </TipsBase>
    </>
  );
};

EditTag.propTypes = {
  communities: PropTypes.array,
  resetEditTagDataDispatch: PropTypes.func,
  getEditTagFormDispatch: PropTypes.func,
  editTagFormLoading: PropTypes.bool,
  editTagProcessing: PropTypes.bool,
  editTagData: PropTypes.object,
  editTagDispatch: PropTypes.func,
  locale: PropTypes.string,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  communities: selectCommunities(),
  editTagFormLoading: selectEditTagFormLoading(),
  editTagProcessing: selectEditTagProcessing(),
  editTagData: selectEditTagData(),
  locale: makeSelectLocale(),
  faqQuestions: selectFaqQuestions([
    WHAT_IS_TAG_QUESTION,
    HOW_TO_USE_IT_QUESTION,
  ]),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    resetEditTagDataDispatch: bindActionCreators(resetEditTagData, dispatch),
    getEditTagFormDispatch: bindActionCreators(getEditTagForm, dispatch),
    resetEditTagReducerDispatch: bindActionCreators(
      resetEditTagReducer,
      dispatch,
    ),
    editTagDispatch: bindActionCreators(editTag, dispatch),
  };
}

export default compose(
  injectSaga({ key: 'editTag', saga: editTagSaga }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EditTag);
