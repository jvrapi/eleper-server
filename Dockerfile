FROM node:14

ENV HOME=/home/eliper

WORKDIR ${HOME}/server

COPY package*.json ${HOME}/server

RUN npm i

COPY . ${HOME}/server 

EXPOSE 3333

CMD ["npm", "dev"]