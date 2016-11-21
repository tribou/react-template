FROM nodesource/centos7:6
MAINTAINER tribou

# Install yarn
RUN npm install -g yarn

# Install all dependencies
ADD package.json /usr/src/app/
ADD yarn.lock /usr/src/app/
RUN yarn

# Add app
ADD . /usr/src/app/

# Build app
RUN npm run build

EXPOSE 8000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
