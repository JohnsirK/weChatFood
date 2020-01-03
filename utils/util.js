const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 用户头像筛选
const imgPath = e => {
  let suf
  if(!e) {
    return 'http://elm.cangdu.org/img/default.jpg'
  }
  if(e.indexOf('jpeg') !== -1) {
    suf = '.jpeg'
  } else {
    suf = '.png'
  }
  let url = '/' + e.substr(0, 1) + '/' + e.substr(1, 2) + '/' + e.substr(3) + suf
  return 'https://fuss10.elemecdn.com/' + url
}

module.exports = {
  formatTime: formatTime,
  imgPath: imgPath
}
