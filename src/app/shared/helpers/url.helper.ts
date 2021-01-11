export function getQueryParam(prop: any) {
  // tslint:disable-next-line:prefer-const
  let params: any = {};
  const search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  const definitions = search.split('&');
  // tslint:disable-next-line:only-arrow-functions
  definitions.forEach((val, key) => {
    const parts = val.split('=', 2);
    const [part = ''] = parts as any;
    params[part] = parts[1];
  });
  return (prop && prop in params) ? params[prop] : params;
}
