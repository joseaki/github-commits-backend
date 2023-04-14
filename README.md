## Installation

```bash
$ npm install
```

## Create a github fine-grained personal access token

To create a token follow this guide: [Guide to create fine-grained personal access token ](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token)

## Create a environment file

On the root of the project create a `.env` file and insert the following variables:

```bash
GITHUB_TOKEN="<YOUR-FINE-GRAINED-PERSONAL-ACCESS-TOKEN-GOES-HERE>"
DEFAULT_GITHUB_REPOSITORY="https://github.com/joseaki/github-commits-backend"
```

## Running the app

```bash
$ npm run start:dev
```

- Backend is served at http://localhost:8000/api

- Swagger documentation is available at http://localhost:8000/api/swagger

## Test

```bash
$ npm run test
```
