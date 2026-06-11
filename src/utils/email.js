const ACCESS_KEY = '77c0a9ed-1d65-41c3-8f0c-299ef18be037'
const API_URL = 'https://api.web3forms.com/submit'

export async function sendEmailNotification({ name, phone, program, programTitle, programDesc, contact }) {
  const isCustom = Boolean(programTitle || programDesc)

  const now = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const subject = isCustom
    ? `КСК Мечта — Своя программа от ${name}`
    : `КСК Мечта — Новая заявка от ${name}`

  const message = isCustom
    ? [
        '🐎 КСК «МЕЧТА» — ЗАПРОС СВОЕЙ ПРОГРАММЫ',
        '─────────────────────────────',
        `👤 Имя:       ${name}`,
        `📬 Контакт:   ${contact}`,
        `🏇 Программа: ${programTitle}`,
        `📝 Описание:  ${programDesc}`,
        '─────────────────────────────',
        `🕐 ${now} (МСК)`,
      ].join('\n')
    : [
        '🐎 КСК «МЕЧТА» — НОВАЯ ЗАЯВКА НА ЗАНЯТИЕ',
        '─────────────────────────────',
        `👤 Имя:       ${name}`,
        `📞 Телефон:   ${phone}`,
        ...(program ? [`🏇 Программа: ${program}`] : []),
        '─────────────────────────────',
        `🕐 ${now} (МСК)`,
      ].join('\n')

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: ACCESS_KEY, subject, message }),
  })

  const data = await res.json()
  if (!data.success) throw new Error(data.message || 'Web3Forms error')
  return data
}
