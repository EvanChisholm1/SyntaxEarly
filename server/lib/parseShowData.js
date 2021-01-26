const parseShowData = file => {
  // console.log(file);
  const head = file.split('---')[1];
  const parsedData = head
    .split('\n')
    .map(str => {
      const halves = str.split(': ');
      const [key, data] = halves;
      if (!key) return;
      return { [key]: data };
    })
    .reduce((acc, current) => ({ ...acc, ...current }));

  parsedData.number = parseInt(parsedData.number);
  return parsedData;
};

module.exports = parseShowData;
