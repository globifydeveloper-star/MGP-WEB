const fs = require('fs');

const files = [
  'src/components/mobilevantab/appoinment/appoinment.tsx',
  'src/components/contact/ContactPage.tsx',
  'src/components/common/OTPEnquiryForm/OTPEnquiryForm.tsx'
];

const SPINNER = `<span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span>`;

files.forEach(f => {
  try {
    let text = fs.readFileSync(f, 'utf8');
    
    if (f.includes('appoinment.tsx')) {
      text = text.replace(
        /{otpState === 'verifying' \? 'Confirming\.\.\.' : 'Confirm Appointment'}/g,
        `{otpState === 'verifying' ? (<> ${SPINNER} Confirming... </>) : ('Confirm Appointment')}`
      );
    }
    if (f.includes('ContactPage.tsx')) {
      text = text.replace(
        /<span>{isSubmitting \? 'Sending\.\.\.' : 'Send Message'}<\/span>/g,
        `<span>{isSubmitting ? (<> ${SPINNER} Sending... </>) : ('Send Message')}</span>`
      );
    }
    if (f.includes('OTPEnquiryForm.tsx')) {
      text = text.replace(
        /{state === 'verifying' \? 'VERIFYING\.\.\.' : 'SUBMIT'}/g,
        `{state === 'verifying' ? (<> ${SPINNER} VERIFYING... </>) : ('SUBMIT')}`
      );
    }
    fs.writeFileSync(f, text, 'utf8');
    console.log('Updated ' + f);
  } catch (e) {
    console.log('Skipped ' + f + ' ' + e.message);
  }
});
