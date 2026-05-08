import { prisma } from '../database/prisma'

export type SaveFailureHistoryInput = {
  testTitle: string
  fingerprint: string
  errorMessage: string
  aiSummary: string
  timestamp?: Date
}

export class HistoryService {
  static async save(input: SaveFailureHistoryInput) {
    return prisma.failureRecord.create({
      data: {
        testTitle: input.testTitle,
        fingerprint: input.fingerprint,
        errorMessage: input.errorMessage,
        aiSummary: input.aiSummary,
        timestamp: input.timestamp ?? new Date(),
      },
    })
  }

  static async findByFingerprint(fingerprint: string) {
    return prisma.failureRecord.findMany({
      where: {
        fingerprint,
      },
      orderBy: {
        timestamp: 'desc',
      },
    })
  }

  static async findLatestByFingerprint(fingerprint: string) {
    return prisma.failureRecord.findFirst({
      where: {
        fingerprint,
      },
      orderBy: {
        timestamp: 'desc',
      },
    })
  }
}