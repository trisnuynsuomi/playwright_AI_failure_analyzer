import { prisma } from "../database/prisma";
import { GoogleSheetExporter } from "./GoogleSheetExporter";

function getArgValue(name: string) {
  const arg = process.argv.find((item) => item.startsWith(`--${name}=`));

  return arg?.split("=")[1];
}

async function getLatestRunId() {
  const latestRecord = await prisma.failureRecord.findFirst({
    orderBy: {
      timestamp: "desc",
    },
  });

  return latestRecord?.runId;
}

async function run() {
  const sheetName = getArgValue("sheetName");

  if (!sheetName) {
    throw new Error(
      "Missing --sheetName\nExample: npm run report:sheet -- --sheetName=staging-smoke",
    );
  }

  // priority:
  // terminal arg
  // latest run in DB

  const runId = getArgValue("runId") || (await getLatestRunId());

  if (!runId) {
    throw new Error("No runId found");
  }

  console.log(`Using runId: ${runId}`);

  const records = await prisma.failureRecord.findMany({
    where: {
      runId,
    },

    orderBy: {
      timestamp: "desc",
    },
  });

  console.log(`Found ${records.length} failure records`);

  if (records.length === 0) {
    console.log("No records found, skipping export");

    return;
  }

  const exporter = new GoogleSheetExporter();

  await exporter.export(sheetName, records);

  console.log(`
Export completed

Sheet:
${sheetName}

RunId:
${runId}

Exported:
${records.length} records
`);
}

run()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
