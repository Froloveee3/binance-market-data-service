import https from 'https';


const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price';


interface Ticker {
    symbol: string;
    price: string
}


class MarketDataService {
    public marketData: Ticker[] | null;
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.marketData = null;
        this.apiUrl = apiUrl;
    }

    async fetch(): Promise<void> {
        this.marketData = await new Promise((resolve, reject) => {
            https.get(this.apiUrl, (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    try {
                        const jsonData: unknown = JSON.parse(data);

                        if (!Array.isArray(jsonData) || !jsonData.every((item) => 'symbol' in item && 'price' in item)) {
                            reject(new Error("Invalid API response format"));
                            return;
                        }

                        resolve(jsonData as Ticker[]);
                    } catch (error) {
                        reject(new Error("Failed to parse API response"));
                    }
                });
            }).on("error", (err) => {
                reject(new Error(`Network error: ${err.message}`));
            })
        })
    }

    show(): void {
        if (!this.marketData || this.marketData.length === 0) {
            console.log("No market data available");
            return;
        }

        const filteredData = this.marketData.filter((p) => parseFloat(p.price) > 0);

        if (filteredData.length === 0) {
            console.log("No valid market data available (all prices are zero)");
            return;
        }

        const sortedMarketData = filteredData.map((ticker) => ({
            symbol: ticker.symbol,
            price: parseFloat(ticker.price)
        })).sort((a, b) => b.price - a.price);

        const topHighest = sortedMarketData.slice(0, 5);
        const topLowest = sortedMarketData.slice(-5).reverse();

        const averagePrice = sortedMarketData.reduce((sum, p) => sum + p.price, 0) / sortedMarketData.length;

        console.log("========== Market Data Report ==========");

        console.log("\nTop 5 Pairs with the Highest Prices:\n--------------------------------");
        topHighest.forEach((pair, index) => {
            console.log(`${index + 1}. ${pair.symbol.padEnd(10)}: ${pair.price.toFixed(2)}`);
        });

        console.log("\nTop 5 Pairs with the Lowest Prices:\n---------------------------------");
        topLowest.forEach((pair, index) => {
            console.log(`${index + 1}. ${pair.symbol.padEnd(10)}: ${pair.price}`);
        });

        console.log("\nAverage Price of All Pairs:\n---------------------------");
        console.log(`Average: ${averagePrice.toFixed(2)}`);

        console.log("\n========================================");
    }
}


async function main() {
    const binanceMDS = new MarketDataService(BINANCE_API_URL)

    try {
        console.log("Fetching Binance market data...\n");
        await binanceMDS.fetch();

        binanceMDS.show();
    } catch (error) {
        console.log(`Error: ${(error as Error).message}`);
    }
}

main().then(() => {
    console.log("---Main completed---");
});
