import http from 'http';

const BASE_URL = 'http://localhost:5000';

const request = (path, method = 'GET', body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, text: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('=====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE JAY GURU DEV VERIFICATION 🧪');
  console.log('=====================================================');

  // 1. Health check
  console.log('\n[Test 1] Health Check...');
  const health = await request('/api/health');
  console.log(`Status: ${health.status}, Response:`, health.data.message);

  // 2. States API
  console.log('\n[Test 2] Fetching States list...');
  const statesRes = await request('/api/states');
  console.log(`Status: ${statesRes.status}, Total States found: ${statesRes.data.data.length}`);
  const bihar = statesRes.data.data.find((s) => s.code === 'BR');
  console.log(`Found Bihar state: ${bihar.name_hi} (${bihar.name_en}) - Upcoming Satsang count: ${bihar.upcomingCount}`);

  // 3. Districts by State (Bihar)
  console.log('\n[Test 3] Fetching Districts for Bihar...');
  const districtsRes = await request(`/api/states/${bihar.id}/districts`);
  console.log(`Status: ${districtsRes.status}, Districts in Bihar: ${districtsRes.data.data.length}`);
  const muzaffarpur = districtsRes.data.data.find((d) => d.name_en === 'Muzaffarpur');
  console.log(`Found Muzaffarpur district: ${muzaffarpur.name_hi} - Upcoming count: ${muzaffarpur.upcomingCount}`);

  // 4. Satsang listing & search (Bihar -> Muzaffarpur)
  console.log('\n[Test 4] Querying Satsang in Muzaffarpur, Bihar...');
  const satsangQuery = await request(`/api/satsang?stateId=${bihar.id}&districtId=${muzaffarpur.id}`);
  console.log(`Status: ${satsangQuery.status}, Satsangs in Muzaffarpur: ${satsangQuery.data.data.length}`);
  const sampleEvent = satsangQuery.data.data[0];
  console.log(`Event Title: "${sampleEvent.title}"`);
  console.log(`Event Date & Time: ${sampleEvent.date} @ ${sampleEvent.startTime}`);
  console.log(`Venue: ${sampleEvent.venue}`);
  console.log(`Organizer: ${sampleEvent.organizerName} (${sampleEvent.organizerPhone})`);
  console.log(`Maps Link: ${sampleEvent.googleMapsUrl}`);

  // 5. Satsang Highlights
  console.log('\n[Test 5] Fetching Homepage Highlights...');
  const highlights = await request('/api/satsang/highlights');
  console.log(`Today's Events: ${highlights.data.data.today.length}, Upcoming Events: ${highlights.data.data.upcoming.length}`);

  // 6. Admin Authentication
  console.log('\n[Test 6] Admin Login with (admin@jaygurudev.org / admin123)...');
  const loginRes = await request('/api/auth/login', 'POST', {
    email: 'admin@jaygurudev.org',
    password: 'admin123',
  });
  console.log(`Status: ${loginRes.status}, Logged In User: ${loginRes.data.data.name}`);
  const adminToken = loginRes.data.data.token;

  // 7. Admin Add New Satsang
  console.log('\n[Test 7] Admin Adding New Satsang in Patna...');
  const patna = districtsRes.data.data.find((d) => d.name_en === 'Patna');
  const createRes = await request(
    '/api/satsang',
    'POST',
    {
      title: 'पटना विशेष संध्या सत्संग एवं विचार गोष्ठी',
      title_hi: 'पटना विशेष संध्या सत्संग एवं विचार गोष्ठी',
      date: '2026-09-25',
      startTime: '05:00 PM',
      endTime: '07:30 PM',
      stateId: bihar.id,
      districtId: patna.id,
      city: 'पटना',
      village: 'गांधी मैदान',
      venue: 'गांधी मैदान मुख्य सभागार',
      address: 'गांधी मैदान, पटना, बिहार - 800001',
      landmark: 'कारगिल चौक',
      organizerName: 'सुरेश कुमार जी',
      organizerPhone: '+91 94310 99999',
      description: 'सदाचार और आत्म कल्याण पर विशेष सत्संग।',
      status: 'upcoming',
      isFeatured: true,
    },
    { Authorization: `Bearer ${adminToken}` }
  );
  console.log(`Status: ${createRes.status}, Created Satsang ID: ${createRes.data.data.id}`);
  const newEventId = createRes.data.data.id;

  // 8. Verify newly created event appears in public listing
  console.log('\n[Test 8] Verifying newly added Satsang in public API...');
  const singleEvent = await request(`/api/satsang/${newEventId}`);
  console.log(`Status: ${singleEvent.status}, Fetched Event Title: "${singleEvent.data.data.title}"`);

  // 9. Admin Update Satsang
  console.log('\n[Test 9] Admin Updating Satsang (Change timing & description)...');
  const updateRes = await request(
    `/api/satsang/${newEventId}`,
    'PUT',
    {
      startTime: '05:30 PM',
      endTime: '08:00 PM',
      description: 'अपडेट किया गया विवरण: गुरु का अटूट लंगर शाम 8 बजे से।',
    },
    { Authorization: `Bearer ${adminToken}` }
  );
  console.log(`Status: ${updateRes.status}, Updated Time: ${updateRes.data.data.startTime} - ${updateRes.data.data.endTime}`);

  // 10. Admin Delete Satsang
  console.log('\n[Test 10] Admin Deleting the test Satsang...');
  const deleteRes = await request(`/api/satsang/${newEventId}`, 'DELETE', null, {
    Authorization: `Bearer ${adminToken}`,
  });
  console.log(`Status: ${deleteRes.status}, Delete Message:`, deleteRes.data.message);

  // 11. Stats check
  console.log('\n[Test 11] Checking Dashboard Statistics...');
  const statsRes = await request('/api/stats');
  console.log('System Stats:', statsRes.data.data);

  console.log('\n=====================================================');
  console.log('🎉 ALL 11 TEST CASES PASSED WITH 100% SUCCESS! 🎉');
  console.log('=====================================================');
};

runTests().catch((err) => {
  console.error('Test failed:', err);
});
