use diesel::{PgConnection, QueryResult, RunQueryDsl, insert_into};

use crate::models::poll::Poll;
use crate::schema::poll_options;

#[derive(Associations, Debug, Queryable)]
#[belongs_to(Poll)]
pub struct PollOption {
    id: i32,
    poll_id: i32,
    name: String,
}

#[derive(Insertable)]
#[table_name = "poll_options"]
pub struct NewPollOption {
    pub poll_id: i32,
    pub name: String,
}

impl PollOption {
    pub fn insert_many(conn: &PgConnection, options: &Vec<NewPollOption>) -> QueryResult<Vec<PollOption>> {
        insert_into(poll_options::table).values(options).get_results(conn)
    } 
}
