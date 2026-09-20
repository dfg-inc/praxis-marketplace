FROM node:22-bookworm-slim
WORKDIR /workspace
COPY docs/user ./docs/user
COPY tools/scripts/sync-user-docs.mjs ./tools/scripts/sync-user-docs.mjs
COPY apps/marketplace-site ./apps/marketplace-site
WORKDIR /workspace/apps/marketplace-site
RUN npm install && npm run build
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
