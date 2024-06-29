const axios = require('axios');

const getContests = async (req, res) => {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    const contests = response.data.result.filter(contest => contest.phase === 'BEFORE');
    // console.log(contests)
    res.json(contests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contest data' });
  }
};

module.exports = { getContests };
