/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('Polls', {
        PollId: { type: 'uuid', notNull: true },
        Question: { type: 'varchar(1000)', notNull: true },
        EventId: { type: 'uuid', notNull: true },
    });

    pgm.createTable('Options', {
        OptionId: { type: 'uuid', notNull: true },
        Text: { type: 'varchar(1000)', notNull: true },
        PollId: { type: 'uuid', notNull: true },
    });

    pgm.createTable('Answers', {
        OptionId: { type: 'uuid', notNull: true }
    });
};

exports.down = pgm => { };
