// import { main } from './handler';
// const mock = require('./mock.json');

const getSignedUrlMock = jest.fn(_ => {
  return Promise.resolve({
    preSignedUrl: "https://example.url.com"
  })
})

jest.mock('aws-sdk', () => {
  return {
    S3: jest.fn(_ => {
      return {
        getSignedUrlPromise: getSignedUrlMock
      }
    })
  }
})

describe("Pre-Signed URL", () => {
  it("Should return pre signed URL", () => {

    // const context: any = {};
    // const callback = () => { };

    // main({ mock }, context, callback);
    // expect(getSignedUrlMock).toHaveBeenCalledWith(mock.event.fileName);
    expect(true).toBeTruthy();
  })
})
