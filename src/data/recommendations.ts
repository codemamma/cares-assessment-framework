import { CareCategoryKey } from "@/types/assessment";

interface Chapter {
  number: number;
  title: string;
  reason: string;
}

interface CategoryRecommendation {
  recommendations: string[];
  chapters: Chapter[];
}

export const recommendationsByCategory: Record<
  CareCategoryKey,
  CategoryRecommendation
> = {
  communicate_with_empathy: {
    recommendations: [
      "Practice the 'listen first' principle: in your next three meetings, commit to fully understanding the other person's perspective before sharing your own.",
      "Identify one stakeholder group and intentionally adapt how you communicate with them — simplify language, change the medium, or shift your tone to match their context.",
      "Create a weekly check-in ritual where team members can share concerns openly, signaling that transparency is safe and valued.",
    ],
    chapters: [
      {
        number: 2,
        title: "The Power of Empathic Communication",
        reason:
          "Provides foundational frameworks for listening at a deeper level and adapting your message to different audiences.",
      },
      {
        number: 3,
        title: "Transparent Leadership Conversations",
        reason:
          "Explores how leaders build trust by sharing difficult truths with clarity and care.",
      },
      {
        number: 4,
        title: "Creating Psychologically Safe Dialogue",
        reason:
          "Offers practical tools for creating conditions where honest conversation flourishes.",
      },
    ],
  },
  adapt_with_agility: {
    recommendations: [
      "The next time a plan changes unexpectedly, pause before reacting and ask: 'What opportunity might this create?' Reframe the disruption for your team.",
      "Introduce a short 'experiment review' in your team meetings — celebrate one thing that was tried, regardless of outcome, to normalize a culture of learning.",
      "Identify one rigid process or assumption in your team's work and challenge it openly. Invite others to co-design a more flexible alternative.",
    ],
    chapters: [
      {
        number: 5,
        title: "Agility in Action",
        reason:
          "Breaks down how leaders can build adaptive capacity without losing focus or direction.",
      },
      {
        number: 6,
        title: "Leading Through Disruption",
        reason:
          "Examines real-world cases of leaders who turned setbacks into strategic advantages.",
      },
      {
        number: 7,
        title: "Innovation and Experimentation Culture",
        reason:
          "Provides a model for cultivating teams that embrace change as a competitive strength.",
      },
    ],
  },
  relationships_built_on_trust: {
    recommendations: [
      "Schedule one-on-one conversations this week with team members you haven't connected with recently — ask about their goals, not just their tasks.",
      "Make a specific commitment to someone this week and follow through visibly. Then acknowledge it. Trust is built one kept promise at a time.",
      "Practice vulnerability in a low-risk moment — admit a mistake or limitation openly in a team setting to model psychological safety.",
    ],
    chapters: [
      {
        number: 8,
        title: "Trust as a Leadership Currency",
        reason:
          "Deep dive into how trust is built, broken, and rebuilt across organizational relationships.",
      },
      {
        number: 9,
        title: "The Relational Leader",
        reason:
          "Explores how leaders who prioritize human connection drive higher-performing teams.",
      },
      {
        number: 10,
        title: "Vulnerability and Credibility",
        reason:
          "Challenges the myth that leaders must appear infallible — and shows how admitting limits builds authority.",
      },
    ],
  },
  empower_with_trust: {
    recommendations: [
      "Identify one decision you currently make that could be delegated — not just the task, but the authority to decide. Transfer it intentionally this week.",
      "Ask each team member what one resource or support they need to do their best work. Commit to removing at least one blocker.",
      "After a team member makes a mistake, shift your first response to curiosity: 'What did you learn from this?' rather than correction.",
    ],
    chapters: [
      {
        number: 11,
        title: "The Art of Empowering Others",
        reason:
          "Covers the mindset shift from controlling to enabling, and the leadership behaviors that create genuine ownership.",
      },
      {
        number: 12,
        title: "Coaching Over Commanding",
        reason:
          "Practical frameworks for shifting from directing work to developing people.",
      },
      {
        number: 13,
        title: "Accountability Without Fear",
        reason:
          "Explores how to create high expectations and accountability while preserving psychological safety.",
      },
    ],
  },
  stay_calm_through_challenges: {
    recommendations: [
      "Build a personal 'grounding practice' — a brief daily ritual (5 minutes of reflection, a walk, intentional breathing) that helps you reset before high-stakes interactions.",
      "In your next high-pressure situation, notice your first instinct and pause before acting. Name the emotion to yourself before responding to the situation.",
      "Be deliberate about the emotional tone you set in team meetings during stress. Your composure is the thermostat — it sets the room's temperature.",
    ],
    chapters: [
      {
        number: 14,
        title: "Composure Under Fire",
        reason:
          "Examines how the most effective leaders maintain calm under pressure and what that communicates to their teams.",
      },
      {
        number: 15,
        title: "Resilience as a Leadership Practice",
        reason:
          "Provides a framework for building personal and organizational resilience before crises hit.",
      },
      {
        number: 16,
        title: "Thoughtful Response vs. Reactive Leadership",
        reason:
          "Explores the neuroscience of leadership under stress and how to train yourself to respond rather than react.",
      },
    ],
  },
};
