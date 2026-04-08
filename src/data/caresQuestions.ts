import { AssessmentCategory } from "@/types/assessment";

export const assessmentCategories: AssessmentCategory[] = [
  {
    key: "communicate_with_empathy",
    label: "Communicate with Empathy",
    shortLabel: "Communicate",
    description:
      "Measure how consistently you communicate with clarity, empathy, and understanding.",
    order: 1,
    questions: [
      {
        id: "ce_1",
        category: "communicate_with_empathy",
        categoryLabel: "Communicate with Empathy",
        prompt:
          "I actively listen to understand others' perspectives before responding.",
        order: 1,
      },
      {
        id: "ce_2",
        category: "communicate_with_empathy",
        categoryLabel: "Communicate with Empathy",
        prompt:
          "I adapt my communication style and content to different audiences.",
        order: 2,
      },
      {
        id: "ce_3",
        category: "communicate_with_empathy",
        categoryLabel: "Communicate with Empathy",
        prompt:
          "I share information transparently, even when the message is difficult.",
        order: 3,
      },
      {
        id: "ce_4",
        category: "communicate_with_empathy",
        categoryLabel: "Communicate with Empathy",
        prompt:
          "I create safe spaces for honest dialogue and constructive feedback.",
        order: 4,
      },
      {
        id: "ce_5",
        category: "communicate_with_empathy",
        categoryLabel: "Communicate with Empathy",
        prompt:
          "I check for understanding rather than assuming my message is clear.",
        order: 5,
      },
    ],
  },
  {
    key: "adapt_with_agility",
    label: "Adapt with Agility",
    shortLabel: "Adapt",
    description:
      "Assess how well you respond to change with flexibility, innovation, and direction.",
    order: 2,
    questions: [
      {
        id: "aa_1",
        category: "adapt_with_agility",
        categoryLabel: "Adapt with Agility",
        prompt:
          "I view unexpected challenges as opportunities rather than threats.",
        order: 1,
      },
      {
        id: "aa_2",
        category: "adapt_with_agility",
        categoryLabel: "Adapt with Agility",
        prompt: "I adjust plans and approaches based on new information.",
        order: 2,
      },
      {
        id: "aa_3",
        category: "adapt_with_agility",
        categoryLabel: "Adapt with Agility",
        prompt: "I encourage innovative thinking and experimental approaches.",
        order: 3,
      },
      {
        id: "aa_4",
        category: "adapt_with_agility",
        categoryLabel: "Adapt with Agility",
        prompt:
          "I balance flexibility with maintaining clear direction and purpose.",
        order: 4,
      },
      {
        id: "aa_5",
        category: "adapt_with_agility",
        categoryLabel: "Adapt with Agility",
        prompt: "I help others navigate change positively and productively.",
        order: 5,
      },
    ],
  },
  {
    key: "relationships_built_on_trust",
    label: "Relationships Built on Trust",
    shortLabel: "Relationships",
    description:
      "Understand how well you build trust, connection, and reliability across teams.",
    order: 3,
    questions: [
      {
        id: "rt_1",
        category: "relationships_built_on_trust",
        categoryLabel: "Relationships Built on Trust",
        prompt:
          "I invest time in understanding stakeholders' unique needs and concerns.",
        order: 1,
      },
      {
        id: "rt_2",
        category: "relationships_built_on_trust",
        categoryLabel: "Relationships Built on Trust",
        prompt: "I demonstrate reliability by consistently keeping commitments.",
        order: 2,
      },
      {
        id: "rt_3",
        category: "relationships_built_on_trust",
        categoryLabel: "Relationships Built on Trust",
        prompt: "I show vulnerability by admitting mistakes and limitations.",
        order: 3,
      },
      {
        id: "rt_4",
        category: "relationships_built_on_trust",
        categoryLabel: "Relationships Built on Trust",
        prompt:
          "I build connections across organizational boundaries and silos.",
        order: 4,
      },
      {
        id: "rt_5",
        category: "relationships_built_on_trust",
        categoryLabel: "Relationships Built on Trust",
        prompt:
          "I recognize and appreciate others' contributions specifically and sincerely.",
        order: 5,
      },
    ],
  },
  {
    key: "empower_with_trust",
    label: "Empower with Trust",
    shortLabel: "Empower",
    description:
      "Measure how effectively you create conditions for ownership, growth, and accountability.",
    order: 4,
    questions: [
      {
        id: "et_1",
        category: "empower_with_trust",
        categoryLabel: "Empower with Trust",
        prompt:
          "I delegate not just tasks but meaningful authority for decisions.",
        order: 1,
      },
      {
        id: "et_2",
        category: "empower_with_trust",
        categoryLabel: "Empower with Trust",
        prompt: "I provide necessary resources for team members to succeed.",
        order: 2,
      },
      {
        id: "et_3",
        category: "empower_with_trust",
        categoryLabel: "Empower with Trust",
        prompt:
          "I create clear boundaries and expectations for empowered action.",
        order: 3,
      },
      {
        id: "et_4",
        category: "empower_with_trust",
        categoryLabel: "Empower with Trust",
        prompt:
          "I allow space for learning from mistakes rather than punishing them.",
        order: 4,
      },
      {
        id: "et_5",
        category: "empower_with_trust",
        categoryLabel: "Empower with Trust",
        prompt:
          "I develop others' capabilities through coaching rather than directing.",
        order: 5,
      },
    ],
  },
  {
    key: "stay_calm_through_challenges",
    label: "Stay Calm through Challenges",
    shortLabel: "Stay Calm",
    description:
      "Assess your ability to remain grounded and supportive during uncertainty and pressure.",
    order: 5,
    questions: [
      {
        id: "sc_1",
        category: "stay_calm_through_challenges",
        categoryLabel: "Stay Calm through Challenges",
        prompt:
          "I maintain perspective during crises by focusing on what matters most.",
        order: 1,
      },
      {
        id: "sc_2",
        category: "stay_calm_through_challenges",
        categoryLabel: "Stay Calm through Challenges",
        prompt: "I demonstrate emotional regulation when facing setbacks.",
        order: 2,
      },
      {
        id: "sc_3",
        category: "stay_calm_through_challenges",
        categoryLabel: "Stay Calm through Challenges",
        prompt:
          "I create psychological safety for others during high-pressure situations.",
        order: 3,
      },
      {
        id: "sc_4",
        category: "stay_calm_through_challenges",
        categoryLabel: "Stay Calm through Challenges",
        prompt: "I model self-care and sustainable energy management.",
        order: 4,
      },
      {
        id: "sc_5",
        category: "stay_calm_through_challenges",
        categoryLabel: "Stay Calm through Challenges",
        prompt:
          "I help teams maintain focus and purpose despite uncertainty.",
        order: 5,
      },
    ],
  },
];
