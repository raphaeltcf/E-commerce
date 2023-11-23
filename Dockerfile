# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Prod stage
FROM node:18-alpine 

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY ./prisma ./prisma

COPY package*.json ./

RUN npm install

# Remove unnecessary files
RUN rm -rf /usr/src/app/node_modules/.cache

# Expose port
EXPOSE 3333

# Start the application
CMD [ "node", "dist/main.js"]






