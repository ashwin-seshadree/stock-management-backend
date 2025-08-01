
#### run to initiate a migration file
`npx sequelize-cli migration:generate --name <file/tablename>`

#### run to run the migration
`npx sequelize-cli db:migrate --env development`

#### run to undo the migration
`npx sequelize-cli db:migrate:undo --env development`