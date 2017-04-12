// @flow

export type AitFault = {
  type: 'aitFault',
  cause: string
};

export default function aitFault(cause: string): AitFault {
  return {
    type: 'aitFault',
    cause
  };
}
