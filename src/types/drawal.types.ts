export type DrawalModeType = {
    id:         string;
    name:       string;
    type:       DRAWAL_MODE;
    country_id: number;
    image:      string;
    title:      string;
}

export enum DRAWAL_MODE {
    CreditCard = "credit_card",
    MobileMoney = "mobile_money",
    Ypay = "ypay",
}


export type AddDrawalInputs = {
    title:           string;
    phone_number:    string;
    card_type_id?:    string;
    card_processor?:  string;
    account_number?:  string;
    last4Digit?:      string;
    vct_withdraw_id: string;
    park_id:         string;
}


export type PaymentInfoType = {
    id: string;
    park_id: string;
    title: string;
    last4Digit: string | null;
    phone_number: string;
    card_processor: string | null;
    account_number: string | null;
    vct_withdraw: DrawalModeType;
};


export type RemoveMoneyInputs = {
    amount: number,
    park_id?: string,
    withdraw_on_park_id: string
}

export type ParkAmontResponseType = {
    amount:   number;
    currency: Currency;
}

export type Currency = {
    name:         string;
    country_code: string;
}


export type DashboardInfosResponseType = {
    currency:                        string;
    previous_receipts_not_collected: number;
    receipts_expected_today:         number;
    actual_recipe:                   number;
    driver:                          DashboardStat;
    vehicle:                         DashboardStat;
    breakdown:                       number;
    gps_events:                      null;
}

export type DashboardStat = {
    total:  number;
    active: number;
}
