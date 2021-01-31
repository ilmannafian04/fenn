use std::env;

use actix_web::{middleware::Logger, App, HttpServer};
use dotenv::dotenv;
use log::info;

mod controller;
mod route;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();
    info!("starting server");

    HttpServer::new(|| {
        App::new()
            .configure(route::configure)
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
