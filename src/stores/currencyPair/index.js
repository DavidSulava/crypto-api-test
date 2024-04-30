import {defineStore} from "pinia";
import {useFetch} from "@vueuse/core";
import {SELECTED_PROPS} from "@/pages/SettingsPage/CurrencyPair/constants.js";

export const useCurrencyPairStore = defineStore('currencyPair', {
    state: () => ({
        selectedPair: structuredClone(SELECTED_PROPS[0]),
        price: undefined,
        isDataFetching: false,
        history: [],
    }),
    actions: {
        setSelectPair(data) {
            this.selectedPair = data;
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