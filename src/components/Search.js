import React, {useState, useEffect} from "react";
import axios from 'axios';


const Search = () => {
    //initialize state for the input term and results from API

    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);

    // update the container and get data from API
    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                },
            });
            setResults(data.query.search)
        };
        // in case the input contains user's term, start searching
        if (term && !results.length) {
            search();
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    console.log('search')
                    search();
                }
            },500);

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [term, results.length]);


    const renderedResults = results.map((result) => {
        return (

            <div key={result.pageid} className="ui purple segment">

                <div className="content">
                    <h3 className="header">
                        {result.title}
                    </h3>
                    <p className="text" dangerouslySetInnerHTML={{__html: result.snippet}}></p>
                </div>
                <a
                    className="ui fluid button"
                    href={`https://en.wikipedia.org?curid=${result.pageid}`}>
                    Read more </a>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form container">
                <div className="field">
                    <label> What  are you looking for today? </label>
                    <input
                        value={term}
                        onChange={e => setTerm((e.target.value))}
                        type="text" className="input"/>
                </div>
            </div>
            <div className="ui celled large list">
                {renderedResults}
            </div>
        </div>
    )
}

export default Search;
