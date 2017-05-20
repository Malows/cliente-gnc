import MD5 from 'crypto-js/md5'

export default {
  userAvatar: state => {
    return 'https://www.gravatar.com/avatar/' + MD5(state.user.email.trim().toLowerCase()) + '.jpg'
  }
}
