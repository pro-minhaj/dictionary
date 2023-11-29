function searchArea(){
    const searchFilud = document.getElementById('search-filud');
    return searchFilud.value;
}

const dataLoad = () =>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchArea()}`)
    .then(res => res.json())
    .then(data => searchBtn(data))
}

const searchBtn = (data)=>{
    // KeyWord
    const keyWord = document.getElementById('keyworld');
    if(searchArea() === data[0].word){
        keyWord.innerText = data[0].word;
    }
    // phonetic Area
    const phonetic = document.getElementById('phonetic');
    if(data[0].phonetic !== undefined){
        phonetic.innerText = data[0].phonetic;
    }
    else{
        phonetic.innerText = 'None';
    }
    // Noun Area
    const nounAndVerb = (elementID, elementNO)=>{
        const noun = document.getElementById(elementID);
        noun.innerText = data[0].meanings[elementNO].partOfSpeech;
    }
    nounAndVerb('noun', 0);
    // meaning Area
    const meaningElement = (meaningElementId, indexNo)=>{
        const meaningElement1 = document.getElementById(meaningElementId);
        meaningElement1.innerText = data[0].meanings[0].definitions[indexNo].definition;
    }
    meaningElement('meaning-id1', 0);
    meaningElement('meaning-id2', 1);
    meaningElement('meaning-id3', 2);
    // synonyms
    const synonyms = document.getElementById('synonyms');
    synonyms.innerText = data[0].meanings[0].synonyms[0];
    // Verb
    nounAndVerb('verb', 1);
    // Meaning Bottom
    const meaningBottom = document.getElementById('meaning-bottom');
    meaningBottom.innerText = data[0].meanings[1].definitions[0].definition;
    // meaning Bottom Sub
    const meaningBottomSub = document.getElementById('meaning-bottom-sub');
    if(data[0].meanings[1].definitions[0].example !== undefined){
        meaningBottomSub.innerText = data[0].meanings[1].definitions[0].example;
    }
    // source
    const source = document.getElementById('source');
    source.innerText = data[0].sourceUrls[0];

}

const loadAudioData = () =>{
    const keyworld = document.getElementById('keyworld');
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyworld.innerText}`)
    .then(res => res.json())
    .then(data => audioPlay(data))
}

const audioPlay = (data) =>{
    const audio = document.getElementById('audio');
    // audio.src = data[0].phonetics[2].audio;
    console.log(data[0].word);
    console.log(data[0].phonetics[2]);
}