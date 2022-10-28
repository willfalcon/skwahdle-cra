const Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app8UrJKvRkUdKUI0');

async function getWord() {
  return new Promise((resolve, reject) => {
    base('Words')
      .select({
        maxRecords: 1,
        view: 'Today',
      })
      .firstPage((err, records) => {
        if (err) {
          console.log({ err });
          reject(err);
        }
        resolve(records[0].fields.Word);
      });
  });
}

exports.handler = async function (event) {
  const word = await getWord(base);

  return {
    statusCode: 200,
    body: JSON.stringify({ word }),
  };
};
