import type { CollectionKey } from "./store";

export type FieldType = "text" | "textarea" | "select" | "image" | "date";
export interface Field { key: string; label: string; type: FieldType; options?: string[]; required?: boolean; list?: boolean; hint?: string }
export interface ModuleDef { slug: string; col: CollectionKey; title: string; singular: string; icon: string; fields: Field[]; columns: string[]; statuses: string[]; publicPath?: string }

const ACT = ["active", "inactive"];

export const MODULES: ModuleDef[] = [
  { slug: "company", col: "company", title: "Company Profile", singular: "Profile Item", icon: "building", columns: ["label", "value", "type"], statuses: ACT, publicPath: "/about",
    fields: [{ key: "label", label: "Label", type: "text", required: true }, { key: "value", label: "Value", type: "textarea", required: true }, { key: "type", label: "Type", type: "select", options: ["legal", "partner", "address"] }] },
  { slug: "about", col: "about", title: "About Us", singular: "Section", icon: "info", columns: ["title", "type"], statuses: ACT, publicPath: "/about",
    fields: [{ key: "title", label: "Title", type: "text", required: true }, { key: "type", label: "Section Type", type: "select", options: ["overview", "background", "vision", "mission", "philosophy", "approach", "value"] }, { key: "body", label: "Content", type: "textarea", required: true }] },
  { slug: "services", col: "services", title: "Services", singular: "Service", icon: "briefcase", columns: ["title", "summary"], statuses: ACT, publicPath: "/services",
    fields: [{ key: "title", label: "Title", type: "text", required: true }, { key: "summary", label: "Summary", type: "text", required: true }, { key: "description", label: "Description", type: "textarea", required: true }, { key: "benefits", label: "Key Benefits", type: "textarea", list: true, hint: "One per line" }, { key: "image", label: "Image", type: "image" }] },
  { slug: "programs", col: "programs", title: "Coaching Programs", singular: "Program", icon: "crown", columns: ["title", "category", "duration"], statuses: ACT, publicPath: "/coaching",
    fields: [{ key: "title", label: "Title", type: "text", required: true }, { key: "category", label: "Category", type: "select", options: ["Coaching", "Programs", "Corporate Training", "Workshops"] }, { key: "format", label: "Format", type: "text" }, { key: "duration", label: "Duration", type: "text" }, { key: "description", label: "Description", type: "textarea", required: true }, { key: "outcomes", label: "Outcomes", type: "textarea", list: true, hint: "One per line" }, { key: "image", label: "Image", type: "image" }] },
  { slug: "articles", col: "articles", title: "Insights / Blog", singular: "Article", icon: "doc", columns: ["title", "category", "date"], statuses: ["published", "draft"], publicPath: "/insights",
    fields: [{ key: "title", label: "Title", type: "text", required: true }, { key: "slug", label: "URL Slug", type: "text", hint: "Auto-generated from title if empty" }, { key: "category", label: "Category", type: "select", options: ["Leadership", "Management", "Business Strategy", "Professional Development", "Coaching"] }, { key: "author", label: "Author", type: "text" }, { key: "date", label: "Date", type: "date" }, { key: "readTime", label: "Read Time", type: "text" }, { key: "featured", label: "Featured", type: "select", options: ["no", "yes"] }, { key: "excerpt", label: "Excerpt", type: "textarea", required: true }, { key: "content", label: "Content", type: "textarea", required: true, hint: "Separate paragraphs with new lines" }, { key: "image", label: "Image", type: "image" }] },
  { slug: "gallery", col: "gallery", title: "Gallery", singular: "Image", icon: "image", columns: ["title", "caption"], statuses: ACT,
    fields: [{ key: "title", label: "Title", type: "text", required: true }, { key: "caption", label: "Caption", type: "text" }, { key: "image", label: "Image", type: "image" }] },
  { slug: "enquiries", col: "enquiries", title: "Enquiries", singular: "Enquiry", icon: "inbox", columns: ["name", "service", "source", "date"], statuses: ["new", "contacted", "closed"],
    fields: [{ key: "name", label: "Full Name", type: "text", required: true }, { key: "email", label: "Email", type: "text", required: true }, { key: "phone", label: "Phone", type: "text" }, { key: "company", label: "Company", type: "text" }, { key: "service", label: "Service Interested In", type: "text" }, { key: "source", label: "Source", type: "select", options: ["Contact", "Consultation", "Coaching", "Manual"] }, { key: "date", label: "Date", type: "date" }, { key: "message", label: "Message", type: "textarea" }] },
  { slug: "contact", col: "contact", title: "Contact Information", singular: "Contact Item", icon: "phone", columns: ["label", "value", "type"], statuses: ACT, publicPath: "/contact",
    fields: [{ key: "label", label: "Label", type: "text", required: true }, { key: "value", label: "Value", type: "text", required: true, hint: "Values starting with [ are treated as placeholders" }, { key: "type", label: "Type", type: "select", options: ["email", "phone", "whatsapp", "instagram", "address", "hours"] }] },
];
