import {HP_API_URL} from "./constants";
import axios from "axios";
import {CharacterType} from "./types";

export const getCharacters = (search: string, offset: number, perPage: number = 10): Promise<CharacterType[]> => {
    return new Promise((resolve, reject) => {
        axios.get(HP_API_URL)
            .then((result) => {
                const cutData = [...result.data].slice(0, offset + 10)
                const filteredData = cutData.filter(item => item.actor.includes(search))
                resolve(filteredData)
            })
            .catch((error) => reject(error))
    })
}