const fs = require('fs');

const files = [
  'src/components/career/applyform/applyform.tsx'
];

const SPINNER = `<span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span>`;

files.forEach(f => {
  try {
    let text = fs.readFileSync(f, 'utf8');
    
    if (f.includes('applyform.tsx')) {
      text = text.replace(
        /{isSubmitting \? 'Submitting\.\.\.' : 'Submit Application'}/g,
        `{isSubmitting ? (<> ${SPINNER} Submitting... </>) : ('Submit Application')}`
      );
    }
    fs.writeFileSync(f, text, 'utf8');
    console.log('Updated ' + f);
  } catch (e) {
    console.log('Skipped ' + f + ' ' + e.message);
  }
});
