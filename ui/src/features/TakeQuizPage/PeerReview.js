import React, {useState, Fragment} from 'react';
import {Typography, Button} from '@material-ui/core';
import {Formik, Form} from 'formik';
import {useParams, useHistory} from 'react-router';
import {useQuery, useMutation} from 'react-query';
import * as yup from 'yup';

import {TextField, SubmitButton, Snackbar} from 'components';
import api from 'utils/api';

const getValidationSchema = data => yup.object().shape({
  grades: yup.object().shape(
    data.reduce((acc, {id, availablePoints}) => ({
      ...acc,
      [id]: yup
        .number()
        .integer()
        .min(0, 'You can\'t give a negative grade')
        .max(availablePoints, `You can only grade this answer by up to ${availablePoints} points`),
    }), {})
  ),
});

const getInitialValues = data => ({
  comments: data.reduce((acc, {id, peerComment}) => ({...acc, [id]: peerComment}), {}),
  grades: data.reduce((acc, {id, peerPoints}) => ({...acc, [id]: peerPoints}), {}),
});

const PeerReview = ({quiz}) => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const {quizId} = useParams();
  const history = useHistory();
  const peerQuizQuery = useQuery(
    ['quiz', quizId, 'peer'],
    () => api.get(`/quiz/${quizId}/peer`)
  );
  const peerReviewMutation = useMutation(
    data => api.post(`/quiz/${quiz.id}/peer-review`, data),
    {onSuccess: () => setSnackbarMessage('Review saved successfully')}
  );

  if (peerQuizQuery.isLoading) {
    return null;
  }

  return (
    <Formik
      initialValues={getInitialValues(peerQuizQuery.data)}
      validationSchema={getValidationSchema(peerQuizQuery.data)}
      onSubmit={peerReviewMutation.mutate}
    >
      <Form>
        <Snackbar message={snackbarMessage} close={() => setSnackbarMessage('')} />
        <Typography variant="h4">You can review your colleagues work now</Typography>
        {peerQuizQuery.data.map(({id, statement, answer}) => (
          <Fragment key={id}>
            <Typography variant="h6">{statement}</Typography>
            <Typography>{answer}</Typography>
            <TextField name={`grades.${id}`} label="Grade this question" type="number" fullWidth={false} />
            <TextField name={`comments.${id}`} label="Explain your decision" multiline />
          </Fragment>
        ))}
        <SubmitButton isLoading={peerReviewMutation.isLoading}>Save</SubmitButton>
        <Button onClick={history.goBack}>Go Back</Button>
      </Form>
    </Formik>
  );
};

export default PeerReview;
