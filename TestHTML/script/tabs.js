class Tabs {
    constructor(buttonSelector, contentSelector){
        this.activeClass = 'active';
        this.buttonSelector = buttonSelector;
        this.contentSelector = contentSelector;
        this.buttons = document.querySelectorAll(buttonSelector)
        this.servicesLists = document.querySelectorAll(contentSelector)
        this.inActiveAnimation = 'animate__fadeOut';
        this.ActiveAnimation = 'animate__fadeIn';
    }

    init(){
        let buttons = this.buttons;
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            button.addEventListener('click', ()=>{
                const id = button.dataset.id;
                this.buttonHandler(button);
                this.servicesListsHandler(id);
            })
        }
    }
    // (`.cart-item[data-id="${cartItem.id}"]`)
    servicesListsHandler(id){
        let activeServiceList = document.querySelector(`${this.contentSelector}.active`);
        let activeButton = document.querySelector(`${this.buttonSelector}.active`);
        if (activeServiceList.dataset.id === activeButton.dataset.id) {
            return console.log('mek')
        }else{
            let servicesLists = this.servicesLists;
            for (let i = 0; i < servicesLists.length; i++) {
                const servicesList = servicesLists[i];
                if (id === servicesList.dataset.id) {
                    activeServiceList.addEventListener('animationend',()=>{
                        this.animationHandler(servicesList,activeServiceList)
                    },{once:true});
                    activeServiceList.classList.add(this.inActiveAnimation);
                }
            }
        }   
    }
    animationHandler(servicesList,activeServiceList){
        activeServiceList.classList.remove(this.activeClass);
        activeServiceList.classList.remove(this.inActiveAnimation);
        servicesList.classList.add(this.ActiveAnimation);
        servicesList.classList.add(this.activeClass);
        servicesList.addEventListener('animationend',()=>{
            servicesList.classList.remove(this.ActiveAnimation);
        })
    }
    giveNextServicesList(id){
        let servicesLists = this.servicesLists;
        for (let i = 0; i < servicesLists.length; i++) {
            const servicesList = servicesLists[i];
            if (id === servicesList.dataset.id) {
                return servicesList
            }
        }
    }
    buttonHandler(button){
        this.removeActiveClass();
        this.addActiveClass(button);
    }
    removeActiveClass(){
        let buttons = this.buttons;
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            button.classList.remove(this.activeClass);
        }
    }
    addActiveClass(button){
        button.classList.add(this.activeClass);
    }
}

let tabs = new Tabs('.tabs__button', '.services__list');
tabs.init();
// сначала вешаем аниацию скрытия на скрываемый лист, затем,убираем активный класс с него, затем добавляем активный класс на выбранный элемент и анимацию появления, затем, сразу убираем ее