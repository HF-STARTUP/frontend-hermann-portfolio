export enum DISCUSSION_TYPE {
    Direct_discussion = "direct",
    Group_discussion = "default"
}

export type DiscussionResponseType = {
    id:          string;
    name:        string;
    description: string | null;
    type:        string;
    park_id:     string;
    owner_id:    string | null;
    created_at:  Date;
    updated_at:  Date;
    messages?: MessageResponseType[]
}

export type DiscussionMemberResponseType = {
    id:        string;
    image:     null | string;
    role:      DISCURSSION_MEMBER_ROLE;
    last_name?: null | string;
    fist_name: string;
    role_name: null | string;
    message?: MessageResponseType[]

}

export type MessageResponseType = {
    id:              string;
    discussion_id:   string;
    content:         string;
    message_type:    string;
    from_profile_id: string;
    front_id:        string;
    created_at?:      Date;
    updated_at?:      Date;
    isLocal?: boolean;
}


export enum DISCURSSION_MEMBER_ROLE {
    Driver = "DRIVER",
    Owner = "OWNER",
}

export type CreateDiscussionInput = {
    name:            string;
    description:     string;
    park_id?:         string;
    type:            DISCUSSION_TYPE;
    with_profile_id?: string;
    profiles_id?:     string[];
}
