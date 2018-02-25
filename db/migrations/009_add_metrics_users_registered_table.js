exports.up = knex =>
    knex.schema
        .createTableIfNotExists('metrics_users_registered', (table) => {
            table.increments('id').primary();
            table.integer('users_count').default(0);
            table.timestamp('timestamp');
        });

exports.down = knex =>
    knex.schema
        .table.dropTableIfExists('metrics_users_registered');