'use strict';

exports.status = (statusCode, values, res) => {
  const data = {
    status: statusCode,
    values: values,
  };

  res.status(data.status);
  res.json(data);
  res.end();
};
