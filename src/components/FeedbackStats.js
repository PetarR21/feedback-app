import PropTypes from 'prop-types';

const FeedbackStats = ({ feedback }) => {
  const average = (feedback.length === 0 ? 0 : feedback.reduce((acc, cur) => acc + cur.rating, 0) / feedback.length)
    .toFixed(1)
    .replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} reviews</h4>
      <h4>Average rating: {average}</h4>
    </div>
  );
};

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
};

export default FeedbackStats;
