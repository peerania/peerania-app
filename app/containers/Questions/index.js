/**
 *
 * Questions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import InfinityLoader from 'components/InfinityLoader';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { getQuestionsList, setDefaultReducer } from './actions';
import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import QuestionsContainer from './QuestionsContainer';

/* eslint-disable react/prefer-stateless-function */
export class Questions extends React.Component {
  componentDidMount() {
    const { initLoadedItems } = this.props;
    this.getQuestionsList(initLoadedItems);
  }

  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
  }

  getQuestionsList = (limit = this.props.nextLoadedItems) => {
    const lastItem = this.props.questionsList.last();
    const offset = (lastItem && +lastItem.id + 1) || 0;

    this.props.getQuestionsListDispatch(limit, offset);
  };

  render() {
    const {
      locale,
      questionsList,
      questionsLoading,
      isLastFetch,
      communities,
    } = this.props;

    const sendProps = {
      locale,
      questionsList,
      questionsLoading,
      communities,
      translations: translationMessages[locale],
    };

    return (
      <InfinityLoader
        loadNextPaginatedData={this.getQuestionsList}
        isLoading={questionsLoading}
        isLastFetch={isLastFetch}
      >
        <div className="container">
          <Helmet>
            <title>{sendProps.translations[messages.title.id]}</title>
            <meta
              name="description"
              content={sendProps.translations[messages.description.id]}
            />
          </Helmet>
          <QuestionsContainer {...sendProps} />
        </div>
      </InfinityLoader>
    );
  }
}

Questions.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  questionsList: PropTypes.object,
  questionsLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  initLoadedItems: PropTypes.number,
  nextLoadedItems: PropTypes.number,
  getQuestionsListDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  questionsList: questionsSelector.selectQuestionsList(),
  questionsLoading: questionsSelector.selectQuestionsLoading(),
  initLoadedItems: questionsSelector.selectInitLoadedItems(),
  nextLoadedItems: questionsSelector.selectNextLoadedItems(),
  isLastFetch: questionsSelector.selectIsLastFetch(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getQuestionsListDispatch: (limit, offset) =>
      dispatch(getQuestionsList(limit, offset)),
    setDefaultReducerDispatch: () => dispatch(setDefaultReducer()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'questionsReducer', reducer });
const withSaga = injectSaga({ key: 'questionsReducer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Questions);
