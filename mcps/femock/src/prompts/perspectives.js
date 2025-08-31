// prompts/perspectives.js

const perspectives = [
  {
    name: "深度优先视角",
    description: "本次面试请侧重于深度优先。深入挖掘候选人对简历中某一项核心技术的掌握深度，可以连续追问，探究其知识的边界。问题应该非常具体，能够体现技术深度，而不仅仅是广度。"
  },
  {
    name: "问题解决视角",
    description: "本次面试请侧重于问题解决能力。请引导候选人详细阐述一个他曾经遇到的最复杂的技术难题，重点考察他分析问题、设计方案、实施和反思的全过程。"
  },
  {
    name: "工程素养视角",
    description: "本次面试请侧重于工程素-养。问题应围绕代码质量、可维护性、测试覆盖率、文档规范、CI/CD流程等方面展开，评估候选人是否具备良好的工程习惯和团队协作意识。"
  },
  {
    name: "业务导向视角",
    description: "本次面试请侧重于业务导向。请引导候选人阐述其技术方案如何为业务目标服务，如何理解业务需求，以及如何通过数据指标来衡量技术方案的业务价值。"
  },
  {
    name: "创新与前瞻视角",
    description: "本次面试请侧重于创新与前瞻性。问题应考察候选人对新技术的敏感度、学习能力，以及对他所从事领域未来技术发展的思考和个人规划。"
  }
];

export function getRandomPerspective() {
  const index = Math.floor(Math.random() * perspectives.length);
  return perspectives[index];
}
