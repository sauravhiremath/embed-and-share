FROM node:14

# Create app directory
ENV HOME /usr/src/
WORKDIR $HOME

# Install app dependencies
COPY ["package.json", "yarn.lock", "$HOME/"]

# Install for production
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . $HOME

EXPOSE 8080
CMD yarn start