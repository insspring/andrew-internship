export const decodeDate = (param) => {
    let dd = param.getDate();
    let mm = param.getMonth()+1;
    let yy = param.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }
    return mm+'-'+dd+'-'+yy;
};