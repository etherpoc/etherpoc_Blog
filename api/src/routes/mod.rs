pub mod index;
pub mod report;


use actix_web::web;
pub fn routes_config(cfg: &mut web::ServiceConfig){
    cfg.configure(reports_config);
}

pub fn reports_config(cfg: &mut web::ServiceConfig){
    cfg.service(report::get_reports);

    cfg.service(
        web::scope("report")
        .service(report::get_report)
        .service(report::create_report)
        .service(report::update_report)
        .service(report::delete_report),
    );
}