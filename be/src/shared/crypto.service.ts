import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const ALGORITHM = 'aes-256-gcm';
const VERSION_PREFIX = 'enc:v1';
const IV_LENGTH = 12; // 96-bit nonce, the recommended size for GCM
const KEY_LENGTH = 32; // 256-bit key
const ENVELOPE_PARTS = 5; // enc : v1 : iv : tag : ciphertext

/**
 * Application-layer encryption at rest for user content.
 *
 * Uses AES-256-GCM (authenticated encryption), so stored values are both
 * unreadable and tamper-evident: a modified ciphertext fails the auth tag
 * check instead of decrypting to garbage.
 *
 * Values are stored as `enc:v1:<iv>:<tag>:<ciphertext>` (base64 parts). The
 * version prefix lets us detect legacy plaintext and rotate the scheme later.
 *
 * Threat model: this protects the data at rest — a database dump, a leaked
 * backup, or read access to MongoDB yields ciphertext only. It does NOT
 * protect against a compromised application server, which holds the key.
 */
@Injectable()
export class CryptoService {
  private readonly logger = new Logger(CryptoService.name);
  private readonly key: Buffer;

  constructor(configService: ConfigService) {
    const rawKey = configService.get<string>('ENCRYPTION_KEY');
    const key = Buffer.from(rawKey, 'hex');

    if (key.length !== KEY_LENGTH) {
      throw new Error(
        'ENCRYPTION_KEY must be 32 bytes encoded as 64 hex characters.',
      );
    }

    this.key = key;
  }

  isEncrypted(value: unknown): boolean {
    return typeof value === 'string' && value.startsWith(`${VERSION_PREFIX}:`);
  }

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);
    const ciphertext = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);

    return [
      VERSION_PREFIX,
      iv.toString('base64'),
      cipher.getAuthTag().toString('base64'),
      ciphertext.toString('base64'),
    ].join(':');
  }

  /**
   * Decrypts a stored value. Values written before encryption was introduced
   * are returned unchanged, so old and new rows can coexist.
   */
  decrypt(value: string): string {
    if (!this.isEncrypted(value)) {
      return value;
    }

    const parts = value.split(':');
    if (parts.length !== ENVELOPE_PARTS) {
      throw new Error('Malformed encrypted value.');
    }

    const [, , ivPart, tagPart, dataPart] = parts;
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      this.key,
      Buffer.from(ivPart, 'base64'),
    );
    decipher.setAuthTag(Buffer.from(tagPart, 'base64'));

    return Buffer.concat([
      decipher.update(Buffer.from(dataPart, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }

  /**
   * Read-path variant: a single unreadable row must not break a whole list,
   * so failures are logged and surfaced in place instead of thrown.
   */
  decryptSafe(value: string, context?: string): string {
    try {
      return this.decrypt(value);
    } catch {
      this.logger.error(`Failed to decrypt value${context ? ` (${context})` : ''}.`);
      return '⚠️ Unable to decrypt';
    }
  }
}
