FROM node:13.12.0-alpine

RUN apt-get -y update
RUN apt-get -y install git
RUN apt-get -y install maven

RUN git clone https://github.com/nariman589/SingularityTournament
WORKDIR /SingularityTournament/tournament
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

