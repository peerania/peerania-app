import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';

const AcceptedAnswer = props => (
  <div className="accepted-answer">
    {props.questionData.answers.map(
      item =>
        props.questionData.correct_answer_id === item.id ? (
          <Content
            {...props}
            key={`answer${item.id}`}
            answerId={item.id}
            comments={item.comments}
            content={item.content}
            rating={item.rating}
            questionFrom={props.questionData.user}
            isItWrittenByMe={item.isItWrittenByMe}
            history={item.history}
            userInfo={item.userInfo}
            postTime={item.post_time}
            lastEditedDate={item.lastEditedDate}
            votingStatus={item.votingStatus}
            deleteItem={props.deleteAnswer}
            editItem={props.editAnswer}
            editComment={props.editComment}
            saveComment={props.saveComment}
            editCommentState={props.editCommentState}
            deleteComment={props.deleteComment}
            buttonParams={{
              questionId: props.questionData.id,
              answerId: item.id,
            }}
          />
        ) : null,
    )}
  </div>
);

AcceptedAnswer.propTypes = {
  questionData: PropTypes.object,
  editCommentState: PropTypes.object,
  deleteAnswer: PropTypes.func,
  editAnswer: PropTypes.func,
  editComment: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default AcceptedAnswer;