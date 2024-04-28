
export const CURRENCY_SYMBOL = Object.freeze({
    BtcUsd: 'BTCUSDT',
    BnbBtc: 'BNBBTC',
    EthBtc: 'ETHBTC',
});

export const SELECTED_PROPS = [
    {
        title: 'BTC/USDT',
        bayTitle: 'BTC',
        sellTitle: 'USDT',
        value: structuredClone(CURRENCY_SYMBOL.BtcUsd),
    },
    {
        title: 'BNB/BTC',
        bayTitle: 'BNB',
        sellTitle: 'BTC',
        value: structuredClone(CURRENCY_SYMBOL.BnbBtc),
    },
    {
        title: 'ETH/BTC',
        bayTitle: 'ETH',
        sellTitle: 'BTC',
        value: structuredClone(CURRENCY_SYMBOL.EthBtc),
    },
];
