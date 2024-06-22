import styles from './HighlightSubstring.module.css'

const HighlightSubstring = ({text, searchValue}) => {
    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));
    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === searchValue.toLowerCase() ? (
                    <span key={index} className={styles.highlight}>{part}</span>
                ) : (
                    part
                )
            )}
        </>
    );
};

export default HighlightSubstring