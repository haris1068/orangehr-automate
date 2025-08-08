FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npx playwright install chromium --with-deps

COPY . .

CMD ["npx", "playwright", "test"]
