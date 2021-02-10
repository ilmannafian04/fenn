CREATE TABLE polls (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'utc')
);

CREATE TABLE poll_options (
    id SERIAL NOT NULL PRIMARY KEY,
    poll_id SERIAL NOT NULL, 
    name VARCHAR NOT NULL,

    constraint poll_option_poll_fk
		foreign key (poll_id) references polls (id)
			on update cascade on delete cascade
);
