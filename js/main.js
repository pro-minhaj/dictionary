const dataLoad = (word) =>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => searchBtn(data[0]))
}

const newElement = (elementId, elementValue) =>{
    document.getElementById(elementId).innerText = elementValue ? elementValue: '';
}

const searchBtn = (data) =>{
    if(data === undefined){
       return alert('Enter Type Maning Word')
    }

    newElement('word', data.word);
    newElement('word-phonetic', data.phonetic);
    newElement('source-link', data.sourceUrls[0]);
    
    const wordHeader = document.getElementById('word-header');
    wordHeader.innerText = '';
    const audioBtn = document.createElement('button');
    audioBtn.id = 'audio-btn';
    audioBtn.classList.add('h-[48px]', 'w-[48px]', 'md:h-[75px]', 'md:w-[75px]', 'bg-contain', 'rounded-full', "bg-[url('./public/assets/icon-play.svg')]")
    wordHeader.appendChild(audioBtn);

    const audio = () =>{
        const allAudio = data.phonetics;
        for(const audios of allAudio){
            if(audios.audio !== ''){
                const play = new Audio(audios.audio);
                play.play();
                return;
            }
        }
    }

    document.getElementById('audio-btn').addEventListener('click', () =>{
        console.log('Clickd');
        audio();
    })

    const detailsContainer = document.getElementById('detail-container');
    const wordMeanings = data.meanings;
    for(let i = 0; i < wordMeanings.length; i++){
        const wordElement = wordMeanings[i];

        const partOfSpeech = document.createElement('section');
        partOfSpeech.innerHTML = `
        <section class="mb-10">
        <div class="flex items-center gap-1 mb-8">
            <p class="font-[Courgette] font-bold text-xl">${wordElement.partOfSpeech}</p><hr class="inline-block basis-full">
        </div>
        <div class="word-details">
            <p class="mb-4 text-stone-500 text-xl">Meaning</p>
            <ul id="details-list-${i}" class="ms-12 list-disc mb-4">
                
            <li class="mb-3 text-lg font-medium">(etc.) A set of keys used to operate a typewriter, computer etc.</li>

            </ul>
            <div class="flex flex-wrap mt-8">
                <p class="mr-4 text-stone-500 text-xl">Synonyms</p>
                <p class="text-purple-500 mr-1 font-bold text-xl">electronic keyboard</p>
            </div>
        </div>
        </section>
        `;
        
        detailsContainer.appendChild(partOfSpeech);
        const detailsList = document.getElementById(`details-list-${i}`);
        const defintions = wordElement.definitions;
        for(const defintion of defintions){
            const newElement = document.createElement('li');
            newElement.classList.add('mb-3', 'text-lg',  'font-medium');
            newElement.innerText = defintion.definition;
            detailsList.appendChild(newElement);
        }
    }
}


document.getElementById('search').addEventListener('change', function(){
    dataLoad(this.value);
})

dataLoad('keyboard')