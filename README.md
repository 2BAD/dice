# Dice

[![NPM version](https://img.shields.io/npm/v/@2bad/dice)](https://www.npmjs.com/package/@2bad/dice)
[![License](https://img.shields.io/npm/l/@2bad/dice)](https://www.npmjs.com/package/@2bad/dice)
[![GitHub Build Status](https://img.shields.io/github/actions/workflow/status/2BAD/dice/build.yml)](https://github.com/2BAD/dice/actions/workflows/build.yml)
[![Code coverage](https://img.shields.io/codecov/c/github/2BAD/dice)](https://codecov.io/gh/2BAD/dice)
[![Written in TypeScript](https://img.shields.io/github/languages/top/2BAD/dice)](https://github.com/2BAD/dice/search?l=typescript)

TypeScript library that allows you to simulate rolling different types and quantities of dice. You can easily perform calculations and generate random numbers for use in games, simulations, and more.

## Install

```shell
npm install @2bad/dice
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and no longer provides a CommonJS export. If your project uses CommonJS, you will have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function. Please don't open issues for questions regarding CommonJS / ESM.

## Usage

```typescript
import { roll } from '@2bad/dice'

// Roll a six-sided die with lowercase 'd'
roll('d6')
// same as
roll('D6')

// Roll two eight-sided dice
roll('2d8')

// Roll two twenty-sided dice
roll('2d20').
```

## Contributing

We welcome contributions! If you find a bug or want to request a new feature, please open an issue. If you want to submit a bug fix or new feature, please open a pull request.
