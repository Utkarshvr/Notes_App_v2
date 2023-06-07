const configResponse = {
  messages: Object.freeze({
    // AUTH
    ALREADY_EXIST: "User Already Exist",
    WRONG_PASSWORD: "Username and Password did not match",
    USER_NOT_EXIST: "User not found",
    USER_DELETED: "User Deleted Successfully",
    USER_UPDATED: "User Updated Successfully",
    REGISTRATION_FAILED: "Registration Failed",
    REGISTRATION_SUCCESSFULLY: "User Register successfully",
    LOGIN_SUCCESSFULLY: "Logged in successfully",
    LOGOUT_SUCCESSFULLY: "Logged out successfully",
    // Notes BASED
    NOTE_UPDATED: "Note Updated Successfully",
    NOTE_CREATED: "Note Created Successfully",
    NOTE_FOUND: "Note Found Successfully",
    NOTES_FOUND: "Notes Found Successfully",
    NOTE_DELETED: "Note Deleted Successfully",
    VERIFIED: "Verified",
    // ERROR
    NOT_FOUND: "Attribute Not Found",
    INVALID_DOCUMENT_ID: "Document Id Must Be Valid",
    NOT_AUTHENTICATED: "You are not authenticated. Please login again!",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    ROUTE_NOT_FOUND: "Endpoint not Exists",
    ERROR_OCCURED: "Error Occured",
  }),
  loginType: ["Google", "Gawaana"],
  accountType: ["Basic", "Premium", "Premimum Plus"],
};

export default configResponse;
