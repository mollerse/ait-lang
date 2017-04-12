// @flow

export default function jsword(name: string, fn: Function) {
  return {
    type: 'js',
    name,
    fn
  };
}
