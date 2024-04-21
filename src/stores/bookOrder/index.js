import {defineStore} from "pinia";
import {useFetch} from "@vueuse/core";

export const useBookOrderStore = defineStore('BookOrder', {
    state: () => ({
        bookOrderList: [],
        isBookDataFetching: false,
    }),
    actions: {
        setBookOrder(data) {
            this.bookOrderList = data;
        },
        async getBookOrder({symbol, limit}) {
            try {
                this.isBookDataFetching = true;
                const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`

                const {data } = await useFetch(url).get().json();
                this.setBookOrder(data.value);
            } finally {
                this.isBookDataFetching = false;
            }
        }
    }
});