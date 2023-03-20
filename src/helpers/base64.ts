const encode = (str: string) =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(parseInt(`0x${p1}`, 16)),
    ),
  );

const decode = (str: string) =>
  decodeURIComponent(
    atob(str)
      .split('')
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

export default { encode, decode };
