import { IQuestion } from "../interfaces/step.interface";
import { QUESTION_1_DATA } from "./question-1";
import { QUESTION_2_DATA } from "./question-2";
import { QUESTION_3_DATA } from "./question-3";
import { QUESTION_4_DATA } from "./question-4";

export const QUESTION_DATA_MAP: Record<string, IQuestion[]> = {
  question1: QUESTION_1_DATA,
  question2: QUESTION_2_DATA,
  question3: QUESTION_3_DATA,
  question4: QUESTION_4_DATA,
};
