async function testApi() {
    try {
        console.log('Logging in...');
        const loginRes = await fetch('https://mgpauthext-mgpuat.muthootexim.com/channel/channellogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'MP20500356', password: 'password123' })
        });
        
        console.log('Login status:', loginRes.status);
        const loginData = await loginRes.json();
        console.log('Login Response:', JSON.stringify(loginData).substring(0, 200));

        const token = loginData?.respData?.accessToken || loginData?.token || loginData?.respData?.token;
        if (!token) {
            console.log('No token found!');
            return;
        }

        console.log('Fetching quote...');
        const quoteRes = await fetch('https://mgpcommonext-mgpuat.muthootexim.com/ChannelQuickQuote/ChannelGetQuote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer 
            },
            body: JSON.stringify({ weightInGms: 1, purityPerc: 99.9 })
        });

        console.log('Quote status:', quoteRes.status);
        const quoteText = await quoteRes.text();
        console.log('Quote response:', quoteText);
    } catch (e) {
        console.error('Error:', e);
    }
}

testApi();
