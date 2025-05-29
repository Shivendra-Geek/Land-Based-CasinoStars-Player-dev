import sha1  from "sha1";
export const generateUrlSearchParams = (data) => {
    return new URLSearchParams(data)?.toString();
};

export const generateAuth = (data) => {
    return sha1(process.env.NEXT_PUBLIC_AUTH_KEY + data);
};
