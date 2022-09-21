import { BigNumber } from "@ijstech/eth-wallet";
import moment from 'moment';
import { TokenMapType } from '@vesting/global';

export const formatDate = (date: any, customType?: string) => {
  const formatType = customType || 'DD/MM/YYYY';
  return moment(date).format(formatType);
}

export const compareDate = (fromDate: any, toDate?: any) => {
  if (!toDate) {
    toDate = moment();
  }
  return moment(fromDate).isSameOrBefore(toDate);
}

export const formatNumber = (value: any, decimals?: number) => {
  let val = value;
  const minValue = '0.0000001';
  if (typeof value === 'string') {
    val = new BigNumber(value).toNumber();
  } else if (typeof value === 'object') {
    val = value.toNumber();
  }
  if (val != 0 && new BigNumber(val).lt(minValue)) {
    return `<${minValue}`;
  }
  return formatNumberWithSeparators(val, decimals || 4);
};


export const formatNumberWithSeparators = (value: number, precision?: number) => {
  if (!value) value = 0;
  if (precision) {
    let outputStr = '';
    if (value >= 1) {
      outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
    }
    else {
      outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
    }

    if (outputStr.length > 18) {
      outputStr = outputStr.substr(0, 18) + '...'
    }
    return outputStr;
    // let parts = parseFloat(value.toPrecision(precision)).toString().split(".");
    // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return parts.join(".");
  }
  else {
    return value.toLocaleString('en-US');
    // let parts = value.toString().split(".");
    // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return parts.join(".");
  }
}

export const limitDecimals = (value: any, decimals: number) => {
  let val = value;
  if (typeof value !== 'string') {
    val = val.toString();
  }
  let chart;
  if (val.includes('.')) {
    chart = '.';
  } else if (val.includes(',')) {
    chart = ',';
  } else {
    return value;
  }
  const parts = val.split(chart);
  let decimalsPart = parts[1];
  if (decimalsPart && decimalsPart.length > decimals) {
    parts[1] = decimalsPart.substr(0, decimals);
  }
  return parts.join(chart);
}

export async function getAPI(url:string, paramsObj?: any): Promise<any> {
  let queries = '';
  if (paramsObj) {
      try {
          queries = new URLSearchParams(paramsObj).toString();
      } catch(err) {
          console.log('err', err)
      }
  }
  let fullURL = url + (queries ? `?${queries}` : '');
  const response = await fetch(fullURL, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
  });
  return response.json();
}

export const toWeiInv = (n: string, unit?: number) => {
  if (new BigNumber(n).eq(0)) return new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'); 
  return new BigNumber('1').shiftedBy((unit || 18)*2).idiv(new BigNumber(n).shiftedBy(unit || 18));
}

export const padLeft = function(string: string, chars: number, sign?: string){
  return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
}

export const numberToBytes32 = (value: any, prefix?: string) => {
  if (!value) return;
  let v = value;
  if (typeof value == "number") {
    // covert to a hex string
    v = value.toString(16);
  } else if (/^[0-9]*$/.test(value)) {
    // assuming value to be a decimal number, value could be a hex
    v = new BigNumber(value).toString(16);
  } else if (/^(0x)?[0-9A-Fa-f]*$/.test(value)) {
    // value already a hex
    v = value;
  } else if (BigNumber.isBigNumber(value)) {
    v = value.toString(16);
  }
  v = v.replace("0x", "");
  v = padLeft(v, 64);
  if (prefix)
    v = '0x' + v
  return v;
}

export const getParamsFromUrl = () => {
  const startIdx = window.location.href.indexOf("?");
  const search = window.location.href.substring(startIdx, window.location.href.length)
  const queryString = search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
}

export const formatNumberValue = (data: any, tokenMap: TokenMapType) => {
  const { title, value, symbol, icon, prefix, isWrapped } = data;
  try {
    let limitDecimals = 18;
    if (symbol) {
      let symb = symbol;
      if (symb.includes('/')) {
        symb = symb.split('/')[0];
      }
      if (symbol === 'USD') {
        limitDecimals = 2;
      } else {
        const tokenObj = Object.values(tokenMap).find((token: any) => token.symbol === symb) as any;
        if (tokenObj) {
          limitDecimals = tokenObj.decimals || 18;
        }
      }
    }
    const val = parseFloat(value);
    const minValue = 0.0001;
    let result;
    let tooltip = `${value}`;
    if (val === 0) {
      result = `0`;
    } else if (val < minValue) {
      if (prefix === '$') {
        result = `< ${prefix}${minValue}`;
      } else if (prefix) {
        result = `${prefix.replace('=', '')} < ${minValue}`;
      } else {
        result = `< ${minValue}`;
      }
      tooltip = val.toLocaleString('en-US', { maximumFractionDigits: limitDecimals });
    } else {
      const stringValue = value.toString();
      const decimalsIndex = stringValue.indexOf('.');
      const length = decimalsIndex < 0 ? stringValue.length : stringValue.length - 1;
      let valueFormatted = val.toLocaleString('en-US', { maximumFractionDigits: limitDecimals });
      const arr = valueFormatted.split('.');
      valueFormatted = arr[0];
      if (arr[1]) {
        valueFormatted = `${arr[0]}.${arr[1].substr(0, 4)}`;
      }
      if (length <= 7) {
        result = valueFormatted;
      } else if (decimalsIndex > 7) {
        result = `${valueFormatted.substr(0, 9)}...`;
      } else if (decimalsIndex > -1) {
        result = valueFormatted;
      } else {
        const finalVal = valueFormatted.substr(0, 13);
        result = `${finalVal}${length > 10 ? '...' : ''}`;
      }
      if (result.length > 20 && !result.includes('...')) {
        result = `${result.substr(0, 13)}...`;
      }

      // Format value for the tooltip
      const parts = stringValue.split('.');
      const intVal = parseInt(parts[0]).toLocaleString('en-US');
      tooltip = `${intVal}`;
      if (parts[1]) {
        let decVal = parts[1];
        if (parts[1].length > limitDecimals) {
          decVal = parseFloat(`0.${parts[1]}`).toLocaleString('en-US', { maximumFractionDigits: limitDecimals });
          if (decVal == 1) {
            decVal = parts[1].substr(0, limitDecimals);
          } else {
            decVal = decVal.substr(2);
          }
        }
        tooltip += `.${decVal}`;
      }
    }
    if (icon) {
      result += ` <img width="20" src="${icon}" style="padding-bottom: 0.15rem" />`;
    }
    if (symbol) {
      result += ` ${symbol}`;
      tooltip += ` ${symbol}`;
    }
    if (prefix) {
      result = `${val < minValue ? '' : prefix}${result}`;
      tooltip = `${prefix}${tooltip}`;
    }
    if (title) {
      result = `${title}: ${result}`;
    }
    if (isWrapped) {
      result = `(${result})`;
    }
    if (symbol === 'USD') {
      return result;
    } else {
      return { result, tooltip }
    }
  } catch {
    return '-';
  }
}

export const uniqWith = (array: any[], compareFn: (cur: any, oth: any) => boolean) => {
  const unique = [];
  for (const cur of array) {
    const isDuplicate = unique.some(oth => compareFn(cur, oth));
    if (!isDuplicate) unique.push(cur);
  }
  return unique;
}

export const getWeekDays = () => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  let days = [];
  let day = d;
  for (let i = 0; i < 7; i++) {
    days.push(day.setDate(day.getDate() + 1));
  }
  return days;
}