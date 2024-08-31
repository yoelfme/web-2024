const button1 = document.getElementById('button-1');
const button2 = document.querySelector('div > button');

let clickCounter = 0;

button1.addEventListener(
    'click',
    (e) => {
        // Change the button text
        clickCounter += 1;
        // clickCounter = clickCounter + 1;
        button1.textContent = `You clicked me: ${clickCounter} time(s)`;
    }
)

button2.addEventListener(
    'click',
    function (e) {
        clickCounter = 0;
        button1.textContent = 'Click Me!'
    }
)
