const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz, Prompt, Solution, Feedback, InterviewInfo } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({}).populate('solutions thoughts');
    },
    getUser: async (parent, { username }) => {
      return await User.findOne({ username }).populate('solutions thoughts');
    },
    getQuizzes: async () => {
      return await Quiz.find({}).populate('prompts').populate({
        path: 'prompts',
        populate: 'solutions'
      });
    },
    getQuiz: async (parent, { id }) => {
      return await Quiz.findById(id).populate('prompts').populate({
        path: 'prompts',
        populate: 'solutions'
      });
    },
    getPrompts: async () => {
      return await Prompt.find({}).populate('solutions').populate({
        path: 'solutions',
        populate: 'feedback'
      });
    },
    getPrompt: async (parent, { promptId }) => {
      return await Prompt.findById(promptId).populate('solutions').populate({
        path: 'solutions',
        populate: 'feedback'
      });
    },
    getSolutions: async () => {
      return await Solution.find({}).populate('feedback');
    },
    getSolution: async (parent, { id }) => {
      return await Solution.findById(id).populate('feedback');
    },
    getAllFeedback: async () => {
      return await Feedback.find({});
    },
    getFeedback: async (parent, { id }) => {
      return await Feedback.findById(id);
    },
    getAllInterviewInfo: async () => {
      return await InterviewInfo.find({}).populate('commFeedback');
    },
    getInterviewInfo: async (parent, { id }) => {
      return await InterviewInfo.findById(id).populate('commFeedback');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('solutions thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
  Mutation: {
    addUser: async (parent, { newUser }) => {
      const user = await User.create(newUser);
      console.log(user);
      const token = signToken(user);
      console.log("token: ", token);
      return { token, user };
    },
    login: async (parent, { userCred }) => {
      let user;
      if (userCred.username) {
        const username = userCred.username;
        user = await User.findOne({ username });
      } else {
        const email = userCred.email;
        user = await User.findOne({ email });
      }

      if(!user) {
        throw new AuthenticationError('No user found!');
      }

      const passwordCheck = await user.isCorrectPassword(userCred.password);

      if (!passwordCheck) {
        throw new AuthenticationError('Incorrect credentials!');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPrompt: async (parent, { prompt }) => {
      return await Prompt.create({ prompt });
    },
    removePrompt: async (parent, { id }) => {
      return await Prompt.findByIdAndDelete(id);
    },
    addSolution: async (parent, { id, newSolution }, context) => {
      let solution;
      newSolution.promptId = id;
      if(context.user) {
        newSolution.username = context.user.username;
        solution = await Solution.create(newSolution);
      } else {
        solution = await Solution.create(newSolution);
      }

      await User.findOneAndUpdate(
        { username: solution.username },
        { $addToSet: { solutions: solution._id } },
        { runValidators: true }
      );
      
      await Prompt.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { solutions: solution._id } }
      );
      
      return solution;
    },
    editSolution: async (parent, { id, response }) => {
      return await Solution.findByIdAndUpdate(
        id,
        { response },
        { new: true }
      );
    },
    removeSolution: async (parent, { id }) => {
      const solution = await Solution.findByIdAndDelete(id);

      console.log(solution);

      if (solution.username) {
        await User.findOneAndUpdate(
          { username: solution.username },
          { $pull: { solutions: solution._id } },
          { runValidators: true }
        );
      }
      
      if (solution.promptId) {
        await Prompt.findByIdAndUpdate(
          { _id: solution.promptId },
          { $pull: { solutions: solution._id } }
        );
      }

      return solution;
    },
    addFeedback: async (parent, { solutionId, infoId, newFeedback }, context) => {
      let feedback;
      solutionId ? newFeedback.solutionId = solutionId : newFeedback.interviewInfoId = infoId;
      
      if (context.user) {
        newFeedback.username = context.user.username;
        feedback = await Feedback.create(newFeedback);
      } else {
        feedback = await Feedback.create(newFeedback);
      }

      console.log(feedback);

      await User.findOneAndUpdate(
        { username: feedback.username },
        { $addToSet: { thoughts: feedback._id } },
        { runValidators: true }
      );
      
      if (newFeedback.solutionId) {
        await Solution.findByIdAndUpdate(
          { _id: solutionId },
          { $addToSet: { feedback: feedback._id } }
        );
      } else {
        await InterviewInfo.findByIdAndUpdate(
          { _id: infoId },
          { $addToSet: { feedback: feedback._id } }
        );
      }
      
      return feedback;
    },
    editFeedback: async (parent, { id, thoughts }) => {
      return await Feedback.findByIdAndUpdate(
        id,
        { thoughts },
        { new: true }
      );
    },
    removeFeedback: async (parent, { id }) => {
      const feedback = await Feedback.findByIdAndDelete(id);

      if (feedback.username) {
        await User.findOneAndUpdate(
          { username: feedback.username },
          { $pull: { thoughts: feedback._id } },
          { runValidators: true }
        );
      }
      
      if (feedback.solutionId) {
        await Solution.findByIdAndUpdate(
          { _id: feedback.solutionId },
          { $pull: { feedback: feedback._id } }
        );
      } else {
        await InterviewInfo.findByIdAndUpdate(
          { _id: feedback.interviewInfoId },
          { $pull: { feedback: feedback._id } }
        );
      }

      return feedback;
    },
    submitInterviewForm: async (parent, { interviewForm }, context) => {
      if (context.user) {
        interviewForm['username'] = context.user.username;

        const prompt = interviewForm.prompt;
        await Prompt.create({ prompt });
        
        return await InterviewInfo.create(interviewForm);
      } else {
        return await InterviewInfo.create(interviewForm);
      }
      // throw new AuthenticationError('You need to be logged in to submit!');
    }
  }
};

module.exports = resolvers;
