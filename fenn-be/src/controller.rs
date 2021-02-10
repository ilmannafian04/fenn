use actix_web::{HttpResponse, Responder, web};
use log::debug;

use crate::dto::NewPollParam;

pub async fn ping() -> impl Responder {
    HttpResponse::Ok().body("pong")
}

pub async fn new_poll(param: web::Json<NewPollParam>) -> impl Responder {
    debug!("{:?}", param);
    HttpResponse::Ok().body("pong")
}
