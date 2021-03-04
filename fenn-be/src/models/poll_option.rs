use diesel::{insert_into, BelongingToDsl, PgConnection, QueryResult, RunQueryDsl};
use serde::Serialize;

use crate::models::poll::Poll;
use crate::schema::poll_options;

#[derive(Associations, Debug, Identifiable, Queryable, Serialize)]
#[belongs_to(Poll)]
pub struct PollOption {
    pub id: i32,
    pub poll_id: i32,
    pub name: String,
}

#[derive(Insertable)]
#[table_name = "poll_options"]
pub struct NewPollOption {
    pub poll_id: i32,
    pub name: String,
}

impl PollOption {
    pub fn insert_many(
        conn: &PgConnection,
        options: &[NewPollOption],
    ) -> QueryResult<Vec<PollOption>> {
        insert_into(poll_options::table)
            .values(options)
            .get_results(conn)
    }

    pub fn get_many_by_poll(conn: &PgConnection, poll: &Poll) -> QueryResult<Vec<PollOption>> {
        PollOption::belonging_to(poll).get_results::<PollOption>(conn)
    }
}
