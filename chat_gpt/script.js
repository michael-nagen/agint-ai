const form = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const message = document.getElementById('formMessage');
const downloadButton = document.getElementById('downloadCsv');

const STORAGE_KEY = 'chavruta_waitlist_emails';

function getEmails() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveEmails(emails) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim().toLowerCase();

  if (!isValidEmail(email)) {
    message.textContent = 'נראה שהמייל לא תקין. נסו שוב.';
    message.style.color = '#9b2c2c';
    return;
  }

  const emails = getEmails();
  const exists = emails.some((item) => item.email === email);

  if (exists) {
    message.textContent = 'המייל כבר נמצא ברשימת ההמתנה.';
    message.style.color = '#7a5200';
    return;
  }

  emails.push({ email, createdAt: new Date().toISOString() });
  saveEmails(emails);

  message.textContent = 'מעולה! הצטרפת לרשימת ההמתנה של חברותא.';
  message.style.color = '#1f6b4a';
  emailInput.value = '';
});

downloadButton.addEventListener('click', () => {
  const emails = getEmails();
  const rows = [['email', 'createdAt'], ...emails.map((item) => [item.email, item.createdAt])];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chavruta-waitlist.csv';
  link.click();
  URL.revokeObjectURL(url);
});
