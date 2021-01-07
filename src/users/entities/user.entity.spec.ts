import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('User Entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.salt = 'testSalt';
    user.password = 'testPassword';
    bcrypt.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns true if password is valid', async () => {
      bcrypt.hash.mockResolvedValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('password');
      expect(bcrypt.hash).toHaveBeenCalledWith('password', user.salt);
      expect(result).toEqual(true);
    });

    it('returns false if password is invalid', async () => {
      bcrypt.hash.mockResolvedValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('password');
      expect(bcrypt.hash).toHaveBeenCalledWith('password', user.salt);
      expect(result).toEqual(false);
    });
  });
});
