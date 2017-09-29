const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Atacama needs your input!</h3>
          <h4>We at Atacama are very curious about everything! So we would like your opinion</h4>
          <p>Please let us know by answering this question with a simple yes or no:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.emailSentRedirectDomain}/api/surveys/thanks">Yes</a>
          </div>
          <div>
            <a href="${keys.emailSentRedirectDomain}/api/surveys/thanks">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
