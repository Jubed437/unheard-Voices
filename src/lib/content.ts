export const content = {
  landing: {
    title: "UNHEARD VOICES",
    subtitle: "Some things are easier to write than to say.",
    invitation: [
      "You don't have to stay.",
      "You can leave whenever you want.",
      "But if you actually want to know me a little better,\ngive me five minutes.",
    ],
    button: "I WANT TO KNOW",
  },

  experience: {
    timerDuration: 300, // seconds
    messages: [
      { text: "You probably don\u2019t know me.", delay: 0 },
      { text: "Most people who think they do\u2014 don\u2019t.", delay: 22 },
      { text: "Think about the last person you said \u201cI\u2019m fine\u201d to.\nWere you?", delay: 48 },
      { text: "There are things I\u2019ve never said out loud.\nNot because I couldn\u2019t.\nBecause no one asked the right way.", delay: 78 },
      { text: "We walk past each other every day\ncarrying entire worlds\nand never once ask what\u2019s inside.", delay: 115 },
      { text: "Some memories don\u2019t fade.\nThey just go quiet\nand wait.", delay: 148 },
      { text: "Have you ever felt completely alone\nin a room full of people who love you?", delay: 178 },
      { text: "I have.", delay: 205 },
      { text: "Writing is the only place\nI don\u2019t have to pretend\nI\u2019m okay.", delay: 222 },
      { text: "You\u2019re still here.\nI wasn\u2019t sure you would be.", delay: 255 },
      { text: "Most people leave\nbefore anything real begins.", delay: 278 },
    ],
  },

  completion: [
    { text: "You stayed.", pause: 1800 },
    { text: "Maybe you\u2019re actually curious.", pause: 2200 },
    { text: "I have something for you.", pause: 2000 },
  ],

  emailForm: {
    heading: "Where should I send it?",
    placeholder: "Enter your email",
    button: "SEND IT TO ME",
    disclaimer:
      "Your email is used only to send you the manuscript and, if you choose, future writings.",
    optInLabel: "I\u2019d like to receive future writings.",
  },

  confirmation: {
    lines: [
      "It\u2019s on its way.",
      "Thank you for giving me five minutes.",
      "Now I hope you\u2019ll give me a little more.",
    ],
    welcome: "Welcome to Unheard Voices.",
    closing: [
      "You stayed.",
      "Most people won\u2019t.",
      "That\u2019s okay.",
      "But you did.",
      "Thank you for listening.",
    ],
    reenterLabel: "Enter the forest again",
  },

  errors: {
    invalidEmail: "That doesn\u2019t look like an email address.",
    alreadySubmitted: "You\u2019ve already received the manuscript.",
    sessionNotReady: "The five minutes haven\u2019t passed yet.",
    sessionExpired: "Your session has expired. Please start again.",
    rateLimited: "Too many attempts. Please wait a moment.",
    generic: "Something went wrong. Please try again.",
  },
};
