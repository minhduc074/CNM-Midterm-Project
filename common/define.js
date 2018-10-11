const R_Code_Ticket = 1;
const R_Code_User = 2;

const Ticket_Error_Unknown = -1;
const Ticket_OK = 1;
const Ticket_Error_Sql = 2;
const Ticket_Error_No_Ticket = 3;
const Ticket_Error_Invalid_Token = 4;

exports.ticketToString = ((ticket) => {
    switch (ticket) {
        case Ticket_Error_Unknown:
            return "Unknown ticket error";
        case Ticket_OK:
            return "Ticket OK";
        case Ticket_Error_Sql:
            return "Ticket error when execute sql query";
        case Ticket_Error_No_Ticket:
            return "No ticket received";
        case Ticket_Error_Invalid_Token:
            return "Ticket Error: Invalid token"
        default:
            return "Can not find ticket code";
    };
})

const User_OK = 1;
const User_Error_Unknown = -1;
const User_Error_invalid_Password = 2;
const User_Error_User_Exit = 3;
const User_Error_Cannot_Find = 4;
const User_Error_Sql = 5;

exports.userToString = ((code) => {
    switch (code) {
        case User_Error_Unknown:
            return "Unknown user error";
        case User_OK:
            return "User OK";
        case User_Error_invalid_Password:
            return "User error: Invalid username/password";
        case User_Error_User_Exit:
            return "User error: User already exit";
        case User_Error_Cannot_Find:
            return "User error: Can not find this user";
        case User_Error_Sql:
            return "User Error: error when execute sql query";
        default:
            return "Can not find User code";
    }
})