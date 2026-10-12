import { notFound } from "next/navigation";
import { manuscriptEmailHtml } from "@/lib/emailTemplate";

export default function EmailPreview() {
  if (process.env.NODE_ENV === "production") notFound();

  const html = manuscriptEmailHtml(
    process.env.MANUSCRIPT_URL ?? "https://your-manuscript-link-here.com"
  );

  return (
    <div>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        background: "#1a1a1a", borderBottom: "1px solid #333",
        padding: "10px 16px", fontFamily: "monospace", fontSize: "12px",
        color: "#888", zIndex: 9999, display: "flex", gap: "16px",
        alignItems: "center",
      }}>
        <span style={{ color: "#e8e4dc" }}>Email Preview</span>
        <span>— this page is only visible in development</span>
      </div>
      <div style={{ paddingTop: "40px" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
