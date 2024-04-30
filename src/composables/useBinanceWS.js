import {computed, onUnmounted, watch} from "vue";
import {useWebSocket} from "@vueuse/core";

const useBinanceWS = (selectedValue, query = '@trade') => {
    const connectionUrl = computed(() => `wss://stream.binance.com:9443/ws/${selectedValue.value.toLowerCase()}${query}`);
    const { data, open, close } = useWebSocket(connectionUrl);

    onUnmounted(() => {
        if(close) close();
    })
    watch(connectionUrl, () => {
        if(open && close) {
            close();
            open();
        }
    });

    return { data };
}

export default useBinanceWS;