const fs = require('fs');
const content = fs.readFileSync('temp_docx/word/document.xml', 'utf8');
const tables = content.match(/<w:tbl>([\s\S]*?)<\/w:tbl>/g) || [];
tables.forEach((t, i) => {
    const rows = t.match(/<w:tr[\s>]([\s\S]*?)<\/w:tr>/g) || [];
    rows.forEach(r => {
        const cells = r.match(/<w:tc[\s>]([\s\S]*?)<\/w:tc>/g) || [];
        if (cells.length >= 3) {
            const col3 = cells[2];
            const paragraphs = col3.match(/<w:p[\s>]([\s\S]*?)<\/w:p>/g) || [];
            paragraphs.forEach(p => {
                const texts = p.match(/<w:t[\s>]*?>([\s\S]*?)<\/w:t>/g) || [];
                const line = texts.map(tx => tx.replace(/<.*?>/g, '')).join('').trim();
                if (line) console.log(line);
            });
        }
    });
});
