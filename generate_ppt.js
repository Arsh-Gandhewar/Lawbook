const pptxgen = require('pptxgenjs');

async function createPresentation() {
  let pptx = new pptxgen();
  
  pptx.author = 'Arsh Gandhewar & Team';
  pptx.company = 'PES Modern College of Engineering';
  pptx.revision = '1';
  pptx.subject = 'LawBook Project Presentation';
  pptx.title = 'LawBook: The Legal Assistance System';

  // Define master slide for a dark, professional theme
  pptx.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: { color: '0A192F' }, // Navy blue matching the project UI
    objects: [
      { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: 'EAB308' } } }, // Yellow/Gold top border
      { text: { text: 'LAWBOOK: THE LEGAL ASSISTANCE SYSTEM', options: { x: 0.5, y: 6.9, w: 4, h: 0.5, color: 'EAB308', fontSize: 10, italic: true } } },
      { text: { text: 'Project Presentation', options: { x: '80%', y: 6.9, w: 2, h: 0.5, align: 'right', color: 'CBD5E1', fontSize: 10 } } }
    ],
    slideNumber: { x: '95%', y: 6.9, color: 'FFFFFF', fontSize: 10 }
  });

  // Helper function to add standard content slides
  const addSlide = (title, points) => {
    let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    // Title
    slide.addText(title, { 
      x: 0.5, y: 0.8, w: '90%', h: 1, 
      fontSize: 32, bold: true, color: 'EAB308', 
      fontFace: 'Arial'
    });
    
    // Bullets
    if (points && points.length > 0) {
      slide.addText(
        points.map(pt => ({ text: pt, options: { bullet: true, breakLine: true } })),
        { x: 0.5, y: 2.2, w: '90%', h: 4, fontSize: 22, color: 'FFFFFF', fontFace: 'Arial', lineSpacing: 36 }
      );
    }
    return slide;
  };

  // 1. Title Slide
  let titleSlide = pptx.addSlide({ background: { color: '0A192F' } });
  titleSlide.addText('⚖️ LAWBOOK', { x: 1, y: 1.5, w: 8, h: 1, fontSize: 44, bold: true, color: 'EAB308', align: 'center', fontFace: 'Arial' });
  titleSlide.addText('THE LEGAL ASSISTANCE SYSTEM', { x: 1, y: 2.5, w: 8, h: 1, fontSize: 28, bold: true, color: 'FFFFFF', align: 'center', fontFace: 'Arial' });
  titleSlide.addText('MERN Stack | AI | LegalTech', { x: 1, y: 3.5, w: 8, h: 0.5, fontSize: 18, color: 'CBD5E1', align: 'center', fontFace: 'Arial', italic: true });
  titleSlide.addText('Project Presentation', { x: 1, y: 5.5, w: 8, h: 1, fontSize: 20, color: 'FFFFFF', align: 'center', fontFace: 'Arial' });

  // 1. Introduction
  addSlide('1. Introduction - The Indian Legal Context', [
    'The Indian Penal Code (IPC) forms the foundation of criminal law.',
    'Legal procedures are complex, time-consuming, and expensive.',
    'Accessing reliable legal information is difficult for the common citizen.',
    'Lengthy, static documents lack search capabilities and interactivity.'
  ]);

  addSlide('1. Introduction - The Role of LegalTech', [
    'Legal informatics blends law with information technology.',
    'Modern web development and AI can revolutionize legal access.',
    'Technology can make legal knowledge more inclusive and equitable.',
    'Bridges the gap between ordinary citizens and expert advocates.'
  ]);

  addSlide('1. Introduction - What is LawBook?', [
    'A comprehensive, interactive web-based platform built on the MERN stack.',
    'Features an AI-powered legal chatbot for answering queries naturally.',
    'Provides a verified directory for finding and consulting legal professionals.',
    'Integrates seamless scheduling, chat, and secure payments.'
  ]);

  // 2. Motivation
  addSlide('2. Motivation - Why this project?', [
    '"Justice delayed is justice denied." - Need for timely assistance.',
    'The urgent need to democratize legal knowledge across India.',
    'Existing online platforms only provide plain text PDFs, hard to navigate.',
    'Lack of an integrated system combining AI guidance with actual lawyer consultations.'
  ]);

  // 3. Objectives
  addSlide('3. Objectives - Primary Goals', [
    'Develop a scalable full-stack application (MongoDB, Express, React, Node).',
    'Implement an AI-powered legal assistance chatbot using Google Gemini API.',
    'Establish a verified, searchable, and filterable lawyer directory.',
    'Enable highly accurate legal document retrieval using full-text indexing.'
  ]);

  addSlide('3. Objectives - Secondary Goals', [
    'Enable secure real-time text chat between clients and advocates.',
    'Facilitate seamless video consultations using Jitsi Meet integration.',
    'Integrate secure payment processing for consultations via Razorpay.',
    'Implement a transparent review and rating system for lawyers.'
  ]);

  // 4. Literature Survey
  addSlide('4. Literature Survey - Overview', [
    'Analyzed various research papers on Legal NLP and AI chatbots.',
    'Reviewed retrieval techniques like RAG and Semantic Search.',
    'Explored existing LegalTech platforms and their limitations.',
    'Identified ethical challenges and hallucination risks with Large Language Models.'
  ]);

  addSlide('4. Literature Survey - Legal NLP & Case Prediction', [
    'Katz et al. (2023): NLP techniques in legal text analysis and case prediction.',
    'M. James (2025): NLP for legal document review, noting advantages and risks.',
    'Zhong et al. (2020): Legal Judgment Prediction via multi-task learning.',
    'Aletras et al. (2016): Predicting Judicial Decisions using Machine Learning.'
  ]);

  addSlide('4. Literature Survey - Retrieval & AI Architecture', [
    'Rabelo et al. (2020): Legal Case Retrieval using Vector Space Models & BERT.',
    'Gupta et al. (2025): Dynamic Tagging RAG for Legal Corpora.',
    'Fadillah et al. (2025): LawRAG - Chunking strategies for legal text.',
    'Castano et al. (2025): JusBuild - RAG-based Architecture for Document Building.'
  ]);

  // 5. Research Gaps
  addSlide('5. Research Gaps - The Missing Links', [
    'Most research focuses on historical case retrieval, not statutory provisions (IPC).',
    'Lack of interactive, user-facing applications designed for the Indian legal system.',
    'General LLMs hallucinate and invent fake laws if not strictly constrained.',
    'Existing models do not bridge the gap between AI advice and human lawyer consultation.'
  ]);

  // 6. Research Contribution
  addSlide('6. Research Contribution - Our Solution', [
    'A hybrid approach: Retrieval Augmented Generation (RAG) combined with an expert AI.',
    'Strict contextual boundaries to prevent AI hallucination and ensure factual accuracy.',
    'Mapped IPC sections dynamically to user queries for highly relevant answers.',
    'Created a unified digital ecosystem serving both clients and advocates effectively.'
  ]);

  // 7. Proposed System
  addSlide('7. Proposed System - Architecture Overview', [
    'Follows a modern 3-Tier Architecture:',
    '1. Presentation Layer (Frontend): React.js & Tailwind CSS',
    '2. Application Layer (Backend): Node.js & Express.js',
    '3. Data Layer (Database): MongoDB Atlas',
    'Integrated with external services for AI, Payments, and Video Calls.'
  ]);

  addSlide('7. Proposed System - Key Modules', [
    'Authentication Module: JWT, bcrypt, and OTP verification.',
    'AI Legal Chatbot Module: Gemini API + RAG Engine.',
    'Lawyer Directory & Chat Module: Filtering, matching, and real-time messaging.',
    'Appointment & Payment Module: Scheduling logic and Razorpay integration.'
  ]);

  let dfdSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
  dfdSlide.addText('7. Proposed System - Data Flow Diagram', { x: 0.5, y: 0.8, w: '90%', h: 1, fontSize: 32, bold: true, color: 'EAB308', fontFace: 'Arial' });
  dfdSlide.addText([
    { text: 'User Query Processing:', options: { bold: true, color: 'EAB308', bullet: true, breakLine: true } },
    { text: 'Query -> Backend -> MongoDB Lexical Search -> Context Extraction', options: { breakLine: true, indentLevel: 1 } },
    { text: 'Context + Prompt -> Gemini API -> Response -> User', options: { breakLine: true, indentLevel: 1 } },
    { text: 'Consultation Workflow:', options: { bold: true, color: 'EAB308', bullet: true, breakLine: true } },
    { text: 'Select Lawyer -> Check Availability -> Pay via Razorpay -> Confirm Appointment', options: { breakLine: true, indentLevel: 1 } }
  ], { x: 0.5, y: 2.2, w: '90%', h: 4, fontSize: 22, color: 'FFFFFF', fontFace: 'Arial', lineSpacing: 24 });

  // 8. Experimental Setup
  addSlide('8. Experimental Setup - Core Technologies', [
    'Frontend: React.js (v18.2.0), Tailwind CSS, React Router DOM.',
    'Backend: Node.js (v18.0+), Express.js.',
    'Database: MongoDB (v6.0+), Mongoose ODM.',
    'Scripting & Ingestion: Python (v3.9+) for automated legal text scraping.'
  ]);

  addSlide('8. Experimental Setup - External Integrations', [
    'Artificial Intelligence: Official Google Gemini API (gemini-2.5-flash).',
    'Payment Gateway: Razorpay Node.js SDK (HMAC SHA256 verification).',
    'Video Conferencing: Jitsi Meet React Wrapper.',
    'Email Services: Nodemailer (SMTP) for OTP verification.'
  ]);

  // 9. RAG
  addSlide('9. Retrieval Augmented Generation (RAG) - Concept', [
    'RAG improves AI accuracy by providing factual context directly from a database.',
    'Prevents the AI from "guessing" legal provisions (Zero Hallucination approach).',
    'Grounds responses strictly in the actual Indian Penal Code and Court Verdicts.',
    'Ensures that all generated answers are legally verifiable and cited.'
  ]);

  addSlide('9. Retrieval Augmented Generation (RAG) - Flow', [
    'Step 1: The user query is sanitized and formatted.',
    'Step 2: Relevant IPC sections and verdicts are retrieved from MongoDB.',
    'Step 3: Factual context is combined with the user\'s prompt.',
    'Step 4: Gemini API generates a response based ONLY on the provided context.',
    'Step 5: The response is returned to the user alongside verified legal citations.'
  ]);

  // 10. Semantic Similarity
  addSlide('10. Semantic Similarity Search Algorithm', [
    'Efficiently finds relevant IPC sections using weighted text indexing.',
    'Maintains MongoDB $text indexes on high-priority fields (Title, Keywords, Text).',
    'Step 1: Attempts direct section lookup using Regular Expressions (e.g., "Section 302").',
    'Step 2: If no direct match, extracts core keywords and executes lexical search.',
    'Step 3: Calculates text match scores and returns the highest relevance documents.'
  ]);

  // 11. JWT & Recommendation
  addSlide('11. JWT Authentication System', [
    'Ensures secure user authentication and session management.',
    'Passwords are securely hashed using the bcrypt algorithm before storage.',
    'JWT token is generated upon successful login and returned to the client.',
    'Protected backend routes validate the token using middleware before granting access.'
  ]);

  addSlide('11. Recommendation & Matching Logic', [
    'Algorithm designed to suggest suitable lawyers based on user requirements.',
    'Step 1: User selects a specific legal category or searches by name.',
    'Step 2: System filters advocates by specialization (e.g., Criminal, Family).',
    'Step 3: Results are sorted based on average rating and total experience.',
    'Step 4: Displays the top matching lawyers for immediate consultation booking.'
  ]);

  // 12. Conclusion
  addSlide('12. Conclusion', [
    'Developed a comprehensive, AI-powered LegalTech platform for India.',
    'Simplified legal access through modern web interfaces and intuitive design.',
    'Successfully bridged the gap between citizens seeking help and expert advocates.',
    'Demonstrated high accuracy in legal information retrieval with the RAG architecture.',
    'Implemented a secure, reliable, and scalable MERN stack ecosystem.'
  ]);

  // 13. Limitations
  addSlide('13. Limitations', [
    'Language Limitation: The system currently supports only the English language.',
    'Polling-based Chat: Uses 5-second polling intervals rather than true WebSockets.',
    'Scope Limitation: The legal knowledge base primarily covers the Indian Penal Code.',
    'Offline Capability: Requires an active internet connection for all features (AI, Video).'
  ]);

  // 14. Future Scope
  addSlide('14. Future Scope & Enhancement', [
    'Multi-language Support: Integrate translation APIs for Hindi, Marathi, Tamil, etc.',
    'Real-time WebSockets: Replace polling with Socket.io for instantaneous chat.',
    'Mobile Application: Develop native apps for Android and iOS using React Native.',
    'Extended Legal Coverage: Expand database to CrPC, CPC, and specific state laws.',
    'Voice Interaction: Integrate speech-to-text capabilities for higher accessibility.'
  ]);

  // 15. References
  addSlide('15. References (1/2)', [
    '[1] Government of India, "Indian Penal Code, 1860," India Code. Available: indiacode.nic.in',
    '[2] D. M. Katz et al., "Natural Language Processing in the Legal Domain," 2023.',
    '[3] M. James, "NLP for Legal Document Review: Opportunities and Risks," 2025.',
    '[4] H. Zhong et al., "Legal Judgment Prediction via Topological Multi-Task Learning," 2020.',
    '[5] C. P. Osorio et al., "Promoting Free Flows via Competition Law," 2020.'
  ]);

  addSlide('15. References (2/2)', [
    '[6] S. Gupta et al., "Dynamic Tagging RAG for Legal and Scientific Corpora," 2025.',
    '[7] A. Fadillah et al., "LawRAG: Chunking and reranking strategies," 2025.',
    '[8] Google DeepMind, "Gemini: Highly Capable Multimodal Models," 2024.',
    '[9] Razorpay API Documentation. Available: razorpay.com/docs/api',
    '[10] Jitsi Meet: Open-Source Video Conferencing. Available: jitsi.org'
  ]);

  let qnaSlide = pptx.addSlide({ background: { color: '0A192F' } });
  qnaSlide.addText('QUESTIONS?', { x: 1, y: 2.5, w: 8, h: 1, fontSize: 44, bold: true, color: 'EAB308', align: 'center', fontFace: 'Arial' });
  qnaSlide.addText('Thank You!', { x: 1, y: 3.5, w: 8, h: 1, fontSize: 32, bold: true, color: 'FFFFFF', align: 'center', fontFace: 'Arial' });

  // Currently we have 28 slides. The user asked for exactly 35 pages. 
  // Let me pad it out to 35 slides by splitting some slides or adding transitional slides.
  
  // Actually, I can just add transition slides for major topics.
}

createPpt();

async function createPpt() {
  let pptx = new pptxgen();
  
  pptx.author = 'LawBook Team';
  pptx.subject = 'LawBook Presentation';
  pptx.title = 'LawBook: The Legal Assistance System';

  pptx.defineSlideMaster({
    title: 'MASTER',
    background: { color: '0F172A' }, // Slate 900
    objects: [
      { rect: { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: 'EAB308' } } }, // Top gold bar
      { text: { text: 'LAWBOOK: THE LEGAL ASSISTANCE SYSTEM', options: { x: 0.5, y: 6.9, w: 5, h: 0.5, color: 'EAB308', fontSize: 10, italic: true } } },
      { text: { text: 'Project Presentation', options: { x: '70%', y: 6.9, w: 3, h: 0.5, align: 'right', color: '94A3B8', fontSize: 10 } } }
    ],
    slideNumber: { x: '95%', y: 6.9, color: 'FFFFFF', fontSize: 10 }
  });

  const addTitleSlide = (title, subtitle) => {
    let slide = pptx.addSlide({ background: { color: '0F172A' } });
    slide.addText(title, { x: 1, y: 2.5, w: 8, h: 1.5, fontSize: 48, bold: true, color: 'EAB308', align: 'center' });
    if (subtitle) {
      slide.addText(subtitle, { x: 1, y: 4.0, w: 8, h: 1, fontSize: 24, color: 'F8FAFC', align: 'center', italic: true });
    }
  };

  const addContent = (title, points) => {
    let slide = pptx.addSlide({ masterName: 'MASTER' });
    slide.addText(title, { x: 0.5, y: 0.8, w: '90%', h: 1, fontSize: 32, bold: true, color: 'EAB308' });
    if (points && points.length > 0) {
      slide.addText(
        points.map(pt => ({ text: pt, options: { bullet: true, breakLine: true } })),
        { x: 0.5, y: 2.0, w: '90%', h: 4.5, fontSize: 24, color: 'F8FAFC', lineSpacing: 40 }
      );
    }
  };

  // We need exactly 35 slides.
  // 1
  addTitleSlide('⚖️ LAWBOOK', 'THE LEGAL ASSISTANCE SYSTEM\n\nProject Presentation');
  // 2
  addTitleSlide('1. Introduction', 'Overview and Background');
  // 3
  addContent('Introduction - The Indian Legal Context', [
    'The Indian Penal Code (IPC) is the foundation of criminal law.',
    'Legal procedures are complex, time-consuming, and expensive.',
    'Accessing reliable legal information is difficult for the common citizen.',
    'Static PDF documents lack search capabilities and interactivity.'
  ]);
  // 4
  addContent('Introduction - The Role of LegalTech', [
    'Legal informatics blends law with information technology.',
    'Modern web development and AI can revolutionize legal access.',
    'Technology can make legal knowledge more inclusive and equitable.',
    'Bridges the gap between ordinary citizens and expert advocates.'
  ]);
  // 5
  addContent('Introduction - What is LawBook?', [
    'A comprehensive, interactive web-based platform built on the MERN stack.',
    'Features an AI-powered legal chatbot for answering queries naturally.',
    'Provides a verified directory for finding and consulting legal professionals.',
    'Integrates seamless scheduling, chat, and secure payments.'
  ]);
  
  // 6
  addTitleSlide('2. Motivation', 'Why we built LawBook');
  // 7
  addContent('Motivation - The Need', [
    '"Justice delayed is justice denied." - Need for timely assistance.',
    'The urgent need to democratize legal knowledge across India.',
    'Citizens struggle to understand complex legal jargon.',
    'A lack of affordable, entry-level legal guidance tools.'
  ]);
  // 8
  addContent('Motivation - Problem with Current Systems', [
    'Existing online platforms only provide plain text PDFs, hard to navigate.',
    'No easy way to check attorney credibility and verified reviews.',
    'Lack of an integrated system combining AI guidance with human consultations.',
    'Scattered solutions for chat, video calls, and payments.'
  ]);

  // 9
  addTitleSlide('3. Objectives', 'Primary and Secondary Goals');
  // 10
  addContent('Objectives - Primary Goals', [
    'Develop a scalable full-stack application (MongoDB, Express, React, Node).',
    'Implement an AI-powered legal assistance chatbot using Gemini API.',
    'Establish a verified, searchable, and filterable lawyer directory.',
    'Enable highly accurate legal document retrieval using full-text indexing.'
  ]);
  // 11
  addContent('Objectives - Secondary Goals', [
    'Enable secure real-time text chat between clients and advocates.',
    'Facilitate seamless video consultations using Jitsi Meet integration.',
    'Integrate secure payment processing for consultations via Razorpay.',
    'Implement a transparent review and rating system for lawyers.'
  ]);

  // 12
  addTitleSlide('4. Literature Survey', 'Review of Existing Research');
  // 13
  addContent('Literature Survey - Legal NLP', [
    'Katz et al. (2023): Explored NLP techniques in legal text analysis and case prediction.',
    'M. James (2025): NLP for legal document review, noting advantages and risks.',
    'Zhong et al. (2020): Legal Judgment Prediction via topological multi-task learning.'
  ]);
  // 14
  addContent('Literature Survey - Explainability & LLMs', [
    'Fuseini & Mumuni (2025): Explainable Artificial Intelligence (XAI) in legal systems.',
    'LLMs in Law (2024): A survey on the ethical limitations of GPT/BERT in law.',
    'Aletras et al. (2016): Predicting Judicial Decisions using Machine Learning.'
  ]);
  // 15
  addContent('Literature Survey - Retrieval Architectures', [
    'Rabelo et al. (2020): Legal Case Retrieval using Vector Space Models & BERT.',
    'Gupta et al. (2025): Dynamic Tagging RAG for Legal Corpora.',
    'Castano et al. (2025): JusBuild - RAG-based Architecture for Document Building.'
  ]);

  // 16
  addTitleSlide('5. Research Gaps', 'Identifying the Missing Links');
  // 17
  addContent('Research Gaps', [
    'Most research focuses on historical case retrieval, not statutory provisions (IPC).',
    'Lack of interactive, user-facing applications designed specifically for Indian law.',
    'General LLMs hallucinate and invent fake laws if not strictly constrained.',
    'Existing models do not bridge the gap between AI advice and human lawyer consultation.'
  ]);

  // 18
  addTitleSlide('6. Research Contribution', 'How LawBook Bridges the Gap');
  // 19
  addContent('Research Contribution', [
    'A hybrid approach: Retrieval Augmented Generation (RAG) combined with an expert AI.',
    'Strict contextual boundaries to prevent AI hallucination and ensure factual accuracy.',
    'Mapped IPC sections dynamically to user queries for highly relevant answers.',
    'Created a unified digital ecosystem serving both clients and advocates effectively.'
  ]);

  // 20
  addTitleSlide('7. Proposed System', 'System Architecture & Modules');
  // 21
  addContent('Proposed System - Architecture Overview', [
    'Follows a modern 3-Tier Architecture:',
    '1. Presentation Layer (Frontend): React.js & Tailwind CSS',
    '2. Application Layer (Backend): Node.js & Express.js',
    '3. Data Layer (Database): MongoDB Atlas',
    'Seamless integration with external APIs for AI, Payments, and Video.'
  ]);
  // 22
  addContent('Proposed System - Key Modules', [
    'Authentication Module: JWT, bcrypt, and OTP email verification.',
    'AI Legal Chatbot Module: Gemini API paired with a custom RAG Engine.',
    'Lawyer Directory & Chat Module: Filtering, matching, and real-time messaging.',
    'Appointment & Payment Module: Scheduling logic and Razorpay integration.'
  ]);

  // 23
  addTitleSlide('8. Experimental Setup', 'Technologies & Tools');
  // 24
  addContent('Experimental Setup - Technologies Used', [
    'Frontend: React.js (v18.2.0), Tailwind CSS, React Router DOM.',
    'Backend: Node.js (v18.0+), Express.js.',
    'Database: MongoDB (v6.0+), Mongoose ODM.',
    'Scripting: Python (v3.9+) for automated legal text scraping and formatting.'
  ]);
  // 25
  addContent('Experimental Setup - Third-Party Integrations', [
    'Artificial Intelligence: Official Google Gemini API (gemini-2.5-flash).',
    'Payment Gateway: Razorpay Node.js SDK (with HMAC SHA256 verification).',
    'Video Conferencing: Jitsi Meet React Wrapper.',
    'Email Services: Nodemailer (SMTP) for OTP verification.'
  ]);

  // 26
  addTitleSlide('9. Retrieval Augmented Generation', 'Improving AI Accuracy');
  // 27
  addContent('RAG - Core Concept', [
    'Improves AI accuracy by providing factual context directly from a database.',
    'Prevents the AI from "guessing" legal provisions (Zero Hallucination approach).',
    'Grounds responses strictly in the actual Indian Penal Code and Court Verdicts.',
    'Ensures that all generated answers are legally verifiable and cited.'
  ]);
  // 28
  addContent('RAG - Workflow Execution', [
    'Step 1: The user query is sanitized and formatted.',
    'Step 2: Relevant IPC sections and verdicts are retrieved from MongoDB.',
    'Step 3: Factual context is strictly combined with the user\'s prompt.',
    'Step 4: Gemini API generates a response based ONLY on the provided context.',
    'Step 5: The response is returned to the user alongside verified legal citations.'
  ]);

  // 29
  addTitleSlide('10. Semantic Similarity', 'Search Algorithm Logic');
  // 30
  addContent('Semantic Similarity Search Algorithm', [
    'Efficiently finds relevant IPC sections using weighted text indexing.',
    'Maintains MongoDB $text indexes on high-priority fields (Title, Keywords, Text).',
    'Step 1: Attempts direct section lookup using Regular Expressions (e.g., "Section 302").',
    'Step 2: If no direct match, extracts core keywords and executes lexical search.',
    'Step 3: Calculates text match scores and returns the highest relevance documents.'
  ]);

  // 31
  addContent('11. JWT Auth + Recommendation Logic', [
    'JWT Authentication: Secure user sessions. Passwords hashed using bcrypt.',
    'Token is validated using custom middleware before granting API access.',
    'Recommendation Logic: Suggests suitable lawyers based on user requirements.',
    'Filters advocates by specialization, sorts by average rating and experience.'
  ]);

  // 32
  addContent('12. Conclusion', [
    'Developed a comprehensive, AI-powered LegalTech platform for India.',
    'Simplified legal access through modern web interfaces and intuitive design.',
    'Demonstrated high accuracy in legal information retrieval with the RAG architecture.',
    'Successfully bridged the gap between citizens seeking help and expert advocates.'
  ]);

  // 33
  addContent('13. Limitations & 14. Future Scope', [
    'Limitations:',
    ' - Currently limited to English language and IPC.',
    ' - Chat system uses polling instead of true WebSockets.',
    'Future Enhancements:',
    ' - Implement Multi-language support (Hindi, Marathi, etc.).',
    ' - Develop native mobile apps for Android and iOS using React Native.',
    ' - Expand database to CrPC, CPC, and specific state laws.'
  ]);

  // 34
  addContent('15. References', [
    '[1] Government of India, "Indian Penal Code, 1860." Available: indiacode.nic.in',
    '[2] D. M. Katz et al., "Natural Language Processing in the Legal Domain," 2023.',
    '[3] M. James, "NLP for Legal Document Review: Opportunities and Risks," 2025.',
    '[4] H. Zhong et al., "Legal Judgment Prediction via Topological Multi-Task Learning," 2020.',
    '[5] C. P. Osorio et al., "Promoting Free Flows via Competition Law," 2020.',
    '[6] Google DeepMind, "Gemini: Highly Capable Multimodal Models," 2024.'
  ]);

  // 35
  let finalSlide = pptx.addSlide({ background: { color: '0F172A' } });
  finalSlide.addText('THANK YOU', { x: 1, y: 2.5, w: 8, h: 1.5, fontSize: 54, bold: true, color: 'EAB308', align: 'center' });
  finalSlide.addText('Questions & Answers', { x: 1, y: 4.0, w: 8, h: 1, fontSize: 28, color: 'F8FAFC', align: 'center', italic: true });

  await pptx.writeFile({ fileName: 'LawBook_Presentation.pptx' });
  console.log('Presentation generated successfully: LawBook_Presentation.pptx');
}
