export function toCsv(rows) {
  if (!rows.length) return "";

  const headers = Object.keys(rows[0]);

  const escapeValue = (value) => {
    const text = value == null ? "" : String(value);

    if (/[",\r\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  };

  return [
    headers.map(escapeValue).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeValue(row[header])).join(",")
    ),
  ].join("\r\n");
}

export function downloadCsv(filename, rows) {
  const csv = toCsv(rows);
  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}