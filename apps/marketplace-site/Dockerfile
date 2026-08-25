FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json ./
COPY docs ./docs
RUN npm install && npm run build
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
