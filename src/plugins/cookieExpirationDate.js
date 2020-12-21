export function cookieExpirationDate(yearsDuration = 0) {
    let now = new Date();
    let expire = new Date();
    expire.setFullYear(now.getFullYear() + yearsDuration);
    expire.setMonth(now.getMonth());
    expire.setDate(now.getDate()+1);
    expire.setHours(0);
    expire.setMinutes(0);

    return expire.toString()
}