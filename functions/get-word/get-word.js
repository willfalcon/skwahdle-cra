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
          return reject(err);
        }
        resolve(records[0].fields.Word);
      });
  });
}

exports.handler = async function () {
  try {
    const word = await getWord();
    return {
      statusCode: 200,
      body: JSON.stringify({ word }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
