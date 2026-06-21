import os

report_file = "Lawbook_Project_Report.md"

def get_code_snippet(filepath, title):
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        return f"\n### {title}\n\n```javascript\n{content}\n```\n\n"
    return ""

report_content = """---
pdf_options:
  format: a4
  margin: 20mm 20mm
  printBackground: true
css: |
  body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.6; color: #000; text-align: justify; }
  h1 { font-size: 24pt; text-align: center; margin-top: 50px; page-break-before: always; }
  h2 { font-size: 18pt; margin-top: 30px; }
  h3 { font-size: 14pt; margin-top: 20px; }
  .cover { text-align: center; margin-top: 100px; height: 100vh; page-break-after: always; }
  .cover h1 { font-size: 36pt; margin-bottom: 20px; page-break-before: auto; }
  .cover h2 { font-size: 20pt; font-weight: normal; margin-bottom: 50px; }
  .cover p { font-size: 16pt; margin: 10px 0; }
  .page-break { page-break-before: always; }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
  pre { font-size: 10pt; line-height: 1.2; background: #f4f4f4; padding: 10px; border-radius: 5px; page-break-inside: avoid; white-space: pre-wrap; word-wrap: break-word; }
---

<div class="cover">
  <h1>LAWBOOK: Justice Made Simple</h1>
  <h2>A Comprehensive Legal Guidance and Research Platform</h2>
  <br><br><br>
  <p><strong>A Project Report Submitted By:</strong></p>
  <p>Arsh Gandhewar</p>
  <p>(Final Year Engineering Student)</p>
  <br><br><br>
  <p><strong>Submitted in partial fulfillment of the requirements for the degree of</strong></p>
  <p><strong>Bachelor of Engineering in Information Technology</strong></p>
  <br><br><br>
  <p>Department of Information Technology</p>
  <p>Modern College of Engineering</p>
  <p>2025-2026</p>
</div>

# CERTIFICATE

This is to certify that the project report entitled **"LAWBOOK: Justice Made Simple"** is a bonafide work carried out by **Arsh Gandhewar** in partial fulfillment for the award of Bachelor of Engineering in Information Technology. 

The project report has been approved as it satisfies the academic requirements in respect of project work prescribed for the said degree.

<br><br><br><br>
**Project Guide** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Head of Department**


<br><br><br><br>
**External Examiner** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Principal**

<div class="page-break"></div>

# ACKNOWLEDGEMENT

I would like to express my profound gratitude to everyone who supported me throughout the course of this project.

First and foremost, I am deeply thankful to my project guide for their continuous support, patience, and motivation. Their expert advice and feedback were instrumental in shaping "Lawbook" from a mere concept into a fully functional application.

I also extend my sincere thanks to the Head of the Information Technology Department and our respected Principal for providing an environment conducive to learning and innovation, and for equipping us with the necessary infrastructure to carry out our work.

I am grateful to my friends, classmates, and family for their unwavering encouragement during the stressful phases of development. Whether it was debugging a stubborn React issue at 2 AM or figuring out the complexities of MongoDB integration, their moral support kept me going.

Finally, I would like to acknowledge the open-source community. Projects like React, Node.js, Express, and Tailwind CSS formed the foundation of this platform. The availability of open legal datasets, especially the Indian Supreme Court Judgments dataset, was crucial for training and seeding our database.

<div class="page-break"></div>

# ABSTRACT

In a country as vast and complex as India, legal knowledge remains largely inaccessible to the common citizen. The legal jargon, the scattered nature of laws, and the prohibitive cost of legal consultation often discourage individuals from understanding their rights and seeking justice. Furthermore, legal professionals struggle with the sheer volume of precedents and need efficient research tools to navigate millions of case files.

**LAWBOOK: Justice Made Simple** is an integrated web-based platform designed to democratize legal information. It serves dual purposes: empowering citizens with easy-to-understand legal guidance and providing advocates with a robust, AI-powered research tool. 

The application is built using the modern MERN stack (MongoDB, Express.js, React.js, Node.js) and integrates cutting-edge Generative AI (Google Gemini) to simplify complex legal queries in real-time. It features a vast, searchable database of Indian laws, acts, and over 35,000 Supreme Court judgments ingested from public datasets.

Key features include role-based access control (Citizens vs. Advocates), a responsive user interface crafted with Tailwind CSS, secure authentication with JWT, automated email verification, and a seamless subscription model integrated via Razorpay. The platform allows advocates to find relevant case laws quickly while offering citizens simplified explanations of legal procedures.

By bridging the gap between technology and the legal system, Lawbook aims to make legal literacy a norm rather than an exception, fostering a more informed and empowered society.

<div class="page-break"></div>

# TABLE OF CONTENTS

1. **Introduction**
   1.1 Motivation
   1.2 Problem Statement
   1.3 Objectives
   1.4 Scope of the Project
2. **Literature Survey**
   2.1 Existing Systems
   2.2 Limitations of Current Solutions
   2.3 Proposed Solution
3. **System Analysis and Design**
   3.1 Feasibility Study
   3.2 Hardware and Software Requirements
   3.3 System Architecture
   3.4 Use Case Models
4. **Technology Stack**
   4.1 Frontend Technologies
   4.2 Backend Technologies
   4.3 Database
   4.4 Third-Party Integrations
5. **Implementation Details**
   5.1 Database Design & Seeding
   5.2 Authentication Module
   5.3 AI Integration
   5.4 Payment Gateway
6. **Testing and Validation**
   6.1 Unit Testing
   6.2 Integration Testing
   6.3 System Testing
7. **Results and Discussions**
8. **Conclusion and Future Scope**
9. **References**
10. **Appendix: Core Source Code**

<div class="page-break"></div>

# CHAPTER 1: INTRODUCTION

## 1.1 Motivation
The idea for Lawbook stemmed from a personal observation of how difficult it is for an average person to comprehend legal documents or understand the correct legal procedures. Whether it's drafting a simple rent agreement, understanding traffic rules, or navigating complex civil disputes, the lack of centralized, simplified legal resources is a glaring issue. While the internet is flooded with information, much of it is fragmented, outdated, or laden with incomprehensible legal vocabulary. This motivated the development of a platform that acts as a digital bridge between the law and the layman.

## 1.2 Problem Statement
Currently, accessing accurate, context-specific legal information is time-consuming and expensive. Existing legal research tools are heavily tailored for lawyers, carrying expensive subscription fees and complex interfaces. Citizens lack a reliable platform to understand their basic rights without consulting a lawyer for trivial queries. There is a pressing need for a unified platform that simplifies legal texts for the public while providing sophisticated, AI-driven search capabilities for legal professionals.

## 1.3 Objectives
- To develop a scalable, web-based platform using the MERN stack.
- To ingest and organize thousands of Supreme Court verdicts and categorizing them systematically.
- To integrate an AI chatbot capable of answering legal queries in simple, conversational language.
- To provide role-based dashboards tailored to the specific needs of citizens and advocates.
- To implement a secure, tiered subscription model using Razorpay for premium features.

## 1.4 Scope of the Project
The scope of Lawbook encompasses the Indian legal framework. It covers fundamental rights, major acts (like the IPC, CrPC/BNSS, Hindu Marriage Act), and historical Supreme Court judgments. The platform is accessible via web browsers on both desktop and mobile devices. Future iterations may include regional language support and direct client-lawyer consultation features, but the current scope focuses on information dissemination, AI guidance, and legal research.

<div class="page-break"></div>

# CHAPTER 2: LITERATURE SURVEY

## 2.1 Existing Systems
During our research, we examined several existing platforms in the legal tech domain:
1. **IndianKanoon:** A highly popular free search engine for Indian law. It indexes a massive amount of data. However, its UI is quite dated, and it provides raw text without any simplification or AI summarization.
2. **SCC Online & Manupatra:** Premium legal research tools used extensively by law firms. They are highly accurate but prohibitively expensive for common citizens and lack conversational AI features.
3. **General AI Chatbots (ChatGPT/Claude):** While capable of answering legal questions, they frequently hallucinate specific Indian legal sections or cite non-existent case laws.

## 2.2 Limitations of Current Solutions
The primary limitation we identified is the dichotomy of the current market: platforms are either too academic and expensive (targeting lawyers) or too generic and unreliable (targeting the public). There is a distinct lack of platforms that use specialized AI to digest actual, verified legal databases and present them contextually based on the user's expertise level.

## 2.3 Proposed Solution: Lawbook
Lawbook solves this by integrating a vast, verified database of Indian laws with the cognitive capabilities of Google Gemini AI. When a user asks a question, the AI doesn't just guess; it is grounded in the legal context provided by the platform. Furthermore, the UI is designed with modern aesthetics (Tailwind CSS) to ensure the user is not overwhelmed by walls of text. By offering a free "Citizen" tier and a paid "Advocate Pro" tier, the platform becomes economically sustainable while remaining socially beneficial.

<div class="page-break"></div>

# CHAPTER 3: SYSTEM ANALYSIS AND DESIGN

## 3.1 Feasibility Study
Before diving into code, we conducted a feasibility study to ensure the project was viable.
- **Technical Feasibility:** The MERN stack is highly capable of handling the data-intensive nature of this application. MongoDB is perfectly suited for storing unstructured legal documents and headnotes. The availability of Google Gemini APIs made the AI integration technically feasible.
- **Economic Feasibility:** Using open-source tools (React, Node, Express) and generous free tiers for hosting (Render, Vercel) and database (MongoDB Atlas) kept initial development costs to a bare minimum. The project is economically viable.
- **Operational Feasibility:** The user interface was designed to be intuitive. Features like automated password hashing, JWT-based session management, and responsive design ensure the system is secure and easy to operate.

## 3.2 Hardware and Software Requirements
**Development Environment Requirements:**
- Processor: Intel Core i5 / AMD Ryzen 5 or higher.
- RAM: Minimum 8 GB (16 GB recommended for running local MongoDB and React dev servers).
- Storage: 256 GB SSD.

**Software Requirements:**
- Operating System: Windows 10/11, macOS, or Linux.
- Runtime Environment: Node.js (v18+).
- Database: MongoDB Atlas (Cloud) or MongoDB Community Server.
- IDE: Visual Studio Code.
- Browser: Google Chrome, Mozilla Firefox, or Safari.

## 3.3 System Architecture
The application follows a standard Three-Tier Client-Server Architecture:
1. **Presentation Layer (Frontend):** Built with React.js. It manages the user interface, routing (React Router), state management (Context API), and API calls (Axios).
2. **Application Layer (Backend):** Built with Node.js and Express.js. It handles business logic, AI prompt engineering, Razorpay order creation, and signature verification.
3. **Data Layer (Database):** MongoDB stores user profiles, subscription details, categorized legal acts, and thousands of ingested court verdicts.

## 3.4 Data Flow
When a user submits a legal query:
1. The React frontend captures the input and sends a POST request to the Express backend.
2. The Express backend validates the user's JWT token and checks their subscription tier to ensure they haven't exceeded their AI chat limits.
3. The backend constructs a prompt containing the user's query and specific system instructions (directing the AI to act as an Indian Legal Assistant).
4. The prompt is sent to the Google Gemini API.
5. The AI processes the query and returns a structured response.
6. The backend updates the user's chat count in MongoDB and forwards the response to the frontend.
7. The React UI renders the response with Markdown formatting for readability.

<div class="page-break"></div>

# CHAPTER 4: TECHNOLOGY STACK

Our team carefully selected the technology stack to ensure scalability, maintainability, and high performance.

## 4.1 Frontend Technologies
- **React.js:** A JavaScript library for building user interfaces. We chose React for its component-based architecture, which allowed us to build reusable UI elements like buttons, input fields, and legal concept cards.
- **Tailwind CSS:** A utility-first CSS framework. It drastically reduced styling time and enabled us to build a highly responsive, modern, and premium-looking interface without writing thousands of lines of custom CSS.
- **Axios:** Used for making promise-based HTTP requests to our backend.
- **React Router DOM:** Enables client-side routing, allowing seamless navigation between the Home, Dashboard, Pricing, and Auth pages without page reloads.

## 4.2 Backend Technologies
- **Node.js:** A JavaScript runtime built on Chrome's V8 engine. It allows us to use JavaScript for server-side scripting, unifying the language across the entire stack.
- **Express.js:** A minimal and flexible Node.js web application framework. It provides robust routing features and middleware support, making it easy to build RESTful APIs.
- **JSON Web Tokens (JWT):** Used for stateless, secure user authentication. Upon login, the server issues a JWT which the client stores and sends with subsequent requests.
- **Bcrypt.js:** Used for hashing passwords before storing them in the database, ensuring that user credentials remain secure even in the event of a database breach.

## 4.3 Database
- **MongoDB:** A NoSQL document database. Legal documents, acts, and verdicts vary wildly in length and structure. A schema-less database like MongoDB allows us to store these complex nested objects easily. We utilized MongoDB Atlas for cloud hosting.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. It enforces schemas at the application level, providing validation and a straightforward API for database operations.

## 4.4 Third-Party Integrations
- **Razorpay:** India's leading payment gateway. We integrated Razorpay to handle subscription upgrades, capturing payments securely and verifying signatures via crypto modules on the backend.
- **Google Gemini API:** The core engine behind our legal assistant. It processes natural language queries and generates context-aware legal advice.
- **Nodemailer:** Used to send OTP (One Time Password) emails for user verification during the registration process.

<div class="page-break"></div>

# CHAPTER 5: IMPLEMENTATION DETAILS

The implementation of Lawbook was divided into several key modules. Below is a detailed discussion of the core components.

## 5.1 Database Design and Ingestion Pipeline
One of the most complex parts of the project was acquiring and structuring legal data. We built custom Node.js ingestion scripts (`ingestSCJudgments.js`, `seedVerdicts.js`) that downloaded over 35,000 JSON metadata files from AWS S3 buckets containing Indian Supreme Court judgments. 
Our script extracted vital information using Regular Expressions (Regex), including:
- Petitioner and Respondent names
- Citation numbers
- Bench size and Coram (Judges)
- Decision date
- Headnotes and Summaries

The script also featured an auto-classification algorithm that scanned the headnotes for legal keywords to categorize the verdict into domains like Criminal, Constitutional, Family, Property, or Corporate Law. This data was then bulk-inserted into MongoDB.

## 5.2 Secure Authentication
Security is paramount in applications dealing with subscriptions. Our authentication flow involves:
1. **Registration:** Capturing user details and hashing the password with a salt factor of 10.
2. **Validation:** Verifying phone numbers and email formats.
3. **Session Management:** Using JWTs. The token encodes the user's ID and role (user vs. advocate). Middleware functions intercept incoming API requests, extract the token from the Authorization header, and verify it using a server-side secret key before granting access to protected routes.

## 5.3 AI Generative Chatbot Integration
The AI chatbot is the crown jewel of Lawbook. When a user navigates to the 'Talk to AI' section, they are greeted by a conversational interface.
To prevent abuse, we implemented a sophisticated rate-limiting system tied to the user's subscription tier:
- Citizen Basic: 10 queries/month.
- Business Standard: 100 queries/month.
- Advocate Pro: Unlimited.
The backend tracks `chatUsage` inside the User model. If the limit is exceeded, the server rejects the request with a 403 Forbidden status, prompting the user to upgrade.

## 5.4 Payment Gateway (Razorpay)
Integrating Razorpay required a two-step process to ensure security:
1. **Order Creation:** The client requests to buy a plan. The backend calls Razorpay's REST API using Basic Auth (Key ID and Secret) to create an 'Order'. Razorpay returns an `order_id`.
2. **Client Checkout:** The React app opens the Razorpay UI widget with the `order_id`. The user pays. Razorpay returns a `razorpay_signature`.
3. **Signature Verification:** The backend receives the signature and uses Node's native `crypto` library to generate an HMAC SHA256 hash using the `order_id`, `payment_id`, and the Secret Key. If the generated hash matches the signature sent by the client, the payment is verified, and the user's database record is upgraded.

<div class="page-break"></div>

# CHAPTER 6: TESTING AND VALIDATION

Testing was an integral part of the development lifecycle to ensure the platform functioned flawlessly across various scenarios.

## 6.1 Unit Testing
We conducted unit tests on individual components and functions.
- **Authentication Validation:** Tested the registration form with blank fields, invalid email formats, and weak passwords to ensure frontend validation prevented submission.
- **Password Hashing:** Verified that two identical passwords resulted in completely different hash strings in the database due to salting.
- **AI Rate Limiter:** We simulated multiple API requests to the `/api/ai/chat` endpoint and verified that the server correctly denied access exactly after the 10th request for free tier users.

## 6.2 Integration Testing
Integration testing focused on the interaction between the React frontend, Express backend, and MongoDB.
- **Database Seeding:** We verified that the Node.js ingestion scripts correctly connected to MongoDB Atlas, cleared old records, parsed HTML regex accurately, and successfully populated thousands of documents without throwing unhandled promise rejections.
- **Payment Flow:** We utilized Razorpay's Test Mode to simulate successful payments, failed payments, and network timeouts. We ensured that the user's subscription status in the dashboard updated in real-time immediately following a successful test payment.

## 6.3 Deployment Challenges and Solutions
During deployment to Render (backend) and Vercel (frontend), we encountered several real-world challenges:
- **CORS Issues:** Initially, the frontend was blocked from communicating with the backend. We configured the Express `cors` middleware to explicitly allow the Vercel domain.
- **MongoDB IP Whitelisting:** Render uses dynamic IPs, which caused MongoDB Atlas to reject connections, resulting in a 10-second timeout and 500 Internal Server Errors. We resolved this by updating the Atlas Network Access rules to allow IP `0.0.0.0/0`.
- **SMTP Port Blocking:** Render's free tier blocks outbound SMTP ports to prevent spam. This caused our email verification (Nodemailer) module to hang indefinitely, breaking the registration process. As a practical workaround, we temporarily bypassed the email verification requirement in the backend logic, setting `isEmailVerified: true` by default.

<div class="page-break"></div>

# CHAPTER 7: RESULTS AND DISCUSSIONS

The final product is a robust, highly responsive, and feature-rich application. 

**User Interface:**
The implementation of Tailwind CSS resulted in a premium aesthetic. Features like glassmorphism on the landing page, dynamic hover states on pricing cards, and a clean, split-pane dashboard for advocates provide a professional user experience. 

**Performance:**
Despite loading large datasets from the database, the backend handles requests swiftly. Using Mongoose's lean queries and implementing proper indexing on fields like `category` and `caseName` drastically reduced search response times.

**AI Accuracy:**
The integration with Google Gemini proved highly effective. By injecting specific persona instructions into the prompt ("You are an expert Indian Legal Assistant..."), the AI successfully filtered out irrelevant global laws and provided answers grounded in the Indian Constitution, the IPC, and the new Bharatiya Nyaya Sanhita (BNS).

Overall, the project successfully meets all the objectives outlined in the problem statement.

<div class="page-break"></div>

# CHAPTER 8: CONCLUSION AND FUTURE SCOPE

## 8.1 Conclusion
The **LAWBOOK** project demonstrates the immense potential of combining modern web development frameworks with Artificial Intelligence to solve real-world accessibility issues. Through rigorous development, testing, and deployment, we successfully built a platform that demystifies legal concepts for the common citizen while offering a powerful research utility for legal professionals. 

The successful ingestion of thousands of Supreme Court verdicts highlights the capability of Node.js scripts to handle large-scale data processing. Furthermore, the integration of Razorpay and JWT authentication proves that secure, commercial-grade applications can be developed efficiently using the MERN stack.

## 8.2 Future Scope
While the current version is fully functional, there are several avenues for future enhancement:
1. **Multilingual Support:** Integrating translation APIs to allow users to ask legal queries and read laws in regional Indian languages (Hindi, Marathi, Tamil, etc.).
2. **Lawyer-Client Portal:** Adding a feature where citizens can directly book consultations with verified advocates listed on the platform via an integrated calendar and video-conferencing tool.
3. **Retrieval-Augmented Generation (RAG):** Enhancing the AI chatbot by dynamically feeding it specific verdicts from our own MongoDB database before it generates a response, eliminating AI hallucinations entirely and ensuring 100% accurate citations.
4. **Mobile Application:** Converting the responsive web application into a native Android/iOS mobile application using React Native to reach a broader audience.

<div class="page-break"></div>

# REFERENCES

1. "React Documentation." React, Meta Open Source, https://react.dev.
2. "Node.js v18.x Documentation." Node.js Foundation, https://nodejs.org/docs.
3. "Express - Node.js web application framework." https://expressjs.com.
4. "Mongoose ODM v7.x." Automattic, https://mongoosejs.com.
5. "Tailwind CSS - Rapidly build modern websites." Tailwind Labs, https://tailwindcss.com.
6. "Razorpay API Documentation." Razorpay Software Private Limited, https://razorpay.com/docs.
7. "Google Gemini API Reference." Google Cloud, https://ai.google.dev.
8. Vanga, "Indian Supreme Court Judgments Dataset," GitHub Repository, https://github.com/vanga/indian-supreme-court-judgments.

<div class="page-break"></div>

# APPENDIX: CORE SOURCE CODE

This section contains excerpts from the core implementation files of the Lawbook application, demonstrating the practical application of the concepts discussed in this report.
"""

with open(report_file, 'w', encoding='utf-8') as f:
    f.write(report_content)

snippets = [
    {'path': 'server/ingestSCJudgments.js', 'title': 'Data Ingestion Script (Supreme Court Judgments)'},
    {'path': 'server/server.js', 'title': 'Express Server Configuration'},
    {'path': 'server/routes/auth.js', 'title': 'Authentication & Payment Route Logic'},
    {'path': 'server/models/User.js', 'title': 'Mongoose User Schema'},
    {'path': 'client/src/pages/PricingPage.js', 'title': 'React Frontend: Pricing & Razorpay Integration'},
    {'path': 'client/src/context/AuthContext.js', 'title': 'React Frontend: Authentication Context'}
]

for snippet in snippets:
    filepath = snippet['path']
    title = snippet['title']
    content = get_code_snippet(filepath, title)
    if content:
        with open(report_file, 'a', encoding='utf-8') as f:
            f.write(content)

print("Markdown report generated successfully.")
