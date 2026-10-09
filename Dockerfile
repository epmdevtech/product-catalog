# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Dependências
COPY package*.json ./
RUN npm ci

# Código e compilação
COPY . .
RUN npm run build

# Stage 2: Runtime com Nginx Alpine
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Configuração customizada do Nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Artefatos gerados
COPY --from=builder /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
