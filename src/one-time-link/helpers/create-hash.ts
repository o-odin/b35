import * as crypto from 'crypto';

export enum EHashFunction {
  sha512 = 'sha512',
}

export function createHash(
  hashFunction: EHashFunction,
  string: string,
): string {
  switch (hashFunction) {
    case 'sha512':
      return crypto.createHash('sha512').update(string, 'utf8').digest('hex');
  }
}
