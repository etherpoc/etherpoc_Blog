use chrono::Utc;
use serde::Serialize;

#[derive(Serialize, Debug, Clone, sqlx::FromRow)]
pub struct Report {
    pub id: i32,
    pub author: i32,
    pub tags: String,
    pub content: String,
    pub created_at: chrono::DateTime<Utc>,
    pub updated_at: chrono::DateTime<Utc>,
}

impl Report {
    pub async fn get(id: i32, pool: sqlx::PgPool) -> Result<Report, sqlx::Error>
    {
        let result = sqlx::query_as::<_, Report>(
            format!("SELECT * from reports WHERE id={} LIMIT 1", id).as_str()
        )
        .fetch_one(&pool)
        .await?;
        
        Ok(result)
    }

    pub async fn get_all(pool: sqlx::PgPool) -> Result<Vec<Report>, sqlx::Error>{
        let result = sqlx::query_as::<_, Report>(
            "SELECT * from reports"
        )
        .fetch_all(&pool)
        .await?;

        Ok(result)
    }

    pub async fn insert(report: Report, pool: sqlx::PgPool) -> Result<Report, sqlx::Error>
    {
        let result = sqlx::query_as::<_, Report>(
            format!(
                "INSERT INTO reports (author, tags, content) VALUES ({},{},{})", 
                report.author, report.tags, report.content).as_str()
        )
        .fetch_one(&pool)
        .await?;

        Ok(result)
    }
    pub async fn update(report: Report, pool: sqlx::PgPool) -> Result<Report, sqlx::Error>{
        let result = sqlx::query_as::<_, Report>(
            format!(
                "UPDATE reports SET (author, tags, content, updated_at) = ({}, {}, {}, {}) WHERE id={}", 
                report.author, report.tags, report.content, report.updated_at, report.id).as_str()
        )
        .fetch_one(&pool)
        .await?;

        Ok(result)
    }

    pub async fn delete(id: i32, pool: sqlx::PgPool) -> Result<Vec<Report>, sqlx::Error>{
        let result = sqlx::query_as::<_, Report>(
            format!(
                "DELETE from reports WHERE id = {}", id).as_str()
        )
        .fetch_all(&pool)
        .await?;

        Ok(result)
    }
}