const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    solutions: [Solution]
    thoughts: [Feedback]
  }

  "For signup data"
  input Signup {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String    
  }

  
  "For login data"
  input Login {
    username: String
    email: String
    password: String
  }

  type Quiz {
    _id: ID
    title: String
    prompts: [Prompt]
  }

  type Prompt {
    _id: ID
    prompt: String
    solutions: [Solution]
    createdAt: String
    updatedAt: String
  }

  type Solution {
    _id: ID
    response: String
    username: String
    feedback: [Feedback]
    createdAt: String
    updatedAt: String
  }

  input NewSolution {
    response: String!
    username: String!
  }

  type Feedback {
    _id: ID
    thoughts: String
    username: String
    createdAt: String
    updatedAt: String
  }

  input NewFeedback {
    thoughts: String
    username: String
  }

  type InterviewInfo {
    _id: ID
    username: String
    location: String
    position: String
    subject: String
    prompt: String
    response: String
    resFeedback: String
    commFeedBack: [Feedback]
    createdAt: String
    updatedAt: String
  }

  input NewInfo {
    username: String
    location: String
    position: String
    subject: String
    prompt: String
    response: String
    resFeedback: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    getUser(username: String!): User
    getQuizzes: [Quiz]
    getQuiz(id: ID!): Quiz
    getPrompts: [Prompt]
    getPrompt(promptId: ID!): Prompt
    getSolutions: [Solution]
    getSolution(id: ID!): Solution
    getAllFeedback: [Feedback]
    getFeedback(id: ID!): Feedback
    getAllInterviewInfo: [InterviewInfo]
    getInterviewInfo(id: ID!): InterviewInfo
    me: User
  }

  type Mutation {
    addUser(newUser: Signup!): Auth
    login(userCred: Login!): Auth
    addPrompt(prompt: String!): Prompt
    removePrompt(id: ID!): Prompt
    addSolution(id: ID!, newSolution: NewSolution!): Solution
    editSolution(id: ID!, response: String!): Solution
    removeSolution(id: ID!): Solution
    addFeedback(solutionId: ID, infoId: ID, newFeedback: NewFeedback!): Feedback
    editFeedback(id: ID!, thoughts: String!): Feedback
    removeFeedback(id: ID!): Feedback
    submitInterviewForm(interviewForm: NewInfo!): InterviewInfo
  }
`;

module.exports = typeDefs;
