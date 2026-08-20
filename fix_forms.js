const fs = require('fs');

const files = [
  'src/components/sell-gold-for-cash/GoldSellContact/GoldSellContact.tsx',
  'src/components/layout/SellGoldModal.tsx',
  'src/components/mobilevantab/appoinment/appoinment.tsx',
  'src/components/contact/ContactPage.tsx',
  'src/components/common/OTPEnquiryForm/OTPEnquiryForm.tsx',
  'src/components/career/applyform/applyform.tsx'
];

const SPINNER = \<span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span>\;

files.forEach(f => {
  try {
    let text = fs.readFileSync(f, 'utf8');
    if (f.includes('GoldSellContact.tsx')) {
      text = text.replace(
        /{isSubmitting \\\? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}/g,
        \{isSubmitting ? (<> \ SUBMITTING... </>) : ('SUBMIT ENQUIRY')}\
      );
    }
    if (f.includes('SellGoldModal.tsx')) {
      text = text.replace(
        /{otpState === 'verifying' \\\? 'VERIFYING...' : 'GET MY OFFER'}/g,
        \{otpState === 'verifying' ? (<> \ VERIFYING... </>) : ('GET MY OFFER')}\
      );
    }
    if (f.includes('appoinment.tsx')) {
      text = text.replace(
        /{otpState === 'verifying' \\\? 'VERIFYING...' : 'BOOK APPOINTMENT'}/g,
        \{otpState === 'verifying' ? (<> \ VERIFYING... </>) : ('BOOK APPOINTMENT')}\
      );
    }
    if (f.includes('ContactPage.tsx')) {
      text = text.replace(
        /{isSubmitting \\\? 'SENDING...' : 'SEND MESSAGE'}/g,
        \{isSubmitting ? (<> \ SENDING... </>) : ('SEND MESSAGE')}\
      );
    }
    if (f.includes('OTPEnquiryForm.tsx')) {
      text = text.replace(
        /{otpState === 'verifying' \\\? 'SUBMITTING...' : submitText}/g,
        \{otpState === 'verifying' ? (<> \ SUBMITTING... </>) : submitText}\
      );
    }
    fs.writeFileSync(f, text, 'utf8');
    console.log('Updated ' + f);
  } catch (e) {
    console.log('Skipped ' + f + ' ' + e.message);
  }
});
