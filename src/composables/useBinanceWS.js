import {computed, onUnmounted, watch} from 'vue';
import {useWebSocket} from '@vueuse/core';

const useBinanceWS = (selectedValue, query = '@trade') => {
    const connectionUrl = computed(() => `wss://stream.binance.com:9443/ws/${selectedValue.value.toLowerCase()}${query}`);
    const { data, open, close, status } = useWebSocket(connectionUrl, {
        autoReconnect: {
            retries: 3,
            delay: 1000,
            onFailed() {
                console.error('WebSocket connection error');
            },
        },
      }
    );

    onUnmounted(() => {
        if(status.value === 'OPEN') close();
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