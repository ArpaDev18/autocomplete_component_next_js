"use client";
import {useState, useEffect, ChangeEvent, useRef, KeyboardEvent} from 'react';
import styles from './AutoComplete.module.css';
import {asyncDebounce} from "@/utils/asyncDebounce";
import {CharacterType} from "@/app/api/types";
import {getCharacters} from "@/app/api/getCharacters";
import HighlightSubstring from "@/components/HighlightSubstring/HighlightSubstring";
import {PropsType} from "@/components/AutoComplete/types";

const AutoComplete = ({offset, perPage = 10}: PropsType) => {
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<CharacterType[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [innerOffset, setInnerOffset] = useState<number>(offset || 0)


    const fetchData = async () => {
        try {
            return await getCharacters(search, innerOffset, perPage)
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const debouncedSearch = asyncDebounce(fetchData)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'ArrowDown': {
                setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, results.length - 1));
                break;
            }
            case 'ArrowUp': {
                setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
                break;
            }
            case 'Escape': {
                setIsDropdownVisible(false);
                break;
            }
            case 'Enter' : {
                setSearch(results[selectedIndex].actor);
                break;
            }
            default: {
                break;
            }

        }
    };

    const handleItemClick = (index: number) => {
        setSelectedIndex(index);
        setSearch(results[index].actor);
        setIsDropdownVisible(false);
    };

    const handleScroll = () => {
        if (dropdownRef.current) {
            const {scrollTop, clientHeight, scrollHeight} = dropdownRef.current;
            if ((scrollTop + clientHeight) === scrollHeight) {
                setInnerOffset(prev => prev + 10);
            }
        }
    };


    useEffect(() => {
        if (!search) {
            setResults([]);
            setIsDropdownVisible(false);
            return;
        }

        (async () => {
            const response = await debouncedSearch()
            console.log(response, 'response')
            if (response.length) {
                setResults(response as CharacterType[]);
                setIsDropdownVisible(true);
            } else {
                setIsDropdownVisible(false);
            }
        })()
    }, [search, offset]);

    return (
        <div className={styles.autocomplete}>
            <input
                type="text"
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type an actor's name"
                className={styles.input}
            />
            {isDropdownVisible && results.length > 0 && (
                <ul className={styles.dropdown} ref={dropdownRef} onScroll={handleScroll}>
                    {results.map((result, index) => (
                        <li
                            key={result.actor}
                            className={`${styles.dropdownItem} ${index === selectedIndex ? styles.selected : ''}`}
                            onMouseDown={() => handleItemClick(index)}
                        >
                            <HighlightSubstring text={result.actor} searchValue={search}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
