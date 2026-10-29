# ---------- 1. faza: instalacija zavisnosti ----------
FROM node:22-bookworm-slim AS deps
WORKDIR /app

# prvo samo package fajlovi, da Docker kešira ovaj sloj dok se zavisnosti ne promene
COPY package.json package-lock.json ./
RUN npm ci

# ---------- 2. faza: build aplikacije ----------
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- 3. faza: pokretanje ----------
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# samo ono što treba za pokretanje (bez izvornog koda za razvoj)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# aplikacija ne radi kao root korisnik (bezbednije)
USER node

EXPOSE 3000
CMD ["npm", "start"]
