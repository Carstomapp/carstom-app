# Carstom App

![status](https://github.com/Carstomapp/carstom-app/actions/workflows/gatsby.yml/badge.svg?branch=main)

This repository contains the source code of main frontend application for Carstom.

[Link to Preview](https://Carstomapp.github.io/carstom-app/)

## Setup

Clone repository

```bash
# ssh
git clone git@github.com:Carstomapp/carstom-app.git
# https
git clone https://github.com/Carstomapp/carstom-app.git
```

Install dependencies

```bash
npm i
```

Run local dev server

```bash
npm start
```

Navigate to `http://localhost:8000?t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiRGVjZW1iZXIwOTE5OTgifQ.CC7h56VvBreo6gA4nQA6C5i-x8q8bhfTwxTaoEzlIkE`

## Authentication

Test auth tokens to use for local development

- eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiRGVjZW1iZXIwOTE5OTgifQ.CC7h56VvBreo6gA4nQA6C5i-x8q8bhfTwxTaoEzlIkE

## Contribution

Run production build

```bash
npm run build
```

Run tests

```bash
npm test
```

Format code

```bash
npm run format
```

**IMPORTANT!** Project uses [Husky](https://github.com/typicode/husky) for automated code formatting on commit.
