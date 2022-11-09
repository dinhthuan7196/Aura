#ASME AURA

## Frontend Documents

### 1.Install packages

```shell
yarn
or
npm i
```

### 2. Source structure

```shell
src
├── components
├── dto
├── hooks
├── pages
│   ├── Admin (layout modules)
│   ├── User (layout modules)
│   ├── Dashboard
│   ├── Login
│   └── Page404
├── theme
├── utils
│   ├── api.ts
│   ├── constants.ts
│   ├── helpers.ts
│   ├── regex.ts
│   └── types.js
├── App.tsx
├── index.tsx
├── routes.tsx
└── README.md
```

#### 2.1 dto

- Define data type for in/output.

#### 2.3 hooks

- This is custom hook + context, Refer lib: `https://spyna.github.io/react-context-hook/docs/#usestorevalue`

- Like middleware, any data logic and call api in here.

#### 2.4 utils

- `api.tsx` : using `Axios`, create default and return error type.
- `constants.tsx` : default value, urls, ...
- `helpers.tsx` : default methods, functions, ...
- `regex.tsx` : checking by regex
- `types.tsx` : default types

#### 2.5 routes

- Default object route

```json
[
  {
    "path": "example",
    "element": "<component />",
    "children": [
      {
        "path": "child-1",
        "element": "<componentChild_1 />"
      },
      {
        "path": "child-2",
        "element": "<componentChild_2 />"
      },
      "..."
      {
        "path": "child-n",
        "element": "<componentChild_n />"
      },
    ]
  },
  "..."
]
```

- Add menu item in `src/components/Sidebar/dashboardItems.tsx`
