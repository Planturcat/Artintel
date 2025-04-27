"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ModelBenchmarks() {
  const [benchmarkType, setBenchmarkType] = useState<
    "reasoning" | "knowledge" | "coding" | "creative"
  >("reasoning");

  const getBenchmarkData = () => {
    switch (benchmarkType) {
      case "reasoning":
        return {
          title: "Reasoning & Problem Solving",
          description:
            "Performance on mathematical reasoning, logical deduction, and complex problem solving tasks.",
          benchmarks: [
            {
              name: "GSM8K (Math)",
              description: "Grade school math word problems",
            },
            { name: "LogiQA", description: "Logical reasoning questions" },
            {
              name: "MMLU",
              description: "Massive multitask language understanding",
            },
            {
              name: "BIG-Bench Hard",
              description: "Challenging reasoning tasks",
            },
          ],

          results: [
            { model: "Phoenix-7B", scores: [57.3, 42.1, 68.2, 51.8] },
            { model: "Phoenix-20B", scores: [68.9, 53.7, 75.6, 63.2] },
            { model: "Codex-12B", scores: [71.2, 48.5, 62.1, 55.9] },
            { model: "Phoenix-30B", scores: [76.5, 61.8, 82.3, 72.4] },
            { model: "Scholar-15B", scores: [72.1, 57.2, 79.8, 67.5] },
            { model: "Multilingual-10B", scores: [62.5, 45.3, 71.4, 58.1] },
          ],
        };
      case "knowledge":
        return {
          title: "Knowledge & Factuality",
          description:
            "Accuracy of factual information and breadth of knowledge across various domains.",
          benchmarks: [
            {
              name: "TruthfulQA",
              description: "Measuring truthfulness in answers",
            },
            {
              name: "NaturalQuestions",
              description: "Real user queries from Google Search",
            },
            {
              name: "TriviaQA",
              description: "Trivia questions across domains",
            },
            {
              name: "MMLU (Humanities)",
              description: "Knowledge in humanities subjects",
            },
          ],

          results: [
            { model: "Phoenix-7B", scores: [61.8, 58.2, 65.3, 63.7] },
            { model: "Phoenix-20B", scores: [72.3, 67.8, 74.5, 72.1] },
            { model: "Codex-12B", scores: [58.7, 55.3, 61.2, 57.8] },
            { model: "Phoenix-30B", scores: [78.9, 75.2, 81.7, 79.3] },
            { model: "Scholar-15B", scores: [76.2, 72.8, 78.5, 81.2] },
            { model: "Multilingual-10B", scores: [67.3, 63.5, 69.8, 66.2] },
          ],
        };
      case "coding":
        return {
          title: "Code Generation & Understanding",
          description:
            "Ability to generate correct code and understand programming concepts.",
          benchmarks: [
            { name: "HumanEval", description: "Python function generation" },
            { name: "MBPP", description: "Basic programming problems" },
            {
              name: "CodeContests",
              description: "Competitive programming tasks",
            },
            { name: "DS-1000", description: "Data science coding tasks" },
          ],

          results: [
            { model: "Phoenix-7B", scores: [42.5, 48.3, 21.7, 38.2] },
            { model: "Phoenix-20B", scores: [51.2, 57.8, 28.3, 47.5] },
            { model: "Codex-12B", scores: [78.4, 82.1, 45.6, 72.3] },
            { model: "Phoenix-30B", scores: [63.7, 68.2, 35.1, 58.9] },
            { model: "Scholar-15B", scores: [48.3, 53.7, 25.8, 51.2] },
            { model: "Multilingual-10B", scores: [39.8, 45.2, 19.3, 35.7] },
          ],
        };
      case "creative":
        return {
          title: "Creative Writing & Generation",
          description:
            "Quality and creativity of generated content across different formats.",
          benchmarks: [
            {
              name: "WritingPrompts",
              description: "Creative story generation",
            },
            { name: "SummEval", description: "Text summarization quality" },
            {
              name: "MT-Bench",
              description: "Multi-turn conversation quality",
            },
            { name: "CreativeQA", description: "Creative problem solving" },
          ],

          results: [
            { model: "Phoenix-7B", scores: [72.3, 68.5, 65.2, 61.8] },
            { model: "Phoenix-20B", scores: [81.7, 76.3, 74.8, 72.5] },
            { model: "Codex-12B", scores: [65.8, 61.2, 58.7, 55.3] },
            { model: "Phoenix-30B", scores: [87.2, 82.5, 81.3, 78.9] },
            { model: "Scholar-15B", scores: [78.5, 75.2, 71.8, 69.3] },
            { model: "Multilingual-10B", scores: [75.3, 71.8, 68.5, 64.2] },
          ],
        };
    }
  };

  const data = getBenchmarkData();

  return (
    <div className="p-6 font-mono" data-oid="3of2a2a">
      <div className="flex items-center gap-4 mb-6" data-oid="t:en:ie">
        <div className="text-[#00cddd]" data-oid="50zy9_.">
          &gt; show benchmarks --category=
        </div>
        <div className="flex flex-wrap gap-2" data-oid="yjpm.2:">
          <Button
            size="sm"
            variant={benchmarkType === "reasoning" ? "default" : "outline"}
            className={
              benchmarkType === "reasoning" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setBenchmarkType("reasoning")}
            data-oid="o-.q6xt"
          >
            reasoning
          </Button>
          <Button
            size="sm"
            variant={benchmarkType === "knowledge" ? "default" : "outline"}
            className={
              benchmarkType === "knowledge" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setBenchmarkType("knowledge")}
            data-oid="mauwdr:"
          >
            knowledge
          </Button>
          <Button
            size="sm"
            variant={benchmarkType === "coding" ? "default" : "outline"}
            className={
              benchmarkType === "coding" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setBenchmarkType("coding")}
            data-oid="yanm1q0"
          >
            coding
          </Button>
          <Button
            size="sm"
            variant={benchmarkType === "creative" ? "default" : "outline"}
            className={
              benchmarkType === "creative" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setBenchmarkType("creative")}
            data-oid="zmp0eor"
          >
            creative
          </Button>
        </div>
      </div>

      <div className="mb-4" data-oid="lhb:chg">
        <h3 className="text-lg font-bold mb-1" data-oid="myv_zhf">
          {data.title}
        </h3>
        <p className="text-muted-foreground text-sm" data-oid="ks4vabf">
          {data.description}
        </p>
      </div>

      <div className="overflow-x-auto" data-oid="ki70dmj">
        <table className="w-full text-sm" data-oid="n-u:wpq">
          <thead data-oid="xji9886">
            <tr className="border-b border-border/40" data-oid="bv8jjn6">
              <th className="py-2 px-4 text-left" data-oid="v:zup0g">
                Model
              </th>
              {data.benchmarks.map((benchmark, index) => (
                <th
                  key={index}
                  className="py-2 px-4 text-center"
                  data-oid=".5tourf"
                >
                  <div data-oid="a1w96ty">{benchmark.name}</div>
                  <div
                    className="text-xs text-muted-foreground font-normal"
                    data-oid="8spj489"
                  >
                    {benchmark.description}
                  </div>
                </th>
              ))}
              <th className="py-2 px-4 text-center" data-oid="emkaomm">
                Average
              </th>
            </tr>
          </thead>
          <tbody data-oid="5::ly1w">
            {data.results.map((result, index) => {
              const average =
                result.scores.reduce((a, b) => a + b, 0) / result.scores.length;

              return (
                <tr
                  key={index}
                  className={
                    index < data.results.length - 1
                      ? "border-b border-border/40"
                      : ""
                  }
                  data-oid="th92jr9"
                >
                  <td className="py-2 px-4 font-medium" data-oid="r20s:3p">
                    {result.model}
                  </td>
                  {result.scores.map((score, scoreIndex) => (
                    <td
                      key={scoreIndex}
                      className="py-2 px-4 text-center"
                      data-oid="42dc5c8"
                    >
                      {score.toFixed(1)}%
                    </td>
                  ))}
                  <td
                    className="py-2 px-4 text-center font-bold text-[#00cddd]"
                    data-oid="p5rkkyf"
                  >
                    {average.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-xs text-muted-foreground" data-oid="41suv1x">
        Note: All benchmarks were run on the same hardware configuration. Higher
        percentages indicate better performance.
      </div>
    </div>
  );
}
