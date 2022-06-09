const USER_INFO_ACCOUNT = 'user_info_account'
const USER_INFO_NAME = 'user_info_name'
const USER_INFO_AVATAR = 'user_info_avatar'
const USER_INFO_RESOURCES = 'user_info_resources'

export function clearUserInfo() {
  localStorage.removeItem(USER_INFO_NAME)
  localStorage.removeItem(USER_INFO_AVATAR)
  removeUserResource()
}

export function saveAvatar(avatar) {
  if (avatar) {
    localStorage.setItem(USER_INFO_AVATAR, avatar)
  }
}

export function getAvatar() {
  return localStorage.getItem(USER_INFO_AVATAR)
}

export function saveName(name) {
  if (name) {
    return localStorage.setItem(USER_INFO_NAME, name)
  }
}

export function getName() {
  return localStorage.getItem(USER_INFO_NAME)
}

export function saveUserAccount(account) {
  return localStorage.setItem(USER_INFO_ACCOUNT, account)
}

export function getUserAccount() {
  return localStorage.getItem(USER_INFO_ACCOUNT)
}

export function removeUserAccount() {
  return localStorage.removeItem(USER_INFO_ACCOUNT)
}

export function saveUserResource(resources) {
  if (resources) {
    localStorage.setItem(USER_INFO_RESOURCES, JSON.stringify(resources))
  }
}

export function getUserResource() {
  const resourceString = localStorage.getItem(USER_INFO_RESOURCES)
  if (resourceString) {
    return JSON.parse(resourceString)
  }
  return []
}

export function removeUserResource() {
  return localStorage.removeItem(USER_INFO_RESOURCES)
}
