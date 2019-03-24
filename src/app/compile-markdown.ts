import * as marked from 'marked';

async function compileMarkdown(markdownString: string) {
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

_self.onmessage = async ev => {
  const result = await compileMarkdown(ev.data);
  _self.postMessage(result);
};
