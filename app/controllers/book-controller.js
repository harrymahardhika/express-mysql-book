const bookController = {
  index: (req, res) => {
    res.json({ message: 'Hello World!' })
  },
  show: (id) => {},
  store: (data) => {},
  update: (data, id) => {},
  destroy: (id) => {}
}

export default bookController
