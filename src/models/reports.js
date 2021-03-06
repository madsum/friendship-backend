import knex from '../utils/db';

const reportFields = [
  'id',
  'userId',
  'createdAt',
  'description',
  'reported_by',
];

export const dbGetReports = () => knex('reports').select(reportFields);

export const dbGetReport = id =>
  knex('reports')
    .first()
    .where({ id });

export const dbCreateReport = ({ ...fields }) =>
  knex.transaction(async trx => {
    const report = await trx('reports')
      .insert(fields)
      .returning('*')
      .then(results => results[0]);

    return report;
  });

export const dbDelReport = id =>
  knex('reports')
    .where({ id })
    .del();

export const dbUpdateReport = (id, fields) =>
  knex('reports')
    .update({ ...fields })
    .where({ id })
    .returning('*');
