import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation AddUser($newUser: Signup!) {
    addUser(newUser: $newUser) {
      token
      user {
        _id
        email
        firstName
        lastName
        password
        username
      }
    }
  }
`;

export const LOGIN = gql`
mutation Login($userCred: Login!) {
  login(userCred: $userCred) {
    token
    user {
      email
      firstName
      lastName
      username
      solutions {
        username
        response
      }
      thoughts {
        username
        thoughts
      }
    }
  }
}`;

export const ADD_PROMPT = gql`
  mutation AddPrompt($prompt: String!) {
    addPrompt(prompt: $prompt) {
      _id
      prompt
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_PROMPT = gql`
  mutation RemovePrompt($removePromptId: ID!) {
    removePrompt(id: $removePromptId) {
      _id
      prompt
      createdAt
      updatedAt
    }
  }
`;

export const ADD_SOLUTION = gql`
mutation addSolution($id: ID!, $newSolution: NewSolution!) {
  addSolution(id: $id, newSolution: $newSolution) {
    username
    response
  }
}`;

export const EDIT_SOLUTION = gql`
mutation EditSolution($editSolutionId: ID!, $response: String!) {
  editSolution(id: $editSolutionId, response: $response) {
    username
    response
  }
}`;

export const REMOVE_SOLUTION = gql`
mutation RemoveSolution($removeSolutionId: ID!) {
  removeSolution(id: $removeSolutionId) {
    username
    response
  }
}`;

export const ADD_FEEDBACK = gql`
mutation AddFeedback($addFeedbackId: ID!, $newFeedback: NewFeedback!) {
  addFeedback(id: $addFeedbackId, newFeedback: $newFeedback) {
    username
    thoughts
  }
}`;

export const EDIT_FEEDBACK = gql`
mutation EditFeedback($editFeedbackId: ID!, $thoughts: String!) {
  editFeedback(id: $editFeedbackId, thoughts: $thoughts) {
    username
    thoughts
  }
}`;

export const REMOVE_FEEDBACK = gql`
mutation RemoveFeedback($removeFeedbackId: ID!) {
  removeFeedback(id: $removeFeedbackId) {
    username
    thoughts
  }
}`;

export const SUBMIT_INFO = gql`
mutation SubmitInterviewForm($interviewForm: NewInfo!) {
  submitInterviewForm(interviewForm: $interviewForm) {
    _id
    username
    location
    position
    subject
    prompt
    response
    resFeedback
  }
}`;
