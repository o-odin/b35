# TypeORM
## Create migration
```bash
npm run typeorm migration:generate ./src/database/migrations -- -d ./src/database/datasource.ts
```
## Run migrations
```bash
npm run typeorm migration:run -- -d ./src/database/datasource.ts
```
