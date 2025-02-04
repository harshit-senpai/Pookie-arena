import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
  {
    questionText: "You regularly make new friends.",
    dimension: "extraversion",
    polarity: 1,
  },
  {
    questionText:
      "Complex and novel ideas excite you more than simple and straightforward ones.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText:
      "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",
    dimension: "agreeableness",
    polarity: 1,
  },
  {
    questionText: "Your living and working spaces are clean and organized.",
    dimension: "conscientiousness",
    polarity: 1,
  },
  {
    questionText: "You usually stay calm, even under a lot of pressure.",
    dimension: "neuroticism",
    polarity: -1,
  },
  {
    questionText:
      "You find the idea of networking or promoting yourself to strangers very daunting.",
    dimension: "extraversion",
    polarity: -1,
  },
  {
    questionText:
      "You prioritize and plan tasks effectively, often completing them well before the deadline.",
    dimension: "conscientiousness",
    polarity: 1,
  },
  {
    questionText:
      "People’s stories and emotions speak louder to you than numbers or data.",
    dimension: "agreeableness",
    polarity: 1,
  },
  {
    questionText: "You like to use organizing tools like schedules and lists.",
    dimension: "conscientiousness",
    polarity: 1,
  },
  {
    questionText:
      "Even a small mistake can cause you to doubt your overall abilities and knowledge.",
    dimension: "neuroticism",
    polarity: 1,
  },
  {
    questionText:
      "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
    dimension: "extraversion",
    polarity: 1,
  },
  {
    questionText:
      "You are not too interested in discussions about various interpretations of creative works.",
    dimension: "openness",
    polarity: -1,
  },
  {
    questionText:
      "You prioritize facts over people’s feelings when determining a course of action.",
    dimension: "agreeableness",
    polarity: -1,
  },
  {
    questionText:
      "You often allow the day to unfold without any schedule at all.",
    dimension: "conscientiousness",
    polarity: -1,
  },
  {
    questionText:
      "You rarely worry about whether you make a good impression on people you meet.",
    dimension: "neuroticism",
    polarity: -1,
  },
  {
    questionText: "You enjoy participating in team-based activities.",
    dimension: "extraversion",
    polarity: 1,
  },
  {
    questionText: "You enjoy experimenting with new and untested approaches.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText:
      "You prioritize being sensitive over being completely honest.",
    dimension: "agreeableness",
    polarity: 1,
  },
  {
    questionText:
      "You actively seek out new experiences and knowledge areas to explore.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText:
      "You are prone to worrying that things will take a turn for the worse.",
    dimension: "neuroticism",
    polarity: 1,
  },
  {
    questionText:
      "You enjoy solitary hobbies or activities more than group ones.",
    dimension: "extraversion",
    polarity: -1,
  },
  {
    questionText:
      "You cannot imagine yourself writing fictional stories for a living.",
    dimension: "openness",
    polarity: -1,
  },
  {
    questionText:
      "You favor efficiency in decisions, even if it means disregarding some emotional aspects.",
    dimension: "agreeableness",
    polarity: -1,
  },
  {
    questionText:
      "You prefer to do your chores before allowing yourself to relax.",
    dimension: "conscientiousness",
    polarity: 1,
  },
  {
    questionText:
      "In disagreements, you prioritize proving your point over preserving the feelings of others.",
    dimension: "agreeableness",
    polarity: -1,
  },
  {
    questionText:
      "You usually wait for others to introduce themselves first at social gatherings.",
    dimension: "extraversion",
    polarity: -1,
  },
  {
    questionText: "Your mood can change very quickly.",
    dimension: "neuroticism",
    polarity: 1,
  },
  {
    questionText: "You are not easily swayed by emotional arguments.",
    dimension: "agreeableness",
    polarity: -1,
  },
  {
    questionText: "You often end up doing things at the last possible moment.",
    dimension: "conscientiousness",
    polarity: -1,
  },
  {
    questionText: "You enjoy debating ethical dilemmas.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText:
      "You usually prefer to be around others rather than on your own.",
    dimension: "extraversion",
    polarity: 1,
  },
  {
    questionText:
      "You become bored or lose interest when the discussion gets highly theoretical.",
    dimension: "openness",
    polarity: -1,
  },
  {
    questionText:
      "When facts and feelings conflict, you usually find yourself following your heart.",
    dimension: "agreeableness",
    polarity: 1,
  },
  {
    questionText:
      "You find it challenging to maintain a consistent work or study schedule.",
    dimension: "conscientiousness",
    polarity: -1,
  },
  {
    questionText: "You rarely second-guess the choices that you have made.",
    dimension: "neuroticism",
    polarity: -1,
  },
  {
    questionText: "Your friends would describe you as lively and outgoing.",
    dimension: "extraversion",
    polarity: 1,
  },
  {
    questionText:
      "You are drawn to various forms of creative expression, such as writing.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText:
      "You usually base your choices on objective facts rather than emotional impressions.",
    dimension: "agreeableness",
    polarity: -1,
  },
  {
    questionText: "You like to have a to-do list for each day.",
    dimension: "conscientiousness",
    polarity: 1,
  },
  {
    questionText: "You rarely feel insecure.",
    dimension: "neuroticism",
    polarity: -1,
  },
  {
    questionText: "You avoid making phone calls.",
    dimension: "extraversion",
    polarity: -1,
  },
  {
    questionText: "You enjoy exploring unfamiliar ideas and viewpoints.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText: "You can easily connect with people you have just met.",
    dimension: "extraversion",
    polarity: 1,
  },
  {
    questionText:
      "If your plans are interrupted, your top priority is to get back on track as soon as possible.",
    dimension: "conscientiousness",
    polarity: 1,
  },
  {
    questionText:
      "You are still bothered by mistakes that you made a long time ago.",
    dimension: "neuroticism",
    polarity: 1,
  },
  {
    questionText:
      "You are not too interested in discussing theories on what the world could look like in the future.",
    dimension: "openness",
    polarity: -1,
  },
  {
    questionText: "Your emotions control you more than you control them.",
    dimension: "neuroticism",
    polarity: 1,
  },
  {
    questionText:
      "When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",
    dimension: "agreeableness",
    polarity: 1,
  },
  {
    questionText:
      "Your personal work style is closer to spontaneous bursts of energy than organized and consistent efforts.",
    dimension: "conscientiousness",
    polarity: -1,
  },
  {
    questionText:
      "When someone thinks highly of you, you wonder how long it will take them to feel disappointed in you.",
    dimension: "neuroticism",
    polarity: 1,
  },
  {
    questionText:
      "You would love a job that requires you to work alone most of the time.",
    dimension: "extraversion",
    polarity: -1,
  },
  {
    questionText:
      "You believe that pondering abstract philosophical questions is a waste of time.",
    dimension: "openness",
    polarity: -1,
  },
  {
    questionText:
      "You feel more drawn to busy, bustling atmospheres than to quiet, intimate places.",
    dimension: "extraversion",
    polarity: 1,
  },
  {
    questionText:
      "If a decision feels right to you, you often act on it without needing further proof.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText: "You often feel overwhelmed.",
    dimension: "neuroticism",
    polarity: 1,
  },
  {
    questionText:
      "You complete things methodically without skipping over any steps.",
    dimension: "conscientiousness",
    polarity: 1,
  },
  {
    questionText:
      "You prefer tasks that require you to come up with creative solutions rather than follow concrete steps.",
    dimension: "openness",
    polarity: 1,
  },
  {
    questionText:
      "You are more likely to rely on emotional intuition than logical reasoning when making a choice.",
    dimension: "agreeableness",
    polarity: 1,
  },
  {
    questionText: "You struggle with deadlines.",
    dimension: "conscientiousness",
    polarity: -1,
  },
  {
    questionText: "You feel confident that things will work out for you.",
    dimension: "neuroticism",
    polarity: -1,
  },
];

async function seed() {
  await prisma.quizQuestion.createMany({
    data: questions,
    skipDuplicates: true,
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
