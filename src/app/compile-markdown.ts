import * as marked from 'marked';

function compileMarkdown(markdownString: string) {
  return new Promise<string>((resolve, reject) => {
    marked(markdownString, {}, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      return resolve(result);
    });
  });
}

// [tsconfig] lib: "dom" and "webworker" are exclutive.
const _self: Worker = self as any;

_self.onmessage = ev => {
  compileMarkdown(ev.data)
    .then(result => {
      _self.postMessage(result);
    })
    .catch(err => {
      throw err;
    });
};
