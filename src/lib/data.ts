export type Status = "active" | "inactive";
export interface Base { id: string; status: string }
export interface Service extends Base { title: string; summary: string; description: string; benefits: string; image: string }
export interface Program extends Base { title: string; category: string; format: string; duration: string; description: string; outcomes: string; image: string }
export interface Article extends Base { title: string; slug: string; category: string; excerpt: string; content: string; author: string; date: string; readTime: string; image: string; featured: string }
export interface GalleryItem extends Base { title: string; caption: string; image: string }
export interface Enquiry extends Base { name: string; email: string; phone: string; company: string; service: string; message: string; source: string; date: string }
export interface InfoItem extends Base { label: string; value: string; type: string }
export interface AboutSection extends Base { title: string; type: string; body: string }

export interface DB {
  company: InfoItem[]; about: AboutSection[]; services: Service[]; programs: Program[];
  articles: Article[]; gallery: GalleryItem[]; enquiries: Enquiry[]; contact: InfoItem[];
}

export const COMPANY_NAME = "ENVISAGE LEADERSHIP LLP";
export const REGISTERED_OFFICE = "701 Runwal Classique CHS LTD, CTR Avenue Road, Chembur, Mumbai, Maharashtra 400071, India";
export const PARTNERS = ["Karanjit Singh Chaudhary", "Geet Inder Vijjan"];

const a = "active";

export function createDefaults(): DB {
  return {
    company: [
      { id: "c1", status: a, type: "legal", label: "Company Name", value: COMPANY_NAME },
      { id: "c2", status: a, type: "legal", label: "LLPIN", value: "ADB-1382" },
      { id: "c3", status: a, type: "legal", label: "Status", value: "Active" },
      { id: "c4", status: a, type: "legal", label: "Incorporation Date", value: "12 August 2026" },
      { id: "c5", status: a, type: "legal", label: "ROC", value: "ROC Mumbai I" },
      { id: "c6", status: a, type: "legal", label: "Business Activity", value: "Activities of head offices and management consultancy activities." },
      { id: "c7", status: a, type: "partner", label: "Designated Partner", value: PARTNERS[0]! },
      { id: "c8", status: a, type: "partner", label: "Designated Partner", value: PARTNERS[1]! },
      { id: "c9", status: a, type: "address", label: "Registered Office", value: REGISTERED_OFFICE },
    ],
    about: [
      { id: "a1", status: a, type: "overview", title: "Company Overview", body: "ENVISAGE LEADERSHIP LLP is a Mumbai-based management consultancy and professional coaching centre. We partner with leaders, teams and organisations to bring clarity to strategy, strength to leadership and structure to growth." },
      { id: "a2", status: a, type: "background", title: "Our Background", body: "Incorporated in August 2026 and registered with ROC Mumbai I, the firm was founded with a simple conviction: that organisations grow when their people are equipped to think strategically and lead with purpose. From our registered office in Chembur, we bring a focused, business-first perspective to every engagement." },
      { id: "a3", status: a, type: "vision", title: "Our Vision", body: "To be a trusted partner for leaders who want to envision boldly, decide wisely and build organisations that endure." },
      { id: "a4", status: a, type: "mission", title: "Our Mission", body: "To deliver practical consultancy and thoughtful coaching that helps individuals and organisations translate ambition into clear strategy, capable leadership and measurable progress." },
      { id: "a5", status: a, type: "philosophy", title: "Our Philosophy", body: "We believe leadership is a discipline that can be developed. Our work combines structured strategic thinking with personal reflection, so that every recommendation is grounded in business reality and every leader leaves with a sharper sense of direction." },
      { id: "a6", status: a, type: "approach", title: "Leadership Approach", body: "We listen before we advise. Each engagement begins with understanding context, people and priorities, followed by a tailored plan that blends advisory, coaching and capability building." },
      { id: "a7", status: a, type: "value", title: "Integrity", body: "Honest counsel, confidentiality and accountability in every relationship." },
      { id: "a8", status: a, type: "value", title: "Clarity", body: "Turning complexity into clear priorities and practical next steps." },
      { id: "a9", status: a, type: "value", title: "Partnership", body: "Working alongside our clients, not above them." },
      { id: "a10", status: a, type: "value", title: "Growth", body: "A lasting commitment to the development of people and organisations." },
    ],
    services: [
      { id: "s1", status: a, image: "strategy", title: "Management Consultancy", summary: "Objective guidance on structure, operations and decision-making.", description: "We work with leadership teams to diagnose challenges, evaluate options and design practical solutions across management, operations and governance.", benefits: "Independent perspective on key decisions\nClearer management structures\nImproved operational focus" },
      { id: "s2", status: a, image: "workshop", title: "Business Strategy & Advisory", summary: "Shaping direction with clarity and conviction.", description: "From market positioning to long-term planning, we help you define where to play, how to win and what to prioritise next.", benefits: "Clearly articulated strategic priorities\nAligned leadership team\nPractical roadmap for execution" },
      { id: "s3", status: a, image: "planning", title: "Corporate Planning", summary: "Turning strategy into structured, achievable plans.", description: "We support annual and multi-year planning, goal setting and performance frameworks that connect ambition with day-to-day action.", benefits: "Goals linked to strategy\nDefined milestones and ownership\nBetter planning discipline" },
      { id: "s4", status: a, image: "orgdev", title: "Organizational Development", summary: "Building structures and cultures that scale.", description: "We help organisations review roles, team design and ways of working so that people and processes support the strategy.", benefits: "Clarity of roles and responsibilities\nStronger team collaboration\nCulture aligned with goals" },
      { id: "s5", status: a, image: "hero", title: "Leadership Consultancy", summary: "Advising leaders on the decisions that matter most.", description: "A confidential sounding board for founders, partners and senior leaders navigating growth, change and complex choices.", benefits: "Confidential strategic counsel\nMore confident decision-making\nLeadership aligned to vision" },
      { id: "s6", status: a, image: "mentoring", title: "Business Growth Advisory", summary: "Identifying and pursuing the right growth opportunities.", description: "We help businesses assess growth avenues, strengthen fundamentals and prepare their teams for the next stage.", benefits: "Prioritised growth opportunities\nStronger business fundamentals\nReadiness for scale" },
      { id: "s7", status: a, image: "execdev", title: "Executive Development", summary: "Preparing leaders for broader responsibility.", description: "Structured development journeys for executives stepping into larger roles, combining assessment, coaching and practical application.", benefits: "Broader leadership capability\nSharper executive presence\nPersonal development plan" },
      { id: "s8", status: a, image: "aboutTeam", title: "Strategic Management Support", summary: "An extended strategic resource for your leadership team.", description: "Ongoing support to review progress, facilitate leadership meetings and keep strategic initiatives on track.", benefits: "Regular strategic reviews\nFacilitated leadership sessions\nSustained execution momentum" },
    ],
    programs: [
      { id: "p1", status: a, image: "coaching", category: "Coaching", format: "One-on-one", duration: "3–6 months", title: "Executive Leadership Coaching", description: "Confidential coaching for senior leaders to strengthen judgement, influence and leadership impact.", outcomes: "Greater self-awareness\nStronger influence\nClear leadership goals" },
      { id: "p2", status: a, image: "reading", category: "Coaching", format: "One-on-one", duration: "8–12 sessions", title: "Personal Development Coaching", description: "A reflective journey to clarify values, build confidence and design a purposeful path forward.", outcomes: "Clarity of purpose\nImproved confidence\nPersonal action plan" },
      { id: "p3", status: a, image: "mentoring", category: "Programs", format: "Cohort", duration: "12 weeks", title: "Professional Growth Programs", description: "Structured programs that help emerging professionals build the skills and mindset for their next role.", outcomes: "Career clarity\nCore leadership skills\nPeer learning network" },
      { id: "p4", status: a, image: "training", category: "Corporate Training", format: "In-company", duration: "Customised", title: "Corporate Leadership Training", description: "Tailored leadership training for managers and teams, designed around your organisation's context.", outcomes: "Consistent leadership practices\nStronger managers\nAligned teams" },
      { id: "p5", status: a, image: "strategy", category: "Workshops", format: "Workshop", duration: "1–2 days", title: "Communication & Presentation Skills", description: "Practical sessions to communicate with clarity, structure ideas and present with confidence.", outcomes: "Structured messaging\nConfident delivery\nExecutive presence" },
      { id: "p6", status: a, image: "planning", category: "Workshops", format: "Workshop", duration: "1 day", title: "Decision-Making Development", description: "Frameworks and practice for making sound decisions under uncertainty.", outcomes: "Decision frameworks\nReduced bias\nFaster, better choices" },
      { id: "p7", status: a, image: "orgdev", category: "Corporate Training", format: "Team program", duration: "6–8 weeks", title: "Team Leadership Development", description: "Helping team leaders build trust, delegate effectively and drive performance.", outcomes: "Higher team trust\nEffective delegation\nClear accountability" },
      { id: "p8", status: a, image: "workshop", category: "Workshops", format: "Workshop", duration: "1–2 days", title: "Strategic Thinking Workshops", description: "Facilitated workshops to build strategic thinking habits and long-term perspective.", outcomes: "Big-picture thinking\nScenario planning skills\nStrategic priorities" },
    ],
    articles: [
      { id: "ar1", status: "published", featured: "yes", image: "reading", category: "Leadership", author: "Envisage Editorial", date: "2026-11-10", readTime: "6 min", slug: "leading-with-clarity", title: "Leading with Clarity in Uncertain Times", excerpt: "Why the most effective leaders simplify before they decide — and how to build that habit.", content: "Uncertainty is not new to business, but its pace has changed. Leaders today face more information, more stakeholders and less time than ever before.\n\nClarity begins with a small number of priorities. When everything is important, nothing is. The leaders we admire most are able to say what matters now, what can wait, and why.\n\nPractically, this means setting aside time each week to step back from operations, review the few outcomes that define success, and communicate them consistently to the team.\n\nClarity is not certainty. It is the discipline of deciding where to focus while remaining open to new information." },
      { id: "ar2", status: "published", featured: "yes", image: "mentoring", category: "Professional Development", author: "Envisage Editorial", date: "2026-11-03", readTime: "5 min", slug: "the-value-of-mentoring", title: "The Quiet Power of Mentoring Conversations", excerpt: "Regular, honest conversations can accelerate professional growth more than any course.", content: "Some of the most significant growth in a career happens in conversation. A thoughtful question from a mentor can reframe a challenge in minutes.\n\nGood mentoring relationships are built on trust, regularity and candour. They work best when the mentee arrives with a real question and leaves with a next step.\n\nOrganisations that encourage these conversations build a culture where learning is continuous, not occasional." },
      { id: "ar3", status: "published", featured: "yes", image: "workshop", category: "Business Strategy", author: "Envisage Editorial", date: "2026-10-27", readTime: "7 min", slug: "strategy-is-a-team-sport", title: "Strategy Is a Team Sport", excerpt: "Strategies fail in execution when teams are not part of their creation. Here is a better way.", content: "A strategy designed in isolation is rarely executed with conviction. People commit to what they help create.\n\nInvolving teams early — through structured workshops and honest discussion — surfaces practical insight and builds ownership.\n\nThe role of leadership is to frame the questions, set the boundaries and make the final call, while drawing on the collective intelligence of the organisation." },
      { id: "ar4", status: "published", featured: "no", image: "planning", category: "Management", author: "Envisage Editorial", date: "2026-10-18", readTime: "4 min", slug: "planning-that-works", title: "Annual Planning That Actually Works", excerpt: "Five principles for plans that stay alive beyond the first quarter.", content: "Most annual plans are forgotten by March. Plans that survive share a few traits: they are short, they name owners, and they are reviewed regularly.\n\nStart with three to five outcomes. Assign each a single accountable leader. Review progress monthly, and adjust without guilt when circumstances change." },
      { id: "ar5", status: "published", featured: "no", image: "coaching", category: "Coaching", author: "Envisage Editorial", date: "2026-10-09", readTime: "5 min", slug: "what-coaching-is", title: "What Executive Coaching Is — and Isn't", excerpt: "Coaching is not advice-giving. Understanding the difference helps leaders get real value.", content: "Executive coaching is a structured, confidential partnership focused on the leader's own goals. A coach asks, challenges and supports — but the insight and decisions belong to the leader.\n\nThe best outcomes come when leaders approach coaching with a clear intention and a willingness to reflect honestly." },
      { id: "ar6", status: "published", featured: "no", image: "training", category: "Leadership", author: "Envisage Editorial", date: "2026-09-30", readTime: "6 min", slug: "developing-first-time-managers", title: "Developing First-Time Managers", excerpt: "The transition from individual contributor to manager is one of the hardest in any career.", content: "New managers are often promoted for technical excellence, then asked to succeed through others. Without support, many struggle quietly.\n\nEffective development combines practical skills — delegation, feedback, one-on-ones — with coaching that helps new managers build a leadership identity." },
    ],
    gallery: [
      { id: "g1", status: a, image: "hero", title: "Boardroom Session", caption: "Leadership strategy discussion" },
      { id: "g2", status: a, image: "training", title: "Leadership Training", caption: "Corporate leadership program" },
      { id: "g3", status: a, image: "workshop", title: "Strategy Workshop", caption: "Collaborative strategic thinking" },
      { id: "g4", status: a, image: "coaching", title: "Coaching Session", caption: "One-on-one executive coaching" },
      { id: "g5", status: a, image: "orgdev", title: "Team Workshop", caption: "Organisational development" },
      { id: "g6", status: a, image: "aboutOffice", title: "Our Space", caption: "A calm space for focused conversations" },
    ],
    enquiries: [
      { id: "e1", status: "new", source: "Contact", date: "2026-11-22", name: "Demo: Priya Sharma", email: "priya@example.com", phone: "+91 00000 00000", company: "Example Pvt Ltd", service: "Executive Leadership Coaching", message: "Sample enquiry — interested in coaching for our senior team." },
      { id: "e2", status: "contacted", source: "Coaching", date: "2026-11-18", name: "Demo: Rahul Mehta", email: "rahul@example.com", phone: "+91 00000 00000", company: "Sample Ventures", service: "Business Strategy & Advisory", message: "Sample enquiry — looking for strategic planning support." },
    ],
    contact: [
      { id: "ct1", status: a, type: "email", label: "Email", value: "[Email to be confirmed]" },
      { id: "ct2", status: a, type: "phone", label: "Phone", value: "[Phone to be confirmed]" },
      { id: "ct3", status: a, type: "whatsapp", label: "WhatsApp", value: "[WhatsApp to be confirmed]" },
      { id: "ct4", status: a, type: "instagram", label: "Instagram", value: "[Instagram handle to be confirmed]" },
      { id: "ct5", status: a, type: "address", label: "Registered Office", value: REGISTERED_OFFICE },
      { id: "ct6", status: a, type: "hours", label: "Office Hours", value: "Monday – Saturday, by appointment" },
    ],
  };
}
