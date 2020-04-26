import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

fetch.mockResponse(JSON.stringify({
  definitions: {
    clients: {
      properties: {
        id: {
          type: 'integer',
          description: 'Note:\nThis is a Primary Key.<pk/>'
        }
      }
    }
  }
}), {
  status: 200,
  statusText: 'OK',
  headers: {
    'Content-Type': 'application/openapi+json'
  }
})

// only mock global Vue instance for one test file
if (window.jasmine.testPath.includes('GlobalVuePlugin.spec.js')) {
  Object.defineProperty(window, 'Vue', {
    writable: true,
    value: {
      use: jest.fn()
    }
  })
}
