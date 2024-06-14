import { EHashFunction, createHash } from './create-hash';

describe('create hash', () => {
  it(EHashFunction.sha512, () => {
    expect(createHash(EHashFunction.sha512, '0123456789')).toEqual(
      'bb96c2fc40d2d54617d6f276febe571f623a8dadf0b734855299b0e107fda32cf6b69f2da32b36445d73690b93cbd0f7bfc20e0f7f28553d2a4428f23b716e90',
    );
  });
});
