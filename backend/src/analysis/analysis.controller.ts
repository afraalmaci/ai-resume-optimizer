import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { getDocumentProxy, extractText } from "unpdf";
import { extractSkills } from "./engine/skill-extractor";
import { normalizeSkill } from "./engine/skill-normalizer";
import { calculateATSScore } from "./engine/ats-scorer";
@Controller("analysis")
export class AnalysisController {
  @Post()
  @UseInterceptors(FileInterceptor("resume"))
  async analyzeResume(
    @UploadedFile() file: Express.Multer.File,
    @Body("jobDescription") jobDescription: string
  ) {
    if (!file) throw new Error("No file uploaded");

    // ===== PDF PARSE =====
    const pdfProxy = await getDocumentProxy(new Uint8Array(file.buffer));
    const result = await extractText(pdfProxy, { mergePages: true });

    let resumeText = "";

    if (typeof result.text === "string") {
      resumeText = result.text;
    } else if (Array.isArray(result.text)) {
      resumeText = (result.text as string[]).join("\n");
    }

    console.log("===== DEBUG =====");
    console.log("Resume Text:", resumeText.slice(0, 500));
    console.log("Job Description:", jobDescription);

    // ===== SKILL EXTRACTION =====
    const resumeSkillsRaw = extractSkills(resumeText);
    const jobSkillsRaw = extractSkills(jobDescription);

    console.log("Raw resume skills:", resumeSkillsRaw);
    console.log("Raw job skills:", jobSkillsRaw);

    // ===== NORMALIZATION =====
    const resumeSkills = resumeSkillsRaw.map((s) => normalizeSkill(s));
    const jobSkills = jobSkillsRaw.map((s) => normalizeSkill(s));

    console.log("Normalized resume skills:", resumeSkills);
    console.log("Normalized job skills:", jobSkills);

    // ===== ATS SCORE ENGINE =====
    const atsResult = calculateATSScore(jobSkills, resumeSkills);

    console.log("ATS Result:", atsResult);
    console.log("=================");

    return {
      score: atsResult.score,
      resumeSkills,
      jobSkills,
      missingSkills: atsResult.missingSkills,
      matches: atsResult.matches,
    };
  }
}