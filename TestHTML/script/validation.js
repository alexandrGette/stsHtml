$(function() {
    $('.form__input_tel').mask('+7 000 000-00-00');
  });


class Validation {
  constructor(formSelector,submitButtonSelector,nameInputSelector,phoneInputSelector,checkboxInputSelector,allInputsSelector){
    this.form = document.querySelector(formSelector),
    this.nameInput = document.querySelector(nameInputSelector);
    this.phoneInput = document.querySelector(phoneInputSelector);
    this.submitButton = document.querySelector(submitButtonSelector);
    this.checkboxInput = document.querySelector(checkboxInputSelector);
    this.checkboxInputParent = document.querySelector(checkboxInputSelector).parentNode;
    this.allInputs = document.querySelectorAll(allInputsSelector);
    this.alertClass = 'alert';
    this.errorInputClass = 'error-input';
  }

  formHandler(e){
    this.deleteAlerts();
    if (!this.isValidName()) {
        e.preventDefault();
        this.alertError(this.nameInput)
    }
    if (!this.isValidCheckbox()) {
        e.preventDefault();
        this.alertError(this.checkboxInput)
    }
    if (!this.isValidPhone()) {
        e.preventDefault();
        this.alertError(this.phoneInput)
    }
    if(this.isValidName() && this.isValidCheckbox() && this.isValidPhone()){
      return true
    }
  }
  /**
   * Метод проверяет валидность телефона
   * 
   */
  isValidPhone(){
    let pattern = /\+7\ \d{3}\ \d{3}-\d{2}-\d{2}/;
    return pattern.test(this.phoneInput.value);
  }
  /**
   * Метод проверяет валидность чекбокса
   *  
   */
  isValidCheckbox(){
      return this.checkboxInput.checked;
  }
   /**
     * Метод проверяет валидно ли имя
     */
  isValidName(){
    let name = this.nameInput.value;
      let pattern = /\D/;
      if (pattern.test(name)) {
          return true;
      }else{
          return false;
      }
  };
  init(){
    this.form.addEventListener("submit", (e)=> {
      if (this.formHandler(e)) {
        this.sendForm(e);
      }
      
      
    });
    
     for (const input of this.allInputs) {
        input.addEventListener("focus",()=> this.removeErrorClass(input)); 
     }
  };
  deleteAlerts(){
    let alerts = document.querySelectorAll(`.${this.alertClass}`);
    for (let i = 0; i < alerts.length; i++) {
        alerts[i].remove();
    }; 
  }

  sendForm(e){
    e.preventDefault();
    fetch('https://httpbin.org/post',{
      method:'POST',
      body: new FormData(this.form)
    }).then(response => response.json())
      .then(result => console.log(result))
  }

  removeErrorClass(selector){
    selector.classList.remove('error-input');
  }
  alertError(selector){
    let alertMsg = document.createElement('p');
    alertMsg.classList.add(this.alertClass);
    switch (selector) {
        case this.nameInput:
            alertMsg.innerHTML = 'Имя должно состоять из букв';
            selector.after(alertMsg);
            selector.classList.add(this.errorInputClass)
            break;
        case this.checkboxInput:
            alertMsg.innerHTML = 'Требуется согласие на обработку персональных данных';
            this.checkboxInputParent.after(alertMsg);
            selector.classList.add('error-input')
            break;                 
        case this.phoneInput:
            alertMsg.innerHTML = 'Не корректно введён номер телефона';
            selector.after(alertMsg);
            selector.classList.add('error-input')
            break;   
        default:
            break;
    }   
  }  
}
let valid = new Validation('.form','.form__submit','.form__input_name','.form__input_tel','.form__input_checkbox','.form__input');
valid.init()