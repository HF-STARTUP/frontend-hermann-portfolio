export type RegisterResponseData = {
    id: string;
    owner: Owner;
    regions: Region[];
    token: string;
    refresh_token: string;
}

type Owner = {
    id: string;
    email: string;
    first_name: string;
}

type Region = {
    id: number;
    name: string;
    zone: null;
    latitude: null;
    longitude: null;
    account_id: string;
    city_id: number;
}


export type LoginResponseData = {
    id: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: null;
    image: null;
    verified_at: Date;
    created_at: Date;
    region_id: null;
    blocked_at: null;
    blocked_reason: null;
    suspended: boolean;
    account_id: null;
    password: string;
    role: string;
    regions: LoginResponseRegion[];
    token: string;
    refresh_token: string;
}

export type LoginOtpResponseData = {
    id:            string;
    phone:         string;
    email:         string;
    code:          string;
    password:      string;
    created_at:    Date;
    updated_at:    Date;
    verified_at:   Date;
    deleted_at:    null;
    token:         string;
    refresh_token: string;
}

type LoginResponseRegion = {
    id: number;
    name: string;
}
