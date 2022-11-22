use actix_web::{ get, post, patch, delete, web, Responder, Result };
use sqlx::PgPool;
use serde::Deserialize;
use crate::database::models::blog_users::BlogUser;
use crate::database::models::report::Report;


#[get("/reports")] //すべての記事の情報を返す
pub async fn get_reports(
    pool: web::Data<PgPool>
) -> Result<impl Responder>{
    let reports = Report::get_all(pool.get_ref().clone()).await.unwrap();
    Ok(web::Json(reports))
}

#[get("{id}")] //特定の記事の詳細を返す
pub async fn get_report(
    pool: web::Data<PgPool>,
    report_id: web::Path<i32>
) -> Result<impl Responder>{
    let reports = Report::get( *report_id, pool.get_ref().clone()).await.unwrap();
    Ok(web::Json(reports))
}

#[derive(Deserialize)]
pub struct CreateReport {
    pub author: i32,
    pub tags: String,
    pub content: String,
}

#[post("/")] //記事を作成
pub async fn create_report(
    pool: web::Data<PgPool>,
    data: web::Json<CreateReport>
) -> Result<impl Responder>{
    let insert_data = Report {
        id: 0,
        author: data.author,
        tags: data.tags.clone(),
        content: data.content.clone(),
        created_at: chrono::Utc::now(),
        updated_at: chrono::Utc::now()
    };

    let reports = Report::insert( insert_data, pool.get_ref().clone()).await.unwrap();
    Ok(web::Json(reports))
}

#[derive(Deserialize)]
pub struct UpdateReport {
    pub author: i32,
    pub tags: String,
    pub content: String,
}

#[patch("{id}/update")] //記事を更新
pub async fn update_report(
    pool: web::Data<PgPool>,
    data: web::Json<UpdateReport>,
    report_id: web::Path<i32>
) -> Result<impl Responder>{
    let insert_data = Report {
        id: *report_id,
        author: data.author,
        tags: data.tags.clone(),
        content: data.content.clone(),
        created_at: chrono::Utc::now(),
        updated_at: chrono::Utc::now()
    };

    let reports = Report::update( insert_data, pool.get_ref().clone()).await.unwrap();
    Ok(web::Json(reports))
}

#[delete("{id}/delete")] //記事を削除（非公開にする）
pub async fn delete_report(
    pool: web::Data<PgPool>,
    report_id: web::Path<i32>
) -> Result<impl Responder>{
    let reports = Report::get( *report_id, pool.get_ref().clone()).await.unwrap();
    Ok(web::Json(reports))
}