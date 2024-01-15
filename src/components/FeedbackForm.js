import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

const FeedbackForm = ({ createFeedback }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

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

  const addFeedback = (event) => {
    event.preventDefault();

    if (rating === 0) {
      setMessage('Please select a rating');
      return;
    }

    const newFeedback = {
      rating: rating,
      text: text,
    };

    createFeedback(newFeedback);
    setText('');
    setRating(0);
    setBtnDisabled(true);
  };

  return (
    <Card>
      <form onSubmit={addFeedback}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(r) => {
            setRating(r);
            console.log(r);
          }}
        />
        <div className='input-group'>
          <input onChange={handleTextChange} type='text' placeholder='Write a review' />
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
