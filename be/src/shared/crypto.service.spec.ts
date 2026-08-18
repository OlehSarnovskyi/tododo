import { ConfigService } from '@nestjs/config';
import { CryptoService } from './crypto.service';

const TEST_KEY = 'a'.repeat(64);

function createService(key: string = TEST_KEY): CryptoService {
  return new CryptoService({ get: () => key } as unknown as ConfigService);
}

describe('CryptoService', () => {
  it('round-trips a value', () => {
    const service = createService();
    const plaintext = 'Купити квіти та торт 🎂';

    expect(service.decrypt(service.encrypt(plaintext))).toBe(plaintext);
  });

  it('does not store the plaintext anywhere in the ciphertext', () => {
    const encrypted = createService().encrypt('secret task');

    expect(encrypted).toContain('enc:v1:');
    expect(encrypted).not.toContain('secret task');
  });

  it('produces a different ciphertext each time', () => {
    const service = createService();

    // A fresh IV per write means identical tasks are not linkable in the database.
    expect(service.encrypt('same text')).not.toBe(service.encrypt('same text'));
  });

  it('rejects a tampered ciphertext', () => {
    const service = createService();
    const [prefix, version, iv, tag] = service.encrypt('original').split(':');
    const forged = [prefix, version, iv, tag, Buffer.from('forged').toString('base64')].join(':');

    expect(() => service.decrypt(forged)).toThrow();
  });

  it('rejects a value encrypted with a different key', () => {
    const encrypted = createService('a'.repeat(64)).encrypt('original');

    expect(() => createService('b'.repeat(64)).decrypt(encrypted)).toThrow();
  });

  it('passes legacy plaintext through unchanged', () => {
    const service = createService();

    expect(service.isEncrypted('plain task')).toBe(false);
    expect(service.decrypt('plain task')).toBe('plain task');
  });

  it('surfaces undecryptable values instead of throwing on reads', () => {
    expect(createService().decryptSafe('enc:v1:bad:bad:bad')).toBe('⚠️ Unable to decrypt');
  });

  it('refuses a key of the wrong size', () => {
    expect(() => createService('abcd')).toThrow(/32 bytes/);
  });
});
