FROM node:17-alpine

# set working directory
WORKDIR /client

# add `/client/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts@5.0.1 -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]

