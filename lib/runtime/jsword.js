// @flow

export default function jsword(fn: Function, name: string = '[Native Function]') {
  return {
    type: 'js',
    name,
    fn
  };
}
