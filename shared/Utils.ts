import dayjs from 'dayjs'

export function createUUID():string {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export function convertSecondsToTime(seconds:number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = Math.round(remainingSeconds).toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export function getObjectKeyValues(obj:Object) {
  const keyValuesArray = [];

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const keyValueObject = {
        key: key,
        value: obj[key]
      };
      keyValuesArray.push(keyValueObject);
    }
  }

  return keyValuesArray;
}

export function isVideoOrImage(filename:string) {
  const videoRegex = /\.(mp4|avi|mov|mkv|flv|wmv|webm|ogg)$/i;
  const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

  if (videoRegex.test(filename)) {
    return 'video';
  } else if (imageRegex.test(filename)) {
    return 'image';
  } else {
    return '';
  }
}

export function dateIsBefore(_date:Date, _dateToCompare:Date) {
  return dayjs(_date).isBefore(dayjs(_dateToCompare)) ? 1 : -1;
}

export async function pauseExecution(ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
