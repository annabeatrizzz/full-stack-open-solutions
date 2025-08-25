import { useState, useEffect } from 'react'
import { get, getAll } from './services/countries.jsx'

import List from './components/List.jsx'
import Country from './components/Country.jsx'
import CountriesForm from './components/CountriesForm.jsx'

function App() {
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState('')
  const [btnText, setBtnText] = useState('')
  const [countries, setCountries] = useState(null)
  const [countryInfo, setCountryInfo] = useState(null)
  const [possibleCountries, setPossibleCountries] = useState()

  const getCountries = () => {
    getAll()
    .then(response => {
      setCountries(response.data)
    })
  }
  useEffect(getCountries, [])

  const countryRequestEntry = (event) => {
    setCountry(event.target.value)
    console.log('something is being typed for country: ', {country})
    
    getCountries()

    let options = Object.values(countries)
    options = options.filter((c) => c['name']['common'].toLowerCase().includes(country.toLowerCase())).map((c) => c['name']['common']);
    const size = options.length

    if (size > 10) {
      setMessage('Too many maches, keep researching')
      setPossibleCountries([]);
    } else if (size <= 10 && size > 1) {
      setMessage('')
      setPossibleCountries(options)
      setBtnText('Info')
    } else if (size === 1) {
      setMessage()
      setPossibleCountries([]);
      setBtnText('')
      get(options[0])
      .then(response => {
        console.log(response.data)
        setCountryInfo(response.data)
      })
    } else {
      setPossibleCountries([]);
    }
  } 

  const btnAction = (country) => {
    setMessage()
    setPossibleCountries(null)
    setBtnText('')
    get(country)
    .then(response => {
      console.log(response.data)
      setCountryInfo(response.data)
    })

  }

  return (
    <div>
      <CountriesForm onChange={countryRequestEntry} msg={message}></CountriesForm>
      <Country countryInfo={countryInfo}></Country>
      <List items={possibleCountries} btn={btnText} btnAction={btnAction}></List>
    </div>
  )
}

export default App
