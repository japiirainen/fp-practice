const { compose } = require('ramda')

const meet = me => you => ({ me, you })
const meetMe = meet('Joona')

const intoCouple = couple => `${couple.me} + ${couple.you} ♥️`
const makeCouple = compose(intoCouple, meetMe)

console.log(makeCouple('YOUR_NAME_HERE'))
