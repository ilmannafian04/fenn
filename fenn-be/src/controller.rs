use actix_web::{web, HttpResponse, Responder};
use diesel::{
    r2d2::{ConnectionManager, Pool},
    PgConnection,
};
use log::debug;

use crate::models::poll::NewPoll;
use crate::{
    dto::{IDResponse, NewPollParam},
    models::{
        poll::Poll,
        poll_option::{NewPollOption, PollOption},
    },
};

type DbPool = Pool<ConnectionManager<PgConnection>>;

pub async fn ping() -> impl Responder {
    HttpResponse::Ok().body("pong")
}

pub async fn new_poll(param: web::Json<NewPollParam>, pool: web::Data<DbPool>) -> impl Responder {
    debug!("{:?}", param);
    let new_poll = NewPoll {
        title: param.title.clone(),
    };
    let poll = match pool.get() {
        Ok(conn) => {
            let poll_query = web::block(move || Poll::insert_poll(&conn, &new_poll)).await;
            match poll_query {
                Ok(poll) => poll,
                Err(e) => return HttpResponse::InternalServerError().body(format!("{}", e)),
            }
        }
        Err(e) => return HttpResponse::InternalServerError().body(format!("{}", e)),
    };
    match pool.get() {
        Ok(conn) => {
            let mut new_poll_options: Vec<NewPollOption> = Vec::new();
            for option in &param.options {
                new_poll_options.push(NewPollOption {
                    poll_id: poll.id,
                    name: option.clone(),
                })
            }
            let option_query =
                web::block(move || PollOption::insert_many(&conn, &new_poll_options)).await;
            match option_query {
                Ok(_) => HttpResponse::Ok().json(IDResponse { id: poll.id }),
                Err(e) => HttpResponse::InternalServerError().body(format!("{}", e)),
            }
        }
        Err(e) => HttpResponse::InternalServerError().body(format!("{}", e)),
    }
}
