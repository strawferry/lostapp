


export const LOADING_STATUS = "LOADING_STATUS";
export const SET_INTRO = "SET_INTRO";



export function start() {
    return {
        type: LOADING_STATUS,
        isLoading: true,
    };
}
export function stop() {
    return {
        type: LOADING_STATUS,
        isLoading: false,
    };
}

export function set_intro(isAppIntro) {
    return {
        type: SET_INTRO,
        isAppIntro: isAppIntro,
    };
}

