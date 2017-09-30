const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  //split the string by comma and then
  //remove any spaces from the email strings
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => emailRegex.test(email) === false);

  if(invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;

}
