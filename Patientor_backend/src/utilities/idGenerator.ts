const idGenerator = (): string => {
  const randomEnding = Math.floor((1 + Math.random()) * 0x100000000000)
    .toString(16)
    .substring(1);

  return `d2773336-f723-11e9-8f0b-${randomEnding}`;
};

export default idGenerator;
