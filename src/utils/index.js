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
    return toFarsiNumber(years) + " سال قبل";
  }
  if (days >= 320 && days <= 547) {
    return "یک سال قبل";
  }
  if (days >= 45 && days <= 319) {
    return toFarsiNumber(months) + " ماه قبل";
  }
  if (days >= 26 && days <= 45) {
    return "یک ماه قبل";
  }

  var hours = Math.floor(seconds / 3600);

  if (hours >= 36 && days <= 25) {
    return toFarsiNumber(days) + " روز قبل";
  }
  if (hours >= 22 && hours <= 35) {
    return "دیروز";
  }

  var minutes = Math.floor(seconds / 60);

  if (minutes >= 90 && hours <= 21) {
    return toFarsiNumber(hours) + " ساعت قبل";
  }
  if (minutes >= 45 && minutes <= 89) {
    return "یک ساعت قبل";
  }
  if (seconds >= 90 && minutes <= 44) {
    return toFarsiNumber(minutes) + " دقیقه قبل";
  }
  if (seconds >= 45 && seconds <= 89) {
    return "یک دقیقه قبل";
  }
  if (seconds >= 0 && seconds <= 45) {
    return "چند لحظه قبل";
  }
}
