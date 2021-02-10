use crate::models::poll::Poll;
use crate::schema::poll_options;

#[derive(Associations, Queryable)]
#[belongs_to(Poll)]
pub struct PollOption {
    id: i32,
    poll_id: i32,
    name: String,
}
