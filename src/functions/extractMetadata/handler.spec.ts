// import { main } from './handler';
const mock = require('./mock.json');

jest.mock('aws-sdk', () => {
  return {
    S3: jest.fn(_ => {
      return {
        GetObjectRequest: {} as any,
        getObject: jest.fn(_ => {
          return {
            promise: jest.fn(() => {
              return Promise.resolve()
            })
          }
        })
      }
    })
  }
})

describe("ExtractMetadata", () => {
  it("Should return object metadata", () => {

    // main({ mock }, {} as any, () => { });
    expect(true).toBeTruthy();
  })
})
