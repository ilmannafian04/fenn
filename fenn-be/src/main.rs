use std::env;

use actix_web::{middleware::Logger, App, HttpServer};
use diesel::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use dotenv::dotenv;
use log::info;

mod controller;
mod dto;
mod route;
mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();
    info!("starting server");

    info!("connecting to database");
    let db_manager = ConnectionManager::<PgConnection>::new(env::var("DATABASE_URL").expect("DATABASE_URL not set"));
    let db_pool = Pool::builder().build(db_manager).expect("failed to create database pool");
    info!("server connected to database");

    HttpServer::new(move || {
        App::new()
            .configure(route::configure)
            .data(db_pool.clone())
            .wrap(Logger::default())
    })
    .bind(format!(
        "{}:{}",
        env::var("HOST").expect("HOST not set"),
        env::var("PORT").expect("PORT not set")
    ))?
    .run()
    .await
}
