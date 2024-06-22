import {SEARCH_DELAY_TIME} from "@/utils/constants";

export const asyncDebounce = (func, delay = SEARCH_DELAY_TIME) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);
        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(async () => {
                try {
                    const result = await func(...args);
                    resolve(result)
                } catch (e) {
                    reject()
                }
            }, delay);
        })
    };
}

