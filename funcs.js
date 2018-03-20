export function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

export function encode(string) {
  var number = "0x";
  var length = string.length;
  for (var i = 0; i < length; i++)
    number += string.charCodeAt(i).toString(16);
  return number;
}

export function tellPos(p){
  curx=p.pageX;
  cury=p.pageY;
}