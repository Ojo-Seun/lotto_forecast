function localStorageFns() {
  const set = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const get = <T>(key: string, initialValue: T): T => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  }

  const remove = (key: string) => {
    localStorage.removeItem(key)
  }

  return { set, get, remove }
}

export default localStorageFns
