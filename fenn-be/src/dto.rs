use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct NewPollParam {
    pub title: String,
    pub options: Vec<String>,
}

#[derive(Serialize)]
pub struct IDResponse {
    pub id: i32,
}
