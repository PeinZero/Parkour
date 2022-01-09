import styles from './SearchResult.module.css'

import Result from './Result/Result';

const SearchResult = ({resultList, selectHandler}) => {
    const results = resultList.map( (result, index) => {
        return <Result key={index} name={result.formattedSuggestion.mainText} address={result.description} selectHandler={selectHandler}/>
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
