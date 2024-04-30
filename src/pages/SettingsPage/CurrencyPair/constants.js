import btcUrl from '@/assets/coinIcons/btc.svg';
import bnbUrl from '@/assets/coinIcons/airbnb.svg';
import ethUrl from '@/assets/coinIcons/ethereum.svg';

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
        iconUrl: btcUrl,
    },
    {
        title: 'BNB/BTC',
        bayTitle: 'BNB',
        sellTitle: 'BTC',
        value: structuredClone(CURRENCY_SYMBOL.BnbBtc),
        iconUrl: bnbUrl,
    },
    {
        title: 'ETH/BTC',
        bayTitle: 'ETH',
        sellTitle: 'BTC',
        value: structuredClone(CURRENCY_SYMBOL.EthBtc),
        iconUrl: ethUrl,
    },
];
