export const emailValidation = (email) => {
    let regex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    return regex.test(email);
};

export const nameValidation = (name) => {
    let regex = new RegExp('[A-Za-z]{3,19}$');
    return regex.test(name);
};

export const passwordValidation = (password) => {
    let regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    return regex.test(password);
};

export const passwordConfirmFunc = (password,confirm) => {
    return password === confirm;
};