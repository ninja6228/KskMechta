const BOT_TOKEN = '8960291794:AAHhJLZBtFBwUfmuITM4UDfArEunQgYO3fQ'
const CHAT_ID = '-1003979512541'
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

export async function sendTelegramNotification({ name, phone, program, programTitle, programDesc, contact }) {
  const now = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const isCustom = Boolean(programTitle || programDesc)

  const text = isCustom
    ? [
        '💡 <b>Идея своей программы — КСК Мечта</b>',
        '',
        `👤 <b>Имя:</b> ${name}`,
        `📬 <b>Контакт:</b> ${contact}`,
        `🏇 <b>Название:</b> ${programTitle}`,
        `📝 <b>Описание:</b> ${programDesc}`,
        '',
        `🕐 ${now} (МСК)`,
      ].join('\n')
    : [
        '🐎 <b>Новая заявка с сайта КСК Мечта</b>',
        '',
        `👤 <b>Имя:</b> ${name}`,
        `📞 <b>Телефон:</b> ${phone}`,
        program ? `🏇 <b>Программа:</b> ${program}` : '',
        '',
        `🕐 ${now} (МСК)`,
      ].filter(Boolean).join('\n')

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.description || 'Telegram API error')
  }

  return res.json()
}
