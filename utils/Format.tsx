/* eslint-disable prettier/prettier */
export function FormatDate(mDate: any) {
    var date = new Date(mDate); // Date 2011-05-09T06:08:45.178Z
    return ('0' + date.getDate()).slice(-2)
    + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '/' + date.getFullYear()
    + ', ' + (date.getHours() - 7)
    + ':' + ('0' + (date.getMinutes())).slice(-2)
    + ':' + ('0' + (date.getSeconds())).slice(-2);
}

export function FormatMs(mMs: any) {
    var date = new Date(mMs * 1000);
    return date.getDate()
    + '/' + (date.getMonth() + 1)
    + '/' + date.getFullYear()
    + ', ' + date.getHours()
    + ':' + date.getMinutes()
    + ':' + date.getSeconds();
}
