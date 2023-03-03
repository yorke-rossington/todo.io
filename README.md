# TODO.IO

# Prerequisites

- make
- docker
- node
- npm

# Getting started

```bash
# This will install all dependencies, deploys postgres into a docker container and starts the UI and API
make setup
```

The UI will be available at http://localhost:5173 and the API at http://localhost:3000.


# Running the tests

> Note: The tests run against the docker container that is running postgres, along with the UI and API so you will need to have run `make setup` first.

```bash
# This will run the e2e tests
make e2e-test
```

```bash
# This will run the unit tests
make unit-test
```
