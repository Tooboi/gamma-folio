import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      firstName
      lastName
      username
      email
      solutions {
        _id
        username
        response
        createdAt
        updatedAt
      }
    }
  }
`;
export const QUERY_ME = gql`
  query Me {
    me {
      _id
      email
      firstName
      lastName
      username
      solutions {
        username
        response
        createdAt
        updatedAt
      }
      thoughts {
        username
        thoughts
      }
    }
  }
`;

export const GET_QUIZZES = gql`
  query GetQuizzes {
    getQuizzes {
      _id
      title
      prompts {
        _id
        prompt
        createdAt
        updatedAt
        solutions {
          _id
        }
      }
    }
  }
`;

export const GET_QUIZ = gql`
  query GetQuiz($getQuizId: ID!) {
    getQuiz(id: $getQuizId) {
      _id
      title
      prompts {
        _id
        prompt
        createdAt
        updatedAt
        solutions {
          _id
        }
      }
    }
  }
`;

export const QUERY_PROMPTS = gql`
  query getPrompts {
    getPrompts {
      _id
      prompt
      solutions {
        _id
        username
        response
        createdAt
        updatedAt
        feedback {
          thoughts
          username
          _id
        }
        username
        response
      }
    }
  }
`;

export const QUERY_PROMPT = gql`
  query GetPrompts ($promptId: ID!) {
    getPrompt(promptId: $promptId) {
      _id
      prompt
      createdAt
      updatedAt
      solutions {
        _id
        username
        response
        createdAt
        updatedAt
        feedback {
          _id
          username
          thoughts
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const QUERY_SOLUTIONS = gql`
  query GetSolutions {
    getSolutions {
      _id
      username
      response
      createdAt
      updatedAt
      feedback {
        _id
        username
        thoughts
        createdAt
        updatedAt
      }
    }
  }
`;

export const QUERY_SOLUTION = gql`
  query GetSolution($getSolutionId: ID!) {
    getSolution(id: $getSolutionId) {
      _id
      username
      response
      createdAt
      updatedAt
      feedback {
        _id
        username
        thoughts
        createdAt
        updatedAt
      }
    }
  }
`;

export const QUERY_ALL_FEEDBACK = gql`
  query GetAllFeedback {
    getAllFeedback {
      _id
      thoughts
      username
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_FEEDBACK = gql`
  query GetFeedback($getFeedbackId: ID!) {
    getFeedback(id: $getFeedbackId) {
      _id
      username
      thoughts
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_ALL_INTERVIEW_INFO = gql`
  query GetAllInterviewInfo {
    getAllInterviewInfo {
      _id
      username
      location
      position
      subject
      prompt
      response
      resFeedback
      createdAt
      updatedAt
      commFeedback {
        _id
        username
        thoughts
        createdAt
        updatedAt
      }
    }
  }
`;

export const QUERY_INTERVIEW_INFO = gql`
  query GetInterviewInfo($getInterviewInfoId: ID!) {
    getInterviewInfo(id: $getInterviewInfoId) {
      _id
      username
      location
      position
      subject
      prompt
      response
      resFeedback
      createdAt
      updatedAt
      commFeedBack {
        _id
        username
        thoughts
        createdAt
        updatedAt
      }
    }
  }
`;

export const QUERY_ALL_INTERVIEWS = gql`query GetAllInterviewInfo {
  getAllInterviewInfo {
    _id
    location
    position
    subject
    prompt
    response
    resFeedback
    commFeedBack {
      thoughts
      username
    }
    username
  }
}
`;

