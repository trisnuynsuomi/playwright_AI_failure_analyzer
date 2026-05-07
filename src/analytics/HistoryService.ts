import { prisma }
from '../database/prisma';

export class HistoryService {

  async findByFingerprint(
    fingerprint: string
  ) {

    return prisma.failureRecord.findMany({

      where: {
        fingerprint
      }
    });
  }
}