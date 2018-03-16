import Boom from 'boom';
import moment from 'moment';

import { dbCreateFeedback } from '../models/feedbacks';

export const CreateFeedback = (request, reply) =>
  dbCreateFeedback({
    ...request.payload,
    createdAt: moment(),
    suggestion: request.payload.suggestion,
    checkBoxs:request.payload.checkBoxs,
    findFriendEasy: request.payload.findFriendEasy,
    findFriendHard: request.payload.findFriendHard,
    suggestImprovement: request.payload.suggestImprovement,
    rating: request.payload.rating,
    goalRate: request.payload.goalRate,
    given_by: request.payload.given_by
  }).then(reply);
