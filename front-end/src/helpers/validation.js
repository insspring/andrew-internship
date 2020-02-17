export const validation  = (select, param, confirm) => {
    if(select === 'name') {
        let regex = new RegExp('[A-Za-z]{3,19}$');
        return regex.test(param);
    } else if(select === 'email') {
        let regex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
        return regex.test(param);
    } else if(select === 'password') {
        let regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
        return regex.test(param);
    } else if(select === 'confirm') {
        return param === confirm;
    }
};