const modulesize = require('./')
const tmpfile = require('tmpfile')
const fs = require('fs')

const inputOption = yargs => {
  yargs.positional('input', {
    desc: 'Input file',
    default: process.cwd()
  })
}

const runSizes = async argv => {
  const output = tmpfile({ suffix: '.js' })
  const { stdout, stderr } = await modulesize.compile(argv.input, output)
  const data = fs.readFileSync(output)
  const sizes = await modulesize.counts(data)
  console.log(sizes)
  return sizes
}

const runReadme = async argv => {
  const sizes = await runSizes(argv)
  let readme = fs.readFileSync('README.md').toString()
  const badges = modulesize.badges(sizes)
  const str = `![${sizes.compiled}](${badges.compiled}) ![${sizes.gzipped}](${badges.gzipped})`
  if (readme.includes('compiled%20bundle')) {
    readme = readme.split('\n').map(l => {
      if (l.includes('compiled%20bundle')) return str
      else return l
    }).join('\n')
  } else {
    let insert = readme.indexOf('\n') + 1
    readme = readme.slice(0, insert) + '\n' + str + '\n' + readme.slice(insert)
  }
  fs.writeFileSync('README.md', readme)
}

const yargs = require('yargs')
const args = yargs
  .command('sizes [input]', 'output sizes json', inputOption, runSizes)
  .command('readme [input]', 'write size badges to readme', inputOption, runReadme)
  .argv

if (!args._.length) {
  yargs.showHelp()
}
