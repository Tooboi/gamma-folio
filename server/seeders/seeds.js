const db = require('../config/connection');
const { User, Quiz, Prompt, Solution, Feedback, InterviewInfo } = require('../models');
const { create } = require('../models/Solution');
const userSeeds = require('./userSeeds.json');
const promptSeeds = require('./promptSeeds.json');
const solutionSeeds = require('./solutionSeeds.json');
const feedbackSeeds = require('./feedbackSeeds.json');
const interviewInfoSeeds = require('./interviewInfoSeeds.json')

db.once('open', async () => {
  try {
    // Delete all existing Bubble Up documents
    await User.collection.drop();
    await Quiz.collection.drop();
    await Prompt.collection.drop();
    await Solution.collection.drop();
    await Feedback.collection.drop();
    await InterviewInfo.collection.drop();

    // Create new documents
    await User.create(userSeeds);
    await Prompt.create(promptSeeds);
    interviewInfoSeeds.forEach(async (interviewInfo) => {
      const prompt = interviewInfo.prompt;
      await Prompt.create({ prompt })

      await InterviewInfo.create(interviewInfo);
    });
    // await InterviewInfo.create(interviewInfoSeeds);
    
    for (let i = 0; i < solutionSeeds.length; i++) {
      const questionKey = solutionSeeds[i].questionKey;
      delete solutionSeeds[i].questionKey;

      const { _id: solutionId, username } = await Solution.create(solutionSeeds[i]);

      await User.findOneAndUpdate(
        { username },
        { $addToSet: { solutions: solutionId } },
        { runValidators: true }
      );

      console.log(questionKey);

      const { _id: promptId } = await Prompt.findOneAndUpdate(
        { prompt: { $regex: questionKey } },
        { $addToSet: { solutions: solutionId } }
      );

      await Solution.findByIdAndUpdate(
        solutionId,
        { promptId }
      );

      const solutionFeedback = feedbackSeeds.filter((feedback) => {
        if (feedback.promptKey === questionKey && feedback.replyTo === username) {
          return true;
        } else {
          return false;
        }
      });

      solutionFeedback.forEach(async (feedback) => {
        solutionFeedback.solutionId = solutionId;
        delete feedback.replyTo;
        delete feedback.promptKey;
        
        const { _id: feedbackId } = await Feedback.create(feedback);

        await Solution.findByIdAndUpdate(
          solutionId,
          { $addToSet: { feedback: feedbackId } }
        );

        await User.findOneAndUpdate(
          { username: feedback.username },
          { $addToSet: { thoughts: feedbackId } },
          { runValidators: true }
        );
      });
    }

  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});