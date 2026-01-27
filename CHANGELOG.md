# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [8.1.0] - 2026-01-27
### Added
- @types/node
- Node 25.x to test matrix

### Updated
- @snyk/protect@1.1302.1
- @types/node@25.0.10
- globals@17.2.0
- ls-engines@0.9.4
- prettier@3.8.1
- xo@1.2.3
- (engines) node@20.20.0
- (Volta) node@20.20.0
- (Volta) npm@11.8.0

### Removed
- commitizen
- cz-conventional-changelog

## [8.0.0] - 2025-08-05
### Added
- xo
- NodeJS 22, 24 test runs
- Commitizen badge

### Updated
- @snyk/protect@1.1298.2
- ls-engines@0.9.3
- prettier@3.6.2

### Removed
- ESLint
- NodeJS 16, 18 support & test runs
- DepShield badge (obsolete)

## [7.1.0] - 2024-03-05
### Added
- `versioning-strategy: increase` in dependabot.yml
- `packageRules`, `rangeStrategy`, `transitiveRemediation` in renovate.json

### Updated
- Refactored a couple of lines to satisfy new eslint rules
- @snyk/protect@1.1282.0
- @types/jsonpointer@4.0.2
- eslint-config-xo@0.44.0
- eslint-plugin-import@2.29.1
- eslint@8.57.0
- ls-engines@0.9.1
- prettier@3.2.5
- tv4@1.3.0
- npm@9.9.3
- actions/setup-node@v4
- github/codeql-action/init@v3
- github/codeql-action/autobuild@v3
- github/codeql-action/analyze@v3

## [7.0.0] - 2023-09-28
### Updated
- BREAKING: NodeJS v16.14.0 is now the minimum supported version
- @snyk/protect@1.1227.0
- eslint@8.50.0
- Volta pin node@16.20.2, npm@9.8.1

### Removed
- NodeJS v14 test runs

## [6.0.0] - 2023-09-22
### Updated
- BREAKING: NodeJS v14.0.0 is now the minimum supported version
- @snyk/protect@1.1226.0
- eslint-config-xo@0.43.1
- eslint-plugin-import@2.28.1
- eslint@8.49.0
- ls-engines@0.9.0
- prettier@3.0.3
- actions/checkout@v4
### Removed
- NodeJS v12, v13 support


## [5.0.2] - 2023-07-07
### Added
- (README) Release support matrix
- Node 12.0.x, 14.0.x, 14.13.x, 14.17.x, 20.x test runs
- Volta pin node@12.0.0, npm@7.24.2
- Renovate baseBranches config

### Updated
- ecmaVersion: 2020 (downgrade)
- @snyk/protect@1.1187.0
- eslint-config-xo@0.39.0 (downgrade)
- eslint@7.32.0 (downgrade)
- ministyle@0.1.4
- miniwrite@0.1.4
- prettier@3.0.0

## Removed
- Node 19.x test run

## [5.0.1] - 2023-03-10
### Added
- jsonpointer
- @types/jsonpointer
### Updated
- eslint@8.35.0
- eslint-config-xo@0.43.1
- eslint-plugin-import@2.27.5
- eslint-plugin-redos@4.4.5
- ls-engines@0.8.1
- prettier@2.8.4

## Removed
- jsonpointer.js

## [5.0.0] - 2022-11-20

### Added
- Renovate & Dependabot for dependency management
- ESLint (with xo config)
- Github action for testing
- NodeJS v19 test run

### Updated
- Source code to adhere to xo code style
- Minimum NodeJS version now v12
- actions/checkout@v3
- actions/setup-node@v3
- github/codeql-action/init@v2
- github/codeql-action/autobuild@v2
- github/codeql-action/analyze@v2

## Removed
- NodeJS v10 support
- xo
- DavidDM (dependency analysis)
- TravisCI testing
- NodeJS v10, v13, v15 test runs

## [4.3.0] - 2020-11-20

### Added
- codeql analysis

### Updated
- prettier@2.2.0
- snyk@1.430.0
- xo@0.35.0

## [4.2.0] - 2020-10-21

### Added
- nodejs v15 support

### Updated
- prettier@2.1.2
- snyk@1.419.0
- xo@0.34.1

## [4.1.0] - 2020-07-07

### Added
- nodejs v14 support
- travis-ci.com for test/build

### Updated
- snyk policy
- prettier@2.0.5
- snyk@1.360.0
- xo@0.32.1

### Removed
- Greenkeeper badge (retired)
- travis-ci.org for test/build

## [4.0.2] - 2020-03-19

### Updated
- snyk@1.299.0
- xo@0.28.0
- Linting fixes to comply with rules in xo v0.28.0


## [4.0.1] - 2020-03-18

### Updated
- Upgrade minimist to remove security vulnerabilty

## [4.0.0] - 2020-03-05

### Added
- Github actions for running tests, via test:ci npm script

### Updated
- snyk@1.298.0
- xo@0.27.2

### Removed
- nodejs <10 support

## [3.0.0] - 2020-01-27

### Added
- .prettierrc.yaml
- nodejs v13 support in .travis.yml
- xo linter

### Updated
- Refactored lib/reporter.js to conform to xo linting rules and use es6 arrow functions
- Abstracted utils into separate lib/utils.js module
- prettier@1.19.1
- snyk@1.283.0

### Removed
- eslint and plugins/config

## [2.0.3] - 2019-10-13

### Updated

- snyk@1.234.2
- eslint@6.5.1
- eslint-config-prettier@6.4.0
- eslint-plugin-jsdoc@15.11.0
- eslint-plugin-prettier@3.1.1

## [2.0.2] - 2019-09-07
### Added
- Greenkeeper.io badge

### Updated
- snyk@1.226.0
- eslint@6.3.0
- eslint-config-prettier@6.2.0
- eslint-plugin-jsdoc@15.9.1
- eslint-plugin-node@10.0.0

### Removed
- Bitdeli.com badge (defunct)

## [2.0.1] - 2019-07-11
### Added
- snyk protect

### Updated
- eslint@6.0.1
- eslint-config-prettier@6.0.0
- eslint-plugin-jsdoc@15.3.4
- prettier@1.18.2
- snyk@1.192.6


## [2.0.0] - 2019-05-26
### Added
- node 12 support
- DepShield & Snyk badges

### Updated
- eslint@5.16.0
- eslint-config-prettier@4.3.0
- eslint-plugin-jsdoc@7.0.2
- eslint-plugin-node@9.1.0
- eslint-plugin-prettier@3.1.0
- snyk@1.167.2

### Removed
- preinstall of grunt-cli (unneeded)
- node 6, 7 support

## [1.1.0] - 2019-02-10
### Added
- .editorconfig
- Snyk monitoring
- node 8, 9, 10, 11 support in .travis.yml
- eslint
- eslint-{config,plugin}-prettier

### Updated
- tv4@1.3.0
- eslint-plugin-node@8.0.1

### Removed
- node 4, 5 support
- grunt and plugins

## [1.0.0] - 2016-11-06
### Added
- node v7 support in .travis.yml
- Changelog (this file)

### Updated
- Dependencies upgraded:
  - jsonpointer@0.4.0
  - eslint-plugin-node@3.0.3
  - grunt-eslint@19.0.0
  - load-grunt-tasks@3.5.2
  - tv4@1.2.7

### Removed
- node v0.10 support in .travis.yml

## [0.1.1] - 2016-04-08

### Added
- Add Code Climate & Download/month badges

### Updated
- other README tweaks

## [0.1.0] - 2016-04-08

### Added
- node 4 & 5 support
- grunt-release-it for easier release management

### Updated
- docs changed to reflect new project ownership
- Various dependencies, including grunt@1.0.1

### Removed
- node 0.8 support


## [0.0.4] - 2014-02-16

### Added
- various fixes

## [0.0.3] 2013-11-28

### Added
- added a toStrim() for schemaValue no [object Object]


## [0.0.2] 2013-11-28

### Added
- tv4 as a peerDependency
- /media to .gitignore

## [0.0.1] 2013-11-28

### Updated
- tuned module
  - moved some helpers
  - split reportTotals from reportBulk
  - added separators
- expanded README.md
  - added usage example
  - added links
  - tuned text
- added miniwrite/ministyle as peer dependencies to package.json

[8.1.0]: https://github.com/timbeadle/tv4-reporter/compare/8.0.0...8.1.0
[8.0.0]: https://github.com/timbeadle/tv4-reporter/compare/7.1.0...8.0.0
[7.1.0]: https://github.com/timbeadle/tv4-reporter/compare/7.0.0...7.1.0
[7.0.0]: https://github.com/timbeadle/tv4-reporter/compare/6.0.0...7.0.0
[6.0.0]: https://github.com/timbeadle/tv4-reporter/compare/5.0.2...6.0.0
[5.0.2]: https://github.com/timbeadle/tv4-reporter/compare/5.0.1...5.0.2
[5.0.1]: https://github.com/timbeadle/tv4-reporter/compare/5.0.0...5.0.1
[5.0.0]: https://github.com/timbeadle/tv4-reporter/compare/4.3.0...5.0.0
[4.3.0]: https://github.com/timbeadle/tv4-reporter/compare/4.2.0...4.3.0
[4.2.0]: https://github.com/timbeadle/tv4-reporter/compare/4.1.0...4.2.0
[4.1.0]: https://github.com/timbeadle/tv4-reporter/compare/4.0.2...4.1.0
[4.0.2]: https://github.com/timbeadle/tv4-reporter/compare/4.0.1...4.0.2
[4.0.1]: https://github.com/timbeadle/tv4-reporter/compare/4.0.0...4.0.1
[4.0.0]: https://github.com/timbeadle/tv4-reporter/compare/3.0.0...4.0.0
[3.0.0]: https://github.com/timbeadle/tv4-reporter/compare/2.0.3...3.0.0
[2.0.3]: https://github.com/timbeadle/tv4-reporter/compare/2.0.2...2.0.3
[2.0.2]: https://github.com/timbeadle/tv4-reporter/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/timbeadle/tv4-reporter/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/timbeadle/tv4-reporter/compare/1.1.0...2.0.0
[1.1.0]: https://github.com/timbeadle/tv4-reporter/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/timbeadle/tv4-reporter/compare/0.1.1...1.0.0
[0.1.1]: https://github.com/timbeadle/tv4-reporter/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/timbeadle/tv4-reporter/compare/0.0.4...0.1.0
[0.0.4]: https://github.com/timbeadle/tv4-reporter/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/timbeadle/tv4-reporter/compare/0.0.2...0.0.3
[0.0.2]: https://github.com/timbeadle/tv4-reporter/compare/0.0.1...0.0.2
[0.0.1]: https://github.com/timbeadle/tv4-reporter/commit/0b8bd461a40f03466edfc563293fe0cdca18f245
