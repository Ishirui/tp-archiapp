FROM node:23.9.0-alpine

# Create app directory
WORKDIR /app
# Create unprivileged user
RUN adduser -D appuser
RUN chown -R appuser /app
USER appuser

# Install app dependencies
ADD package.json package-lock.json ./
RUN npm ci

# Bundle app source
ADD client/ ./client
ADD serveur/ ./serveur

ENV APP_DIR "/app"

EXPOSE 8080
CMD [ "npm", "run", "prod" ]