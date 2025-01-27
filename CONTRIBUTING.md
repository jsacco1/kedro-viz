# Introduction

Thank you for considering contributing to Kedro-Viz! We welcome contributions in the form of pull requests, issues or code reviews. You can add to code, or simply send us spelling and grammar fixes or extra tests. Contribute anything that you think improves the community for us all!

The following sections describe our vision and the contribution process.

## Code of conduct

The Kedro team pledges to foster and maintain a welcoming and friendly community in all of our spaces. All members of our community are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md) and we will do our best to enforce those principles and build a happy environment where everyone is treated with respect and dignity.

# Get started

We use [GitHub Issues](https://github.com/quantumblacklabs/kedro-viz/issues) to keep track of known bugs. We keep a close eye on them and try to make it clear when we have an internal fix in progress. Before reporting a new issue, please do your best to ensure your problem hasn't already been reported. If so, it's often better to just leave a comment on an existing issue, rather than create a new one. Old issues also can often include helpful tips and solutions to common problems.

If you are looking for help with your code, please consider posting a question on [Stack Overflow](https://stackoverflow.com/questions/tagged/kedro-viz) or our [Discord channel](https://discord.gg/4qeKKspFf8). 

If you have already checked the [existing issues](https://github.com/quantumblacklabs/kedro-viz/issues) on GitHub and are still convinced that you have found odd or erroneous behaviour then please file a [new issue](https://github.com/quantumblacklabs/kedro-viz/issues/new/choose). We have a template that helps you provide the necessary information we'll need in order to address your query.

## Feature requests

### Suggest a new feature

If you have new ideas for Kedro-Viz functionality then please open a [GitHub issue](https://github.com/quantumblacklabs/kedro-viz/issues) with the label `Type: Enhancement`. Please describe in your own words the feature you would like to see, why you need it, and how it should work.

### Contribute a new feature

If you're unsure where to begin contributing to Kedro-Viz, please start by looking through the `good first issues` and `Request: Help Wanted` on [GitHub](https://github.com/quantumblacklabs/kedro-viz/issues).

Typically, small contributions to Kedro-Viz are more preferable due to an easier review process, but we accept any new features if they prove to be essential for the functioning of the plugin or if we believe that they are used by most projects.

## Your first contribution

Working on your first pull request? You can learn how from these resources:

- [First timers only](https://www.firsttimersonly.com/)
- [How to contribute to an open source project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Contribution process

-  Fork the project
-  Develop your contribution in a new branch and open a PR against the `main` branch
-  Make sure the CI builds are green (have a look at the section [Running checks locally](#running-checks-locally) below)
-  Update the PR according to the reviewer's comments

# Contribution guidelines

## General guidelines

> **Note**: We only accept contributions under the [Apache 2.0](https://opensource.org/licenses/Apache-2.0) license and you should have permission to share the submitted code.

- Aim for cross-platform compatibility on Windows, macOS and Linux, and support recent versions of major browsers
- We use [SemVer](https://semver.org/) for versioning
- Our code is designed to be compatible with Python 3.6 onwards
- We use [Anaconda](https://www.anaconda.com/distribution/) as a preferred virtual environment
- We use [PEP 8 conventions](https://www.python.org/dev/peps/pep-0008/) for all Python code
- We use [Google docstrings](https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings) for code comments
- We use [PEP 484 type hints](https://www.python.org/dev/peps/pep-0484/) for all user-facing functions / class methods e.g.

```
def count_truthy(elements: List[Any]) -> int:
    return sum(1 for elem in elements if elem)
```

- Keep UI elements fully keyboard accessible, and aim to support screen-readers where possible
- Maintain a high level of animation performance, and minimise page-load time
- Comply with the set of colours defined in the [Kedro-Viz Style Guide](https://github.com/quantumblacklabs/kedro-viz/blob/main/STYLE_GUIDE.md) for all colour variables and usage

## Git branching guidelines

- We practice [Trunk-Based Development](https://trunkbaseddevelopment.com/).
- We bias towards small, complete pieces of work that can be merged into trunk. "Complete" is defined as:
    - A working user-journey, however small
    - A backward-compatible change that paves the way for future features implementations
    - A non-breaking refactoring of the code
    - Note: to be considered complete, the branch must include tests (end to end or unit tests) for the newly introduced feature or fix
- We embrace freedom to make exception when absolutely necessary.
- We use a naming convention that helps us keep track of branches in a logical, consistent way. All branches should have the hyphen-separated convention of: `<type-of-change>/<short-description-of-change>` e.g. `feature/awesome-new-feature`.

| Types of changes | Description |
| ---------------- | ----------- |
| `docs`    | Changes to the documentation of the plugin |
| `feature` | Non-breaking change which adds functionality |
| `fix`     | Non-breaking change which fixes an issue |
| `tests`   | Changes to project unit (`tests/`) and / or integration (`features/`) tests |

Alternatively, if you know the JIRA ticket number of the issue that you are fixing, you can prefix your branch name with it, e.g. `KED-<JIRA-ticket-number>/short-description-of-the-issue`.

## PR authoring guidelines

- PRs for releasable changes must always be made against `main`. As per Trunk-based Development convention, `main` branch must always be releasable.
- PRs must update the release note for the upcoming release with details about the change.
- Request review on a PR only as the PR is fully ready for review, i.e. no debugging statement, no stylistic non-compliance.
- Publish a draft PR if you need informal, fast feedback on a work in progress.
- A demo build of frontend changes is automatically created at `http://kedro-viz-fe.s3-website.eu-west-2.amazonaws.com/<your-branch-name>` for every new branch.
- Make sure you tick items in the PR checklist as appropriate.

## PR review guidelines

- Focus on correctness, as opposed to nit-picking
- Strive for consistency with existing codebase
- Disagree and commit fast before discussion derails to bike shedding
- Mark optional review suggestions with `Optional` or `Nit`. These suggestions should still be respected, discussed and resolved, but the PR author can choose to disagree
- Assume review suggestions and questions are made from a helpful, knowledge-sharing, collaborative frame by default
- Normalise pointing out improvements unrelated to the current PR in review, then file a JIRA ticket to resolve it in another PR

## Development guidelines

### JavaScript development

_*Note*: We use `node==14` in our development environment._

First clone this repo, then download and install dependencies:

```bash
npm install
```

Now you're ready to begin development. Start the development server:

```bash
npm start
```

This will serve the app at [localhost:4141](http://localhost:4141/), and watch files in `/src` for changes. It will also update the `/lib` directory, which contains a Babel-compiled copy of the source. This directory is exported to `npm`, and is used when importing as a React component into another application. It is updated automatically when you save in case you need to test/debug it locally (e.g. with `npm link`). You can also update it manually, by running

```bash
npm run lib
```

### Launch a development server with a real Kedro project

> **Note**: Kedro-Viz>=3.8.0 will not work with projects created with Kedro<=0.16.6. Please consider migrating your project to Kedro>=0.17.0 before you develop against the latest version of Kedro-Viz. 

Before launching a development server with a real Kedro project, you'd need to have [Python](https://www.python.org/)(>=3.6, <3.9) and Kedro installed. We strongly recommend setting up [conda](https://docs.conda.io/en/latest/) to manage your Python versions and virtual environments. You can visit Kedro's guide for installing [conda](https://kedro.readthedocs.io/en/latest/02_get_started/01_prerequisites.html#conda) and [how to get started with Kedro](https://kedro.readthedocs.io/en/latest/02_get_started/02_install.html) for more information.

After setting up Python and Kedro, you will need to have a Kedro project setup. If you don't have any existing Kedro project, you can create a new one with the `spaceflights` example:

> **Note**: You can use any other [starters](https://github.com/quantumblacklabs/kedro-starters), except `mini-kedro`, for the purpose of this development server, not just `spaceflights`.

```bash
cd $HOME # or wherever you prefer to keep your test project
kedro new --starter=spaceflights
```

You can use default values when creating the project, which will create a new project called `new-kedro-project`. Changing your directory into that project and install the project's dependencies:

```bash
cd new-kedro-project
kedro install
```

After installing the project's dependencies, make sure you can run it with:

```bash
kedro run
```

Now you are ready to launch a new viz's development server with a real Kedro project. First, changing your directory back to kedro-viz:

```bash
cd /path/to/kedro-viz
```

Install kedro-viz's development dependencies with:

```bash
pip3 install -r package/test_requirements.txt
```

Build the application with:

```bash
make build
```

As far as the development server for the backend is concerned, you only nede to run `make build` once when you first setup the project.

Then launch the server with:

```bash
PYTHONPATH=$(pwd)/package python3 package/kedro_viz/server.py <path-to-your-test-project>/new-kedro-project
```
This command will launch a Kedro-Viz server at [localhost:4142](http://localhost:4142) and serve data from a real Kedro pipeline located at the project path supplied to the command. From then on, launching the app locally at [localhost:4141](http://localhost:4141) will pull data from the Kedro-Viz server that is running on port 4142. 

> **Note**: Once the development server is launched at port 4142, the local app will always pull data from that server. To prevent this, you can comment out the proxy setting in `package.json` and restart the dev server at port 4141.

### Data sources

Kedro-Viz uses a unique identifier to determine the data source from one of several available sources. You can configure this by appending a query string to the URL, e.g. `http://localhost:4141/?data=random`. Alternatively, you can set it with an environment variable when starting up the dev server:

```bash
DATA=random npm start
```

These are the supported dataset identifiers:

| Identifier | Data source |
|------------|-------------|
| `json` (default) | `/public/api/main` |
| `random` | Randomly-generated data |
| `demo` | `/src/utils/data/demo.mock.js` |
| `spaceflights` | `/src/utils/data/spaceflights.mock.json` |

By default in production, the app asynchronously loads JSON from the `/api/main` endpoint. You can replicate this in development by placing a JSON dataset in `/public/api/main`, using `main` as the name of the file, [without an extension](https://www.computerhope.com/issues/ch002089.htm). Note that operating systems often add hidden file extensions, so you might need to use a CLI to confirm the filename.

Alternatively, you can synchronously load one of the mock datasets in `/src/utils/data`. The 'spaceflights' dataset is mainly used as mock data for unit testing, while the 'demo' dataset is used on the [public demo](https://quantumblacklabs.github.io/kedro-viz/).

Finally, you can use pseudo-random data, which is procedurally-generated on page load, and is often useful for local development. Random data can be seeded with a hash string, which will allow you to replicate a generated layout. You can supply a seed with a `seed` query string in the URL, e.g. `http://localhost:4141/?data=random&seed=oM4xauN4Whyse`. If you do not supply a seed, the app will generate a new pseudo-random one every time, and will output it to the browser console in case you wish to reuse it.

## Testing guidelines

- Scope out major journeys from acceptance criteria from the ticket for manual end-to-end testing
- Write any other necessary tests (e.g. unit tests, snapshot tests, etc.) needed to give us enough confidence on the implementation

### JavaScript application tests

Kedro-Viz uses [Jest](https://jestjs.io/) for running JavaScript tests, with [Enzyme](https://enzymejs.github.io/enzyme/) and [Testing-Library](https://testing-library.com/) to mount React components and mock the DOM. You can run tests as follows:

```bash
npm test
```

You can also [inspect and debug tests](https://facebook.github.io/create-react-app/docs/debugging-tests):

```bash
npm run test:debug
```

And [check test coverage](https://facebook.github.io/create-react-app/docs/running-tests#coverage-reporting):

```bash
npm run test:coverage
```

See the [Create-React-App docs](https://github.com/facebook/create-react-app) for further information on JS testing.

### Testing package imports

You can simulate how the published package will behave when imported into another JavaScript application by running

```bash
npm run lib-test
```

This script uses `npm pack` to package Kedro-Viz as a tarball, then copies it to a boilerplate React app in `/tools/test-lib/react-app` and installs it. Next, the script runs a simple server at `http://localhost:1337`, which will open in the browser so that you can check that everything is working as it should.

You can also run automated tests on this demo app by copying and installing the tarball package, navigating to the test directory and running Jest:

```bash
npm run lib-test:setup
cd tools/test-lib/react-app
npm test
```

### Python web server tests

Before running Python tests, install test requirements:

```bash
pip install -r test_requirements.txt
```

#### Unit tests, 100% coverage (`pytest`, `pytest-cov`)

```bash
make pytest
```

#### End-to-end tests (`behave`)

```bash
make e2e-tests
```
#### Linting tests (`isort`, `pylint` and `flake8`)

```bash
make lint
```

# Release guidelines

- Practice frequent, staggered releases.

## Release process

- Update [RELEASE.md](./RELEASE.md) with the latest release note.
- Bump the release version number by running:

```bash
make version VERSION=<version-to-release>
```

> *Notes*: Kedro-Viz uses [Semantic Versioning](https://semver.org/) as the versioning scheme. 

- Commit, raise a PR and get it merged into `main`.

- Once the release commit is in `main`, trigger the release by:
    * Create a Release through [Github UI](https://github.com/quantumblacklabs/kedro-viz/releases/new).
    * Input the version as the tag version with Target set to `main`
    * Paste the release note in the text box.
    * Publish the release.

- Once the release tag is published on Github, a CircleCI job will be triggered to push it to npm and PyPI accordingly.
