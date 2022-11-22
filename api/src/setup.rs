use dotenv;

mod database;

#[actix_rt::main]
async fn main(){
    dotenv::dotenv().ok();
    let database_url = database::database::DATABASECONFIG.database_url();
    let pool = sqlx::postgres::PgPoolOptions::new()
    .max_connections(20)
    .connect(&database_url)
    .await
    .expect("database connect error");
    
    let setup_sql = include_str!("../sql/setup.sql");
    
    sqlx::Executor::execute(&pool, setup_sql);

}