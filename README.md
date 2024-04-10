name: Validate Prisma Directory

on:
  push:
    branches:
      - main

jobs:
  validate_directory:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v2
      - name: Validate Prisma Directory
        run: ls prisma
