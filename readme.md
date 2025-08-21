#### run to initiate a migration file

`npx sequelize-cli migration:generate --name <file/tablename>`

#### run to run the migration

`npx sequelize-cli db:migrate --env development`

#### run to undo the migration

`npx sequelize-cli db:migrate:undo --env development`

#### seed users to application

`npx sequelize-cli db:seed:all`

#### undo seed to application
`npx sequelize-cli db:seed:undo:all`

This repository is governed by a custom license for internal contributions only.

![License: All Rights Reserved](https://img.shields.io/badge/License-All_Rights_Reserved-orange.svg)

## License

Copyright (c) 2025 Ashwin Seshadreeswaran

All Rights Reserved.

This repository and all its contents, including but not limited to code, documentation, images, and other resources, are the property of Ashwin Seshadreeswaran.

You are permitted to use, modify, and contribute to this repository solely for the purpose of **improving or developing** this repository. You may not use, copy, modify, distribute, or reproduce any part of this repository for any other purpose, including but not limited to personal, commercial, or external projects, without prior written permission.

Any unauthorized use, distribution, or modification outside of development for this repository will be subject to legal action.