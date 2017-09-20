import Boom from 'boom';

import {
  dbGetTopics,
  dbGetTopic,
  dbCreateTopic,
  dbDelTopic,
  dbUpdateTopic,
  dbCreateUserTopic,
  dbDelUserTopic
} from '../models/topics';

export const getTopics = (request, reply) => dbGetTopics().then(reply);

export const getTopic = (request, reply) =>
  dbGetTopic(request.params.topicId).then(reply);

export const addTopic = (request, reply) =>
  dbCreateTopic({
    ...request.payload,
    name: request.payload.name
  }).then(reply);

export const delTopic = (request, reply) => {
  return dbDelTopic(request.params.topicId).then(reply);
};

export const updateTopic = async (request, reply) => {
  const fields = {
   name: request.payload.name
  };

  return dbUpdateTopic(request.params.topicId, fields).then(reply);
}

/**
 * Use the userId of current user (get it trough the token) and adds a new topic to the user with a love value of either true or false
 * @param request.payload.love This value should be true if the user loves the topic and false if the user hates the topic.
 * @param request.payload.topicId The topicId that has to be added to a certain user
 * @param reply
 */
export const addTopicToUser = (request, reply) =>
  dbCreateUserTopic({
    ...request.payload,
    topicId: request.payload.topicId,
    love: request.payload.love
  }).then(reply);

// Delete a topic that is connected to a user
export const delUserTopic = (request, reply) => {
  return dbDelUserTopic(request.params.topicId).then(reply);
};
