rustセットアップ
```cargo build ```

サーバー開始
```cargo run ```

データベースセットアップ
```export DATABASE_URL="postgres://test:test@localhost:5432/test" ```
```sqlx db create ```
```sqlx migrate run ```

データベース初期化
```sqlx db drop ```
```sqlx db create ```
```sqlx migrate run ```

https://github.com/launchbadge/sqlx/tree/main/sqlx-cli#usage