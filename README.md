# Binance Market Data Service

## Описание проекта
Данный проект представляет собой консольное приложение на **TypeScript**, которое использует API Binance для получения информации о криптовалютном рынке. Оно предоставляет следующие данные:

- Топ-5 пар с наибольшей ценой.
- Топ-5 пар с наименьшей ценой.
- Среднюю цену всех доступных пар.


## Установка и запуск

### Шаг 1: Клонируйте репозиторий
```bash
git clone https://github.com/Froloveee3/binance-market-data-service.git
cd binance-market-data-service
```

### Шаг 2: Установите зависимости
Убедитесь, что у вас установлен **Node.js** (версии 16 или выше).

Выполните команду:
```bash
npm install
```

### Шаг 3: Запуск проекта
Для запуска приложения используйте следующую команду:
```bash
npx ts-node src/index.ts
```

### Пример вывода
```plaintext
Fetching Binance market data...

========== Market Data Report ==========

Top 5 Pairs with the Highest Prices:
--------------------------------
1. BTCBIDR   : 1042508253.00
2. BTCARS    : 114788340.00
3. BTCNGN    : 99822596.00
4. ETHBIDR   : 47041943.00
5. BTCJPY    : 15089583.00

Top 5 Pairs with the Lowest Prices:
---------------------------------
1. DOCKBTC   : 5e-8
2. FORBTC    : 6e-8
3. BOMEBTC   : 7e-8
4. LINABTC   : 8e-8
5. COSBTC    : 8e-8

Average Price of All Pairs:
---------------------------
Average: 595221.15

========================================
---Main completed---
```

## Зависимости
Проект использует следующие зависимости:
- `ts-node` — для выполнения TypeScript кода без предварительной компиляции.
- `https` — для выполнения HTTP-запросов к API Binance.