export const baseUrl = "http://localhost:9636/";

export function toFarsiNumber(n) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
}

export function fromNow(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var years = Math.floor(seconds / 31536000);
  var months = Math.floor(seconds / 2592000);
  var days = Math.floor(seconds / 86400);

  if (days > 548) {
    return toFarsiNumber(years) + " سال پیش";
  }
  if (days >= 320 && days <= 547) {
    return "یک سال پیش";
  }
  if (days >= 45 && days <= 319) {
    return toFarsiNumber(months) + " ماه پیش";
  }
  if (days >= 26 && days <= 45) {
    return "یک ماه پیش";
  }

  var hours = Math.floor(seconds / 3600);

  if (hours >= 36 && days <= 25) {
    return toFarsiNumber(days) + " روز پیش";
  }
  if (hours >= 22 && hours <= 35) {
    return "دیروز";
  }

  var minutes = Math.floor(seconds / 60);

  if (minutes >= 90 && hours <= 21) {
    return toFarsiNumber(hours) + " ساعت پیش";
  }
  if (minutes >= 45 && minutes <= 89) {
    return "یک ساعت پیش";
  }
  if (seconds >= 90 && minutes <= 44) {
    return toFarsiNumber(minutes) + " دقیقه پیش";
  }
  if (seconds >= 45 && seconds <= 89) {
    return "یک دقیقه پیش";
  }
  if (seconds >= 0 && seconds <= 45) {
    return "چند لحظه پیش";
  }
}
