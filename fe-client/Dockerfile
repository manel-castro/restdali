FROM node:lts As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npx prisma generate

RUN rm -rf .next

RUN npm run build


CMD ["npm", "start"]