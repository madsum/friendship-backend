import Boom from 'boom';

import {
  dbGetPersonalities,
  dbGetPersonality,
  dbUpdatePersonality,
  dbDelPersonality,
  dbCreatePersonality,
  dbCreateUserPersonality,
} from '../models/personalities';

export const getPersonalities = (request, reply) => dbGetPersonalities().then(reply);

export const getPersonality = (request, reply) =>
  dbGetPersonality(request.params.personalityId).then(reply);

// delete this will affect FK in user_personality --> ask Futurice?
// cannot use at the moment --> need to drop cascade
export const delPersonality = (request, reply) => {
  console.log('Request Pre: ', request.pre);
  console.log('Request Params: ', request.params);
  if (
    request.pre.user.scope !== 'admin' &&
    request.pre.user.id !== request.params.userId
  ) {
    return reply(
      Boom.unauthorized('Unprivileged users cannnot delete personality!'),
    );
  }
  return dbDelPersonality(request.params.personalityId).then(reply);
};

export const updatePersonality = async (request, reply) => {
  if (request.pre.user.scope !== 'admin') {
    return reply(
      Boom.unauthorized(
        'Unprivileged users cannnot update personality!',
      ),
    );
  }

  const fields = {
    name: request.payload.name,
  };

  return dbUpdatePersonality(request.params.personalityId, fields).then(reply);
};

export const createPersonality = (request, reply) => {
  dbCreatePersonality({
    ...request.payload,
    name: request.payload.name,
  })
  .then(reply)
  .catch(err => reply(Boom.badImplementation(err)),
  );
};

export const createUserPersonality = (request, reply) => {
  dbCreateUserPersonality({
    ...request.payload,
    userId: request.payload.userId,
    personalityId: request.payload.personalityId,
    level: request.payload.level,
  })
  .then(reply)
  .catch((err) => {
    if (err.constraint) {
      reply(Boom.conflict('Constraint Error: ', err.constraint));
    } else {
      reply(Boom.badImplementation(err));
    }
  });
};
