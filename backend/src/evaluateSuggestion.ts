import { suggestion_service } from "./apis/Suggestion/suggestion_service";
import { JobCategory } from "./apis/Job/job_types";

const SAMPLES: { complaint: string; expected: JobCategory }[] = [
  { complaint: "phone fell in water, screen flickers", expected: "water damage" },
  { complaint: "dropped it on the road and the glass is shattered, touch works in some places", expected: "screen" },
  { complaint: "display shows green lines after a fall", expected: "screen" },
  { complaint: "touch stopped responding in the bottom half of the screen", expected: "screen" },
  { complaint: "battery goes from 100 to 20 in two hours even when I do nothing", expected: "battery" },
  { complaint: "back cover is lifting, the battery looks swollen", expected: "battery" },
  { complaint: "phone switches off at 30 percent and won't turn on until plugged in", expected: "battery" },
  { complaint: "my son spilled tea on it and now the speaker sounds muffled", expected: "water damage" },
  { complaint: "it went through the washing machine in my jeans pocket", expected: "water damage" },
  { complaint: "stuck on the logo screen and keeps restarting after the update", expected: "software" },
  { complaint: "apps keep crashing and the phone is very slow, lots of pop up ads", expected: "software" },
  { complaint: "forgot my pattern lock, need the phone unlocked", expected: "software" },
  { complaint: "only charges if I hold the cable at an angle", expected: "charging port" },
  { complaint: "charger cable feels loose and falls out, computer doesn't detect the phone", expected: "charging port" },
  { complaint: "not charging at all, tried three different chargers, there is lint in the port", expected: "charging port" },
];

async function main() {
  let correct = 0;

  for (const [index, sample] of SAMPLES.entries()) {
    try {
      const { data } = await suggestion_service.suggest(sample.complaint);
      const isCorrect = data.category === sample.expected;
      if (isCorrect) correct++;
      console.log(
        `${index + 1}. ${isCorrect ? "PASS" : "FAIL"} | expected: ${sample.expected} | got: ${data.category} | ${data.likely_fault}`,
      );
    } catch (error) {
      console.log(`${index + 1}. ERROR | ${(error as Error).message}`);
    }
  }

  console.log(`\nCorrect categories: ${correct}/${SAMPLES.length}`);
}

main();
