import { PipeFn } from "./pipes.model";

const pipe = (value: any, ...fns: PipeFn[]): any => {
  return fns.reduce((acc, fn) => fn(acc), value);
};

export const json = (val: any): string => JSON.stringify(val, null, 2);

export const uppercase = (val: string): string => val.toUpperCase();

export const lowercase = (val: string): string => val.toLowerCase();

export const capitalize = (val: string): string =>
  val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();

export const truncate =
  (max: number) =>
  (val: string): string =>
    val.length > max ? val.slice(0, max) + "..." : val;

export const format_empty = (value: any) => {
  const empty = '- - -'

  if (typeof value === 'string' && !value) {
    return empty
  }

  if (value === 'Invalid Date') {
    return empty
  }

  if ([null, undefined].includes(value)) {
    return empty
  }

  return value
}

export default pipe;
