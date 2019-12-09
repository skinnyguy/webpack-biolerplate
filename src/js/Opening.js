function Opening(target, name) {
  let _target = document.querySelector(target)
  const _helloElement = document.createElement('div')

  _helloElement.className = "_h1"
  _helloElement.innerHTML = `<h1 class="_h1">Hello! My name is ${name}</h1>`

  _target.append(_helloElement)

  return _target
}

export default Opening
