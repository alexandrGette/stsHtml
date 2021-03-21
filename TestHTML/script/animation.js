
const target = document.querySelector('#anchor');
const cards = document.querySelectorAll('.results__item');
let scrollHeight = document.documentElement.clientHeight;
let margin = scrollHeight - 152;
margin.toString();
console.log(margin)
let options = {
    rootMargin: `0px 0px -${margin}px 0px`,
    threshold: 1,
}



// функция обратного вызова
let callback = function(entries, observer){
    if (entries[0].isIntersecting) {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            switch (i) {
                case 0:
                    card.style.transform = 'translateY(-80px)'
                    break;
                case 1:
                    card.style.transform = 'translateY(-180px)'
                    break;
                case 2:
                    card.style.transform = 'translateY(-80px)'
                    break;
                case 3:
                    break;
                case 4:
                    card.style.transform = 'translateY(-80px)'
                    break;
                default:
                    break;
            }
            
        }
    }
}

// наблюдатель
let observer = new IntersectionObserver(callback, options)
observer.observe(target);