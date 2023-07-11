import Cookies from 'js-cookie'
import { Base64 } from 'js-base64';
import settings from '@/settings'

const TokenKey = settings.projectName + '-AccessToken'
const AuthRoutesKey = settings.projectName + '-OpenResource'
const RoleName = settings.projectName + '-Family'
const UserName = settings.projectName + '-Users'
const EmailName = settings.projectName + '-SignUp'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAuthRoutes() {
  const value = localStorage.getItem(AuthRoutesKey)
  if (value) {
    return JSON.parse(Base64.decode(value))
  }
  return ''
}

export function removeAuthRoutes() {
  return localStorage.removeItem(AuthRoutesKey)
}

export function setAuthRoutes(routes) {
  if (routes) {
    const routerString = JSON.stringify(routes)
    const routerBase64 = Base64.encode(routerString)
    localStorage.setItem(AuthRoutesKey, routerBase64)
  }
}

export function getRoleName() {
  const name = localStorage.getItem(RoleName)
  if (name) {
    return Base64.decode(name)
  } else {
    return "";
  }
}

export function setRoleName(roleName) {
  localStorage.setItem(RoleName, Base64.encode(roleName))
}

export function setUserName(name) {
  localStorage.setItem(UserName, Base64.encode(name))
}

export function getUserName() {
  const name = localStorage.getItem(UserName)
  if (name) {
    return Base64.decode(name)
  } else {
    return "";
  }
}

export function setEmail(email) {
  localStorage.setItem(EmailName, Base64.encode(email))
}

export function getEmail() {
  const name = localStorage.getItem(EmailName)
  if (name) {
    return Base64.decode(name)
  } else {
    return "";
  }
}