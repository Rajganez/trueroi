export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE = "/auth";
export const REGISTER_ROUTE = `${AUTH_ROUTE}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

//----------------------------------------------------------------//

export const CONTACT_ROUTE = "/list";
export const ADDLIST_ROUTE = `${CONTACT_ROUTE}/add`;
export const SHOWLIST_ROUTE = `${CONTACT_ROUTE}/show`;
export const FILE_UPLOAD_ROUTE = `${CONTACT_ROUTE}/file-upload`;
export const EDIT_CLIENT_ROUTE = `${CONTACT_ROUTE}/edit`;
export const CONFIRM_DELETE_ROUTE = `${CONTACT_ROUTE}/delete`;

//----------------------------------------------------------------//

export const EMAIL_ROUTE = "/email";
export const SEND_EMAIL_ROUTE = `${EMAIL_ROUTE}/send-email`;
export const EMAIL_CAMPAIGN_DETAILS_ROUTE = `${EMAIL_ROUTE}/get-email-campaign`;
