import {defineStore} from 'pinia';
import {useFetch} from '@vueuse/core';
import {BINANCE_API_URL} from '@/constants/api.js';

export const useBookOrderStore = defineStore('BookOrderPage', {
    state: () => ({
        bookOrderList: [],
        isBookDataFetching: false,
    }),
    actions: {
        setBookOrder(data) {
            this.bookOrderList = data;
        },
        updateBookOrder(key, [price, quantity]) {
            // Here is implemented the binary search algorithm
            let start = 0;
            let end = this.bookOrderList[key]?.length - 1;

            while(start <= end) {
                let mid = Math.floor((start + end) / 2);

                if(parseFloat(this.bookOrderList[key][mid]?.[0]) === price) {
                    if(!!quantity) {
                        this.bookOrderList[key][mid][1] = quantity;
                    }
                    return this.bookOrderList[key][mid];
                }

                if(price < parseFloat(this.bookOrderList[key][mid][0])) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            }
        },
        async getBookOrder({symbol, limit}) {
            try {
                this.isBookDataFetching = true;
                const url = `${BINANCE_API_URL}/depth?symbol=${symbol}&limit=${limit}`

                const {data } = await useFetch(url).get().json();
                this.setBookOrder(data.value);
            } finally {
                this.isBookDataFetching = false;
            }
        }
    }
});