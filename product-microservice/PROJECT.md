## Database Migrations

To manage database migrations, follow these steps:

### 1. Install Migration Tool

If using TypeORM:
```bash
npm install typeorm ts-node
```

### 2. Create a Migration

```bash
npm run typeorm migration:generate -- -n MigrationName
```

### 3. Run Migrations

```bash
npm run typeorm migration:run
```

### 4. Revert a Migration

```bash
npm run typeorm migration:revert
```
