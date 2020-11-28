const filterEmails = require('./emails');

const mock = {
  rawText: 'aqui dentro dessa string eu tenho os emails wix@hackers.net e também tenho mac@hackers.net.',
  terms: 'hackers.net',
};
const filteredEmails = filterEmails(mock.rawText, mock.terms);

test('Testing the response type', () => {
  expect(Array.isArray(filteredEmails)).toBeTruthy()
})

test('Testing the response data', () => {
  expect(filteredEmails).toStrictEqual(["wix@hackers.net", "mac@hackers.net"]);
});
