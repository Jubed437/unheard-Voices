export function manuscriptEmailHtml(manuscriptUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unheard Voices</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#0d0b09;">

          <!-- TOP NAV BAR -->
          <tr>
            <td style="padding:24px 36px;border-bottom:1px solid #2a2520;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:Georgia,serif;font-size:12px;letter-spacing:0.3em;color:#c9b99a;text-transform:uppercase;">Unheard Voices</span>
                  </td>
                  <td align="right">
                    <span style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.15em;color:#4a4540;text-transform:uppercase;">Stories &nbsp;/&nbsp; Thoughts &nbsp;/&nbsp; Memories</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MAIN CONTENT AREA -->
          <tr>
            <td style="padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>

                  <!-- LEFT COLUMN — text -->
                  <td width="58%" valign="top" style="padding:44px 36px 44px 36px;background:#0d0b09;">

                    <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:10px;letter-spacing:0.25em;color:#8a7a60;text-transform:uppercase;">
                      Delivery Note &nbsp;/&nbsp; 001
                    </p>

                    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:48px;font-style:italic;font-weight:400;color:#e8dcc8;line-height:1.1;">
                      You stayed.
                    </h1>

                    <p style="margin:0 0 28px;font-family:Georgia,serif;font-size:15px;color:#c9b99a;line-height:1.7;letter-spacing:0.04em;">
                      Most doors open outward.<br/>
                      This one opens inward.
                    </p>

                    <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:13px;color:#7a6e60;line-height:1.9;">
                      Five minutes is a strange amount of time<br/>to give a stranger.
                      You gave it to me.
                    </p>

                    <p style="margin:0 0 36px;font-family:Georgia,serif;font-size:13px;color:#7a6e60;line-height:1.9;">
                      I won&rsquo;t pretend that means you know me.<br/>
                      But it means you&rsquo;re willing to listen.
                    </p>

                    <!-- CTA BUTTON -->
                    <a href="${manuscriptUrl}"
                      style="display:inline-block;border:1px solid #8a7a60;padding:14px 28px;text-decoration:none;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;color:#c9b99a;text-transform:uppercase;margin-bottom:36px;">
                      Enter Unheard Voices &nbsp;&rarr;
                    </a>

                    <!-- HANDWRITTEN NOTE -->
                    <p style="margin:0;font-family:Georgia,serif;font-size:14px;font-style:italic;color:#5a5040;line-height:1.8;">
                      Take your time.<br/>
                      Some things are easier to read slowly.
                    </p>
                    <div style="width:60px;height:1px;background:#3a3020;margin-top:12px;"></div>

                  </td>

                  <!-- RIGHT COLUMN — atmospheric dark panel -->
                  <td width="42%" valign="top" style="background:linear-gradient(160deg,#0d0b09 0%,#1a1208 40%,#2a1e0a 70%,#0d0b09 100%);position:relative;">
                    <div style="width:100%;height:100%;min-height:420px;background:radial-gradient(ellipse at 60% 50%,#3d2e10 0%,#1a1208 45%,#0a0806 100%);opacity:0.95;">
                      &nbsp;
                    </div>
                  </td>

                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #1e1a14;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:11px;color:#3a3428;line-height:1.6;">
                      A letter from Voice &nbsp;&middot;&nbsp; If the door doesn&rsquo;t open, use the link below.
                    </p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:#2e2820;word-break:break-all;line-height:1.6;">
                      ${manuscriptUrl}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
