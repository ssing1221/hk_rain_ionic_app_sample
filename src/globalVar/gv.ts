import { OpaqueToken } from '@angular/core';

export let OT_GV = new OpaqueToken('gv');

export interface IGV {
    isTestingAdmob: boolean;
    ADMOB_MAX_NUMBER: number;
    admobCount: number;
    gLangInd: string;
    monthMap: {};
    weekDayEnMap: {};
    weekDayZhMap: {};
    filterYear: number;
    NEW: string;
    RAIN_SUN_THRESHOLD: number;
    SUNSHINE: string;
    DRIZZLE: string;
    LIGHT: string;
    MODERATE: string;
    HEAVY: string;
    VIOLENT_TORRENTIAL: string;
    SUNSHINE_EN: string;
    DRIZZLE_EN: string;
    LIGHT_EN: string;
    MODERATE_EN: string;
    HEAVY_EN: string;
    VIOLENT_EN: string;
    TORRENTIAL_EN: string;
    SUNSHINE_ZH: string;
    DRIZZLE_ZH: string;
    LIGHT_ZH: string;
    MODERATE_ZH: string;
    HEAVY_ZH: string;
    VIOLENT_ZH: string;
    TORRENTIAL_ZH: string;
    DRIZZLE_THRESHOLD: number;
    LIGHT_THRESHOLD: number;
    MODERATE_THRESHOLD: number;
    HEAVY_THRESHOLD: number;
    VIOLENT_THRESHOLD: number;
    TORRENTIAL_THRESHOLD: number;
    S0001: string;
    S0002: string;

    // Lange
    NO_OF_YEARS_CHANGED_TO_EN: string;
    NO_OF_YEARS_CHANGED_TO_ZH: string;
    SUBMITTED_SUCCESSFULLY_EN: string;
    SUBMITTED_SUCCESSFULLY_ZH: string;
    ERROR_EN: string;
    ERROR_ZH: string;
    SORRY_SOMETHING_WRONG_EN: string;
    SORRY_SOMETHING_WRONG_ZH: string;
    NO_NETWORK_CONNECTION_EN: string;
    NO_NETWORK_CONNECTION_ZH: string;

    AD_MOB_ID_BANNER: string;
    AD_MOB_ID_INTER: string;
    AD_MOB_ID_INTER_VIDEO: string;
    AD_MOB_ID_VIDEO: string;
}

export const IGV: IGV = {

    // Change Admob to false when production
    isTestingAdmob: false,
    // Change Admob to false when production

    ADMOB_MAX_NUMBER: 5,
    admobCount: 5,
    
    gLangInd: 'zh',
    monthMap: {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May',
        6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    },
    weekDayEnMap: {
        0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed',
        4: 'Thu', 5: 'Fri', 6: 'Sat'
    },
    weekDayZhMap: {
        0: '日', 1: '一', 2: '二', 3: '三',
        4: '四', 5: '五', 6: '六'
    },
    filterYear: 45,
    NEW: 'new',
    RAIN_SUN_THRESHOLD: 50,
    SUNSHINE: 'sunshine',
    DRIZZLE: 'drizzle',
    LIGHT: 'light',
    MODERATE: 'moderate',
    HEAVY: 'heavy',
    VIOLENT_TORRENTIAL: 'violent_torrential',
    SUNSHINE_EN: 'Sunshine',
    DRIZZLE_EN: 'Drizzle',
    LIGHT_EN: 'Light',
    MODERATE_EN: 'Moderate',
    HEAVY_EN: 'Heavy',
    VIOLENT_EN: 'Violent',
    TORRENTIAL_EN: 'Torrential',
    SUNSHINE_ZH: '天晴',
    DRIZZLE_ZH: '毛毛雨',
    LIGHT_ZH: '小雨',
    MODERATE_ZH: '中雨',
    HEAVY_ZH: '大雨',
    VIOLENT_ZH: '暴雨',
    TORRENTIAL_ZH: '大暴雨',
    DRIZZLE_THRESHOLD: 0.05,
    LIGHT_THRESHOLD: 9.9,
    MODERATE_THRESHOLD: 24.9,
    HEAVY_THRESHOLD: 49.9,
    VIOLENT_THRESHOLD: 99.9,
    TORRENTIAL_THRESHOLD: 100,
    S0001: 'S0001:',
    S0002: 'S0002:',

    // Lang
    NO_OF_YEARS_CHANGED_TO_EN: 'No of years changed to',
    NO_OF_YEARS_CHANGED_TO_ZH: '年數改變至',
    SUBMITTED_SUCCESSFULLY_EN: 'Submitted successfully!',
    SUBMITTED_SUCCESSFULLY_ZH: '成功遞交!',

    ERROR_EN: 'ERROR!',
    ERROR_ZH: '錯誤!',
    SORRY_SOMETHING_WRONG_EN: 'Sorry, something went wrong...',
    SORRY_SOMETHING_WRONG_ZH: '抱歉，出了一些問題...',

    NO_NETWORK_CONNECTION_EN: 'No Network Connection...',
    NO_NETWORK_CONNECTION_ZH: '沒有網路...',

    AD_MOB_ID_BANNER: '',
    AD_MOB_ID_INTER: '',
    AD_MOB_ID_INTER_VIDEO: '',
    AD_MOB_ID_VIDEO: ''
};

