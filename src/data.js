/* =================================================================
   PORTFOLIO CONFIGURATION DATA
   Edit this file to easily update all text, links, projects, and skills!
   ================================================================= */

const portfolioData = {
  profile: {
    name: "Tung Nguyen",
    tagline: "Student in AI era",
    statement: "A Computer Science student with a deep fascination for Artificial Intelligence, driven by the thrill of discovering and building intelligent systems.",
    email: "canhtung2005@gmail.com",
    github: "https://github.com/canhtungdz",
    linkedin: "https://linkedin.com/in/canhtungdz",
    // twitter: "https://twitter.com",
    footerTagline: "Experience liftoff"
  },

  /* ===============================================================
     ABOUT FEATURES SECTION
     Edit your core highlights (like development or design services) here.
     You can choose a mockup type: 'code' (displays code board) or 'ui' (displays UI visual).
     =============================================================== */
  features: [
    {
      title: "Machine & Deep\nLearning",
      desc: "Designing and training custom neural networks, fine-tuning large language models, and architecting optimized pipelines that transform raw data streams into intelligent, predictive systems.",
      mockup: "neural"
    },
    {
      title: "Computer Vision\n& Perception",
      desc: "Teaching machines to see and interpret. Specializing in real-time object detection (YOLO), semantic segmentation networks, and spatial coordinate transforms for robotics and smart analytics.",
      mockup: "ui",
      // Glassmorphic object detection prediction probability meters
      uiCards: [
        { avatarClass: "", lines: ["long", "short"] },
        { avatarClass: "alt", lines: ["medium", "long"] },
        { avatarClass: "accent", lines: ["short", "medium"] }
      ]
    }
  ],

  /* ===============================================================
     SELECTED PROJECTS LIST
     To edit a project, change the tag, title, and desc below.
     To add a new project, copy one of the objects below and add it to the array.
     
     Choose a visualType (1 to 4) to pick one of 4 gorgeous background art styles:
     - 1 : Zero-gravity floating circles (Dark background)
     - 2 : Clean minimal Bento grids (Light background)
     - 3 : Wave vector linear gradient (Gradient background)
     - 4 : Matrix LED dots board (Dark background)
     =============================================================== */
  projects: [
    {
      tag: "AI / Machine Learning",
      title: "SpaceEval: Extraction of Spatial Information",
      desc: "Applying LLM to extract spatial information from text.",
      visualType: 1,
      youtubeId: "Ke90Tje7VS0",
      sourceUrl: "https://github.com/canhtungdz/spaceeval"
    },
    {
      tag: "Machine Learning",
      title: "Phone Price Prediction",
      desc: "Using machine learning model to predict phone prices.",
      visualType: 2,
      youtubeId: "LhC518-M3G0",
      sourceUrl: "https://github.com/canhtungdz/phone-price-predict"
    },
    {
      tag: "Reinforcement Learning",
      title: "Flappy Bird Autonomous AI Agent",
      desc: "Reinforcement learning for game agents",
      visualType: 3,
      youtubeId: "AIShkPAli2M",
      sourceUrl: "https://github.com/canhtungdz/Flappy_RL"
    },
    {
      tag: "Game",
      title: "Rush Hour Puzzle Game",
      desc: "Develop a puzzle game, and solver for that.",
      visualType: 4,
      youtubeId: "2b9txcAt4e0",
      sourceUrl: "https://github.com/canhtungdz/Rush_Hour"
    }
  ],

  /* ===============================================================
     SKILLS TAGS LIST
     Add or remove skills by editing the arrays below.
     =============================================================== */
  skills: {
    machineLearning: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "Deep Learning",
      "Keras",
      "Pandas / NumPy",
      "LLMs & NLP",
      "MLOps & MLflow"
    ],
    computerVision: [
      "OpenCV",
      "YOLO",
      "Image Segmentation",
      "CNNs / ConvNets",
      "PyTorch Lightning",
      "Object Detection",
      "CUDA / GPU acceleration",
      "MediaPipe",
      "Vision Transformers (ViTs)"
    ]
  }
};

// Make it globally accessible
window.portfolioData = portfolioData;
