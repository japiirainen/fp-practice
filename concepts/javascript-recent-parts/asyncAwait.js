function getFile(file) {
  return new Promise(function (resolve) {
    fakeAjax(file, resolve)
  })
}

async function loadFiles(files) {
  const prs = files.map(getFile)
  for (let pr of prs) {
    console.log(await pr)
  }
}

loadFiles(['file1', 'file2', 'file3'])

//**********************

function fakeAjax(url, cb) {
  var fake_response = {
    file1: 'The first text',
    file2: 'The middle test',
    file3: 'the last text',
  }
}
const myFunc = async () => await console.log('lol')

myFunc()

async function main(favoriteSites) {
  for await (let text of fetchURLs(favoriteSites)) {
    console.log(text)
  }
}
