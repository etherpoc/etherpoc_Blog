use once_cell::sync::Lazy;
use std::env;

pub struct DatabaseConfig {
    postgres_host: String,
    postgres_port: String,
    postgres_user: String,
    postgres_password: String,
    postgres_database: String,
}

impl DatabaseConfig {
    pub fn database_url(&self) -> String {
        format!(
            "postgres://{}:{}@{}:{}/{}",
            self.postgres_user,
            self.postgres_password,
            self.postgres_host,
            self.postgres_port,
            self.postgres_database,
        )
    }
}

pub static DATABASECONFIG: Lazy<DatabaseConfig> = Lazy::new(|| DatabaseConfig {
    postgres_host: env::var("DB_HOST").unwrap(),
    postgres_port: env::var("DB_PORT").unwrap(),
    postgres_user: env::var("POSTGRES_USER").unwrap(),
    postgres_password: env::var("POSTGRES_PASSWORD").unwrap(),
    postgres_database: env::var("POSTGRES_DB").unwrap(),
});

