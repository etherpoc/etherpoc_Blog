use actix_web::{ post, web, Responder, Result };
use actix_session::Session;
use sqlx::PgPool;
use serde::Deserialize;
use crate::database::models::blog_users::BlogUser;

#[derive(Deserialize)]
pub struct RegisterParam {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[post("/register")]
async fn register(
    pool: web::Data<PgPool>,
    param: web::Json<RegisterParam>,
    session: Session
) -> Result<impl Responder>{
    let result = BlogUser::insert(param.name.clone(), param.email.clone(), param.password.clone(), pool.get_ref().clone()).await;
    match result{
        Ok(result) => {
            session.insert("user_id", result.id)?;
            session.insert("user_name", result.user_name)?;
            session.insert("user_email", result.user_email)?;
            session.renew();
            Ok("OK")
        },
        Err(err) => {
            println!("{}", err);
            Ok("ERROR")
        }
    }
}

#[derive(Deserialize)]
pub struct LoginParam {
    pub email: String,
    pub password: String,
}
#[post("/login")]
async fn login(
    pool: web::Data<PgPool>,
    param: web::Json<LoginParam>,
    session: Session
) -> Result<impl Responder>{
    let result = BlogUser::get_byemail( param.email.clone(), pool.get_ref().clone()).await;
    match result{
        Ok(result) => {
            if param.password == result.user_email{
                session.insert("user_id", result.id)?;
                session.insert("user_name", result.user_name)?;
                session.insert("user_email", result.user_email)?;
                session.renew();
                Ok("Complete Login")
            }
            else {
                Ok("User Not Found")
            }
            
        },
        Err(err) => {
            println!("{}", err);
            Ok("ERROR")
        }
    }
}

#[post("/logout")]
async fn logout(
    session: Session
) -> Result<impl Responder>{
    let id: Option<String> = session.get("user_id")?;
    if let Some(x) = id {
        session.purge();
        Ok(format!("Logged out: {x}"))
    } else {
        Ok("Could not log out anonymous user".into())
    }
}