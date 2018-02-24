FROM node:8-alpine as builder
MAINTAINER tribou

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install npm/yarn dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache git openssh

# Install all dependencies
ADD package.json /usr/src/app/
ADD yarn.lock /usr/src/app/
ADD .npm-packages-offline-cache /usr/src/app/.npm-packages-offline-cache/
ADD bin /usr/src/app/bin/
RUN npm run yarn

# Add app
ADD . /usr/src/app/

# Build app
RUN npm run build

# Remove all but runtime dependencies
RUN npm run yarn -- --prod

# Remove build-related files
RUN rm -rf .npm-packages-offline-cache


# Create application image
FROM node:8-alpine
COPY --from=builder /usr/src/app /usr/src/app/
WORKDIR /usr/src/app

EXPOSE 8000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
