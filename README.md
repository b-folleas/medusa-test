# Medusa

Created medusa back and front with:

```sh
npx create-medusa-app@latest --with-nextjs-starter
```

Run the postgres container for the medusa database:

```sh
docker-compose up --build
```

Run the medusa backend and frontend servers:

```sh
npm run dev
```

## Services

Medusa admin : http://localhost:9000/app/login
Nextjs : http://localhost:8000/

## Added files for comparison feature

- my-medusa-store-storefront\src\app\[countryCode]\(main)\products\compare\page.tsx
- my-medusa-store-storefront\src\modules\products\templates\product-compare\index.tsx
- my-medusa-store-storefront\src\modules\products\components\product-selector\index.tsx
