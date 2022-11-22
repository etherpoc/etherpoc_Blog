use actix_web::{ App, HttpServer, web };
use dotenv;

mod database;
mod routes;



#[actix_rt::main]
async fn main() -> std::io::Result<()>{
    dotenv::dotenv().ok();
    let database_url = database::database::DATABASECONFIG.database_url();
    let pool = sqlx::postgres::PgPoolOptions::new()
    .max_connections(20)
    .connect(&database_url)
    .await
    .expect("database connect error");

    HttpServer::new(move || {
        App::new()
        .app_data(web::Data::new(pool.clone()))
        .configure(routes::reports_config)
        .service(routes::index::index)
    })
    .bind("127.0.0.1:3333")?
    .run()
    .await

}
