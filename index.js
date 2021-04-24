let typeText = function(words, textElement){
    this.dom = textElement;
    this.isDeleting = false;
    this.index = 0;
    this.text = '';
    this.wordIndex = 0;
    this.words = words;
    this.type();
}

typeText.prototype.type = function() {
    this.word = this.words[this.wordIndex];
    this.dom.innerHTML = `<span class="txt">${this.word.substring(0, this.index)}</span>`;
    if(!this.isDeleting) {
        setTimeout(() => {
            this.text = this.word.substring(0, this.index);
            this.index++;
            this.type();
        }, 200);

        if(this.word === this.text) {
            this.isDeleting = true;    
        }
    } else if(this.isDeleting) {
        setTimeout(() => {
            this.text = this.word.substring(0, this.index);
            this.index--;
            this.type();
        }, 100);
        
        if(this.text === '') {
            this.calculateWordIndex();
            this.isDeleting = false;    
        }
    }
};

typeText.prototype.calculateWordIndex = function(){
    if(this.wordIndex === (this.words.length - 1)) {
        this.wordIndex = 0;
    } else {
        this.wordIndex++;
    }
}

const extractWords = (words) => {
    return words.split(",");
}

document.addEventListener('DOMContentLoaded', init)

function init(){
    const textElement = document.querySelector('.text-type');
    const words = extractWords(textElement.getAttribute('data-words'));
    const speed = parseInt(textElement.getAttribute('data-wait'), 5);
    new typeText(words, textElement);
};
