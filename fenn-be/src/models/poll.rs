use chrono::NaiveDateTime;
use diesel::Queryable;

#[derive(Queryable)]
pub struct Poll {
    id: i32,
    title: String,
    created_at: NaiveDateTime
}
