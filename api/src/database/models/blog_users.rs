use chrono::Utc;

#[derive(Debug, Clone, sqlx::FromRow)]
pub struct BlogUser {
    pub id: i32,
    pub user_name: String,
    pub user_email: String,
    pub password: String,
    pub created_at: chrono::DateTime<Utc>,
    pub updated_at: chrono::DateTime<Utc>,
}

impl BlogUser {
    pub async fn get(id: u16, pool: sqlx::PgPool) -> Result<BlogUser, sqlx::Error>
    {
        let result = sqlx::query_as::<_, BlogUser>(
            format!("SELECT * from blog_users WHERE id={} LIMIT 1", id).as_str()
        )
        .fetch_one(&pool)
        .await?;
        
        Ok(result)
    }

    pub async fn get_byname(name: String, pool: sqlx::PgPool) -> Result<BlogUser, sqlx::Error>
    {
        let result = sqlx::query_as::<_, BlogUser>(
            format!("SELECT * from blog_users WHERE user_name={} LIMIT 1", name).as_str()
        )
        .fetch_one(&pool)
        .await?;
        
        Ok(result)
    }

    pub async fn get_all(pool: sqlx::PgPool) -> Result<Vec<BlogUser>, sqlx::Error>
    {
        let result = sqlx::query_as::<_, BlogUser>(
            "SELECT * from blog_users"
        )
        .fetch_all(&pool)
        .await?;

        Ok(result)
    }

    pub async fn insert(user: BlogUser, pool: sqlx::PgPool) -> Result<BlogUser, sqlx::Error>{
        let result = sqlx::query_as::<_, BlogUser>(
            format!(
                "INSERT INTO blog_users (user_name, user_email) VALUES ({},{})", 
                user.user_name, user.user_email).as_str()
        )
        .fetch_one(&pool)
        .await?;

        Ok(result)
    }
    pub async fn update(user: BlogUser, pool: sqlx::PgPool) -> Result<BlogUser, sqlx::Error>
    {
        let result = sqlx::query_as::<_, BlogUser>(
            format!(
                "UPDATE blog_users SET (user_name, user_email, updated_at) = ({}, {}, {}) WHERE id={}", 
                user.user_name, user.user_email, user.updated_at, user.id).as_str()
        )
        .fetch_one(&pool)
        .await?;

        Ok(result)
    }
}