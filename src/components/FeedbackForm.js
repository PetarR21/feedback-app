import { useContext, useEffect, useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false);
      console.log(feedbackEdit.item.text);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleTextChange = (event) => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.length < 10) {
      setBtnDisabled(true);
      setMessage('Text must be at least 10 characters');
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(event.target.value);
  };

  const createFeedback = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      setMessage('Please select a rating');
      return;
    }

    const newFeedback = {
      rating: rating,
      text: text,
    };

    if (feedbackEdit.edit) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      await addFeedback(newFeedback);
    }

    setText('');
    setRating(0);
    setBtnDisabled(true);
  };

  return (
    <Card>
      <form onSubmit={createFeedback}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(r) => {
            setRating(r);
          }}
        />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
