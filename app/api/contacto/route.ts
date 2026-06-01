import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contacto
 *
 * Recibe el formulario de contacto y envía un correo
 * vía Brevo API (TransactionalEmails).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, empresa, correo, telefono, asunto, mensaje } = body;

    // Validación básica
    if (!nombre || !correo || !asunto || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido" },
        { status: 400 },
      );
    }

    // Validar longitudes razonables (anti-spam)
    if (
      nombre.length > 100 ||
      empresa?.length > 100 ||
      correo.length > 200 ||
      telefono?.length > 50 ||
      asunto.length > 100 ||
      mensaje.length > 5000
    ) {
      return NextResponse.json(
        { error: "Algún campo excede el largo máximo permitido" },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY no está configurada");
      return NextResponse.json(
        { error: "Servicio de correo no configurado" },
        { status: 500 },
      );
    }

    // Cuerpo HTML del correo (para tu Gmail)
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #2C303D;">
        <div style="background: linear-gradient(135deg, #B54E2B 0%, #8B3A1F 100%); padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Nuevo mensaje desde arciblock.com</h1>
        </div>
        <div style="padding: 24px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 130px; color: #6b7280; font-size: 13px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${escapeHtml(nombre)}</td>
            </tr>
            ${empresa ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Empresa</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(empresa)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Correo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${escapeHtml(correo)}" style="color: #B54E2B; text-decoration: none;">${escapeHtml(correo)}</a>
              </td>
            </tr>
            ${telefono ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Teléfono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(telefono)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Asunto</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${escapeHtml(asunto)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <div style="color: #6b7280; font-size: 13px; margin-bottom: 8px;">Mensaje</div>
            <div style="background: #f9fafb; padding: 16px; border-radius: 6px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(mensaje)}</div>
          </div>
        </div>
        <div style="padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 6px 6px;">
          Mensaje enviado desde el formulario de contacto de
          <a href="https://arciblock.com" style="color: #B54E2B;">arciblock.com</a>
        </div>
      </div>
    `;

    // Llamada a Brevo API
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Arciblock Web",
          email: "noreply@arciblock.com",
        },
        to: [
          {
            email: "arciblocksas@gmail.com",
            name: "Arciblock",
          },
        ],
        replyTo: {
          email: correo,
          name: nombre,
        },
        subject: `[Web] ${asunto}`,
        htmlContent: htmlBody,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("Brevo error:", brevoResponse.status, errorText);
      return NextResponse.json(
        { error: "No fue posible enviar el correo. Intenta de nuevo o escríbenos directamente." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en /api/contacto:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}