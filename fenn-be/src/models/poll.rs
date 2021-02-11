use chrono::NaiveDateTime;
use diesel::{insert_into, PgConnection, QueryResult, Queryable, RunQueryDsl};

use crate::schema::polls;

#[derive(Debug, Queryable)]
pub struct Poll {
    pub id: i32,
    title: String,
    created_at: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "polls"]
pub struct NewPoll {
    pub title: String,
}

impl Poll {
    pub fn insert_poll(conn: &PgConnection, new_poll: &NewPoll) -> QueryResult<Poll> {
        insert_into(polls::table).values(new_poll).get_result(conn)
    }
}
