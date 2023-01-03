use dotenv;

use actix_web::{App, HttpServer, web};
use actix_web::middleware::Logger;
use actix_session::{ storage::RedisActorSessionStore, Session, SessionMiddleware };

mod database;
mod routes;



#[actix_web::main]
async fn main() -> std::io::Result<()>{
    dotenv::dotenv().ok();
    let database_url = database::database::DATABASECONFIG.database_url();
    let pool = sqlx::postgres::PgPoolOptions::new()
    .max_connections(20)
    .connect(&database_url)
    .await
    .expect("database connect error");
    
    std::env::set_var("RUST_LOG", "actix_web=debug,actix_redis=info");
    env_logger::init();
    println!("Started http server: 127.0.0.1:3333");

    let private_key = actix_web::cookie::Key::generate();
    HttpServer::new(move || {
        App::new()
        .wrap(
            SessionMiddleware::builder(
                RedisActorSessionStore::new(format!("127.0.0.1:{}", std::env::var("REDIS_PORT").unwrap())),
                private_key.clone()
            ).build()
        )
        .wrap(Logger::default())
        .app_data(web::Data::new(pool.clone()))
        .configure(routes::reports_config)
        .configure(routes::auth_config)
        .service(routes::index::index)
    })
    .bind("127.0.0.1:3333")?
    .run()
    .await
}
