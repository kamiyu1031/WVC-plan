const fs = require('fs');
const content = fs.readFileSync('temp_docx/word/document.xml', 'utf8');
const tables = content.match(/<w:tbl>([\s\S]*?)<\/w:tbl>/g) || [];
tables.forEach((t, i) => {
    console.log('--- TABLE ' + i + ' ---');
    const rows = t.match(/<w:tr[\s>]([\s\S]*?)<\/w:tr>/g) || [];
    rows.forEach(r => {
        const cells = r.match(/<w:tc[\s>]([\s\S]*?)<\/w:tc>/g) || [];
        const rowText = cells.map(c => {
            const texts = c.match(/<w:t[\s>]*?>([\s\S]*?)<\/w:t>/g) || [];
            return texts.map(tx => tx.replace(/<.*?>/g, '')).join('');
        });
        console.log(JSON.stringify(rowText));
    });
});
