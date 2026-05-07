import crypto from 'crypto';

export class FingerprintService {

  generate(
    title: string,
    error: string
  ) {

    return crypto
      .createHash('md5')
      .update(title + error)
      .digest('hex');
  }
}