import {CharacterContext} from "./CharacterContext";
import {useContext} from "react";


const useCharacter = () => useContext(CharacterContext);
export default useCharacter;