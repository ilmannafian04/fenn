use actix_web::web;

use crate::controller as c;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/api").route("/ping", web::get().to(c::ping)));
}
