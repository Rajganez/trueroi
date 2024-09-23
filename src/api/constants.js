export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE = "/auth";
export const REGISTER_ROUTE = `${AUTH_ROUTE}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

//----------------------------------------------------------------//

export const CONTACT_ROUTE = "/list";
export const ADDLIST_ROUTE = `${CONTACT_ROUTE}/add`;
