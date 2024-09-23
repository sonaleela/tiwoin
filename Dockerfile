# Stage 1: Build the api
# Base image
FROM node:22-alpine as base


# Copy the workspace, package.json
WORKDIR /usr/src/app
# Copy pnpm-lock file and install dependencies
RUN corepack enable pnpm

# api.tiwon.com development image
FROM base as api

# Expose port
EXPOSE 3000

# Run the start:dev
CMD [ "pnpm", "-F=api.tiwoin.com", "run", "start:dev"]

# api.tiwon.com development image
FROM base as app

# Expose port
EXPOSE 4200

# Run the start command
CMD [ "pnpm", "-F=app.tiwoin.com", "run", "start" ]