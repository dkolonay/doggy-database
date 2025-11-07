//Function to add "- and () to 10-digit phone number"
export const formatPhoneNumber = (phoneNumber) => {
    let formattedNumber = "(";
    for (let i = 0; i < 3; i++) {
        formattedNumber += phoneNumber[i];
    }
    formattedNumber += ")-";
    for (let i = 3; i < 6; i++) {
        formattedNumber += phoneNumber[i];
    }
    formattedNumber += "-";
    for (let i = 6; i < 10; i++) {
        formattedNumber += phoneNumber[i];
    }
    return formattedNumber;
};