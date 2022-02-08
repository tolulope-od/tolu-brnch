export const truncateText = (str, length, ending) => {
  let stringLength = length;
  let stringEnding = ending;
  if (stringLength == null) {
    stringLength = 100;
  }
  if (ending == null) {
    stringEnding = '...';
  }
  if (str.length > stringLength) {
    return str.substring(0, stringLength - stringEnding.length) + stringEnding;
  }

  if (str.length < stringLength) {
    const remaining = stringLength - str.length;
    return str + new Array(remaining + 1).join(' ');
  }
  return str;
};