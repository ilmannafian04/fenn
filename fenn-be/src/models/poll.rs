use chrono::NaiveDateTime;
use diesel::{insert_into, prelude::*, PgConnection, QueryResult, Queryable, RunQueryDsl};
use serde::Serialize;

use crate::schema::polls::{self, dsl::polls as all_polls, dsl::*};

#[derive(Clone, Debug, Identifiable, Queryable, Serialize)]
pub struct Poll {
    pub id: i32,
    pub title: String,
    pub multi_choice: bool,
    pub created_at: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "polls"]
pub struct NewPoll {
    pub title: String,
    pub multi_choice: bool,
}

impl Poll {
    pub fn insert_poll(conn: &PgConnection, new_poll: &NewPoll) -> QueryResult<Poll> {
        insert_into(polls::table).values(new_poll).get_result(conn)
    }

    pub fn get_by_id(conn: &PgConnection, poll_id: i32) -> QueryResult<Poll> {
        all_polls.filter(id.eq(poll_id)).first::<Poll>(conn)
    }
}
