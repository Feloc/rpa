export const inicio = (req, res) => {
    res.render('index', {title: 'PMP'})
}

export const about = (req, res) => {
    res.render('about')
}

export const contact = (req, res) => {
    res.render('contact')
}