import { prisma }
from '../database/prisma';

import {
  ExcelExporter
}
from './ExcelExporter';

async function run() {

  const records =
    await prisma.failureRecord
      .findMany();

  const exporter =
    new ExcelExporter();

  await exporter.export(records);
}

run();