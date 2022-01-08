import styles from './SearchResult.module.css'

import Result from './Result/Result';

const SearchResult = ({resultList}) => {
    const results = resultList.map( (result, index) => {
        return <Result key={index} name={result.name} address={result.address}/>
    })

    return (
        <div className={styles['wrapper']}>
            <div className={styles['heading']}>
                Search results
            </div>
            <div className={styles['results']}>
                {results}
            </div>
        </div>
    )
}

export default SearchResult
