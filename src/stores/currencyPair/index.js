import {defineStore} from "pinia";
import {useFetch} from "@vueuse/core";

export const useCurrencyPairStore = defineStore('currencyPair', {
    state: () => ({
        selectedPairValue: null,
        price: undefined,
        isDataFetching: false,
        history: [],
    }),
    actions: {
        setSelectPair(pair) {
            this.selectedPairValue = pair;
        },
        setPrice(price) {
            this.price = price;
        },
        addToHistory(data) {
            this.history.push(data);
        },
        async getPair(value) {
            try {
                this.isDataFetching = true;
                const url = `https://api.binance.com/api/v3/ticker/price?symbol=${value}`

                const {data } = await useFetch(url).get().json();

                this.price = data;
            } finally {
                this.isDataFetching = false;
            }
        }
    }
});