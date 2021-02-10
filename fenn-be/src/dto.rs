use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct NewPollParam {
    title: String,
    options: Vec<String>,
}
