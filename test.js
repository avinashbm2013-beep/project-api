const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test API calls
async function runTests() {
  try {
    console.log('🧪 Starting API Tests...\n');

    // Test 1: GET all projects
    console.log('📍 Test 1: GET /api/projects');
    const getAllResponse = await axios.get(`${BASE_URL}/projects`);
    console.log('✅ Success:', getAllResponse.data);
    console.log();

    // Test 2: POST create new project
    console.log('📍 Test 2: POST /api/projects (Create new project)');
    const createResponse = await axios.post(`${BASE_URL}/projects`, {
      name: 'Test Project',
      description: 'This is a test project'
    });
    console.log('✅ Success:', createResponse.data);
    const newProjectId = createResponse.data.id;
    console.log();

    // Test 3: GET single project
    console.log(`📍 Test 3: GET /api/projects/${newProjectId} (Get single project)`);
    const getSingleResponse = await axios.get(`${BASE_URL}/projects/${newProjectId}`);
    console.log('✅ Success:', getSingleResponse.data);
    console.log();

    // Test 4: PUT update project
    console.log(`📍 Test 4: PUT /api/projects/${newProjectId} (Update project)`);
    const updateResponse = await axios.put(`${BASE_URL}/projects/${newProjectId}`, {
      name: 'Updated Test Project',
      description: 'This project has been updated'
    });
    console.log('✅ Success:', updateResponse.data);
    console.log();

    // Test 5: DELETE project
    console.log(`📍 Test 5: DELETE /api/projects/${newProjectId} (Delete project)`);
    const deleteResponse = await axios.delete(`${BASE_URL}/projects/${newProjectId}`);
    console.log('✅ Success:', deleteResponse.data);
    console.log();

    // Test 6: Error handling - GET non-existent project
    console.log('📍 Test 6: GET non-existent project (Error handling)');
    try {
      await axios.get(`${BASE_URL}/projects/999`);
    } catch (error) {
      console.log('✅ Expected error:', error.response.data);
    }
    console.log();

    console.log('✨ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run tests
runTests();
