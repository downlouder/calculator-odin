function calculator() {
    const buttons = document.querySelectorAll('.button');
    const input = document.querySelector('#input');
    const theme = document.getElementById('theme');
    const switchBtnTheme = document.querySelector('.themes');
    const resultBlock = document.getElementById('result');
    let bracketsCount = 0;
    let outputContent = '';
    let lastSign = '';
    let preLastSign = '';

    function swapStyleSheet(sheet) {
        theme.setAttribute('href', `css/${sheet}.css`);
    }
    function setBrackets() {
        bracketsCount++;
        setTimeout(() => {
            if (bracketsCount === 1) {
                input.value += '(';
            } else if (bracketsCount === 2) {
                input.value += ')';
            }
            bracketsCount = 0;
        }, 500);
    }
    function useErase() {
        input.value = input.value.toString().slice(0, -1);
    }
    function useClear() {
        resultBlock.textContent = input.value;
        input.value = '';
        firstNumber = '';
        secondNumber = '';
        currentOperator = '';
    }
    function useEqual() {
        let result = eval(input.textContent);
        if (!isFinite(result)) {
            resultBlock.textContent = 'You can\'t divide by zero';
        } else {
            input.textContent = result;
            resultBlock.textContent = input.textContent;
        }
    }
    switchBtnTheme.addEventListener('click', () => {
        if (switchBtnTheme.className === 'themes light') {
            switchBtnTheme.className = 'themes dark';
            swapStyleSheet('dark');
            switchBtnTheme.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>';
        } else if (switchBtnTheme.className === 'themes dark') {
            switchBtnTheme.className = 'themes light';
            swapStyleSheet('light');
            switchBtnTheme.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>';
        }
    })
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'equal') {
                useEqual();
            } else if (button.id === 'ac') {
                useClear();
            } else if (button.id === 'erase') {
                useErase();
            } else if (button.id === 'brackets') {
                setBrackets();
            } else if (button.id === 'percents') {
                input.value += '%';
            } else {
                input.value += button.id;
            }
            outputContent = input.value.split('');
            preLastSign = outputContent[outputContent.length-2];
            lastSign = outputContent[outputContent.length-1];
            if(preLastSign === '+' || preLastSign === '*' || preLastSign === '/' || preLastSign === '-' || preLastSign === '.') {
                if (lastSign === '+' || lastSign === '*' || lastSign === '/' || lastSign === '-' || lastSign === '.') {
                    input.value = input.value.slice(0, -2);
                    input.value += lastSign;
                }
            }
        })
    })
    function inputCalculatorValues(e) {
        let chrTyped, chrCode = 0, evt = e ? e : event;
        if (evt.charCode !== null)     chrCode = evt.charCode;
        else if (evt.which !== null)   chrCode = evt.which;
        else if (evt.keyCode !== null) chrCode = evt.keyCode;
        if (chrCode === 0) chrTyped = 'SPECIAL KEY';
        else chrTyped = String.fromCharCode(chrCode);
        input.status='inputCalculatorValues: chrTyped = '+chrTyped;
        if (chrTyped.match(/^[0-9\%\\*\\/)\(+._-]+$/g)) return true;
        if (evt.altKey || evt.ctrlKey || chrCode<28) return true;
        if (evt.preventDefault) evt.preventDefault();
        evt.returnValue=false;
        return false;
    }  
    function addEventHandler(elem,eventType,handler) {
        if (elem.addEventListener) elem.addEventListener (eventType,handler,false);
        else if (elem.attachEvent) elem.attachEvent ('on'+eventType,handler); 
        else return 0;
        return 1;
    }
    addEventHandler(input,'keypress',inputCalculatorValues);
       
}

calculator();