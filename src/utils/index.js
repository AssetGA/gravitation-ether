"use client";

import { createBrowserHistory } from "history";

export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export function paginate(item, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...item].splice(startIndex, pageSize);
}

export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === "";
        }
        break;
      }
      case "isMaxLetter": {
        statusValidate = data.length > config.value;
        break;
      }
      case "isCheck": {
        const name =
          config.value.length > 0
            ? config.value.find((elem) => {
                const a = elem.toLowerCase();
                const b = data.toLowerCase();
                let c = "";
                let i = 0;
                while (i < b.length) {
                  if (a[i] === b[i]) {
                    c = c + a[i];
                  } else {
                    c = c + "";
                  }
                  i = i + 1;
                }

                console.log("a", a, "c", c);

                return b.length === c.length ? elem : undefined;
              })
            : undefined;
        console.log("confi", name);
        statusValidate = name !== undefined;
        break;
      }
      case "isUrl": {
        const emailRegExp =
          /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isMinTime": {
        statusValidate = new Date(data).getTime() < config.value;
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /^\d+$/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }
      case "isMinDigit": {
        statusValidate = data < config.value;
        break;
      }

      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}

const history = createBrowserHistory();
export default history;
