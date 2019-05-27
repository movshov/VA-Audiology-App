import path from 'path';

export default (request, res) => {
  res.sendFile('index.html', {root: path.join(__dirname,'..', 'dist')});
}
