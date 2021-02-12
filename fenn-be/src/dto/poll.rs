use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

use crate::models::{poll::Poll, poll_option::PollOption};

#[derive(Debug, Deserialize)]
pub struct NewPollParam {
    pub title: String,
    pub options: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct OptionResponse {
    pub id: i32,
    pub name: String,
}

impl From<&PollOption> for OptionResponse {
    fn from(option: &PollOption) -> Self {
        Self {
            id: option.id,
            name: option.name.clone(),
        }
    }
}

#[derive(Debug, Serialize)]
pub struct PollResponse {
    pub id: i32,
    pub title: String,
    pub options: Vec<OptionResponse>,
    pub created_at: NaiveDateTime,
}

impl PollResponse {
    pub fn new(poll: Poll, options: Vec<PollOption>) -> Self {
        PollResponse {
            id: poll.id,
            title: poll.title,
            options: options.iter().map(OptionResponse::from).collect(),
            created_at: poll.created_at,
        }
    }
}
